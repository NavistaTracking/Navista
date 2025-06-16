import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-toastify';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaPaperPlane,
  FaSpinner
} from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import AnimatedCard from '../components/animations/AnimatedCard';
import { sendContactFormEmail } from '../services/emailService';
import contactImage from '../assets/images/navistaLogo1.PNG'

const Contact: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendContactFormEmail(formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-[rgb(89,40,177)] py-12 md:py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Logistics Network"
            className="w-full h-[200px] md:h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgb(89,40,177)] via-[rgb(89,40,177)]/80 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight text-white">
            Contact NAVISTA
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
            Get in touch with our team for all your shipping and tracking needs.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-xl p-4 md:p-8`}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[rgb(89,40,177)] dark:text-[rgb(100,50,187)] mb-4 md:mb-8">
              Contact Us
            </h1>
            
            <div className="grid grid-cols-1 gap-4 md:gap-8">
              <div>
                <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 md:mb-6`}>
                  Have questions about our tracking services? We're here to help. Fill out the form and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-[rgb(100,50,187)]' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-[rgb(89,40,177)]'
                      } focus:ring-2 focus:ring-opacity-50 focus:ring-[rgb(89,40,177)] focus:outline-none transition-colors duration-200`}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-[rgb(100,50,187)]' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-[rgb(89,40,177)]'
                      } focus:ring-2 focus:ring-opacity-50 focus:ring-[rgb(89,40,177)] focus:outline-none transition-colors duration-200`}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-[rgb(100,50,187)]' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-[rgb(89,40,177)]'
                      } focus:ring-2 focus:ring-opacity-50 focus:ring-[rgb(89,40,177)] focus:outline-none transition-colors duration-200`}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className={`w-full px-3 py-2 text-sm md:text-base rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-[rgb(100,50,187)]' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-[rgb(89,40,177)]'
                      } focus:ring-2 focus:ring-opacity-50 focus:ring-[rgb(89,40,177)] focus:outline-none transition-colors duration-200`}
                      placeholder="Your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-2 text-sm md:text-base font-medium text-white bg-[rgb(89,40,177)] hover:bg-[rgb(109,60,197)] rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(89,40,177)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information and Features */}
          <div className="space-y-8">
            {/* Contact Information Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icon icon={FaEnvelope} size={24} className="text-[rgb(89,40,177)]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900 dark:text-white">Email</p>
                    <a
                href="mailto:navistateam@gmail.com"
                className="mt-1 text-base text-gray-500 dark:text-gray-400"
              >
                navistateam@gmail.com
              </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icon icon={FaClock} size={24} className="text-[rgb(89,40,177)]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900 dark:text-white">Business Hours</p>
                    <p className="mt-1 text-base text-gray-500 dark:text-gray-400">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={contactImage}
                alt="NAVISTA Logistics"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(89,40,177)]/80 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Global Logistics</h3>
                  <p className="text-sm">Delivering excellence in shipping and tracking worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 