import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaShip, FaTruck, FaWarehouse, FaUser, FaCheckCircle, FaBox, FaCreditCard, FaShippingFast, FaCheckDouble, FaStar, FaStarHalf, FaGlobe, FaAward, FaCertificate, FaMedal, FaHandshake, FaSearch, FaMapMarker, FaEnvelope, FaCalendar, FaBarcode, FaPhone, FaHome, FaPaw, FaMoneyBillWave, FaArrowRight, FaShieldAlt, FaHeadset, FaChartLine } from 'react-icons/fa';
import AnimatedCard from '../components/animations/AnimatedCard';
import Marquee from '../components/animations/Marquee';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#351c15] to-[#4a2a1f] dark:from-[#1a0e0a] dark:to-[#2a1610]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-800 opacity-50 dark:opacity-70"></div>
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Global logistics"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Global Shipping &<br />
              <span className='text-[#ffbe03]'>Logistics Solutions</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Comprehensive shipping and logistics services. We handle everything from small packages to large freight, ensuring efficient delivery worldwide.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/track"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#351c15] dark:text-[#1a0e0a] bg-white dark:bg-[#ffbe03] hover:bg-gray-50 dark:hover:bg-[#e6a902] md:py-4 md:text-lg md:px-10"
                >
                  Track Package
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#351c15] dark:bg-transparent hover:bg-[#4a2a1f] dark:border-[#e6a902] dark:border-2 dark:hover:bg-[#e6a902] md:py-4 md:text-lg md:px-10"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Marquee */}
      <div className="bg-[#351c15] dark:bg-[#1a0e0a] text-white py-2">
        <Marquee 
          text="🌟 Special Offer: 20% off on international shipping! | Fast & Reliable Worldwide Delivery | Track your packages in real-time | 24/7 Customer Support"
          className="text-lg font-medium"
        />
      </div>

      {/* Statistics Section */}
      <div className="py-12 bg-gradient-to-r from-[#351c15] to-[#4a2a1f] dark:from-[#1a0e0a] dark:to-[#2a1610]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <AnimatedCard animation="fade" delay="0ms">
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="text-xl">Countries Served</div>
              </div>
            </AnimatedCard>
            <AnimatedCard animation="fade" delay="200ms">
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">19+</div>
                <div className="text-xl">Years Experience</div>
              </div>
            </AnimatedCard>
            <AnimatedCard animation="fade" delay="400ms">
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className="text-xl">Packages Delivered</div>
              </div>
            </AnimatedCard>
            <AnimatedCard animation="fade" delay="600ms">
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-xl">Customer Satisfaction</div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <AnimatedCard animation="slide" delay="0ms">
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow duration-300">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Global network"
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />
                <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                  <FaGlobe className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">GLOBAL NETWORK</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  With over 19 years of experience, we connect businesses and individuals across 150+ countries with reliable shipping solutions.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="200ms">
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow duration-300">
                <img
                  src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Quality service"
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />
                <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                  <FaCheckCircle className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">QUALITY ASSURANCE</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  We prioritize the safe and timely delivery of every shipment, maintaining the highest standards of service quality.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="400ms">
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow duration-300">
                <img
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Full service support"
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />
                <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                  <FaBox className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">FULL-SERVICE SUPPORT</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  From customs clearance to last-mile delivery, we manage every aspect of your shipment with precision and care.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="600ms">
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-600 transition-shadow duration-300">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Expert team"
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />
                <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                  <FaCheckDouble className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">EXPERT TEAM</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Our dedicated professionals bring years of logistics expertise to ensure smooth and efficient shipping operations.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-12 bg-gradient-to-t from-white to-gray-50 dark:from-gray-900 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard animation="fade">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Our Services
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                Comprehensive logistics solutions for all your shipping needs
              </p>
            </div>
          </AnimatedCard>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <AnimatedCard animation="hover">
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-600 transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#ffbe03] rounded-t-lg"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110">
                    <FaPlane className="h-10 w-10 text-[#351c15] dark:text-[#ffbe03]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Air Freight</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Fast and reliable air freight services for time-sensitive shipments and international deliveries.
                  </p>
                  <Link to="/services" className="mt-6 inline-flex items-center text-[#351c15] dark:text-[#ffbe03] font-medium hover:underline">
                    Learn More <FaArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="hover">
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-600 transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#ffbe03] rounded-t-lg"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110">
                    <FaShip className="h-10 w-10 text-[#351c15] dark:text-[#ffbe03]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Sea Freight</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Cost-effective ocean shipping solutions for large shipments, with full container and consolidated options.
                  </p>
                  <Link to="/services" className="mt-6 inline-flex items-center text-[#351c15] dark:text-[#ffbe03] font-medium hover:underline">
                    Learn More <FaArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="hover">
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-600 transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#ffbe03] rounded-t-lg"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110">
                    <FaTruck className="h-10 w-10 text-[#351c15] dark:text-[#ffbe03]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ground Transport</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Efficient ground shipping network with extensive coverage and reliable delivery times.
                  </p>
                  <Link to="/services" className="mt-6 inline-flex items-center text-[#351c15] dark:text-[#ffbe03] font-medium hover:underline">
                    Learn More <FaArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="hover">
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-600 transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#ffbe03] rounded-t-lg"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110">
                    <FaWarehouse className="h-10 w-10 text-[#351c15] dark:text-[#ffbe03]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Warehousing</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Secure storage solutions with inventory management and distribution services.
                  </p>
                  <Link to="/services" className="mt-6 inline-flex items-center text-[#351c15] dark:text-[#ffbe03] font-medium hover:underline">
                    Learn More <FaArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard animation="fade">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Why Choose Us
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                We provide exceptional logistics services with a focus on quality and reliability
              </p>
            </div>
          </AnimatedCard>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <AnimatedCard animation="slide" delay="0ms">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20">
                  <FaGlobe className="h-10 w-10 text-[#351c15] dark:text-[#ffbe03]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">Global Network</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">Extensive coverage across 150+ countries worldwide</p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="200ms">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20">
                  <FaShieldAlt className="h-10 w-10 text-[#351c15] dark:text-[#ffbe03]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">Secure Shipping</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">Advanced security measures to protect your shipments</p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="400ms">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20">
                  <FaHeadset className="h-10 w-10 text-[#351c15] dark:text-[#ffbe03]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">24/7 Support</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">Round-the-clock customer service for your convenience</p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="600ms">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20">
                  <FaChartLine className="h-10 w-10 text-[#351c15] dark:text-[#ffbe03]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">Real-time Tracking</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">Advanced tracking systems to monitor your shipments</p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard animation="fade">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                Simple steps to ship your packages worldwide
              </p>
            </div>
          </AnimatedCard>

          {/* Mobile View */}
          <div className="mt-12 lg:hidden">
            <div className="space-y-8">
              <AnimatedCard animation="slide" delay="0ms" className="w-full flex-shrink-0">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-[#351c15] dark:bg-[#ffbe03] dark:bg-opacity-20 flex items-center justify-center">
                    <FaUser className="h-8 w-8 text-white dark:text-[#ffbe03]" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Request Quote</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Fill out our simple form to get started</p>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard animation="slide" delay="200ms" className="w-full flex-shrink-0">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-[#351c15] dark:bg-[#ffbe03] dark:bg-opacity-20 flex items-center justify-center">
                    <FaCreditCard className="h-8 w-8 text-white dark:text-[#ffbe03]" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Book Shipment</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Secure your shipping slot</p>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard animation="slide" delay="400ms" className="w-full flex-shrink-0">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-[#351c15] dark:bg-[#ffbe03] dark:bg-opacity-20 flex items-center justify-center">
                    <FaBox className="h-8 w-8 text-white dark:text-[#ffbe03]" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Package Pickup</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">We collect from your location</p>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard animation="slide" delay="600ms" className="w-full flex-shrink-0">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-[#351c15] dark:bg-[#ffbe03] dark:bg-opacity-20 flex items-center justify-center">
                    <FaShippingFast className="h-8 w-8 text-white dark:text-[#ffbe03]" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Fast Delivery</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Track your shipment to destination</p>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block mt-12">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#351c15] dark:bg-[#ffbe03] opacity-30"></div>
              
              <div className="relative flex justify-between">
                <AnimatedCard animation="slide">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="h-24 w-24 rounded-full mx-auto mb-4 bg-[#351c15] dark:bg-[#ffbe03] dark:bg-opacity-20 flex items-center justify-center">
                      <FaUser className="h-10 w-10 text-white dark:text-[#ffbe03]" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">Request Quote</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">Fill out our simple form</p>
                  </div>
                </AnimatedCard>

                <AnimatedCard animation="slide" delay="0.5s">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="h-24 w-24 rounded-full mx-auto mb-4 bg-[#351c15] dark:bg-[#ffbe03] dark:bg-opacity-20 flex items-center justify-center">
                      <FaCreditCard className="h-10 w-10 text-white dark:text-[#ffbe03]" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">Book Shipment</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">Secure your slot</p>
                  </div>
                </AnimatedCard>

                <AnimatedCard animation="slide" delay="1s">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="h-24 w-24 rounded-full mx-auto mb-4 bg-[#351c15] dark:bg-[#ffbe03] dark:bg-opacity-20 flex items-center justify-center">
                      <FaBox className="h-10 w-10 text-white dark:text-[#ffbe03]" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">Package Pickup</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">We collect from you</p>
                  </div>
                </AnimatedCard>

                <AnimatedCard animation="slide" delay="1.5s">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="h-24 w-24 rounded-full mx-auto mb-4 bg-[#351c15] dark:bg-[#ffbe03] dark:bg-opacity-20 flex items-center justify-center">
                      <FaShippingFast className="h-10 w-10 text-white dark:text-[#ffbe03]" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">Fast Delivery</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">Track to destination</p>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="py-12 bg-gradient-to-t from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard animation="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Our Certifications & Achievements
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                Recognized for excellence in global logistics and shipping
              </p>
            </div>
          </AnimatedCard>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <AnimatedCard animation="slide" delay="0ms">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20">
                  <FaAward className="h-5 w-5 text-[#351c15] dark:text-[#ffbe03]" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">ISO 9001:2015</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">Quality Management System</p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="200ms">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20">
                  <FaCertificate className="h-5 w-5 text-[#351c15] dark:text-[#ffbe03]" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">IATA Member</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">International Air Transport Association</p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="400ms">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20">
                  <FaMedal className="h-5 w-5 text-[#351c15] dark:text-[#ffbe03]" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">C-TPAT Certified</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">Customs-Trade Partnership Against Terrorism</p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="600ms">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-[#351c15] dark:bg-[#ffbe03] bg-opacity-10 dark:bg-opacity-20">
                  <FaHandshake className="h-5 w-5 text-[#351c15] dark:text-[#ffbe03]" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">AEO Certified</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">Authorized Economic Operator</p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard animation="fade">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                What Our Clients Say
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                Don't just take our word for it - hear from our satisfied customers
              </p>
            </div>
          </AnimatedCard>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatedCard animation="slide" delay="0ms">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-8 h-full">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Sarah Johnson"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sarah Johnson</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">E-commerce Business Owner</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <FaStar className="h-4 w-4" />
                    <FaStar className="h-4 w-4" />
                    <FaStar className="h-4 w-4" />
                    <FaStar className="h-4 w-4" />
                    <FaStar className="h-4 w-4" />
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">5.0</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Their global shipping solutions have transformed my e-commerce business. The tracking system is reliable, and their customer service is exceptional. Highly recommended!"
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="200ms">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-8 h-full">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="David Chen"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">David Chen</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Import/Export Manager</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <FaStar className="h-4 w-4" />
                    <FaStar className="h-4 w-4" />
                    <FaStar className="h-4 w-4" />
                    <FaStar className="h-4 w-4" />
                    <FaStarHalf className="h-4 w-4" />
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">4.5</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "We've been using their services for international shipping for over 3 years. Their real-time tracking and efficient customs handling make them stand out from competitors."
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="slide" delay="400ms">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-8 h-full">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Emily Martinez"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Emily Martinez</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Retail Chain Director</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <FaStar className="h-4 w-4" />
                    <FaStar className="h-4 w-4" />
                    <FaStar className="h-4 w-4" />
                    <FaStar className="h-4 w-4" />
                    <FaStar className="h-4 w-4" />
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">5.0</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Their warehousing and distribution services have streamlined our supply chain. The team is professional, responsive, and always goes the extra mile."
                </p>
              </div>
            </AnimatedCard>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 px-8 py-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Overall Customer Rating</h3>
              <div className="flex items-center justify-center mt-4">
                <div className="flex text-yellow-400">
                  <FaStar className="h-6 w-6" />
                  <FaStar className="h-6 w-6" />
                  <FaStar className="h-6 w-6" />
                  <FaStar className="h-6 w-6" />
                  <FaStarHalf className="h-6 w-6" />
                </div>
                <span className="ml-4 text-3xl font-bold text-gray-900 dark:text-white">4.8</span>
              </div>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">Based on 1,482 reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-[#351c15] to-[#4a2a1f] dark:from-[#1a0e0a] dark:to-[#2a1610] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCard animation="fade">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Ship with Us?
              </h2>
              <p className="mt-4 text-xl text-gray-300">
                Experience the difference of professional global logistics services
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#351c15] dark:text-[#1a0e0a] bg-white dark:bg-[#ffbe03] hover:bg-gray-50 dark:hover:bg-[#e6a902]"
                >
                  Get Started
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-[#4a2a1f] dark:hover:bg-[#2a1610]"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
};

export default Home; 