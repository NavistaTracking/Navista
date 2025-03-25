import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  AuthError,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';
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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  loading: false,
  error: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: userData.username || firebaseUser.displayName || '',
              role: userData.role as 'admin' | 'user' | 'manager' || 'user',
              permissions: userData.permissions || []
            });
          } else {
            // If user document doesn't exist, create a default user
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
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 