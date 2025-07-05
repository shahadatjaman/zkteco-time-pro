'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useChangePasswordMutation } from '../../../store/services/authApi';
import { useRouter } from 'next/navigation';

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface ShowPassword {
  new: boolean;
  confirm: boolean;
}

interface Errors {
  newPassword?: string;
  confirmPassword?: string;
}

interface PasswordCriteria {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

const ResetPassword = () => {
  const [formData, setFormData] = useState<FormData>({
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState<ShowPassword>({
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [strength, setStrength] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(5);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const validatePassword = (password: string): PasswordCriteria => {
    const criteria: PasswordCriteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };

    const strengthScore = Object.values(criteria).filter(Boolean).length;
    setStrength(strengthScore);
    return criteria;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'newPassword') {
      validatePassword(value);
    }

    validateField(name as keyof FormData, value);
  };

  const validateField = (name: keyof FormData, value: string) => {
    const newErrors: Errors = { ...errors };

    if (name === 'newPassword') {
      const criteria = validatePassword(value);
      if (!criteria.length) newErrors.newPassword = 'Password must be at least 8 characters';
      else if (!criteria.uppercase)
        newErrors.newPassword = 'Password must contain an uppercase letter';
      else if (!criteria.lowercase)
        newErrors.newPassword = 'Password must contain a lowercase letter';
      else if (!criteria.number) newErrors.newPassword = 'Password must contain a number';
      else if (!criteria.special)
        newErrors.newPassword = 'Password must contain a special character';
      else delete newErrors.newPassword;
    }

    if (name === 'confirmPassword') {
      if (value !== formData.newPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await changePassword({
        newPassword: formData.newPassword,
      });

      if (response && response.data?.status === 200) {
        router.push('/');
      }
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (countdown === 0) {
      console.log('Redirecting to login...');
    }
  }, [isSuccess, countdown]);

  const getStrengthColor = (): string => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">Please create a new secure password</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  name="newPassword"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword.new ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>
              )}

              {/* Strength Meter */}
              <div className="mt-2">
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword.confirm ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || isLoading || strength < 5}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                Object.keys(errors).length > 0 || strength < 5
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Reset Password'
              )}
            </button>
          </div>
        </form>

        {isSuccess && (
          <div className="text-center text-sm text-gray-600">
            Redirecting to login in {countdown} seconds...
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ResetPassword;
