// Payment service for Razorpay integration

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
    name = 'Your Company',
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

    const orderResponse = await fetch('http://localhost:5000/api/payment/create-order', {
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
      key: 'rzp_test_1DP5mmOlF5G5ag', // Demo Razorpay key - replace with your actual key
      amount: amount * 100, // Amount in paise (multiply by 100 for INR)
      currency,
      name,
      description,
      image,
      order_id: orderData.order.id, // Use order ID from backend
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
      prefill: {
        name: prefill.name || 'Customer Name',
        email: prefill.email || 'customer@example.com',
        contact: prefill.contact || '9999999999'
      },
      notes: {
        address: 'Corporate Office'
      },
      theme: {
        color: theme.color || '#667eea'
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
          console.log('Payment modal closed');
          onError && onError(new Error('Payment cancelled by user'));
        },
        // Escape key handling
        escape: true,
        // Animation settings
        animation: true,
        // Confirm close
        confirm_close: true
      },
      // Retry settings
      retry: {
        enabled: true,
        max_count: 3
      },
      // Timeout settings
      timeout: 300, // 5 minutes
      // Remember customer
      remember_customer: true,
      // Readonly contact
      readonly: {
        email: false,
        contact: false,
        name: false
      }
    };

    console.log('Initiating Razorpay payment with options:', options);

    const rzp = new window.Razorpay(options);

    // Handle payment failure
    rzp.on('payment.failed', function (response) {
      console.log('Payment Failed:', response.error);
      onError && onError(new Error(`Payment failed: ${response.error.description}`));
    });

    // Open the payment modal
    rzp.open();

  } catch (error) {
    console.error('Payment initiation error:', error);
    onError && onError(error);
  }
};

const verifyPayment = async (paymentResponse) => {
  try {
    const response = await fetch('http://localhost:5000/api/payment/verify', {
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
    name = 'Your Company',
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
