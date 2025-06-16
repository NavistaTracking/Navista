import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaBoxOpen } from 'react-icons/fa';
import Icon from '../components/icons/Icon';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[rgb(89,40,177)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Navista Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-[rgb(89,40,177)] p-4 shadow-lg inline-flex items-center justify-center">
              <FaBoxOpen className="text-white" size={64} />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-extrabold text-[#ffbe03] mb-4 font-display drop-shadow-lg">404</h1>
          <h2 className="text-3xl font-bold text-[rgb(89,40,177)] dark:text-white mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 dark:text-white/80 mb-8">
            Oops! This Navista page is missing or has been moved.<br />
            If you were tracking a shipment, please check your tracking number or return to the main page.
          </p>

          {/* Helpful Links */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[rgb(89,40,177)] bg-[#ffbe03] hover:bg-yellow-400 transition-colors duration-150 shadow-lg"
            >
              <Icon icon={FaHome} className="mr-2" />
              Navista Home
            </Link>
            <Link
              to="/track"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#ffbe03] text-base font-medium rounded-md text-[#ffbe03] bg-[rgb(89,40,177)] hover:bg-[rgb(70,30,147)] transition-colors duration-150 shadow-lg"
            >
              <Icon icon={FaSearch} className="mr-2" />
              Track a Package
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-[#ffbe03]">
            <p className="mb-4">Need help with Navista?</p>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="hover:underline text-[rgb(89,40,177)] dark:text-white">
                  Contact Navista Support
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