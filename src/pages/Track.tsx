import React, { useState, useRef, useEffect } from 'react';
import { getShipmentByTracking, Shipment } from '../services/shipmentService';
import { checkPaymentStatus, savePaymentRecord } from '../services/paymentService';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-toastify';
import {
  FaSearch,
  FaBox,
  FaTruck,
  FaWarehouse,
  FaShippingFast,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBoxOpen,
  FaWeightHanging,
  FaRuler,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPauseCircle,
  FaGlobe,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaPlane,
  FaShip,
  FaTruckLoading,
  FaHandshake,
  FaHeadset,
  FaCreditCard,
  FaDollarSign,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaSpinner,
  FaCheck,
  FaCopy,
  FaArrowRight,
} from 'react-icons/fa';
import AnimatedCard from '../components/animations/AnimatedCard';
import PremiumTrackingForm from '../components/PremiumTrackingForm';
import Cookies from 'js-cookie';

const Track: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTrackingForm, setShowTrackingForm] = useState(true);
  const [showPremiumForm, setShowPremiumForm] = useState(false);
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Check payment status on component mount and when tracking number changes
  useEffect(() => {
    const checkPayment = async () => {
      if (trackingNumber) {
        try {
          // Check database first
          const isPaid = await checkPaymentStatus(trackingNumber);
          if (isPaid) {
            setHasPaid(true);
            return;
          }

          // Fallback to cookie check
          const cookieStatus = Cookies.get(`premium_${trackingNumber}`);
          setHasPaid(cookieStatus === 'true');
          
          // If cookie exists but no database record, create one
          if (cookieStatus === 'true' && !isPaid) {
            try {
              await savePaymentRecord(trackingNumber);
            } catch (error) {
              console.error('Error syncing payment record:', error);
            }
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
          // Fallback to cookie check on error
          const cookieStatus = Cookies.get(`premium_${trackingNumber}`);
          setHasPaid(cookieStatus === 'true');
        }
      }
    };

    checkPayment();
  }, [trackingNumber]);

  const formatText = (text: string) => {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Tracking number copied to clipboard!');
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return;

    // If already paid, fetch data directly
    if (hasPaid) {
      setIsLoading(true);
      setError(null);
      try {
        const shipmentData = await getShipmentByTracking(trackingNumber);
        setShipment(shipmentData);
        setShowTrackingForm(false);
      } catch (err) {
        setError('Failed to fetch shipment data. Please try again.');
        toast.error('Failed to fetch shipment data. Please try again.', {
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
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // If not paid, show payment form
    setShowPaymentForm(true);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }
    setIsLoading(true);
    setError(null);
    setShipment(null);

    try {
      const shipmentData = await getShipmentByTracking(trackingNumber);
      setShipment(shipmentData);
      setShowTrackingForm(false);
      setShowPremiumForm(true);
    } catch (err) {
      setError('Shipment not found. Please check your tracking number and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePremiumSuccess = () => {
    setShowPremiumForm(false);
    setHasPremiumAccess(true);
    toast.success('Premium access granted!');
  };

  const handlePremiumCancel = () => {
    setShowPremiumForm(false);
    toast.info('You can still view basic tracking information');
  };

  const handlePaymentSuccess = async () => {
    setShowPaymentForm(false);
    setHasPaid(true);
    setIsLoading(true);
    setError(null);

    try {
      const shipmentData = await getShipmentByTracking(trackingNumber);
      
      if (!shipmentData) {
        setError('Tracking number not found. Please check the number and try again.');
        toast.error('Tracking number not found. Please check the number and try again.', {
          position: "top-right",
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            borderLeft: '4px solid rgb(89,40,177)',
          },
        });
        // Remove the payment cookie since the tracking number is invalid
        Cookies.remove(`premium_${trackingNumber}`);
        setHasPaid(false);
        return;
      }

      setShipment(shipmentData);
      setShowTrackingForm(false);
    } catch (err) {
      setError('Failed to fetch shipment data. Please try again.');
      toast.error('Failed to fetch shipment data. Please try again.', {
        position: "top-right",
        style: {
          background: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000',
          borderLeft: '4px solid rgb(89,40,177)',
        },
      });
      // Remove the payment cookie on error
      Cookies.remove(`premium_${trackingNumber}`);
      setHasPaid(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
    setHasPaid(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTop();
  };

  const handleFreightModeClick = (mode: string) => {
    // Find the element with the matching freight mode
    const element = document.getElementById(`freight-mode-${mode.toLowerCase().replace(/\s+/g, '-')}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Add highlight effect
      element.classList.add('animate-pulse');
      setTimeout(() => {
        element.classList.remove('animate-pulse');
      }, 2000);
    }
  };

  const getStatusColor = (status: string) => {
    if (isDarkMode) {
      switch (status.toLowerCase()) {
        case 'delivered':
          return 'text-green-400';
        case 'in_transit':
          return 'text-blue-400';
        case 'delayed':
          return 'text-red-400';
        case 'on_hold':
          return 'text-yellow-400';
        default:
          return 'text-gray-400';
      }
    } else {
      switch (status.toLowerCase()) {
        case 'delivered':
          return 'text-green-600';
        case 'in_transit':
          return 'text-blue-600';
        case 'delayed':
          return 'text-red-600';
        case 'on_hold':
          return 'text-yellow-600';
        default:
          return 'text-gray-600';
      }
    }
  };

  const getStatusIcon = (status: string) => {
    const colorClass = isDarkMode ? {
      delivered: 'text-green-400',
      in_transit: 'text-blue-400',
      delayed: 'text-red-400',
      on_hold: 'text-yellow-400',
      default: 'text-gray-400'
    } : {
      delivered: 'text-green-600',
      in_transit: 'text-blue-600',
      delayed: 'text-red-600',
      on_hold: 'text-yellow-600',
      default: 'text-gray-600'
    };

    switch (status.toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className={`text-2xl ${colorClass.delivered}`} />;
      case 'in_transit':
        return <FaTruck className={`text-2xl ${colorClass.in_transit}`} />;
      case 'delayed':
        return <FaExclamationTriangle className={`text-2xl ${colorClass.delayed}`} />;
      case 'on_hold':
        return <FaPauseCircle className={`text-2xl ${colorClass.on_hold}`} />;
      default:
        return <FaBox className={`text-2xl ${colorClass.default}`} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section with Tracking */}
      <div className="bg-[rgb(89,40,177)] dark:bg-[rgb(70,30,147)] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Track Your Shipment</h1>
            <p className="text-base md:text-lg mb-6 md:mb-8">Enter your tracking number to get real-time updates</p>
            <form onSubmit={handleTrack} className="max-w-2xl mx-auto">
              <div className="flex gap-3 md:gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700' 
                        : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                    } focus:ring-2 focus:ring-[rgb(100,50,187)] focus:border-[rgb(100,50,187)]`}
                  />
                  <FaSearch className={`absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !trackingNumber}
                  className={`px-4 md:px-8 py-2 md:py-3 text-sm md:text-base font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
                    isDarkMode
                      ? 'bg-white text-[rgb(89,40,177)] hover:bg-gray-100 focus:ring-white focus:ring-offset-[rgb(89,40,177)]'
                      : 'bg-white text-[rgb(89,40,177)] hover:bg-gray-100 focus:ring-[rgb(89,40,177)] focus:ring-offset-[rgb(89,40,177)]'
                  }`}
                >
                  {isLoading ? 'Tracking...' : 'Track'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {!shipment && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Why Choose Section */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 md:mb-4 ${isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]'}`}>
              Why Choose Our Tracking Service?
            </h2>
            <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Experience seamless shipment tracking with our state-of-the-art system
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className={`p-4 md:p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <div className="text-[rgb(100,50,187)] mb-3 md:mb-4">
                <FaTruck className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className={`text-lg md:text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Real-time Tracking
              </h3>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Monitor your shipments in real-time with accurate location updates and estimated delivery times.
              </p>
            </div>

            <div className={`p-4 md:p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <div className="text-[rgb(100,50,187)] mb-3 md:mb-4">
                <FaGlobe className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className={`text-lg md:text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Global Coverage
              </h3>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Track shipments worldwide with our extensive network of carriers and partners.
              </p>
            </div>

            <div className={`p-4 md:p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <div className="text-[rgb(100,50,187)] mb-3 md:mb-4">
                <FaChartLine className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className={`text-lg md:text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Detailed Updates
              </h3>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Get comprehensive shipment details including status, location, and delivery updates.
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-12 md:mb-16">
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center ${isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]'}`}>
              How It Works
            </h2>
            <p className={`text-base md:text-lg text-center mb-8 md:mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Track your shipment in four simple steps
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className={`p-4 md:p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[rgb(100,50,187)] text-white flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-3 md:mb-4">
                  1
                </div>
                <h3 className={`text-lg md:text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Enter Tracking Number
                </h3>
                <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Input your tracking number in the search box above
                </p>
              </div>

              <div className={`p-4 md:p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[rgb(100,50,187)] text-white flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-3 md:mb-4">
                  2
                </div>
                <h3 className={`text-lg md:text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  One-Time Payment
                </h3>
                <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Make a secure £0.99 payment to unlock detailed tracking
                </p>
              </div>

              <div className={`p-4 md:p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[rgb(100,50,187)] text-white flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-3 md:mb-4">
                  3
                </div>
                <h3 className={`text-lg md:text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Get Real-time Updates
                </h3>
                <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Access comprehensive shipment details and status
                </p>
              </div>

              <div className={`p-4 md:p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[rgb(100,50,187)] text-white flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-3 md:mb-4">
                  4
                </div>
                <h3 className={`text-lg md:text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Track Delivery Progress
                </h3>
                <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Monitor your shipment's journey until delivery
                </p>
              </div>
                  </div>
              </div>

          {/* Trusted Partner Section */}
          <div className={`p-6 md:p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 md:mb-6 ${isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]'}`}>
              Your Trusted Shipping Partner
            </h2>
            <p className={`text-base md:text-lg mb-6 md:mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We provide reliable and efficient shipping solutions worldwide. Our advanced tracking system ensures you always know where your shipment is and when it will arrive.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="flex items-center gap-2 md:gap-3">
                <FaClock className="text-[rgb(100,50,187)] w-5 h-5 md:w-6 md:h-6" />
                <span className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>24/7 shipment tracking</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <FaGlobe className="text-[rgb(100,50,187)] w-5 h-5 md:w-6 md:h-6" />
                <span className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Global shipping network</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <FaHeadset className="text-[rgb(100,50,187)] w-5 h-5 md:w-6 md:h-6" />
                <span className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Professional support team</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <FaShieldAlt className="text-[rgb(100,50,187)] w-5 h-5 md:w-6 md:h-6" />
                <span className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Secure and reliable service</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {shipment && (
        <div className="max-w-7xl mx-auto p-6">
          {/* Shipment Status */}
          <div className={`rounded-lg p-6 mb-6 ${
            isDarkMode 
              ? 'bg-gray-800 shadow-lg shadow-black/20' 
              : 'bg-white shadow-lg'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]'}`}>SHIPMENT STATUS</h2>
                <div className={`flex items-center gap-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <FaMapMarkerAlt size={20} className="text-[rgb(100,50,187)]" />
                              <div>
                    <div className="text-sm text-gray-400 uppercase">CURRENT LOCATION</div>
                    <div className="text-lg font-semibold uppercase">{shipment.currentLocation}</div>
                                </div>
                                </div>
                              </div>
              <div className="text-right">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                  isDarkMode ? 'bg-[rgb(100,50,187)]/10' : 'bg-[rgb(89,40,177)]/10'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isDarkMode ? 'bg-[rgb(100,50,187)]' : 'bg-[rgb(89,40,177)]'
                  }`}></div>
                  <span className={`text-sm font-semibold uppercase ${
                    isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]'
                  }`}>
                    ON HOLD
                  </span>
                                </div>
                <div className={`mt-3 flex items-center gap-3 justify-end ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <FaCalendarAlt size={20} className="text-[rgb(100,50,187)]" />
                  <div>
                    <div className="text-sm text-gray-400 uppercase">EXPECTED DELIVERY</div>
                    <div className="font-semibold">{shipment.expectedDeliveryDate}</div>
                                </div>
                              </div>
                            </div>
                  </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Shipper Information */}
            <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]'}`}>SHIPPER INFORMATION</h2>
              <div className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-center gap-2">
                  <FaUser size={18} className="text-[rgb(100,50,187)]" />
                  <span className="uppercase">{shipment.shipperName}</span>
                  </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt size={18} className="text-[rgb(100,50,187)]" />
                  <span className="uppercase">{shipment.shipperAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone size={18} className="text-[rgb(100,50,187)]" />
                  <span>{shipment.shipperPhone}</span>
                  </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope size={18} className="text-[rgb(100,50,187)]" />
                  <span>{shipment.shipperEmail}</span>
                </div>
              </div>
            </div>

            {/* Receiver Information */}
            <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]'}`}>RECEIVER INFORMATION</h2>
              <div className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-center gap-2">
                  <FaUser size={18} className="text-[rgb(100,50,187)]" />
                  <span className="uppercase">{shipment.receiverName}</span>
                  </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt size={18} className="text-[rgb(100,50,187)]" />
                  <span className="uppercase">{shipment.receiverAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone size={18} className="text-[rgb(100,50,187)]" />
                  <span>{shipment.receiverPhone}</span>
                  </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope size={18} className="text-[rgb(100,50,187)]" />
                  <span>{shipment.receiverEmail}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Details */}
          <div className={`rounded-lg p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]'}`}>SHIPMENT DETAILS</h2>
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt size={18} className="text-[rgb(100,50,187)]" />
              <div>
                  <div className="text-sm text-gray-400 uppercase">FROM</div>
                  <div className="font-semibold uppercase">{shipment.origin}</div>
                  <div className="text-sm text-gray-400 uppercase mt-1">TO</div>
                  <div className="font-semibold uppercase">{shipment.destination}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaTruck size={18} className="text-[rgb(100,50,187)]" />
              <div>
                  <div className="text-sm text-gray-400 uppercase">CARRIER</div>
                  <div className="font-semibold uppercase">{shipment.carrier}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaBox size={18} className="text-[rgb(100,50,187)]" />
              <div>
                  <div className="text-sm text-gray-400 uppercase">TYPE</div>
                  <div className="font-semibold uppercase">{shipment.typeOfShipment}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaPlane size={18} className="text-[rgb(100,50,187)]" />
              <div>
                  <div className="text-sm text-gray-400 uppercase">MODE</div>
                  <div className="font-semibold uppercase">{shipment.shipmentMode}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaCreditCard size={18} className="text-[rgb(100,50,187)]" />
              <div>
                  <div className="text-sm text-gray-400 uppercase">PAYMENT</div>
                  <div className="font-semibold uppercase">{shipment.paymentMode}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaDollarSign size={18} className="text-[rgb(100,50,187)]" />
              <div>
                  <div className="text-sm text-gray-400 uppercase">TOTAL FREIGHT</div>
                  <div className="font-semibold">${shipment.totalFreight}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaClock size={18} className="text-[rgb(100,50,187)]" />
              <div>
                  <div className="text-sm text-gray-400 uppercase">PICKUP</div>
                  <div className="font-semibold">{shipment.pickupDate} {shipment.pickupTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaClock size={18} className="text-[rgb(100,50,187)]" />
              <div>
                  <div className="text-sm text-gray-400 uppercase">DEPARTURE</div>
                  <div className="font-semibold">{shipment.departureTime}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className={`rounded-lg p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <div className="flex justify-between items-start mb-4">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]'}`}>PACKAGE DETAILS</h2>
              <div className="flex items-center gap-2">
                <FaWeightHanging size={18} className="text-[rgb(100,50,187)]" />
                <span className="font-semibold">{shipment.packages[0]?.weight} KG</span>
              </div>
            </div>
            <div className={`flex items-center gap-3 mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <FaBox size={18} className="text-[rgb(100,50,187)]" />
              <span className="font-semibold uppercase">Package 1 (1 Box)</span>
            </div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed`}>
              {shipment.packages[0]?.description}
                </p>
                      </div>
              
          {/* Tracking History */}
          <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <h2 className={`text-xl font-bold mb-8 ${isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]'}`}>TRACKING HISTORY</h2>
            <div className="relative">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-700/30"></div>
              <div className="space-y-8">
                {shipment.shipmentHistory?.map((history, index) => {
                  let statusColor;
                  let StatusIcon;
                  let bgColor;
                  
                  switch (history.status.toLowerCase()) {
                    case 'pending':
                      statusColor = isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]';
                      bgColor = isDarkMode ? 'bg-[rgb(100,50,187)]/10' : 'bg-[rgb(89,40,177)]/10';
                      StatusIcon = FaClock;
                      break;
                    case 'in transit':
                      statusColor = isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]';
                      bgColor = isDarkMode ? 'bg-[rgb(100,50,187)]/10' : 'bg-[rgb(89,40,177)]/10';
                      StatusIcon = FaTruck;
                      break;
                    case 'delayed':
                      statusColor = isDarkMode ? 'text-red-400' : 'text-red-600';
                      bgColor = isDarkMode ? 'bg-red-400/10' : 'bg-red-100';
                      StatusIcon = FaExclamationTriangle;
                      break;
                    case 'delivered':
                      statusColor = isDarkMode ? 'text-green-400' : 'text-green-600';
                      bgColor = isDarkMode ? 'bg-green-400/10' : 'bg-green-100';
                      StatusIcon = FaCheckCircle;
                      break;
                    case 'on hold':
                      statusColor = isDarkMode ? 'text-[rgb(100,50,187)]' : 'text-[rgb(89,40,177)]';
                      bgColor = isDarkMode ? 'bg-[rgb(100,50,187)]/10' : 'bg-[rgb(89,40,177)]/10';
                      StatusIcon = FaPauseCircle;
                      break;
                    default:
                      statusColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
                      bgColor = isDarkMode ? 'bg-gray-400/10' : 'bg-gray-100';
                      StatusIcon = FaBox;
                  }

                  return (
                    <div key={index} className="relative pl-10">
                      <div className={`absolute left-0 -ml-1.5 p-1.5 rounded-full ${bgColor}`}>
                        <StatusIcon size={16} className={statusColor} />
                      </div>
                      <div className={`p-4 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 shadow-md shadow-black/10' 
                          : 'bg-gray-50 shadow-sm'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className={`font-bold text-sm uppercase mb-1 ${statusColor}`}>
                              {history.status.toUpperCase()}
                      </div>
                            <div className="text-xs text-gray-500">
                              {history.date} {history.time}
              </div>
            </div>
                          <div className="text-right">
                            <div className={`font-bold text-sm uppercase ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {history.location}
          </div>
                            <div className="text-xs text-gray-500">
                              {history.remarks}
                </div>
              </div>
            </div>
          </div>
                </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {showPremiumForm && (
        <PremiumTrackingForm
          onSuccess={handlePremiumSuccess}
          onCancel={handlePremiumCancel}
          trackingNumber={trackingNumber}
        />
      )}

      {/* Payment Form */}
      {showPaymentForm && (
        <PremiumTrackingForm
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          trackingNumber={trackingNumber}
        />
      )}
    </div>
  );
};

export default Track; 