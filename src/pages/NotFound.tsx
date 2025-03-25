import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import Icon from '../components/icons/Icon';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          {/* 404 Image/Icon */}
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="404 Not Found"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-extrabold text-[#351c15] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for seems to have been misplaced in transit.
          </p>

          {/* Helpful Links */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#351c15] hover:bg-[#4a2a1f] transition-colors duration-150"
            >
              <Icon icon={FaHome} className="mr-2" />
              Return Home
            </Link>
            <Link
              to="/track"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#351c15] text-base font-medium rounded-md text-[#351c15] bg-white hover:bg-gray-50 transition-colors duration-150"
            >
              <Icon icon={FaSearch} className="mr-2" />
              Track Package
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-gray-600">
            <p className="mb-4">Need assistance? Try these:</p>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-[#351c15] hover:underline">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#351c15] hover:underline">
                  View Our Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#351c15] hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 