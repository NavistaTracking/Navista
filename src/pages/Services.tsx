import React from 'react';
import { FaTruck, FaPlane, FaShip, FaBox, FaGlobe, FaShieldAlt, FaClock, FaMapMarkerAlt, FaShippingFast, FaCheckCircle, FaWarehouse, FaChartLine, FaHandshake, FaAward, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import AnimatedCard from '../components/animations/AnimatedCard';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/animations.css';

const Services: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-[#351c15] dark:bg-gray-800 py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
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
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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
          <div className="mt-12 relative">
            {/* Mobile Slideshow */}
            <div className="lg:hidden">
              <div className="relative overflow-hidden">
                <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  <AnimatedCard animation="slide" delay="0ms" className="w-full flex-shrink-0">
                    <div id="freight-mode-air-freight" className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                        <Icon icon={FaPlane} size={32} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Air Freight</h3>
                      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                        Fast and reliable air freight services for time-sensitive shipments and international deliveries.
                      </p>
                      <div className="mt-4">
                        <img
                          src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                          alt="Air Freight"
                          className="rounded-lg shadow-md"
                        />
                      </div>
                      <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          Express delivery options
                        </li>
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          Global network coverage
                        </li>
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          Real-time tracking
                        </li>
                      </ul>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard animation="slide" delay="200ms" className="w-full flex-shrink-0">
                    <div id="freight-mode-sea-freight" className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                        <Icon icon={FaShip} size={32} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sea Freight</h3>
                      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                        Cost-effective sea freight solutions for large shipments, with full container and consolidated options.
                      </p>
                      <div className="mt-4">
                        <img
                          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                          alt="Sea Freight"
                          className="rounded-lg shadow-md"
                        />
                      </div>
                      <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          FCL and LCL options
                        </li>
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          Port-to-port service
                        </li>
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          Customs clearance
                        </li>
                      </ul>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard animation="slide" delay="400ms" className="w-full flex-shrink-0">
                    <div id="freight-mode-land-freight" className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                        <Icon icon={FaTruck} size={32} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ground Transport</h3>
                      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                        Efficient ground shipping network with extensive coverage and reliable delivery times.
                      </p>
                      <div className="mt-4">
                        <img
                          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                          alt="Ground Transport"
                          className="rounded-lg shadow-md"
                        />
                      </div>
                      <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          Door-to-door delivery
                        </li>
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          Scheduled pickups
                        </li>
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          Route optimization
                        </li>
                      </ul>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard animation="slide" delay="600ms" className="w-full flex-shrink-0">
                    <div id="freight-mode-warehousing" className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                        <Icon icon={FaWarehouse} size={32} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Warehousing</h3>
                      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                        Secure storage solutions with inventory management and distribution services.
                      </p>
                      <div className="mt-4">
                        <img
                          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                          alt="Warehousing"
                          className="rounded-lg shadow-md"
                        />
                      </div>
                      <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          Inventory management
                        </li>
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          Distribution services
                        </li>
                        <li className="flex items-center">
                          <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                          Secure storage
                        </li>
                      </ul>
                    </div>
                  </AnimatedCard>
                </div>
              </div>
              {/* Navigation Buttons */}
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 3))}
                  className="p-2 rounded-full bg-[#351c15] dark:bg-[#ffbe03] text-white hover:bg-[#4a2a1f] dark:hover:bg-[#e6a902] transition-colors"
                  aria-label="Previous slide"
                >
                  <Icon icon={FaChevronLeft} size={20} />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev < 3 ? prev + 1 : 0))}
                  className="p-2 rounded-full bg-[#351c15] dark:bg-[#ffbe03] text-white hover:bg-[#4a2a1f] dark:hover:bg-[#e6a902] transition-colors"
                  aria-label="Next slide"
                >
                  <Icon icon={FaChevronRight} size={20} />
                </button>
              </div>
              {/* Slide Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {[0, 1, 2, 3].map((index) => (
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
            <div className="hidden lg:grid lg:grid-cols-4 gap-8">
              <AnimatedCard animation="slide" delay="0ms">
                <div id="freight-mode-air-freight" className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                    <Icon icon={FaPlane} size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Air Freight</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Fast and reliable air freight services for time-sensitive shipments and international deliveries.
                  </p>
                  <div className="mt-4">
                    <img
                      src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Air Freight"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      Express delivery options
                    </li>
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      Global network coverage
                    </li>
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      Real-time tracking
                    </li>
                  </ul>
                </div>
              </AnimatedCard>
              <AnimatedCard animation="slide" delay="200ms">
                <div id="freight-mode-sea-freight" className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                    <Icon icon={FaShip} size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sea Freight</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Cost-effective sea freight solutions for large shipments, with full container and consolidated options.
                  </p>
                  <div className="mt-4">
                    <img
                      src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Sea Freight"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      FCL and LCL options
                    </li>
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      Port-to-port service
                    </li>
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      Customs clearance
                    </li>
                  </ul>
                </div>
              </AnimatedCard>
              <AnimatedCard animation="slide" delay="400ms">
                <div id="freight-mode-land-freight" className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                    <Icon icon={FaTruck} size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ground Transport</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Efficient ground shipping network with extensive coverage and reliable delivery times.
                  </p>
                  <div className="mt-4">
                    <img
                      src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Ground Transport"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      Door-to-door delivery
                    </li>
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      Scheduled pickups
                    </li>
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      Route optimization
                    </li>
                  </ul>
                </div>
              </AnimatedCard>
              <AnimatedCard animation="slide" delay="600ms">
                <div id="freight-mode-warehousing" className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                    <Icon icon={FaWarehouse} size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Warehousing</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Secure storage solutions with inventory management and distribution services.
                  </p>
                  <div className="mt-4">
                    <img
                      src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Warehousing"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      Inventory management
                    </li>
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      Distribution services
                    </li>
                    <li className="flex items-center">
                      <Icon icon={FaCheckCircle} size={16} className="text-[#ffbe03] mr-2" />
                      Secure storage
                    </li>
                  </ul>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Global Partners</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              We collaborate with the world's leading logistics and shipping companies to provide comprehensive tracking solutions
            </p>
          </div>
          <div className="mt-12">
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll">
                {[
                  { name: 'FedEx', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/fedex.svg' },
                  { name: 'Aramex', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/aramex.svg' },
                  { name: 'Japan Post', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/japan-post.jpg' },
                  { name: 'DTDC', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/Others/dtdc.svg' },
                  { name: 'USPS', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/usps-usa.svg' },
                  { name: 'Poste Italiane', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/Others/poste-italiane.svg' },
                  { name: 'La Poste', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/la-poste-colissimo-france.svg' },
                  { name: 'UPS', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/ups.svg' },
                  { name: 'DPD', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/dpd.svg' },
                  { name: 'GLS', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/gls.svg' },
                  { name: 'PostNL', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/postnl-parcel-service-tracking.png' },
                ].map((partner, index) => (
                  <div key={index} className="flex-shrink-0 mx-8">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                ))}
                {/* Duplicate logos for seamless scrolling */}
                {[
                  { name: 'FedEx', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/fedex.svg' },
                  { name: 'Aramex', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/aramex.svg' },
                  { name: 'Japan Post', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/japan-post.jpg' },
                  { name: 'DTDC', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/Others/dtdc.svg' },
                  { name: 'USPS', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/usps-usa.svg' },
                  { name: 'Poste Italiane', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/Others/poste-italiane.svg' },
                  { name: 'La Poste', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/la-poste-colissimo-france.svg' },
                  { name: 'UPS', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/ups.svg' },
                  { name: 'DPD', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/dpd.svg' },
                  { name: 'GLS', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/gls.svg' },
                  { name: 'PostNL', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/postnl-parcel-service-tracking.png' },
                ].map((partner, index) => (
                  <div key={`duplicate-${index}`} className="flex-shrink-0 mx-8">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Our partnerships enable us to provide real-time tracking and shipping solutions across the globe
            </p>
          </div>
        </div>
      </div>

      {/* Additional Services Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Additional Services</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Comprehensive logistics solutions to meet all your shipping needs
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaWarehouse} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Warehousing</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Secure storage solutions with inventory management and order fulfillment.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaShippingFast} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Express Delivery</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Fast and reliable express delivery services for time-sensitive shipments.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaGlobe} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">International Shipping</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Global shipping solutions with customs clearance and documentation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Why Choose Us</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Experience the difference with our comprehensive shipping solutions
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaShieldAlt} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Secure Shipping</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Your packages are handled with the utmost care and security throughout their journey. We use advanced security measures and insurance options to protect your valuable shipments.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaClock} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">24/7 Support</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Our dedicated customer service team is available around the clock to assist you with any questions or concerns about your shipments.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaMapMarkerAlt} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Global Coverage</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                With our extensive network of partners and carriers, we can deliver your packages to virtually any location worldwide with reliable tracking and delivery times.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaChartLine} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Advanced Analytics</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Access detailed shipping analytics and insights to optimize your logistics operations and make data-driven decisions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaHandshake} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Custom Solutions</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                We offer tailored shipping solutions to meet your specific needs, whether you're a small business or a large enterprise.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-[#351c15] dark:text-[#ffbe03] mb-4">
                <Icon icon={FaAward} size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Industry Expertise</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                With years of experience in the logistics industry, we understand the complexities of global shipping and provide expert solutions.
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