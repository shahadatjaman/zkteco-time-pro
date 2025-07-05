'use client';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import { useUpdateDepartmentMutation } from '@/store/services/deptApi';
import { getNonEmptyValues } from '@/utils/getNonEmptyValues';
import { AppDispatch } from '@/store/store';
import { updateADepartment } from '@/store/slices/deptSlice';
import { Department } from '../items/InfiniteTable';
import { getUpdatedValues } from '@/utils/getUpdatedValues';

interface UpdateDeptModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: Department;
}

const UpdateDeptModal: React.FC<UpdateDeptModalProps> = ({ isOpen, onClose, department }) => {
  const [formData, setFormData] = useState<any>({
    _id: '',
    deptName: '',
    description: '',
    employees: [],
    manager: '',
    status: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const dispatch = useDispatch<AppDispatch>();
  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation();
  const isDark = true;

  useEffect(() => {
    setErrors({});
    setTouched({});
    if (department) {
      setFormData(department);
    }
  }, [department, isOpen]);

  const validateField = (name: string, value: any): string => {
    if (name === 'deptName' && (!value || value.trim() === '')) {
      return 'This field is required';
    }
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Department) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!department?._id) return;

    if (validateForm()) {
      const nonEmptyValues: any = getUpdatedValues(department, formData);

      const response: any = await updateDepartment({ _id: department._id, data: nonEmptyValues });

      if (response && 'data' in response && response.data?.status === 200) {
        dispatch(updateADepartment(response.data.data));
        onClose();
      }

      if (response && response?.error.status === 409) {
        setErrorMessage('Department name already exists');
        setErrors(prev => ({ ...prev, deptName: 'Department name already exists' }));
      }
    }
  };

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
              <h2 className="text-2xl font-semibold">Update Department</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full"
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
                  placeholder="e.g. MNHU"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Department'
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateDeptModal;
