'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { FiX } from 'react-icons/fi';
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { useRequestPasswordResetMutation } from '../../../store/services/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const router = useRouter();
  const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    setIsValid(validateEmail(value));
    setIsTouched(true);
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    setError('');

    try {
      const response = await requestPasswordReset({ email });

      if (response && response.data?.status === 200) {
        router.push('/email-confirmation');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const clearInput = () => {
    setEmail('');
    setIsValid(false);
    setIsTouched(false);
    setError('');
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-[500px] w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
          <p className="mt-2 text-gray-600">No worries, we'll send you reset instructions.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={`block w-full px-4 py-3 rounded-lg text-gray-900 border ${
                  isTouched && !isValid
                    ? 'border-red-500'
                    : isValid
                    ? 'border-green-500'
                    : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors peer pl-10`}
                placeholder=" "
                autoFocus
                aria-label="Email address"
              />
              <label
                htmlFor="email"
                className="absolute left-10 text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-sm -top-6 text-sm peer-focus:-left-0"
              >
                Email address
              </label>
              <HiOutlineMail className="absolute left-3 top-4 text-gray-400 text-xl" />
              {email && (
                <button
                  type="button"
                  onClick={clearInput}
                  className="absolute right-3 top-4 text-gray-400 hover:text-gray-600"
                  aria-label="Clear email input"
                >
                  <FiX className="text-xl" />
                </button>
              )}
            </div>

            {isTouched && !isValid && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <BiErrorCircle className="mr-1" />
                Please enter a valid email address
              </div>
            )}

            {error && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <BiErrorCircle className="mr-1" />
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${
              isValid && !isLoading
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-xl" />
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="text-center">
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            aria-label="Back to login page"
          >
            Back to Login
          </Link>
        </div>

        {success && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-down">
            <BiCheckCircle className="text-xl" />
            <span>Reset link sent to your email</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
