import React, { useEffect } from 'react';

// TypeScript declarations for Tawk.to API
declare global {
  interface Window {
    Tawk_API?: {
      onLoad: () => void;
      setAttributes: (attributes: { name: string; email: string; role: string }) => void;
      sendMessage: (message: string) => void;
      showWidget: () => void;
      hideWidget: () => void;
      toggleVisibility: () => void;
    };
  }
}

const LiveChat: React.FC = () => {
  // Welcome message options
  const welcomeMessages = [
    "Hello! 👋 Welcome to PetXpress! I'm here to help you with your shipment tracking, delivery questions, or any other inquiries. How can I assist you today?",
    "Hi there! 🚚 Welcome to PetXpress! Need help tracking your shipment or have questions about delivery? I'm here to help!",
    "Welcome to PetXpress! 📦 I'm your shipping assistant. I can help you track packages, check delivery status, or answer any shipping questions. What can I help you with?",
    "Hello! 🎉 Thanks for visiting PetXpress! I'm here to make your shipping experience smooth and easy. How can I assist you today?"
  ];

  // Suggested quick reply buttons
  const quickReplies = [
    "Track My Package",
    "Check Delivery Status", 
    "Shipping Rates",
    "File a Claim",
    "Contact Support"
  ];

  // Get random welcome message
  const getRandomWelcomeMessage = () => {
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  };

  // Add quick reply buttons after welcome message
  const addQuickReplies = () => {
    if (window.Tawk_API) {
      setTimeout(() => {
        // Add quick reply buttons
        quickReplies.forEach((reply, index) => {
          setTimeout(() => {
            window.Tawk_API?.sendMessage(`[Quick Reply ${index + 1}] ${reply}`);
          }, (index + 1) * 500); // Stagger the buttons
        });
      }, 2000); // Show after welcome message
    }
  };

  useEffect(() => {
    // Check if Tawk.to script is already loaded
    const existingScript = document.querySelector('script[src*="tawk.to"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Load Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/68afacc0c7e55d19240e1bd6/1j3n3lk33';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    script.onload = () => {
      console.log('Tawk.to script loaded successfully');
      
      // Wait a bit for Tawk_API to be available
      setTimeout(() => {
        if (window.Tawk_API) {
          console.log('Tawk_API is available');
          // Set welcome message
          window.Tawk_API.onLoad = function() {
            console.log('Tawk.to widget loaded');
            try {
              // Set visitor attributes
              window.Tawk_API?.setAttributes({
                'name': 'PetXpress Customer',
                'email': '',
                'role': 'customer'
              });
              
              // Send welcome message with slight delay for better UX
              setTimeout(() => {
                window.Tawk_API?.sendMessage(getRandomWelcomeMessage());
                // Add quick reply buttons after welcome message
                addQuickReplies();
              }, 1000);
            } catch (error) {
              console.error('Error setting up Tawk.to:', error);
            }
          };
        } else {
          console.error('Tawk_API not available');
        }
      }, 1000);
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Tawk.to script:', error);
    };
    
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src*="tawk.to"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Return null since we're using Tawk.to's built-in widget
  return null;
};

export default LiveChat;
