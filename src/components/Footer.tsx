import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPlane, FaShip, FaTruck, FaWarehouse } from 'react-icons/fa';
import Icon from './icons/Icon';
import Logo from './Logo';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  
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
              <a href="#" className="text-gray-300 hover:text-[#ffbe03] transition-colors">
                <Icon icon={FaFacebook} size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#ffbe03] transition-colors">
                <Icon icon={FaTwitter} size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#ffbe03] transition-colors">
                <Icon icon={FaInstagram} size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#ffbe03] transition-colors">
                <Icon icon={FaLinkedin} size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-6 text-[#ffbe03]">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Track Package
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-6 text-[#ffbe03]">Our Services</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaPlane} size={16} className="text-[#ffbe03]" />
                <Link to="/services#air-freight" className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Air Freight
                </Link>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaShip} size={16} className="text-[#ffbe03]" />
                <Link to="/services#sea-freight" className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Sea Freight
                </Link>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaTruck} size={16} className="text-[#ffbe03]" />
                <Link to="/services#ground-transport" className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
                  Ground Transport
                </Link>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-3">
                <Icon icon={FaWarehouse} size={16} className="text-[#ffbe03]" />
                <Link to="/services#warehousing" className="text-gray-300 hover:text-[#ffbe03] transition-colors text-sm sm:text-base">
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
                <Icon icon={FaPhone} size={16} className="text-[#ffbe03]" />
                <span className="text-gray-300">
                  <a href="tel:+1-555-123-4567" className="hover:text-[#ffbe03] transition-colors text-sm sm:text-base">+1 (555) 123-4567</a>
                </span>
              </li>
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
              <Link to="/privacy" className="text-gray-300 hover:text-[#ffbe03] text-xs sm:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-[#ffbe03] text-xs sm:text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-300 hover:text-[#ffbe03] text-xs sm:text-sm transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 