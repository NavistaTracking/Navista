import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is NAVISTA?",
      answer: "NAVISTA is an advanced package tracking platform that uses artificial intelligence to provide real-time tracking information for shipments worldwide. We integrate with major carriers and use cutting-edge technology to deliver accurate tracking updates."
    },
    {
      question: "How do I track my package?",
      answer: "Simply enter your tracking number in the search bar on our homepage or tracking page. NAVISTA will automatically detect the carrier and provide you with detailed tracking information."
    },
    {
      question: "Which carriers do you support?",
      answer: "We support all major carriers including FedEx, UPS, DHL, USPS, and many others. Our system automatically detects the carrier based on the tracking number format."
    },
    {
      question: "Is my tracking information secure?",
      answer: "Yes, we take security seriously. All tracking information is encrypted and we only share necessary data with authorized carriers. We never store sensitive personal information."
    },
    {
      question: "How accurate is the tracking information?",
      answer: "Our tracking information is updated in real-time directly from the carriers. We use AI to enhance the accuracy and provide predictive delivery estimates."
    },
    {
      question: "Do you support international tracking?",
      answer: "Yes, NAVISTA supports tracking for international shipments. We have partnerships with carriers worldwide to provide comprehensive global tracking coverage."
    },
    {
      question: "What if my tracking number isn't recognized?",
      answer: "If your tracking number isn't recognized, please verify that you've entered it correctly. If the issue persists, it might be too soon after the shipment was created, or the carrier might not have updated their system yet."
    },
    {
      question: "How can I get notifications about my shipment?",
      answer: "You can enable notifications by creating an account and adding your tracking numbers. We'll send you updates via email or push notifications when there are status changes."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white text-center">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-500 dark:text-gray-300 text-center">
            Find answers to common questions about NAVISTA's tracking services
          </p>

          <div className="mt-8 md:mt-12 space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <button
                  className="w-full px-4 md:px-6 py-3 md:py-4 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <FaChevronUp className="h-4 w-4 md:h-5 md:w-5 text-[rgb(89,40,177)]" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 md:h-5 md:w-5 text-[rgb(89,40,177)]" />
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-4 md:px-6 pb-4">
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-300">
              Still have questions? Contact our support team at{' '}
              <a
                href="mailto:navistateam@gmail.com"
                className="text-[rgb(89,40,177)] hover:text-[rgb(100,50,187)]"
              >
                navistateam@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 