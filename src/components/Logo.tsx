import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="bg-[#351c15] p-2 sm:p-3 rounded-lg">
        <span className="text-white font-bold text-lg sm:text-2xl tracking-tighter">GLOBAL</span>
        <span className="text-[#ffbe03] font-bold text-lg sm:text-2xl tracking-tighter">TRACK</span>
      </div>
      <div className="ml-1 sm:ml-2 flex flex-col">
        <span className="text-xs sm:text-sm text-gray-600">Powered by</span>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <img 
            src="https://www.ups.com/assets/resources/images/UPS_logo.svg" 
            alt="UPS Logo" 
            className="h-4 sm:h-6"
          />
          <span className="text-[10px] sm:text-xs text-gray-500">& Global Partners</span>
        </div>
      </div>
    </div>
  );
};

export default Logo; 