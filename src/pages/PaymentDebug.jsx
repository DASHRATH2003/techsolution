import React, { useState } from 'react';
import { initiatePayment, demoPayment } from '../services/payment';

const PaymentDebug = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(2999);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
    console.log(`[${timestamp}] ${message}`);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const testBackendConnection = async () => {
    addLog('Testing backend connection...', 'info');
    
    try {
      const response = await fetch('http://localhost:5000/api/payment/test');
      if (response.ok) {
        const data = await response.json();
        addLog('✅ Backend connection successful', 'success');
        addLog(`Backend response: ${JSON.stringify(data)}`, 'info');
      } else {
        addLog(`❌ Backend connection failed: ${response.status}`, 'error');
      }
    } catch (error) {
      addLog(`❌ Backend connection error: ${error.message}`, 'error');
    }
  };

  const testCreateOrder = async () => {
    addLog('Testing create order API...', 'info');
    
    try {
      const response = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR',
          receipt: `test_${Date.now()}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        addLog('✅ Create order successful', 'success');
        addLog(`Order data: ${JSON.stringify(data)}`, 'info');
      } else {
        const errorText = await response.text();
        addLog(`❌ Create order failed: ${response.status} - ${errorText}`, 'error');
      }
    } catch (error) {
      addLog(`❌ Create order error: ${error.message}`, 'error');
    }
  };

  const testRealPayment = async () => {
    setLoading(true);
    addLog('Starting real payment test...', 'info');

    const paymentData = {
      amount: amount,
      currency: 'INR',
      name: 'Debug Test Company',
      description: 'Payment Debug Test',
      image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
      prefill: {
        name: 'Debug User',
        email: 'debug@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#667eea'
      },
      onSuccess: (response) => {
        setLoading(false);
        addLog('✅ Payment successful!', 'success');
        addLog(`Payment ID: ${response.razorpay_payment_id}`, 'success');
        addLog(`Order ID: ${response.razorpay_order_id}`, 'success');
        alert(`✅ Payment Successful!\n\nPayment ID: ${response.razorpay_payment_id}\nOrder ID: ${response.razorpay_order_id}\nAmount: ₹${amount}`);
      },
      onError: (error) => {
        setLoading(false);
        addLog(`❌ Payment failed: ${error.message}`, 'error');
        alert(`❌ Payment Failed!\n\nError: ${error.message}`);
      }
    };

    try {
      await initiatePayment(paymentData);
    } catch (error) {
      setLoading(false);
      addLog(`❌ Payment initiation error: ${error.message}`, 'error');
    }
  };

  const testDemoPayment = async () => {
    setLoading(true);
    addLog('Starting demo payment test...', 'info');

    const paymentData = {
      amount: amount,
      currency: 'INR',
      name: 'Demo Test Company',
      description: 'Demo Payment Test',
      onSuccess: (response) => {
        setLoading(false);
        addLog('✅ Demo payment successful!', 'success');
        addLog(`Payment ID: ${response.razorpay_payment_id}`, 'success');
        addLog(`Order ID: ${response.razorpay_order_id}`, 'success');
        alert(`✅ Demo Payment Successful!\n\nPayment ID: ${response.razorpay_payment_id}\nOrder ID: ${response.razorpay_order_id}\nAmount: ₹${amount}`);
      },
      onError: (error) => {
        setLoading(false);
        addLog(`❌ Demo payment failed: ${error.message}`, 'error');
        alert(`❌ Demo Payment Failed!\n\nError: ${error.message}`);
      }
    };

    try {
      await demoPayment(paymentData);
    } catch (error) {
      setLoading(false);
      addLog(`❌ Demo payment initiation error: ${error.message}`, 'error');
    }
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1000px',
      margin: '2rem auto',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '2rem' }}>
        🔧 Payment Debug Console
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Test Amount (₹):
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{
            width: '200px',
            padding: '0.5rem',
            border: '2px solid #e9ecef',
            borderRadius: '5px',
            fontSize: '1rem'
          }}
          min="1"
          max="100000"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={testBackendConnection}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Backend
        </button>

        <button
          onClick={testCreateOrder}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Create Order
        </button>

        <button
          onClick={testRealPayment}
          disabled={loading}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Processing...' : 'Test Real Payment'}
        </button>

        <button
          onClick={testDemoPayment}
          disabled={loading}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: loading ? '#ccc' : '#6f42c1',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Processing...' : 'Test Demo Payment'}
        </button>

        <button
          onClick={clearLogs}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Clear Logs
        </button>
      </div>

      <div style={{
        backgroundColor: '#000',
        color: '#00ff00',
        padding: '1rem',
        borderRadius: '5px',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        height: '400px',
        overflowY: 'auto',
        border: '2px solid #333'
      }}>
        <div style={{ marginBottom: '1rem', color: '#fff' }}>
          <strong>Debug Console:</strong>
        </div>
        {logs.length === 0 ? (
          <div style={{ color: '#888' }}>No logs yet. Click a test button to start debugging.</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} style={{
              marginBottom: '0.5rem',
              color: log.type === 'error' ? '#ff6b6b' : log.type === 'success' ? '#51cf66' : '#00ff00'
            }}>
              <span style={{ color: '#888' }}>[{log.timestamp}]</span> {log.message}
            </div>
          ))
        )}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#e3f2fd',
        borderRadius: '5px',
        fontSize: '0.9rem'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#1976d2' }}>💡 Debug Instructions:</h3>
        <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>First, test backend connection to ensure the server is running</li>
          <li>Test create order to verify the API endpoint works</li>
          <li>Try real payment to test the full integration</li>
          <li>If real payment fails, try demo payment as fallback</li>
          <li>Check the console logs for detailed error information</li>
        </ol>
      </div>
    </div>
  );
};

export default PaymentDebug;
