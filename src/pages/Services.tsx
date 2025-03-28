import React from 'react';
import { FaTruck, FaPlane, FaShip, FaBox, FaGlobe, FaShieldAlt, FaClock, FaMapMarkerAlt, FaShippingFast } from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import AnimatedCard from '../components/animations/AnimatedCard';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-[#351c15] dark:bg-gray-800 py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Modern logistics facility"
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Services
          </h1>
          <p className="mt-6 text-xl text-gray-300 dark:text-gray-200 max-w-3xl mx-auto">
            Comprehensive logistics solutions tailored to meet your global shipping needs with precision and reliability.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">24/7</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">150+</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">99%</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">50k+</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Our Services
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500 dark:text-gray-400">
                We offer comprehensive logistics solutions tailored to meet your global shipping needs. Our services are designed to provide efficiency, reliability, and peace of mind.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#351c15] dark:bg-[#ffbe03] text-white">
                      <Icon icon={FaGlobe} size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Global Network</h3>
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

      {/* Service Cards Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Service Offerings</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Choose from our comprehensive range of shipping solutions
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatedCard animation="slide" delay="0ms">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                  <Icon icon={FaPlane} size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Air Freight</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Fast and reliable air freight services for urgent shipments.
                </p>
                <div className="mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Air Freight"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="200ms">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                  <Icon icon={FaShip} size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sea Freight</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Cost-effective sea freight solutions for large shipments.
                </p>
                <div className="mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Sea Freight"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="400ms">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                  <Icon icon={FaTruck} size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ground Transport</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Reliable ground transportation for local and regional deliveries.
                </p>
                <div className="mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Ground Transport"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#351c15] dark:bg-[#1a0e0a]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Ship?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-300 dark:text-gray-200">
                Get started with our comprehensive shipping solutions today.
              </p>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#351c15] dark:text-[#1a0e0a] bg-white hover:bg-gray-100 dark:bg-[#ffbe03] dark:hover:bg-[#e6a902]"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 