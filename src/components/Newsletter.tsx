import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';

interface NewsletterProps {
  className?: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({ className: _className }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Implement actual newsletter subscription API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      setIsSubscribed(true);
      setEmail('');
    } catch (_err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card variant="gradient" className="max-w-md mx-auto text-center">
        <div className="space-y-4">
          <div className="text-4xl">✅</div>
          <h3 className="text-xl font-bold text-white">You're All Set!</h3>
          <p className="text-gray-300">
            Thank you for subscribing! You&apos;ll be the first to know about new episodes and exclusive content.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" className="max-w-md mx-auto">
      <h3 className="text-xl font-bold text-white mb-4 text-center">Stay Connected</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-400 focus:outline-none transition-colors placeholder-gray-500"
            required
          />
          {error && (
            <p className="text-red-400 text-sm mt-1">{error}</p>
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          className="w-full bg-gradient-to-r from-red-500 to-green-400 hover:from-red-600 hover:to-green-500"
          isLoading={isLoading}
        >
          Subscribe for Updates
        </Button>
        <p className="text-xs text-gray-500 text-center">
          No spam, just heartfelt updates about new episodes and special content.
        </p>
      </form>
    </Card>
  );
};
