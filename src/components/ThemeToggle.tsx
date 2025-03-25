import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-yellow-300 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#351c15] z-50"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6">
        <div className={`absolute inset-0 transform transition-transform duration-300 ${isDarkMode ? 'rotate-0' : 'rotate-90 scale-0'}`}>
          <FaMoon size={24} />
        </div>
        <div className={`absolute inset-0 transform transition-transform duration-300 ${isDarkMode ? '-rotate-90 scale-0' : 'rotate-0'}`}>
          <FaSun size={24} />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle; 