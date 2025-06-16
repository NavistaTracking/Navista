import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from './contexts/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import ThemeToggle from './components/ThemeToggle';
import Navbar from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Track from './pages/Track';
import Login from './pages/Login';
import AdministrationAndDevelopment from './pages/AdministrationAndDevelopment';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import FAQ from './pages/FAQ';
import { TrackingProvider } from './contexts/TrackingContext';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode; requireAdmin?: boolean }> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (!loading && requireAdmin && user?.role !== 'admin') {
      navigate('/');
    }
  }, [user, loading, navigate, requireAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TrackingProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <ToastContainer position="top-right" />
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/track" element={<Track />} />
                  <Route path="/track/:trackingNumber" element={<Track />} />

                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <ThemeToggle />
              <Footer />
            </div>
          </Router>
        </TrackingProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App; 