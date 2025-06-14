// Payment service for Razorpay integration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://techsolutionback.onrender.com/api';
const COMPANY_NAME = 'TechSolution';

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const existingScript = document.getElementById('razorpay-script');

    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const initiatePayment = async (paymentData) => {
  const {
    amount,
    currency = 'INR',
    name = COMPANY_NAME,
    description,
    image = '/logo.png',
    prefill = {},
    theme = { color: '#667eea' },
    onSuccess,
    onError
  } = paymentData;

  try {
    // Load Razorpay script
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      throw new Error('Failed to load Razorpay script');
    }

    // Create order on backend
    console.log('Creating order with amount:', amount, 'currency:', currency);

    const orderResponse = await fetch(`${API_BASE_URL}/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount, // Amount in rupees, backend will convert to paise
        currency,
        receipt: `receipt_${Date.now()}`,
      }),
    });

    console.log('Order response status:', orderResponse.status);

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      console.error('Order creation failed:', errorText);
      throw new Error(`Failed to create order: ${orderResponse.status} - ${errorText}`);
    }

    const orderData = await orderResponse.json();
    console.log('Order created successfully:', orderData);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_QV9SfOLROu5Gli',
      amount: orderData.order.amount,
      currency,
      name: COMPANY_NAME,
      description: description || 'Payment for TechSolution services',
      image: 'https://techsolution-gamma.vercel.app/logo.png',
      order_id: orderData.order.id,
      handler: function (response) {
        console.log('Payment Success:', response);
        // Verify payment on backend
        verifyPayment(response)
          .then((result) => {
            if (result.success) {
              onSuccess && onSuccess(response);
            } else {
              onError && onError(new Error('Payment verification failed'));
            }
          })
          .catch((error) => {
            onError && onError(error);
          });
      },
      prefill,
      theme
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error('Payment initiation error:', error);
    onError && onError(error);
  }
};

const verifyPayment = async (paymentResponse) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
      }),
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};

// Demo payment with Razorpay interface (works without backend)
export const demoPayment = async (paymentData) => {
  const {
    amount,
    currency = 'INR',
    name = COMPANY_NAME,
    description,
    onSuccess,
    onError
  } = paymentData;

  try {
    console.log('Using demo payment mode');

    // Load Razorpay script
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      throw new Error('Failed to load Razorpay script');
    }

    // Create a mock order ID for demo
    const mockOrderId = `order_demo_${Date.now()}`;

    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', // Demo key that works for testing
      amount: amount * 100,
      currency,
      name,
      description: description + ' (Demo Mode)',
      image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
      order_id: mockOrderId,
      handler: function (response) {
        // This will be called on successful payment
        console.log('Demo Payment Success:', response);

        // Add mock order_id to response
        response.razorpay_order_id = mockOrderId;

        onSuccess && onSuccess(response);
      },
      prefill: {
        name: 'Demo User',
        email: 'demo@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#667eea'
      },
      method: {
        netbanking: true,
        card: true,
        upi: true,
        wallet: true,
        emi: true,
        paylater: true
      },
      modal: {
        ondismiss: function() {
          console.log('Demo payment cancelled');
          onError && onError(new Error('Payment cancelled by user'));
        }
      }
    };

    console.log('Opening demo Razorpay checkout with options:', options);

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', function (response) {
      console.log('Demo Payment Failed:', response.error);
      onError && onError(new Error(`Payment failed: ${response.error.description}`));
    });

    rzp.open();

  } catch (error) {
    console.error('Demo payment error:', error);
    onError && onError(error);
  }
};

// Mock payment for development (when backend is not available)
export const mockPayment = (paymentData) => {
  const { onSuccess, onError } = paymentData;

  // Simulate payment processing
  setTimeout(() => {
    const isSuccess = Math.random() > 0.1; // 90% success rate

    if (isSuccess) {
      const mockResponse = {
        razorpay_payment_id: `pay_${Date.now()}`,
        razorpay_order_id: `order_${Date.now()}`,
        razorpay_signature: 'mock_signature'
      };
      onSuccess && onSuccess(mockResponse);
    } else {
      onError && onError(new Error('Mock payment failed'));
    }
  }, 2000);
};

// Payment status constants
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

// Currency options
export const CURRENCIES = {
  INR: 'INR',
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP'
};

// Helper function to format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Helper function to validate payment amount
export const validatePaymentAmount = (amount, minAmount = 1, maxAmount = 100000) => {
  if (!amount || isNaN(amount)) {
    return { valid: false, error: 'Invalid amount' };
  }

  if (amount < minAmount) {
    return { valid: false, error: `Minimum amount is ${formatCurrency(minAmount)}` };
  }

  if (amount > maxAmount) {
    return { valid: false, error: `Maximum amount is ${formatCurrency(maxAmount)}` };
  }

  return { valid: true };
};

export default {
  loadRazorpayScript,
  initiatePayment,
  demoPayment,
  mockPayment,
  PAYMENT_STATUS,
  CURRENCIES,
  formatCurrency,
  validatePaymentAmount
};
