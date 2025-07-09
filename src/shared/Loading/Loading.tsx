import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingPage = ({
  logo = '',
  message = 'Loading...',
  theme = 'dark', // "light" | "dark"
  variant = 'fullscreen', // "fullscreen" | "overlay" | "inline"
  additionalClasses = '',
  isAuthLoading = false,
}) => {
  const logoUrl = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9';

  const getVariantClasses = () => {
    switch (variant) {
      case 'inline':
        return 'h-full w-full min-h-[200px]';
      case 'overlay':
        return 'fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm';
      default:
        return 'h-screen w-full';
    }
  };

  const isDark = theme === 'dark';

  const containerClasses = `
    flex flex-col items-center justify-center ${!isAuthLoading ? 'mt-[-74px]' : ''}
    ${getVariantClasses()}
    ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}
    ${additionalClasses}
  `;

  return (
    <div className={containerClasses} role="status" aria-label="Loading content">
      <div className="flex flex-col items-center space-y-6">
        {logo ? (
          <img
            src={logo}
            alt="Brand Logo"
            className="h-16 w-auto"
            onError={(e: any) => {
              e.target.src = logoUrl;
              e.target.onerror = null;
            }}
          />
        ) : null}

        {/* <div className="relative">
          <FaSpinner
            className={`animate-spin h-12 w-12 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
            aria-hidden="true"
          />
        </div> */}

        <div className="flex flex-col items-center space-y-2">
          <p
            className={`text-lg font-medium tracking-wide ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            {message}
          </p>

          <div className="flex space-x-2">
            {[0, 75, 150].map((delay, idx) => (
              <div
                key={idx}
                className={`h-2 w-2 rounded-full ${
                  isDark ? 'bg-blue-400' : 'bg-blue-600'
                } animate-pulse`}
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {[1, 2, 3].map(item => (
            <div
              key={item}
              className={`h-4 w-24 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
