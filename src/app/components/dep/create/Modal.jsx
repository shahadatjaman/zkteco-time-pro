'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useCreateDepartmentMutation } from '@/store/services/deptApi';
import { getNonEmptyValues } from '@/utils/getNonEmptyValues';
import { addDepartment } from '@/store/slices/deptSlice';

const init = {
  deptName: '',
  description: '',
  manager: '',
};

const CreateDeptModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(init);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const [touched, setTouched] = useState({});
  const isDark = true;
  const dispatch = useDispatch();

  const [createDepartment, { isLoading }] = useCreateDepartmentMutation();

  const validateField = (name, value) => {
    if ((name === 'deptName' || name === 'status') && (!value || value.trim() === '')) {
      return 'This field is required';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = field => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (validateForm()) {
        const nonEmptyValue = getNonEmptyValues(formData);

        const response = await createDepartment(nonEmptyValue);

        if (response && response?.data?.status === 201) {
          dispatch(addDepartment(response.data.data));
          onClose();
          setFormData(init);
        }
        if (response && response?.error.status === 409) {
          setErrorMessage('Department name already exists');
          setErrors(prev => ({ ...prev, deptName: 'Department name already exists' }));
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('errorMessage', errorMessage);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999999999] flex items-center justify-center p-4 bg-black/10 bg-opacity-70 backdrop-blur-sm"
        >
          <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-lg p-6 rounded-2xl shadow-xl backdrop-blur-lg border ${
              isDark
                ? 'bg-gray-900 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Create New Department</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full transition-colors cursor-pointer"
              >
                <FiX className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-indigo-600'}`} />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Dept Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Department Name</label>
                <input
                  type="text"
                  name="deptName"
                  value={formData.deptName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('deptName')}
                  className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                      : 'bg-white border-indigo-200 focus:ring-indigo-500'
                  }`}
                  placeholder="e.g. HR"
                />
                {errors.deptName && (
                  <motion.p className="mt-1 text-sm text-red-500 flex items-center">
                    <FiAlertCircle className="mr-1" /> {errors.deptName}
                  </motion.p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description (optional)</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                      : 'bg-white border-indigo-200 focus:ring-indigo-500'
                  }`}
                  placeholder="e.g. Internal support dept."
                />
              </div>

              {/* Manager */}
              <div>
                <label className="block text-sm font-medium mb-1">Manager ID (optional)</label>
                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                      : 'bg-white border-indigo-200 focus:ring-indigo-500'
                  }`}
                  placeholder="MNHU"
                />
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-xl transition-all duration-200 font-medium ${
                  isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-[#1976d2] text-white hover:bg-[#2b68a5]'
                } flex justify-center items-center gap-2 ${
                  isLoading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  'Create Department'
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateDeptModal;
