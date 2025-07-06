'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { useTokenValidatorMutation } from '../../../store/services/authApi';
import ResetPassword from './ResetForm';

const PasswordResetVerification: React.FC = () => {
  const searchParams = useSearchParams();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');

  const router = useRouter();

  const [tokenValidator, { isSuccess, isLoading }] = useTokenValidatorMutation();

  const tokenHandler = async (data: string) => {
    try {
      const response = await tokenValidator({ token: data });

      if ('data' in response && response.data?.statusCode === 200) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      setIsValid(false);
    }
  };

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
      tokenHandler(tokenParam);
    }
  }, [searchParams]);

  const handleReturnToLogin = () => {
    router.push('/login');
  };

  const handleRequestNewReset = () => {
    router.push('/forgot-password');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <FaSpinner
            className="animate-spin text-blue-600 text-4xl mx-auto mb-4"
            aria-hidden="true"
          />
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Verifying your request...</h1>
          <p className="text-gray-600">Please wait while we validate your reset token</p>
        </div>
      </div>
    );
  }

  if (!isValid && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <FaExclamationTriangle
            className="text-red-500 text-4xl mx-auto mb-4"
            aria-hidden="true"
          />
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Invalid or expired token</h1>
          <p className="text-gray-600 mb-6">
            The password reset link you clicked is no longer valid. Please request a new password
            reset link.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleRequestNewReset}
              className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              aria-label="Request new password reset"
            >
              Request New Password Reset
            </button>
            <button
              onClick={handleReturnToLogin}
              className="w-full bg-gray-200 text-gray-800 rounded-md py-2 px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              aria-label="Return to login page"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return isValid && !isLoading && isSuccess && <ResetPassword />;
};

export default PasswordResetVerification;
