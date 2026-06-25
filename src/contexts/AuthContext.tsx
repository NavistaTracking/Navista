import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User as FirebaseUser,
  AuthError,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { app, db } from '../config/firebase';

export interface User {
  id: string;
  email: string | null;
  name: string;
  role: 'admin' | 'user' | 'manager';
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  changeAdminPassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const SESSION_START_KEY = 'navista_session_start';

const getSessionStart = (): number => {
  const stored = localStorage.getItem(SESSION_START_KEY);
  return stored ? parseInt(stored, 10) : 0;
};

const setSessionStart = () => {
  localStorage.setItem(SESSION_START_KEY, String(Date.now()));
};

const clearSessionStart = () => {
  localStorage.removeItem(SESSION_START_KEY);
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  loading: false,
  error: null,
  changeAdminPassword: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth(app);

  const checkSessionValidity = useCallback(async (currentUser: User | null) => {
    if (!currentUser || currentUser.role !== 'admin') return;

    try {
      const settingsDoc = await getDoc(doc(db, '_adminSettings_', 'config'));
      if (settingsDoc.exists()) {
        const passwordChangedAt = settingsDoc.data().passwordChangedAt;
        const sessionStart = getSessionStart();
        if (passwordChangedAt && sessionStart && passwordChangedAt > sessionStart) {
          clearSessionStart();
          await signOut(auth);
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Error checking session validity:', error);
    }
  }, [auth]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userObj: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: userData.username || firebaseUser.displayName || '',
              role: userData.role as 'admin' | 'user' | 'manager' || 'user',
              permissions: userData.permissions || []
            };

            // Check if password was changed after this session started
            if (userObj.role === 'admin') {
              const settingsDoc = await getDoc(doc(db, '_adminSettings_', 'config'));
              if (settingsDoc.exists()) {
                const passwordChangedAt = settingsDoc.data().passwordChangedAt;
                const sessionStart = getSessionStart();
                if (passwordChangedAt && sessionStart && passwordChangedAt > sessionStart) {
                  clearSessionStart();
                  await signOut(auth);
                  setUser(null);
                  setLoading(false);
                  return;
                }
              }
            }

            setSessionStart();
            setUser(userObj);
          } else {
            const defaultUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || '',
              role: 'user',
              permissions: []
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              ...defaultUser,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            setSessionStart();
            setUser(defaultUser);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  // Periodic check for password changes on admin sessions
  useEffect(() => {
    const interval = setInterval(() => checkSessionValidity(user), 30000);
    return () => clearInterval(interval);
  }, [user, checkSessionValidity]);

  const changeAdminPassword = async (currentPassword: string, newPassword: string) => {
    try {
      setLoading(true);
      setError(null);

      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error('No authenticated user');
      }

      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);

      const settingsRef = doc(db, '_adminSettings_', 'config');
      const now = Date.now();

      try {
        const existingDoc = await getDoc(settingsRef);
        if (existingDoc.exists()) {
          await updateDoc(settingsRef, { passwordChangedAt: now });
        } else {
          await setDoc(settingsRef, { passwordChangedAt: now });
        }
      } catch {
        await setDoc(settingsRef, { passwordChangedAt: now });
      }

      clearSessionStart();
      await signOut(auth);
      setUser(null);
    } catch (err) {
      const error = err as AuthError | Error;
      const message = 'code' in error && error.code === 'auth/wrong-password'
        ? 'Current password is incorrect'
        : 'code' in error && error.code === 'auth/too-many-requests'
        ? 'Too many attempts. Please try again later'
        : error.message || 'Failed to change password';

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (error: AuthError): string => {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Invalid email address format';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      default:
        return 'Invalid email or password';
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to sign in
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Fetch user data from Firestore immediately after successful login
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            id: userCredential.user.uid,
            email: userCredential.user.email,
            name: userData.username || userCredential.user.displayName || '',
            role: userData.role as 'admin' | 'user' | 'manager' || 'user',
            permissions: userData.permissions || []
          });
        } else {
          // Check if this is the first user
          const usersSnapshot = await getDocs(collection(db, 'users'));
          const isFirstUser = usersSnapshot.empty;
          
          // If user document doesn't exist, create a default user
          const defaultUser: User = {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            name: userCredential.user.displayName || '',
            role: isFirstUser ? 'admin' : 'user',
            permissions: isFirstUser ? ['all'] : []
          };
          
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            ...defaultUser,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          setUser(defaultUser);
        }
      } catch (error) {
        // If user doesn't exist and this is the first user, create them as admin
        if ((error as AuthError).code === 'auth/user-not-found') {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          // Check if this is the first user
          const usersSnapshot = await getDocs(collection(db, 'users'));
          const isFirstUser = usersSnapshot.empty;
          
          const defaultAdmin: User = {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            name: email.split('@')[0],
            role: isFirstUser ? 'admin' : 'user',
            permissions: isFirstUser ? ['all'] : []
          };
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            ...defaultAdmin,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          setUser(defaultAdmin);
          return;
        }
        throw error;
      }
    } catch (err) {
      const error = err as AuthError;
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, changeAdminPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 