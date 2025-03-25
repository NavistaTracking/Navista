import React from 'react';
import { FaUsers, FaGlobe, FaShippingFast, FaAward, FaChartLine, FaHandshake } from 'react-icons/fa';
import Icon from '../components/icons/Icon';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-[#351c15] dark:bg-gray-800 py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Company headquarters and operations"
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Our Company
          </h1>
          <p className="mt-6 text-xl text-gray-300 dark:text-gray-200 max-w-3xl mx-auto">
            A global leader in logistics and shipping solutions, delivering excellence through innovation and reliability.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">1M+</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Packages Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">150+</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">25+</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">99%</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500 dark:text-gray-400">
                To provide innovative and reliable shipping solutions that connect businesses and people worldwide. We strive to be the most trusted partner in global logistics, setting industry standards for efficiency and customer service.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#351c15] dark:bg-[#ffbe03] text-white">
                      <Icon icon={FaGlobe} size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Global Reach</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      Extensive network covering over 150 countries with local expertise and global standards.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#351c15] dark:bg-[#ffbe03] text-white">
                      <Icon icon={FaShippingFast} size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Fast & Reliable</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      Advanced tracking systems and efficient processes ensuring timely deliveries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Logistics operations"
                className="rounded-lg shadow-lg dark:shadow-gray-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              The principles that guide our operations and relationships
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaAward} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Excellence</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Committed to delivering the highest quality service in every shipment.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaHandshake} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Integrity</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Operating with transparency and honesty in all our dealings.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaChartLine} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Innovation</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Continuously improving our services through technology and creativity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#351c15] dark:bg-[#1a0e0a]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-300 dark:text-gray-200">
                Join thousands of satisfied customers who trust us with their shipping needs.
              </p>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#351c15] dark:text-[#1a0e0a] bg-white hover:bg-gray-100 dark:bg-[#ffbe03] dark:hover:bg-[#e6a902]"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 