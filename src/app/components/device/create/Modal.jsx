'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertCircle, FiHelpCircle } from 'react-icons/fi';

const init = {
  deviceName: '',
  deviceIp: '',
  devicePort: '',
};

const CreateUserModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(init);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isDark = true;

  const validateIP = ip => {
    const pattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return pattern.test(ip);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.deviceName || formData.deviceName.length < 3 || formData.deviceName.length > 50) {
      newErrors.deviceName = 'Device name must be between 3 and 50 characters';
    }
    if (!formData.deviceIp || !validateIP(formData.deviceIp)) {
      newErrors.deviceIp = 'Please enter a valid IP address';
    }
    if (!formData.devicePort || formData.devicePort < 1 || formData.devicePort > 65535) {
      newErrors.devicePort = 'Port must be between 1 and 65535';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateForm()) {
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
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[9999999999] flex items-center justify-center p-4 bg-black/10 bg-opacity-70 backdrop-blur-sm`}
        >
          <div className="fixed inset-0 bg-black/50" onClick={() => onClose()}></div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-md p-6 rounded-2xl shadow-xl backdrop-blur-lg border ${
              isDark
                ? 'bg-gray-900 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-200'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Add New User</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full transition-colors"
              >
                <FiX className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-indigo-600'}`} />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Device Name */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-indigo-900'
                  }`}
                >
                  Device Name
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="inline-block ml-2 cursor-help"
                  >
                    <FiHelpCircle
                      className={`inline ${isDark ? 'text-gray-400' : 'text-indigo-400'}`}
                    />
                  </motion.span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="deviceName"
                  value={formData.deviceName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('deviceName')}
                  className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                      : 'bg-white border-indigo-200 focus:ring-indigo-500'
                  }`}
                  placeholder="Enter device name"
                />
                {errors.deviceName && touched.deviceName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500 flex items-center"
                  >
                    <FiAlertCircle className="mr-1" /> {errors.deviceName}
                  </motion.p>
                )}
              </div>

              {/* Device IP Address */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-indigo-900'
                  }`}
                >
                  Device IP Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="deviceIp"
                  value={formData.deviceIp}
                  onChange={handleChange}
                  onBlur={() => handleBlur('deviceIp')}
                  className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                      : 'bg-white border-indigo-200 focus:ring-indigo-500'
                  }`}
                  placeholder="e.g., 192.168.1.1"
                />
                {errors.deviceIp && touched.deviceIp && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500 flex items-center"
                  >
                    <FiAlertCircle className="mr-1" /> {errors.deviceIp}
                  </motion.p>
                )}
              </div>

              {/* Device Port */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-indigo-900'
                  }`}
                >
                  Device Port
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="number"
                  name="devicePort"
                  value={formData.devicePort}
                  onChange={handleChange}
                  onBlur={() => handleBlur('devicePort')}
                  className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                      : 'bg-white border-indigo-200 focus:ring-indigo-500'
                  }`}
                  placeholder="Enter port number"
                  min="1"
                  max="65535"
                />
                {errors.devicePort && touched.devicePort && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500 flex items-center"
                  >
                    <FiAlertCircle className="mr-1" /> {errors.devicePort}
                  </motion.p>
                )}
              </div>

              {/* Add Device Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-3 px-6 rounded-xl transition-all duration-200 font-medium ${
                  isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-[#1976d2] text-white hover:bg-[#2b68a5]'
                } flex justify-center items-center`}
                // disabled={isLoading}
              >
                {'Add Device'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateUserModal;
