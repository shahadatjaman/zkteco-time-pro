'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertCircle, FiHelpCircle } from 'react-icons/fi';
const init = {
  firstname: '',
  lastname: '',
  gender: '',
  role: '',
  blood: '',
  religion: '',
  dep: '',
  phone: '',
  card: '',
};
const departments = ['HR', 'Engineering', 'Support', 'Marketing', 'Finance'];

const CreateUserModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(init);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isDark = true;

  const validateField = (name, value) => {
    switch (name) {
      case 'firstname':
        break;
      case 'phone':
        if (!/^\+?\d{7,15}$/.test(value)) {
          return 'Please enter a valid phone number';
        }
        break;
      case 'card':
        if (card && !/^\d{4,16}$/.test(value)) {
          return 'Card number must be 4–16 digits';
        }
        break;
      case 'religion':
        if (!value) {
          return 'This field is required';
        }
        break;
      case 'role':
        if (!value) {
          return 'This field is required';
        }
        break;
      case 'dep':
        if (!value) {
          return 'This field is required';
        }
        break;
      case 'gender':
        if (!value) {
          return 'This field is required';
        }
        break;
      default:
        break;
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
            className={`w-full max-w-lg p-6 rounded-2xl shadow-xl backdrop-blur-lg border ${
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
                className="p-2 rounded-full transition-colors cursor-pointer"
              >
                <FiX className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-indigo-600'}`} />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    First name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    onBlur={() => handleBlur('firstname')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstname && touched.firstname && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      <FiAlertCircle className="mr-1" /> {errors.firstname}
                    </motion.p>
                  )}
                </div>
                {/* Last name */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    Last name
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
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gender */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    onBlur={() => handleBlur('gender')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && touched.gender && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      <FiAlertCircle className="mr-1" /> {errors.gender}
                    </motion.p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    User Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  >
                    <option value="User">Select Role (User)</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="User">User</option>
                    <option value="Guest">Guest</option>
                  </select>
                </div>

                {/* Blood Group */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    Blood Group
                  </label>
                  <input
                    type="text"
                    name="blood"
                    value={formData.blood}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                    placeholder="A+, O-, etc."
                  />
                </div>

                {/* Religion */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    Religion
                  </label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  >
                    <option value="">Select Religion</option>
                    <option value="Islam">Islam</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Hinduism">Hinduism</option>
                    <option value="Buddhism">Buddhism</option>
                    <option value="Judaism">Judaism</option>
                    <option value="Atheist">Atheist</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Dept */}
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <select
                    name="dep"
                    value={formData.dep}
                    onChange={handleChange}
                    onBlur={() => handleBlur('dep')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dep => (
                      <option key={dep} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>
                  {errors.dep && (
                    <motion.p className="mt-1 text-sm text-red-500 flex items-center">
                      <FiAlertCircle className="mr-1" /> {errors.dep}
                    </motion.p>
                  )}
                </div>
                {/* Card Number */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    Card Number
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
                    type="text"
                    name="card"
                    value={formData.card}
                    onChange={handleChange}
                    onBlur={() => handleBlur('card')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                    placeholder="12345"
                  />
                  {errors.card && touched.card && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      <FiAlertCircle className="mr-1" /> {errors.card}
                    </motion.p>
                  )}
                </div>
              </div>
              {/* Phone Number */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-indigo-900'
                  }`}
                >
                  Phone Number
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
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                      : 'bg-white border-indigo-200 focus:ring-indigo-500'
                  }`}
                  placeholder="+1234567890"
                />
              </div>
              {/* Add User Button */}
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
                {'Add User'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateUserModal;
