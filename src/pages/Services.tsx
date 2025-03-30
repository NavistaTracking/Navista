import React from 'react';
import { FaTruck, FaPlane, FaShip, FaBox, FaGlobe, FaShieldAlt, FaClock, FaMapMarkerAlt, FaShippingFast, FaCheckCircle, FaWarehouse } from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import AnimatedCard from '../components/animations/AnimatedCard';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/animations.css';

const Services: React.FC = () => {
  const { isDarkMode } = useTheme();

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
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
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
              <div id="freight-mode-air-freight" className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
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
                  Cost-effective sea freight solutions for large shipments.
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
                  Reliable ground transportation for local and regional deliveries.
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