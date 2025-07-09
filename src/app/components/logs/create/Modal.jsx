'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertCircle, FiHelpCircle } from 'react-icons/fi';
import { useCreateAttendanceLogMutation } from '@/store/services/attendanceLogApi';
import { useGetDepartmentsQuery } from '@/store/services/deptApi';
import { useGetSchedulesQuery } from '@/store/services/scheduleApi';
import { useDispatch } from 'react-redux';
import { addLog } from '@/store/slices/logSlice';

const init = {
  userId: '',
  logDate: '',
  checkInAt: '',
  checkOutAt: '',
  shiftId: '',
  status: '',
};

const CreateLogModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(init);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState('');

  const isDark = true;

  const [createAttendanceLog, { isLoading }] = useCreateAttendanceLogMutation();

  const {
    data,
    isLoading: isLoadingLog,
    isError,
    isFetching,
    refetch,
    isSuccess: isSuccessDept,
  } = useGetSchedulesQuery();

  const dispatch = useDispatch();

  const validateField = (name, value) => {
    if (
      !value &&
      ['userId', 'status', 'logDate', 'checkInAt', 'checkOutAt', 'shiftId'].includes(name)
    ) {
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

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateForm()) {
      const response = await createAttendanceLog(formData);

      console.log('response', response.data?._id);
      if (response && response.data && response.data?._id) {
        dispatch(addLog(response.data));
        onClose();
      } else {
        if (response?.data && response.data.status === 409) {
          setMessage(response.data.message);
          setErrors(prev => ({ ...prev, logDate: response.data.message }));
        }
      }
    }
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

  console.log('message', message);

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
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Add New Log</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full transition-colors cursor-pointer"
              >
                <FiX className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-indigo-600'}`} />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* User ID */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    User ID
                  </label>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    onBlur={() => handleBlur('userId')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                    placeholder="User ID"
                  />
                  {errors.userId && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <FiAlertCircle className="mr-1" /> {errors.userId}
                    </motion.p>
                  )}
                </div>

                {/* Dept */}
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <select
                    name="shiftId"
                    value={formData.shiftId}
                    onChange={handleChange}
                    onBlur={() => handleBlur('shiftId')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  >
                    <option value="">Select Department</option>
                    {isSuccessDept && data?.status === 200
                      ? data.data?.map(shift => (
                          <option key={shift._id} value={shift._id}>
                            {shift.shiftName}
                          </option>
                        ))
                      : 'Shift not found'}
                  </select>
                  {errors.shiftId && (
                    <motion.p className="mt-1 text-sm text-red-500 flex items-center">
                      <FiAlertCircle className="mr-1" /> {errors.shiftId}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Check-in Time */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    Check-In Time
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="inline-block ml-2 cursor-help"
                    >
                      <FiHelpCircle
                        className={`inline ${isDark ? 'text-gray-400' : 'text-indigo-400'}`}
                      />
                    </motion.span>
                  </label>
                  <input
                    type="time"
                    name="checkInAt"
                    value={formData.checkInAt}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  />

                  {errors.checkInAt && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <FiAlertCircle className="mr-1" /> {errors.checkInAt}
                    </motion.p>
                  )}
                </div>

                {/* Check-out Time */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    Check-Out Time
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="inline-block ml-2 cursor-help"
                    >
                      <FiHelpCircle
                        className={`inline ${isDark ? 'text-gray-400' : 'text-indigo-400'}`}
                      />
                    </motion.span>
                  </label>
                  <input
                    type="time"
                    name="checkOutAt"
                    value={formData.checkOutAt}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.checkOutAt && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <FiAlertCircle className="mr-1" /> {errors.checkOutAt}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    onBlur={() => handleBlur('status')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  >
                    <option value="">Select Status</option>
                    <option value="PRESENT">PRESENT</option>
                    <option value="ABSENT">ABSENT</option>
                    <option value="LATE">LATE</option>
                    <option value="ON_LEAVE">ON LEAVE</option>
                  </select>

                  {errors.status && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <FiAlertCircle className="mr-1" /> {errors.status}
                    </motion.p>
                  )}
                </div>

                {/* Log Date */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    Log Date
                  </label>
                  <input
                    type="date"
                    name="logDate"
                    value={formData.logDate}
                    onChange={handleChange}
                    onBlur={() => handleBlur('logDate')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.logDate && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <FiAlertCircle className="mr-1" /> {errors.logDate}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={!isLoadingLog ? { scale: 1.02 } : {}}
                whileTap={!isLoadingLog ? { scale: 0.98 } : {}}
                type="submit"
                disabled={isLoadingLog}
                className={`w-full py-3 px-6 rounded-xl transition-all duration-200 font-medium ${
                  isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-[#1976d2] text-white hover:bg-[#2b68a5]'
                } flex justify-center items-center ${
                  isLoadingLog ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoadingLog ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
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
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                      ></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  'Add Log Entry'
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateLogModal;
