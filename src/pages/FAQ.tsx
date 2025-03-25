import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import AnimatedCard from '../components/animations/AnimatedCard';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "How can I track my shipment?",
      answer: "You can track your shipment by entering your tracking number in our Track Package page. The tracking number is provided to you when you book a shipment. Our real-time tracking system will show you the current status and location of your package."
    },
    {
      question: "What shipping services do you offer?",
      answer: "We offer a comprehensive range of shipping services including Air Freight, Sea Freight, and Ground Transport. We also provide additional services such as warehousing, customs clearance, and cargo insurance to meet all your logistics needs."
    },
    {
      question: "How are shipping rates calculated?",
      answer: "Shipping rates are calculated based on several factors including: weight and dimensions of the package, shipping distance, delivery speed, and type of service selected. For accurate pricing, please contact our customer service team."
    },
    {
      question: "What is the estimated delivery time?",
      answer: "Delivery times vary depending on the service selected and destination. Generally, air freight takes 1-3 business days, ground transport 2-5 business days, and sea freight 10-30 days. Specific delivery estimates will be provided when booking."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping services to over 150 countries worldwide. Our global network ensures reliable and efficient delivery of your shipments across borders, with full customs clearance support."
    },
    {
      question: "What items are prohibited for shipping?",
      answer: "Prohibited items include but are not limited to: dangerous goods, illegal substances, firearms, explosives, and perishable goods without proper packaging. Please contact us for a complete list of restricted items."
    },
    {
      question: "How do I prepare my package for shipping?",
      answer: "Ensure your package is properly sealed with appropriate packaging materials. Include complete and accurate shipping labels. For fragile items, use bubble wrap or similar protective materials. Contact us for specific packaging guidelines."
    },
    {
      question: "What if my package is lost or damaged?",
      answer: "We offer cargo insurance to protect against loss or damage. If an issue occurs, please contact our customer service immediately. We'll investigate the situation and process any claims according to our insurance policy."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`relative ${isDarkMode ? 'bg-[#1a0e0a]' : 'bg-[#351c15]'} py-16`}>
        <div className="absolute inset-0">
          <div className={`w-full h-full ${isDarkMode ? 'opacity-20' : 'opacity-30'} bg-pattern`}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our shipping and logistics services
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <AnimatedCard key={index} animation="fade" delay={`${index * 100}ms`}>
              <div 
                className={`rounded-lg overflow-hidden ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-750' 
                    : 'bg-white hover:bg-gray-50'
                } shadow-lg transition-colors duration-200`}
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleQuestion(index)}
                >
                  <h3 className={`text-left font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {item.question}
                  </h3>
                  <span className={`ml-4 flex-shrink-0 ${isDarkMode ? 'text-[#ffbe03]' : 'text-[#351c15]'}`}>
                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                {openIndex === index && (
                  <div className={`px-6 pb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-12`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Still have questions?
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Our customer service team is here to help you with any questions you may have.
          </p>
          <a
            href="/contact"
            className={`inline-flex items-center px-6 py-3 rounded-md text-base font-medium ${
              isDarkMode 
                ? 'bg-[#ffbe03] text-gray-900 hover:bg-[#e6a902]' 
                : 'bg-[#351c15] text-white hover:bg-[#4a2a1f]'
            } transition-colors duration-200`}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 