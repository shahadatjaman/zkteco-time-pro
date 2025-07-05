'use client';

import React, { useState, useEffect } from 'react';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const EmailConfirmation: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);

  useEffect(() => {
    setIsVisible(true);

    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResend = (): void => {
    setTimeLeft(60);
    try {
      // Simulated resend logic
      console.log('Email resent');
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div
        className={`max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center animate-bounce-slow">
            <FiMail className="h-12 w-12 text-blue-600" aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Check your email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a password reset link to your email address. Please follow the instructions
            to reset your password.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4" role="alert">
            <p className="text-sm text-red-700">Failed to resend email. Please try again later.</p>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <button
            onClick={() => window.history.back()}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FiArrowLeft
                className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                aria-hidden="true"
              />
            </span>
            Back to Login
          </button>

          <div className="text-center">
            <button
              onClick={handleResend}
              disabled={timeLeft > 0}
              className={`text-sm font-medium ${
                timeLeft > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Resend email {timeLeft > 0 ? `(${timeLeft}s)` : ''}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Need help?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
