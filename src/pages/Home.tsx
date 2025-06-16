import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaNetworkWired, FaRobot, FaMicrochip, FaBrain, FaProjectDiagram, FaStar, FaTruck, FaChartLine, FaClock, FaGlobe, FaBolt, FaRoute, FaCog, FaShieldAlt } from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import { useTheme } from '../contexts/ThemeContext';
import AnimatedCard from '../components/AnimatedCard';
import HeroImage from '../assets/images/truck.png';
import VisionImage from '../assets/images/Quantum Logistics visualization.jpg';
import QuantumImage from '../assets/images/AI neural network visualization.jpg';
import NetworkImage from '../assets/images/Quantum Logistics visualization.png';
import AutonomousImage from '../assets/images/Autonomous Delivery visualization.jpg';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const innovations = [
    {
      icon: FaRocket,
      title: 'Quantum Logistics',
      description: 'Our proprietary AI-powered system predicts shipping patterns and optimizes routes in real-time, reducing delivery times by up to 40%.',
      image: QuantumImage,
      stats: ['40% Faster Delivery', '99.9% Accuracy', 'Real-time Optimization']
    },
    {
      icon: FaNetworkWired,
      title: 'Smart Network Hub',
      description: 'A revolutionary approach to logistics that connects every point in your supply chain through our advanced neural network.',
      image: NetworkImage,
      stats: ['Global Coverage', 'Instant Connectivity', 'Smart Routing']
    },
    {
      icon: FaRobot,
      title: 'Autonomous Delivery',
      description: 'Leading the future of logistics with self-optimizing delivery systems and AI-driven warehouse automation.',
      image: AutonomousImage,
      stats: ['24/7 Operation', 'Zero Downtime', 'Smart Automation']
    }
  ];

  const technologies = [
    {
      icon: FaMicrochip,
      title: 'Neural Processing',
      description: 'Our custom-built neural networks process millions of data points to optimize every aspect of your logistics chain.'
    },
    {
      icon: FaBrain,
      title: 'Predictive Intelligence',
      description: 'Advanced machine learning algorithms predict and prevent potential delays before they occur.'
    },
    {
      icon: FaProjectDiagram,
      title: 'Dynamic Routing',
      description: 'Real-time route optimization that adapts to changing conditions instantly.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-[rgb(89,40,177)]">
        <div className="absolute inset-0 flex">
          <div className="w-1/5 bg-gradient-to-r from-[rgb(89,40,177)] to-transparent hidden md:block"></div>
          <div className="w-full relative">
            <img
              src={HeroImage}
              style={{height: '100%'}}
              alt="Truck on highway during sunset"
              className="w-full  md:h-full object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(89,40,177)] via-[rgb(89,40,177)] via-[2%] via-[rgb(89,40,177)]/0 via-[38%] to-transparent"></div>
          </div>
        </div>
        <div className="relative py-12 md:py-0 md:min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-left max-w-xl">
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
                NAVISTA
            </h1>
              <p className="mt-4 md:mt-6 text-lg md:text-2xl text-white drop-shadow-lg">
                Redefining Logistics Through Artificial Intelligence
              </p>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-white drop-shadow-lg">
                Experience the future of logistics with our cutting-edge AI solutions. 
                Faster deliveries, smarter routes, and seamless tracking.
              </p>
              <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link
                  to="/track"
                  className="inline-flex items-center justify-center px-4 md:px-8 py-2 md:py-4 border border-transparent text-sm md:text-lg font-medium rounded-md text-[rgb(89,40,177)] bg-white hover:bg-gray-100 shadow-lg"
                >
                  Track Package
                </Link>
                <Link
                  to="/quote"
                  className="inline-flex items-center justify-center px-4 md:px-8 py-2 md:py-4 border border-transparent text-sm md:text-lg font-medium rounded-md text-white bg-[rgb(89,40,177)] hover:bg-[rgb(100,50,187)] shadow-lg"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">The Future of Logistics</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                We're not just moving packages – we're revolutionizing how the world thinks about logistics. Through cutting-edge AI and machine learning, we're creating a future where logistics is predictive, autonomous, and seamlessly integrated.
              </p>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI-Powered Evolution</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Our neural networks process billions of data points daily, learning and adapting to create the most efficient logistics solutions possible. This isn't just automation – it's intelligence in motion.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Beyond Traditional Logistics</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    We've moved beyond conventional shipping methods to create a truly intelligent logistics ecosystem. Our systems don't just react – they predict, adapt, and optimize in real-time.
                </p>
              </div>
              </div>
              </div>
            <div className="mt-10 lg:mt-0">
              <img
                src={VisionImage}
                alt="AI neural network visualization"
                className="rounded-lg shadow-lg"
              />
              </div>
          </div>
        </div>
      </div>

      {/* Innovations Section */}
      <div id="innovations" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Revolutionary Solutions</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Pushing the boundaries of what's possible in logistics
              </p>
            </div>
          <div className="space-y-16">
            {innovations.map((innovation, index) => (
              <div key={index} className={`lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[rgb(89,40,177)] text-white">
                        <Icon icon={innovation.icon} size={24} />
                </div>
              </div>
                    <h3 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">{innovation.title}</h3>
                  </div>
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{innovation.description}</p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {innovation.stats.map((stat, idx) => (
                      <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          {index === 0 && idx === 0 && <FaTruck className="text-[rgb(89,40,177)] text-xl" />}
                          {index === 0 && idx === 1 && <FaChartLine className="text-[rgb(89,40,177)] text-xl" />}
                          {index === 0 && idx === 2 && <FaClock className="text-[rgb(89,40,177)] text-xl" />}
                          {index === 1 && idx === 0 && <FaGlobe className="text-[rgb(89,40,177)] text-xl" />}
                          {index === 1 && idx === 1 && <FaBolt className="text-[rgb(89,40,177)] text-xl" />}
                          {index === 1 && idx === 2 && <FaRoute className="text-[rgb(89,40,177)] text-xl" />}
                          {index === 2 && idx === 0 && <FaClock className="text-[rgb(89,40,177)] text-xl" />}
                          {index === 2 && idx === 1 && <FaShieldAlt className="text-[rgb(89,40,177)] text-xl" />}
                          {index === 2 && idx === 2 && <FaRobot className="text-[rgb(89,40,177)] text-xl" />}
                </div>
                        <p className="dark:text-white font-semibold">{stat}</p>
              </div>
                    ))}
                  </div>
                </div>
                <div className={`mt-10 lg:mt-0 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img
                    src={innovation.image}
                    alt={innovation.title}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Powered by Innovation</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our proprietary technologies that drive the future of logistics
              </p>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transform transition-transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[rgb(89,40,177)] text-white">
                      <Icon icon={tech.icon} size={24} />
              </div>
                </div>
                  <h3 className="ml-4 text-xl font-bold text-gray-900 dark:text-white">{tech.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Partnerships Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Our Global Partners</h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300">
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
                  // Duplicate the array to create continuous loop
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

      {/* Customer Reviews Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              What Our Customers Say
              </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Trusted by logistics leaders worldwide
              </p>
            </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard animation="fade" delay="0ms" className="transform -rotate-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="John Smith"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">John Smith</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Logistics Director</p>
              </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "NAVISTA's AI-powered tracking system has revolutionized our supply chain operations. The predictive analytics have helped us reduce delivery times by 30%."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="fade" delay="200ms" className="transform rotate-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Sarah Johnson"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Supply Chain Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The neural network integration has given us unprecedented visibility into our global operations. NAVISTA's technology is truly cutting-edge."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="fade" delay="400ms" className="transform -rotate-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Michael Chen"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Michael Chen</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Operations Head</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The quantum logistics system has transformed how we handle complex routing. NAVISTA's AI solutions are in a league of their own."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-6">
            <AnimatedCard animation="fade" delay="0ms" className="transform -rotate-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="John Smith"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">John Smith</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Logistics Director</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "NAVISTA's AI-powered tracking system has revolutionized our supply chain operations. The predictive analytics have helped us reduce delivery times by 30%."
                </p>
                  <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="fade" delay="200ms" className="transform rotate-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Sarah Johnson"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Supply Chain Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The neural network integration has given us unprecedented visibility into our global operations. NAVISTA's technology is truly cutting-edge."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard animation="fade" delay="400ms" className="transform -rotate-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Michael Chen"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Michael Chen</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Operations Head</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The quantum logistics system has transformed how we handle complex routing. NAVISTA's AI solutions are in a league of their own."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white">
              Ready to Experience the Future?
              </h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300">
              Join the logistics revolution. Experience the power of AI-driven logistics that adapts, learns, and evolves with your business.
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <Link
                  to="/track"
                  className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Get Started
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-sm md:text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Learn More
                </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 