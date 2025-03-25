import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load theme preference from Firestore
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        if (user) {
          const themeDocRef = doc(db, 'userPreferences', user.id);
          const themeDoc = await getDoc(themeDocRef);
          
          if (themeDoc.exists()) {
            setIsDarkMode(themeDoc.data().isDarkMode);
          } else {
            // If no preference is stored, check system preference
            const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(systemPreference);
            // Save the system preference
            await setDoc(themeDocRef, { isDarkMode: systemPreference });
          }
        } else {
          // If not logged in, use system preference but don't save it
          setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
        // Fallback to system preference
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } finally {
        setLoading(false);
      }
    };

    loadThemePreference();
  }, [user]);

  // Update theme in Firestore and apply changes
  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    try {
      if (user) {
        const themeDocRef = doc(db, 'userPreferences', user.id);
        await setDoc(themeDocRef, { isDarkMode: newTheme });
      }
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 