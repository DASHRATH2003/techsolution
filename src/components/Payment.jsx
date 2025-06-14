import React, { useState } from 'react';
import axios from 'axios';
import './Payment.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://techsolutionback.onrender.com/api';
const COMPANY_NAME = 'TechSolution';

const Payment = ({ 
  amount, 
  customer = {
    name: 'Customer Name',
    email: 'customer@example.com',
    contact: '9999999999'
  },
  onSuccess, 
  onError 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const initializePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      // Create order on backend
      const { data } = await axios.post(`${API_BASE_URL}/payment/create-order`, {
        amount,
        currency: 'INR',
        customer
      });

      if (!data.success) {
        throw new Error('Failed to create order');
      }

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: COMPANY_NAME,
        description: 'Payment for services',
        order_id: data.order.id,
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyData = await axios.post(`${API_BASE_URL}/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyData.data.success) {
              setSuccess(true);
              onSuccess(response);
            } else {
              setError('Payment verification failed');
              onError('Payment verification failed');
            }
          } catch (error) {
            const errorMessage = error.response?.data?.error || 'Payment verification failed';
            setError(errorMessage);
            onError(errorMessage);
          }
        },
        prefill: customer,
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to initialize payment';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <button
        className="payment-button"
        onClick={initializePayment}
        disabled={loading}
      >
        {loading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
      
      {error && (
        <div className="payment-error">
          {error}
        </div>
      )}
      
      {success && (
        <div className="payment-success">
          Payment successful!
        </div>
      )}
    </div>
  );
};

export default Payment; 