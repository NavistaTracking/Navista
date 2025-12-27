import React, { useEffect } from 'react';

// TypeScript declarations for Smartsupp API
declare global {
  interface Window {
    _smartsupp: any;
    smartsupp: any;
  }
}

const LiveChat: React.FC = () => {
  useEffect(() => {
    // Check if Smartsupp script is already loaded
    const existingScript = document.querySelector('script[src*="smartsuppchat.com"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Initialize Smartsupp
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = '23225c36951ea030365949cb0649e46f22c6eea3';

    // Load Smartsupp script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = 'https://www.smartsuppchat.com/loader.js?';
    
    // Core Smartsupp initialization logic (adapted from provided script)
    window.smartsupp || (function(d) {
      var o = window.smartsupp = function() {
        // @ts-ignore
        o._.push(arguments);
      };
      // @ts-ignore
      o._ = [];
    })(document);

    script.onload = () => {
      console.log('Smartsupp script loaded successfully');
    };

    script.onerror = (error) => {
      console.error('Failed to load Smartsupp script:', error);
    };

    document.getElementsByTagName('script')[0].parentNode?.insertBefore(script, document.getElementsByTagName('script')[0]);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src*="smartsuppchat.com"]');
      if (existingScript) {
        existingScript.remove();
      }
      // Remove the widget from DOM if Smartsupp adds it outside the script
      const widget = document.getElementById('smartsupp-widget-container');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  return (
    <noscript>
      Powered by <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">Smartsupp</a>
    </noscript>
  );
};

export default LiveChat;

