import React from 'react';
import { FaUsers, FaChartLine, FaShieldAlt, FaHandshake, FaHeadset, FaGlobe, FaTrophy, FaAward, FaCheckCircle } from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import { useTheme } from '../contexts/ThemeContext';

const About: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-[#351c15] dark:bg-gray-800 py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Modern logistics facility"
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Story
          </h1>
          <p className="mt-6 text-xl text-gray-300 dark:text-gray-200 max-w-3xl mx-auto">
            From humble beginnings to global logistics leader, we've been revolutionizing the shipping industry since 2004.
          </p>
        </div>
      </div>

      {/* Company Story */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Our Journey
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500 dark:text-gray-400">
                Founded in 2004, Global Track began with a simple mission: to make shipping and tracking accessible to everyone. What started as a small tracking service has grown into a comprehensive logistics platform serving customers worldwide.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#351c15] dark:bg-[#ffbe03] text-white">
                      <Icon icon={FaGlobe} size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Global Expansion</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      From our first office in New York, we've expanded to serve over 150 countries with local expertise and global standards.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#351c15] dark:bg-[#ffbe03] text-white">
                      <Icon icon={FaChartLine} size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Innovation</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      We've continuously invested in technology to provide real-time tracking and seamless shipping experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Logistics operations"
                className="rounded-lg shadow-lg dark:shadow-gray-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaShieldAlt} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Reliability</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                We're committed to delivering on our promises with consistent, dependable service.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaHandshake} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Trust</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Building lasting relationships through transparency and honest communication.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaHeadset} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Customer Focus</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Your satisfaction is our priority, with dedicated support and personalized solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Achievements</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Recognition for our commitment to excellence
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">150+</div>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">50k+</div>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">99%</div>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="text-4xl font-bold text-[#351c15] dark:text-[#ffbe03]">24/7</div>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Support Available</div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#351c15] dark:bg-[#ffbe03] text-white">
                  <Icon icon={FaTrophy} size={32} />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">Best Logistics Provider 2023</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                Awarded by Global Logistics Association
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#351c15] dark:bg-[#ffbe03] text-white">
                  <Icon icon={FaAward} size={32} />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">Innovation Excellence</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                Recognized for technological advancement
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#351c15] dark:bg-[#ffbe03] text-white">
                  <Icon icon={FaUsers} size={32} />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">Customer Satisfaction</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                Highest rated customer service
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Partnerships Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Strategic Partnerships</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Building a global network of trusted partners to deliver excellence
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Global Carrier Network</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our partnerships with major carriers like FedEx, UPS, DHL, and USPS enable us to provide comprehensive shipping solutions worldwide. These strategic alliances ensure reliable delivery services and real-time tracking capabilities across the globe.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['FedEx', 'UPS', 'DHL', 'USPS'].map((carrier, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03]" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{carrier}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technology Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We've integrated with leading tracking technology providers like AfterShip, 17TRACK, and TrackingMore to offer advanced tracking features and analytics. This enables us to provide detailed shipment insights and enhanced customer experience.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['AfterShip', '17TRACK', 'TrackingMore', 'ParcelPanel'].map((tech, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03]" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Asian Market Coverage</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our partnerships with China Post, 4PX, and Beijing Yanwen Logistics provide extensive coverage in the Asian market, ensuring reliable shipping and tracking services throughout the region.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['China Post', '4PX', 'Beijing Yanwen', 'China Postal Express'].map((partner, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03]" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Innovation Partners</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Working with innovative companies like Detrack Systems, Sendcloud, and FreightPOP to bring cutting-edge logistics solutions and automation to our customers.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Detrack Systems', 'Sendcloud', 'FreightPOP'].map((partner, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03]" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Team</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Meet the people behind our success
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: 'John Smith',
                role: 'CEO & Founder',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              },
              {
                name: 'Sarah Johnson',
                role: 'Operations Director',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              },
              {
                name: 'Michael Chen',
                role: 'Technology Lead',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              },
              {
                name: 'Emily Rodriguez',
                role: 'Customer Success',
                image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-[#351c15] dark:border-[#ffbe03]"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 