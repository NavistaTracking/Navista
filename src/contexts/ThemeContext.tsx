import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  // Load theme preference from Firestore
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        // Wait for auth to be ready
        if (authLoading) {
          return;
        }

        // If user is authenticated, try to load their preference
        if (user && user.id) {
          try {
            const themeDocRef = doc(db, 'userPreferences', user.id);
            const themeDoc = await getDoc(themeDocRef);
            
            if (themeDoc.exists()) {
              setIsDarkMode(themeDoc.data().isDarkMode);
            } else {
              // If no preference is stored, check system preference
              const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
              setIsDarkMode(systemPreference);
              
              // Try to save the system preference, but don't block if it fails
              try {
                await setDoc(themeDocRef, { isDarkMode: systemPreference });
              } catch (saveError) {
                console.warn('Could not save initial theme preference:', saveError);
                // Continue without saving - this is not critical
              }
            }
          } catch (error) {
            console.warn('Could not load user theme preference:', error);
            // Fallback to system preference
            setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
          }
        } else {
          // If not logged in, use system preference
          setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
      } catch (error) {
        console.warn('Error in theme loading:', error);
        // Fallback to system preference
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } finally {
        setLoading(false);
      }
    };

    loadThemePreference();
  }, [user, authLoading]);

  // Update theme in Firestore and apply changes
  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    try {
      if (user && user.id) {
        const themeDocRef = doc(db, 'userPreferences', user.id);
        await setDoc(themeDocRef, { isDarkMode: newTheme });
      }
    } catch (error) {
      console.warn('Error saving theme preference:', error);
      // Revert the theme change if save failed
      setIsDarkMode(!newTheme);
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

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 