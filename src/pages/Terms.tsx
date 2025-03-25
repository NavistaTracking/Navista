import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Terms: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="relative bg-[#351c15] dark:bg-[#1a0e0a] py-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Terms and Conditions"
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Terms & Conditions
          </h1>
          <p className="mt-6 text-xl text-gray-300 dark:text-gray-200 max-w-3xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 md:p-8`}>
          <div className="prose max-w-none">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>1. Acceptance of Terms</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              By accessing and using our services, you agree to be bound by these Terms and Conditions, our Privacy Policy, and any other policies referenced herein.
            </p>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>2. Service Description</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              We provide shipping, tracking, and logistics services. Our services include:
            </p>
            <ul className={`list-disc pl-6 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Package tracking and monitoring</li>
              <li>Domestic and international shipping</li>
              <li>Logistics solutions</li>
              <li>Warehousing services</li>
              <li>Customer support</li>
            </ul>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>3. User Responsibilities</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              When using our services, you agree to:
            </p>
            <ul className={`list-disc pl-6 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Provide accurate and complete information</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Maintain the security of your account credentials</li>
              <li>Not misuse or abuse our services</li>
              <li>Pay all fees and charges in a timely manner</li>
            </ul>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>4. Shipping Policies</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Our shipping services are subject to:
            </p>
            <ul className={`list-disc pl-6 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Applicable shipping rates and fees</li>
              <li>Delivery time estimates</li>
              <li>Package size and weight restrictions</li>
              <li>Prohibited items policies</li>
              <li>International shipping regulations</li>
            </ul>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>5. Liability</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Our liability is limited to the extent permitted by law. We are not responsible for:
            </p>
            <ul className={`list-disc pl-6 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Delays due to customs or regulatory holds</li>
              <li>Force majeure events</li>
              <li>Incorrect information provided by users</li>
              <li>Third-party service failures</li>
            </ul>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>6. Intellectual Property</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              All content, trademarks, and intellectual property on our platform are owned by us or our licensors and are protected by applicable laws.
            </p>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>7. Termination</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              We reserve the right to terminate or suspend services to any user who violates these terms or engages in fraudulent activity.
            </p>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>8. Modifications</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              We may modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>

            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffbe03]' : 'text-gray-900'} mb-4`}>9. Contact Information</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              For questions about these Terms & Conditions, please{' '}
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

export default Terms; 