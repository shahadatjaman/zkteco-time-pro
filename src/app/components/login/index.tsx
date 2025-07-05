'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../store/services/authApi';
import { setCredentials } from '../../../store/slices/authSlice';
import { decodeToken } from '../../../utils/decodeToken';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: 'devloperabuhuraira@gmail.com',
    password: 'shahadatjaman',
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string>('');

  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.trim().length > 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const updatedErrors: LoginErrors = { ...errors };

    if (name === 'email') {
      if (!value) {
        updatedErrors.email = 'Email cannot be empty';
      } else if (!validateEmail(value)) {
        updatedErrors.email = 'Invalid email format';
      } else {
        delete updatedErrors.email;
      }
    }

    if (name === 'password') {
      if (!value) {
        updatedErrors.password = 'Password cannot be empty';
      } else if (!validatePassword(value)) {
        updatedErrors.password = 'Password must be valid';
      } else {
        delete updatedErrors.password;
      }
    }

    setErrors(updatedErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalError('');

    try {
      const res = await login(formData).unwrap();

      if (res?.accessToken) {
        const token = res.accessToken.replace(/"/g, '');
        const decoded: any = decodeToken(token);

        localStorage.setItem('accessToken', token);
        dispatch(setCredentials({ user: decoded, accessToken: token }));
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setGlobalError('Invalid credentials. Please try again.');
    }
  };

  const isFormValid = (): boolean => {
    return validateEmail(formData.email) && validatePassword(formData.password) && !isLoading;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>

        {globalError && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm text-center">
            {globalError}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none block text-black w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className={`appearance-none text-black block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isFormValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isLoading ? <BiLoaderAlt className="h-5 w-5 animate-spin" /> : 'Sign in'}
          </button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaGoogle className="h-5 w-5 text-red-500" />
                <span className="ml-2">Google</span>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaGithub className="h-5 w-5 text-gray-900" />
                <span className="ml-2">GitHub</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
