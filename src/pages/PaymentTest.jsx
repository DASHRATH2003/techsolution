import React, { useState } from 'react';
import Payment from '../components/Payment';

const PaymentTest = () => {
  const [amount, setAmount] = useState(500);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentSuccess = (response) => {
    setPaymentStatus({
      type: 'success',
      message: `Payment Successful!\nPayment ID: ${response.razorpay_payment_id}\nOrder ID: ${response.razorpay_order_id}\nAmount: ₹${amount}`
    });
    console.log('Payment Success:', response);
  };

  const handlePaymentError = (error) => {
    setPaymentStatus({
      type: 'error',
      message: `Payment Failed!\nError: ${error}`
    });
    console.error('Payment Error:', error);
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '600px',
      margin: '2rem auto',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '2rem' }}>
        🔥 Razorpay Payment Test
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Amount (₹):
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e9ecef',
            borderRadius: '5px',
            fontSize: '1rem'
          }}
          min="1"
          max="100000"
        />
      </div>

      <Payment 
        amount={amount}
        customer={{
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999'
        }}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />

      {paymentStatus && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: paymentStatus.type === 'success' ? '#d4edda' : '#f8d7da',
          color: paymentStatus.type === 'success' ? '#155724' : '#721c24',
          borderRadius: '5px',
          fontSize: '0.9rem',
          whiteSpace: 'pre-line'
        }}>
          {paymentStatus.message}
        </div>
      )}

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#e3f2fd',
        borderRadius: '5px',
        fontSize: '0.9rem'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#1976d2' }}>💡 Test Instructions:</h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>Click the payment button to open Razorpay checkout</li>
          <li>You'll see all payment methods: Cards, UPI, NetBanking, Wallets</li>
          <li>Use test card: <strong>4111 1111 1111 1111</strong></li>
          <li>Any future date for expiry, any CVV</li>
          <li>For UPI: Use any UPI ID ending with @paytm</li>
        </ul>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: '#fff3cd',
        borderRadius: '5px',
        fontSize: '0.9rem'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#856404' }}>🔧 Available Payment Methods:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
          <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fa', borderRadius: '3px', textAlign: 'center' }}>💳 Cards</span>
          <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fa', borderRadius: '3px', textAlign: 'center' }}>📱 UPI</span>
          <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fa', borderRadius: '3px', textAlign: 'center' }}>🏦 NetBanking</span>
          <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fa', borderRadius: '3px', textAlign: 'center' }}>💰 Wallets</span>
          <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fa', borderRadius: '3px', textAlign: 'center' }}>📲 PhonePe</span>
          <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fa', borderRadius: '3px', textAlign: 'center' }}>💸 PayLater</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentTest;
