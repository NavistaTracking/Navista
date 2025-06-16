import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Logo from './Logo';
import { FaBars, FaTimes } from 'react-icons/fa';
import Icon from './icons/Icon';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav ref={menuRef} className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-[rgb(89,40,177)] border-none'} shadow-lg border-b sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div onClick={() => handleNavigation('/')} className="flex-shrink-0 cursor-pointer">
              <Logo />
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <div className="hidden md:flex md:items-center md:space-x-6">
                <Link
                  to="/"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/track"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[rgb(89,40,177)] bg-white hover:bg-gray-100"
                >
                  Track Package
                </Link>
                <Link
                  to="/contact"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-[rgb(89,40,177)]' 
                  : 'text-white hover:text-gray-200 hover:bg-[rgb(100,50,187)]'
              }`}
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <Icon icon={isOpen ? FaTimes : FaBars} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`absolute top-full left-0 right-0 bg-[rgb(89,40,177)] shadow-lg border-t border-[rgb(100,50,187)] ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[rgb(100,50,187)] transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/track"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[rgb(100,50,187)] transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Track
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[rgb(100,50,187)] transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 