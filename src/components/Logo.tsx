import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="bg-[#351c15] p-3 rounded-lg">
        <span className="text-white font-bold text-2xl tracking-tighter">GLOBAL</span>
        <span className="text-[#ffbe03] font-bold text-2xl tracking-tighter">TRACK</span>
      </div>
      <div className="ml-2 flex flex-col">
        <span className="text-sm text-gray-600">Powered by</span>
        <div className="flex items-center space-x-2">
          <img 
            src="https://www.ups.com/assets/resources/images/UPS_logo.svg" 
            alt="UPS Logo" 
            className="h-6"
          />
          <span className="text-xs text-gray-500">& Global Partners</span>
        </div>
      </div>
    </div>
  );
};

export default Logo; 