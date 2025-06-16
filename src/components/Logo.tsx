import React from 'react';
import logo from '../assets/images/erasebg-transformed.png';
import logo_white from '../assets/images/erasebg-transformed-white.png';
import { useTheme } from '../contexts/ThemeContext';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex items-center ${className}`}>
      <div className="p-2 sm:p-3 rounded-lg flex items-center">
        <span>
          <img 
            src={isDarkMode ? logo : logo_white} 
            alt="Navista Logo" 
            className="h-10 sm:h-12" 
          />
        </span>        
        <span style={{letterSpacing: '0.05em'}} className="dark:text-[#6f41c4] text-white  font-bold text-lg sm:text-2xl tracking-tighter">
          Navista
        </span>
      </div>
      {/*<div className="ml-1 sm:ml-2 flex flex-col">
        <span className="text-xs sm:text-sm text-gray-600">Powered by</span>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <img 
            src="https://www.ups.com/assets/resources/images/UPS_logo.svg" 
            alt="UPS Logo" 
            className="h-4 sm:h-6"
          />
          <span className="text-[10px] sm:text-xs text-gray-500">& Global Partners</span>
        </div>
      </div>*/}
    </div>
  );
};

export default Logo;