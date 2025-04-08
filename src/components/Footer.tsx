import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPlane, FaShip, FaTruck, FaWarehouse } from 'react-icons/fa';
import Icon from './icons/Icon';
import Logo from './Logo';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (to: string) => {
    navigate(to);
    scrollToTop();
  };

  const handleFreightModeClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      // First navigate to the services page
      navigate('/services');
      
      // Wait for navigation and DOM update
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // Scroll the element into view
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add highlight effect
          element.classList.add('animate-pulse');
          setTimeout(() => {
            element.classList.remove('animate-pulse');
          }, 2000);
        } else {
          // If element not found immediately, try again after the page has loaded
          const retryInterval = setInterval(() => {
            const retryElement = document.getElementById(id);
            if (retryElement) {
              retryElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              retryElement.classList.add('animate-pulse');
              setTimeout(() => {
                retryElement.classList.remove('animate-pulse');
              }, 2000);
              clearInterval(retryInterval);
            }
          }, 100);
          // Clear interval after 3 seconds if element is still not found
          setTimeout(() => clearInterval(retryInterval), 3000);
        }
      }, 500); // Increased timeout to ensure navigation is complete
    }
  };
  
  return (
    <footer className={`${isDarkMode ? 'bg-[#1a0e0a] border-gray-800' : 'bg-[#351c15]'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <div className="flex justify-center sm:justify-start mb-6">
              <Logo className="!bg-transparent" />
            </div>
            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              Your trusted partner in global logistics and transportation services. Delivering excellence in shipping solutions since 2020.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a
                href="https://www.facebook.com/ups"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 transform hover:scale-110"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/UPS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 transform hover:scale-110"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/ups"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 transform hover:scale-110"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/ups"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 transform hover:scale-110"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-6 text-[#ffbe03] relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#ffbe03]"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleNavClick('/')} className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 text-sm sm:text-base">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/about')} className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 text-sm sm:text-base">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/services')} className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 text-sm sm:text-base">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/track')} className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 text-sm sm:text-base">
                  Track Package
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/contact')} className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 text-sm sm:text-base">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-6 text-[#ffbe03] relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#ffbe03]"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaPlane} size={16} className="text-[#ffbe03]" />
                <Link to="/services#freight-mode-air-freight" onClick={(e) => handleFreightModeClick(e, 'freight-mode-air-freight')} className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 text-sm sm:text-base">
                  Air Freight
                </Link>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaShip} size={16} className="text-[#ffbe03]" />
                <Link to="/services#freight-mode-sea-freight" onClick={(e) => handleFreightModeClick(e, 'freight-mode-sea-freight')} className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 text-sm sm:text-base">
                  Sea Freight
                </Link>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaTruck} size={16} className="text-[#ffbe03]" />
                <Link to="/services#freight-mode-land-freight" onClick={(e) => handleFreightModeClick(e, 'freight-mode-land-freight')} className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 text-sm sm:text-base">
                  Ground Transport
                </Link>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaWarehouse} size={16} className="text-[#ffbe03]" />
                <Link to="/services#freight-mode-warehousing" onClick={(e) => handleFreightModeClick(e, 'freight-mode-warehousing')} className="text-gray-300 hover:text-[#ffbe03] transition-colors duration-300 text-sm sm:text-base">
                  Warehousing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-6 text-[#ffbe03] relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#ffbe03]"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaEnvelope} size={16} className="text-[#ffbe03]" />
                <span className="text-gray-300">
                  <a href="mailto:globaltrackteam@gmail.com" className="hover:text-[#ffbe03] transition-colors duration-300 text-sm sm:text-base">globaltrackteam@gmail.com</a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#4a2a1f]">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-300 text-xs sm:text-sm text-center sm:text-left">
              © 2020 Global Track. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              <button onClick={() => handleNavClick('/privacy')} className="text-gray-300 hover:text-[#ffbe03] text-xs sm:text-sm transition-colors duration-300">
                Privacy Policy
              </button>
              <button onClick={() => handleNavClick('/terms')} className="text-gray-300 hover:text-[#ffbe03] text-xs sm:text-sm transition-colors duration-300">
                Terms of Service
              </button>
              <button onClick={() => handleNavClick('/faq')} className="text-gray-300 hover:text-[#ffbe03] text-xs sm:text-sm transition-colors duration-300">
                FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 