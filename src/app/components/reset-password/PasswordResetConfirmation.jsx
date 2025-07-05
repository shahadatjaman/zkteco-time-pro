import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdHelpCircle } from 'react-icons/io';

const PasswordResetConfirmation = () => {
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;
    if (isRedirecting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      try {
        // Redirect logic here
        window.location.href = '/login';
      } catch (err) {
        setError('Redirect failed. Please click the button below.');
      }
    }
    return () => clearInterval(timer);
  }, [countdown, isRedirecting]);

  const handleCancelRedirect = () => {
    setIsRedirecting(false);
  };

  const handleManualRedirect = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 transform transition-all duration-500 animate-scaleIn">
        <div className="flex flex-col items-center">
          <img
            src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
            alt="Company Logo"
            className="h-12 mb-6 object-contain"
          />
          <div className="text-green-500 animate-success mb-6">
            <FaCheckCircle className="w-20 h-20 md:w-24 md:h-24" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
            Your password has been successfully reset
          </h1>
          <p className="text-gray-600 text-center mb-8">
            You can now use your new password to access your account
          </p>

          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

          {isRedirecting && (
            <div className="text-sm text-gray-500 mb-4">
              Redirecting in {countdown} seconds...
              <button
                onClick={handleCancelRedirect}
                className="ml-2 text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Cancel
              </button>
            </div>
          )}

          <button
            onClick={handleManualRedirect}
            className="w-full md:w-auto px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-transform duration-200 hover:scale-105"
          >
            Return to Login
          </button>

          <div className="mt-8 flex items-center justify-center text-sm">
            <IoMdHelpCircle className="text-gray-400 mr-2" />
            <a
              href="/support"
              className="text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Get help with password reset"
            >
              Need Help?
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
          }
          to {
            transform: scale(1);
          }
        }
        @keyframes success {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
        .animate-success {
          animation: success 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PasswordResetConfirmation;
