import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Privacy: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-xl p-4 md:p-8`}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)] mb-4 md:mb-8">
              Privacy Policy
            </h1>
            
            <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
              <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                At NAVISTA, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our AI-powered tracking services.
              </p>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Information We Collect
              </h2>
              <ul className={`list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Tracking numbers and shipment information</li>
                <li>Contact information (name, email, phone number)</li>
                <li>Device and browser information</li>
                <li>Usage data and analytics</li>
                <li>Location data (when required for tracking)</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                How We Use Your Information
              </h2>
              <ul className={`list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Process and track your shipments in real-time</li>
                <li>Provide accurate delivery predictions</li>
                <li>Enhance our AI algorithms for better tracking accuracy</li>
                <li>Improve our services and user experience</li>
                <li>Communicate important updates about your shipments</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Information Sharing
              </h2>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We may share your information with:
              </p>
              <ul className={`list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Our partner carriers and logistics providers</li>
                <li>Technology integration partners</li>
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Data Security
              </h2>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We implement robust security measures to protect your information:
              </p>
              <ul className={`list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Encryption of sensitive data</li>
                <li>Secure protocols for data transmission</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Your Rights
              </h2>
              <ul className={`list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data in a portable format</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Contact Us
              </h2>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className={`mt-2 text-sm md:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Email: <a href="mailto:navistateam@gmail.com" className={`${isDarkMode ? 'text-[rgb(100,50,187)] hover:text-[rgb(120,70,207)]' : 'text-[rgb(89,40,177)] hover:text-[rgb(109,60,197)]'}`}>navistateam@gmail.com</a>
              </p>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 