import React, { useState } from 'react';
import { testEmailService } from '../services/emailService';

const EmailTest: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleTest = async () => {
    setIsTesting(true);
    setResult('Testing...');
    
    try {
      const success = await testEmailService();
      setResult(success ? 'Test completed successfully! Check your email.' : 'Test failed. Check console for details.');
    } catch (error) {
      setResult('Test failed. Check console for details.');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Email Service Test</h2>
      <button 
        onClick={handleTest} 
        disabled={isTesting}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isTesting ? 'not-allowed' : 'pointer'
        }}
      >
        {isTesting ? 'Testing...' : 'Test Email Service'}
      </button>
      {result && (
        <p style={{ marginTop: '20px', color: result.includes('successfully') ? 'green' : 'red' }}>
          {result}
        </p>
      )}
    </div>
  );
};

export default EmailTest; 