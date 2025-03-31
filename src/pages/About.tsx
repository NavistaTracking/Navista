import React from 'react';
import { FaUsers, FaChartLine, FaShieldAlt, FaHandshake, FaHeadset, FaGlobe, FaTrophy, FaAward, FaCheckCircle, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import { useTheme } from '../contexts/ThemeContext';
import AnimatedCard from '../components/animations/AnimatedCard';

const About: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = React.useState(0);

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

      {/* Customer Reviews Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Real experiences from our valued customers
            </p>
          </div>
          <div className="mt-12 relative">
            {/* Mobile Slideshow */}
            <div className="lg:hidden">
              <div className="relative overflow-hidden">
                <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  <AnimatedCard animation="slide" delay="0ms" className="w-full flex-shrink-0">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                          alt="John Smith"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">John Smith</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">E-commerce Business Owner</p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "Global Track has transformed how we handle our international shipments. Their real-time tracking and excellent customer support have made our logistics operations much more efficient."
                      </p>
                      <div className="mt-4 flex text-[#ffbe03]">
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                      </div>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard animation="slide" delay="200ms" className="w-full flex-shrink-0">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                          alt="Sarah Johnson"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sarah Johnson</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Online Retailer</p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "The level of service we receive from Global Track is exceptional. Their tracking system is intuitive, and their team is always ready to help with any questions or concerns."
                      </p>
                      <div className="mt-4 flex text-[#ffbe03]">
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                      </div>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard animation="slide" delay="400ms" className="w-full flex-shrink-0">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                          alt="Michael Chen"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Michael Chen</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">International Shipper</p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "As someone who ships internationally frequently, I appreciate Global Track's comprehensive coverage and reliable service. Their platform makes it easy to manage shipments across different carriers."
                      </p>
                      <div className="mt-4 flex text-[#ffbe03]">
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                        <Icon icon={FaStar} size={20} />
                      </div>
                    </div>
                  </AnimatedCard>
                </div>
              </div>
              {/* Navigation Buttons */}
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 2))}
                  className="p-2 rounded-full bg-[#351c15] dark:bg-[#ffbe03] text-white hover:bg-[#4a2a1f] dark:hover:bg-[#e6a902] transition-colors"
                  aria-label="Previous slide"
                >
                  <Icon icon={FaChevronLeft} size={20} />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev < 2 ? prev + 1 : 0))}
                  className="p-2 rounded-full bg-[#351c15] dark:bg-[#ffbe03] text-white hover:bg-[#4a2a1f] dark:hover:bg-[#e6a902] transition-colors"
                  aria-label="Next slide"
                >
                  <Icon icon={FaChevronRight} size={20} />
                </button>
              </div>
              {/* Slide Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index
                        ? 'bg-[#351c15] dark:bg-[#ffbe03]'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8">
              <AnimatedCard animation="slide" delay="0ms">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                      alt="John Smith"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">John Smith</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">E-commerce Business Owner</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "Global Track has transformed how we handle our international shipments. Their real-time tracking and excellent customer support have made our logistics operations much more efficient."
                  </p>
                  <div className="mt-4 flex text-[#ffbe03]">
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard animation="slide" delay="200ms">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                      alt="Sarah Johnson"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sarah Johnson</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Online Retailer</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "The level of service we receive from Global Track is exceptional. Their tracking system is intuitive, and their team is always ready to help with any questions or concerns."
                  </p>
                  <div className="mt-4 flex text-[#ffbe03]">
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard animation="slide" delay="400ms">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                      alt="Michael Chen"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Michael Chen</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">International Shipper</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "As someone who ships internationally frequently, I appreciate Global Track's comprehensive coverage and reliable service. Their platform makes it easy to manage shipments across different carriers."
                  </p>
                  <div className="mt-4 flex text-[#ffbe03]">
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                    <Icon icon={FaStar} size={20} />
                  </div>
                </div>
              </AnimatedCard>
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
    </div>
  );
};

export default About; 