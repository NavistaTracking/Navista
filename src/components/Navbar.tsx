import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { FaBars, FaTimes } from 'react-icons/fa';
import Icon from './icons/Icon';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className={`${isDarkMode ? 'text-gray-300 hover:text-[#ffbe03]' : 'text-gray-700 hover:text-[#351c15]'} px-3 py-2 rounded-md text-sm font-medium`}>Home</Link>
              <Link to="/about" className={`${isDarkMode ? 'text-gray-300 hover:text-[#ffbe03]' : 'text-gray-700 hover:text-[#351c15]'} px-3 py-2 rounded-md text-sm font-medium`}>About</Link>
              <Link to="/services" className={`${isDarkMode ? 'text-gray-300 hover:text-[#ffbe03]' : 'text-gray-700 hover:text-[#351c15]'} px-3 py-2 rounded-md text-sm font-medium`}>Services</Link>
              <Link to="/track" className={`${isDarkMode ? 'bg-[#ffbe03] text-gray-900' : 'bg-[#351c15] text-white'} hover:bg-[#e6a902] px-3 py-2 rounded-md text-sm font-medium`}>Track Package</Link>
              <Link to="/contact" className={`${isDarkMode ? 'text-gray-300 hover:text-[#ffbe03]' : 'text-gray-700 hover:text-[#351c15]'} px-3 py-2 rounded-md text-sm font-medium`}>Contact</Link>
              <Link to="/login" className={`${isDarkMode ? 'text-gray-300 hover:text-[#ffbe03]' : 'text-gray-700 hover:text-[#351c15]'} px-3 py-2 rounded-md text-sm font-medium`}>Login</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-[#ffbe03]' 
                  : 'text-gray-400 hover:text-[#351c15]'
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Icon icon={isOpen ? FaTimes : FaBars} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMenu}></div>
        <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-gray-900 shadow-xl">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="/logo.png"
                  alt="NAVISTA"
                />
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[rgb(89,40,177)]"
                  onClick={toggleMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-[rgb(89,40,177)] dark:hover:text-[rgb(89,40,177)]"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-[rgb(89,40,177)] dark:hover:text-[rgb(89,40,177)]"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link
                  to="/services"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-[rgb(89,40,177)] dark:hover:text-[rgb(89,40,177)]"
                  onClick={toggleMenu}
                >
                  Services
                </Link>
                <Link
                  to="/track"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-[rgb(89,40,177)] dark:hover:text-[rgb(89,40,177)]"
                  onClick={toggleMenu}
                >
                  Track Package
                </Link>
                <Link
                  to="/contact"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-[rgb(89,40,177)] dark:hover:text-[rgb(89,40,177)]"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
                <Link
                  to="/login"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-[rgb(89,40,177)] dark:hover:text-[rgb(89,40,177)]"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 