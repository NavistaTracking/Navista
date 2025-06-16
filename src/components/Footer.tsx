import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

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

  const handleNavigation = (to: string) => {
    navigate(to);
    scrollToTop();
  };
  
  return (
    <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-[rgb(89,40,177)]'} border-t ${isDarkMode ? 'border-gray-800' : 'border-[rgb(100,50,187)]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-gray-200">
              Revolutionizing logistics through AI-powered tracking and predictive analytics.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="text-gray-200 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white transition-colors" onClick={scrollToTop}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-gray-200 hover:text-white transition-colors" onClick={scrollToTop}>
                  Track Package
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-white transition-colors" onClick={scrollToTop}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-200">
                Package Tracking
              </li>
              <li className="text-gray-200">
                Shipment Management
              </li>
              <li className="text-gray-200">
                Delivery Updates
              </li>
              <li className="text-gray-200">
                Status Notifications
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-200 hover:text-white transition-colors" onClick={scrollToTop}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-200 hover:text-white transition-colors" onClick={scrollToTop}>
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-200 hover:text-white transition-colors" onClick={scrollToTop}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-gray-800' : 'border-[rgb(100,50,187)]'}`}>
          <p className="text-center text-sm text-gray-200">
            © {new Date().getFullYear()} NAVISTA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 