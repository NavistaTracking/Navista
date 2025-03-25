import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPlane, FaShip, FaTruck, FaPaw } from 'react-icons/fa';
import Icon from '../icons/Icon';
import Logo from '../Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#351c15] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo className="text-white" />
            <p className="text-gray-300 text-sm">
              Your trusted partner in global shipping and logistics solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-gray-300 hover:text-white text-sm">
                  Track Package
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Icon icon={FaPhone} className="mt-1" size={16} />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon icon={FaEnvelope} className="mt-1" size={16} />
                <span className="text-gray-300 text-sm">info@globaltrack.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon icon={FaMapMarkerAlt} className="mt-1" size={16} />
                <span className="text-gray-300 text-sm">
                  123 Global Track Street<br />
                  New York, NY 10001<br />
                  United States
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Icon icon={FaFacebook} size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Icon icon={FaTwitter} size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Icon icon={FaLinkedin} size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Icon icon={FaInstagram} size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Global Track. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 