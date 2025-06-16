import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Terms: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-xl p-4 md:p-8`}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)] mb-4 md:mb-8">
              Terms of Service
            </h1>
            
            <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
              <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Welcome to NAVISTA. By using our AI-powered tracking services, you agree to these Terms of Service. Please read them carefully.
              </p>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Acceptance of Terms
              </h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                By accessing or using NAVISTA's services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
              </p>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Use License
              </h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Permission is granted to temporarily use our services for both personal and commercial purposes, subject to the following restrictions:
              </p>
              <ul className={`list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>You must not modify or copy our materials</li>
                <li>You must not use our services for any illegal purpose</li>
                <li>You must not attempt to reverse engineer our AI systems</li>
                <li>You must not remove any copyright or proprietary notations</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Service Description
              </h2>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                NAVISTA provides real-time shipment tracking services using advanced AI technology. Our services include:
              </p>
              <ul className={`list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Real-time shipment tracking</li>
                <li>AI-powered delivery predictions</li>
                <li>Multi-carrier integration</li>
                <li>Automated status updates</li>
                <li>Customer support services</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                User Responsibilities
              </h2>
              <ul className={`list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Provide accurate tracking information</li>
                <li>Maintain the security of your account</li>
                <li>Use the service in compliance with laws</li>
                <li>Report any issues or discrepancies</li>
                <li>Keep contact information up to date</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Service Limitations
              </h2>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                While we strive for accuracy, please note:
              </p>
              <ul className={`list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Tracking updates depend on carrier data</li>
                <li>Delivery predictions are estimates</li>
                <li>Service availability may vary by region</li>
                <li>Technical issues may cause temporary delays</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Intellectual Property
              </h2>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                All content and technology used in our service is protected by intellectual property rights. Users may not:
              </p>
              <ul className={`list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Copy or modify our technology</li>
                <li>Reverse engineer our systems</li>
                <li>Use our branding without permission</li>
                <li>Share access credentials</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Limitation of Liability
              </h2>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                NAVISTA is not liable for:
              </p>
              <ul className={`list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Delays in shipment delivery</li>
                <li>Inaccurate tracking information</li>
                <li>Service interruptions</li>
                <li>Data loss or security breaches</li>
                <li>Indirect or consequential damages</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Changes to Terms
              </h2>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We may update these terms periodically. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)]">
                Contact Information
              </h2>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                For questions about these terms, please contact us at:
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

export default Terms; 