import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Privacy: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="relative bg-[#351c15] dark:bg-[#1a0e0a] py-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Privacy"
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-xl text-gray-300 dark:text-gray-200 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 md:p-8`}>
          <div className="prose max-w-none">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>Information We Collect</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              We collect information that you provide directly to us, including:
            </p>
            <ul className={`list-disc pl-6 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Name and contact information</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information</li>
              <li>Tracking and delivery preferences</li>
              <li>Communication history</li>
            </ul>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>How We Use Your Information</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              We use the information we collect to:
            </p>
            <ul className={`list-disc pl-6 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Process and track your shipments</li>
              <li>Communicate with you about your deliveries</li>
              <li>Improve our services</li>
              <li>Send you important updates and notifications</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>Information Sharing</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              We may share your information with:
            </p>
            <ul className={`list-disc pl-6 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Shipping partners and carriers</li>
              <li>Payment processors</li>
              <li>Service providers who assist our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>Data Security</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>Your Rights</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              You have the right to:
            </p>
            <ul className={`list-disc pl-6 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with supervisory authorities</li>
            </ul>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>Cookies and Tracking</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              We use cookies and similar tracking technologies to improve your experience on our website. You can control cookie settings through your browser preferences.
            </p>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>Contact Us</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              If you have questions about our Privacy Policy, please{' '}
              <Link to="/contact" className={`${isDarkMode ? 'text-[#ffbe03] hover:text-[#e6a902]' : 'text-[#351c15] hover:text-[#4a2a1f]'}`}>
                contact us
              </Link>
              .
            </p>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 