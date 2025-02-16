import { useState } from 'react';

interface CheckoutData {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  companyWebsite?: string;
  email?: string;
  phone?: string;
  description?: string;
  priceId: string;
}

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async (data: CheckoutData) => {
    try {
      console.log('Starting checkout with data:', data);
      setIsLoading(true);
      setError(null);

      // Add default values for required fields
      const checkoutData = {
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        companyName: data.companyName || '',
        companyWebsite: data.companyWebsite || '',
        email: data.email || '',
        phone: data.phone || '',
        description: data.description || '',
        priceId: data.priceId,
      };

      console.log('Sending request with data:', checkoutData);

      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      const result = await response.json();
      console.log('Received response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to start checkout');
      }

      console.log('Redirecting to:', result.url);
      // Redirect to Stripe Checkout
      window.location.href = result.url;
    } catch (err) {
      console.error('Detailed checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    startCheckout,
    isLoading,
    error,
  };
}; 