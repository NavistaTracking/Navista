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
      // Navigate to the services page
      navigate('/services');
      
      // Use a shorter timeout to ensure the navigation has started
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          element.classList.add('animate-pulse');
          setTimeout(() => {
            element.classList.remove('animate-pulse');
          }, 2000);
        } else {
          // If element not found, try again after a short delay
          setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              element.classList.add('animate-pulse');
              setTimeout(() => {
                element.classList.remove('animate-pulse');
              }, 2000);
            }
          }, 100);
        }
      }, 50);
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
              Your trusted partner in global logistics and transportation services. Delivering excellence in shipping solutions since 2004.
            </p>
            <div className="flex justify-center sm:justify-start space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#ffbe03] transition-colors">
                <Icon icon={FaFacebook} size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#ffbe03] transition-colors">
                <Icon icon={FaTwitter} size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#ffbe03] transition-colors">
                <Icon icon={FaInstagram} size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#ffbe03] transition-colors">
                <Icon icon={FaLinkedin} size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-6 text-[#ffbe03]">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleNavClick('/')} className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/about')} className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/services')} className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/track')} className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Track Package
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/contact')} className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/faq')} className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-6 text-[#ffbe03]">Our Services</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaPlane} size={16} className="text-[#ffbe03]" />
                <Link to="/services#freight-mode-air-freight" onClick={(e) => handleFreightModeClick(e, 'freight-mode-air-freight')} className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Air Freight
                </Link>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaShip} size={16} className="text-[#ffbe03]" />
                <Link to="/services#freight-mode-sea-freight" onClick={(e) => handleFreightModeClick(e, 'freight-mode-sea-freight')} className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Sea Freight
                </Link>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaTruck} size={16} className="text-[#ffbe03]" />
                <Link to="/services#freight-mode-land-freight" onClick={(e) => handleFreightModeClick(e, 'freight-mode-land-freight')} className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Ground Transport
                </Link>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaWarehouse} size={16} className="text-[#ffbe03]" />
                <Link to="/services#freight-mode-warehousing" onClick={(e) => handleFreightModeClick(e, 'freight-mode-warehousing')} className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Warehousing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-6 text-[#ffbe03]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaEnvelope} size={16} className="text-[#ffbe03]" />
                <span className="text-gray-300">
                  <a href="mailto:info@globaltrack.com" className="hover:text-[#ffbe03] transition-colors text-sm sm:text-base">info@globaltrack.com</a>
                </span>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                <Icon icon={FaMapMarkerAlt} size={16} className="text-[#ffbe03]" />
                <span className="text-gray-300 text-center sm:text-left text-sm sm:text-base">
                  123 Global Track Street<br />
                  New York, NY 10001<br />
                  United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#4a2a1f]">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-300 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Global Track. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              <button onClick={() => handleNavClick('/privacy')} className="text-gray-300 hover:text-[#ffbe03] text-xs sm:text-sm transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => handleNavClick('/terms')} className="text-gray-300 hover:text-[#ffbe03] text-xs sm:text-sm transition-colors">
                Terms of Service
              </button>
              <button onClick={() => handleNavClick('/faq')} className="text-gray-300 hover:text-[#ffbe03] text-xs sm:text-sm transition-colors">
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