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
  FaSpinner,
} from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import AnimatedCard from '../components/animations/AnimatedCard';
import { sendContactFormEmail } from '../services/emailService';

const Contact: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
      <div className="relative bg-[#351c15] dark:bg-gray-800 py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Contact us"
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mt-6 text-xl text-gray-300 dark:text-gray-200 max-w-3xl mx-auto">
            Get in touch with our team for any inquiries or support.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon={FaUser} size={16} className="text-[#351c15] dark:text-[#ffbe03]" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-[#ffbe03] dark:focus:ring-[#ffbe03]`}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon={FaEnvelope} size={16} className="text-[#351c15] dark:text-[#ffbe03]" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-[#ffbe03] dark:focus:ring-[#ffbe03]`}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-[#ffbe03] dark:focus:ring-[#ffbe03]`}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-[#ffbe03] dark:focus:ring-[#ffbe03]`}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                  isDarkMode 
                    ? 'text-gray-900 bg-[#ffbe03] hover:bg-[#e6a902]' 
                    : 'text-white bg-[#351c15] hover:bg-[#4a2a1f]'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffbe03] disabled:opacity-50`}
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaPaperPlane className="mr-2" />
                )}
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information and Image */}
          <div className="space-y-8">
            {/* Contact Information Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icon icon={FaMapMarkerAlt} size={24} className="text-[#ffbe03]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900 dark:text-white">Address</p>
                    <p className="mt-1 text-base text-gray-500 dark:text-gray-400">
                      123 Logistics Street, Business District, City, Country
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icon icon={FaEnvelope} size={24} className="text-[#ffbe03]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900 dark:text-white">Email</p>
                    <p className="mt-1 text-base text-gray-500 dark:text-gray-400">
                      contact@logistics.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icon icon={FaClock} size={24} className="text-[#ffbe03]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900 dark:text-white">Business Hours</p>
                    <div className="mt-1 space-y-1">
                      <p className="text-base text-gray-500 dark:text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-base text-gray-500 dark:text-gray-400">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-base text-gray-500 dark:text-gray-400">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Customer service team"
                className="w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 