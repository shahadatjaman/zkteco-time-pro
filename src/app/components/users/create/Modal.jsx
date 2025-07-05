'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertCircle, FiHelpCircle } from 'react-icons/fi';
import { useCreateUserMutation } from '@/store/services/userApi';
import { useDispatch } from 'react-redux';
import { addUser } from '@/store/slices/userSlice';
import { useGetDepartmentsQuery } from '@/store/services/deptApi';
const init = {
  firstname: '',
  lastname: '',
  gender: '',
  // role: '',
  blood: '',
  religion: '',
  dept: '',
  phone: '',
  card: '',
};
const departments = ['HR', 'Engineering', 'Support', 'Marketing', 'Finance'];

const CreateUserModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(init);
  const [uploadedPhoto, setUploadedPhoto] = useState('');

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);

  const [createUser, { isLoading, isSuccess }] = useCreateUserMutation();

  const {
    data,
    isLoading: isLoadingDept,
    isError,
    isFetching,
    refetch,
    isSuccess: isSuccessDept,
  } = useGetDepartmentsQuery();

  const isDark = true;

  const validateField = (name, value) => {
    switch (name) {
      case 'firstname':
        if (!value) {
          return 'This field is required';
        }
        break;

      case 'card':
        if (value && !/^\d{4,16}$/.test(value)) {
          return 'Card number must be 4–16 digits';
        }
        break;
      case 'dept':
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

  const resetForm = () => {
    // Reset form
    setFormData(init);
    setUploadedPhoto('');
    setPhoto('');
    setTouched({});
    setErrors({});
  };

  useEffect(() => {
    refetch();
  }, [isOpen]);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('!validateForm()', !validateForm());
    if (!validateForm()) return;

    const finalPhoto = uploadedPhoto || photo;

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (finalPhoto) {
      const blob = await (await fetch(finalPhoto)).blob();
      form.append('file', blob, 'user-photo.png');
    }

    try {
      const res = await createUser(form).unwrap();
      // alert('User created successfully');

      if (res.status === 200) {
        dispatch(addUser(res.data));
        onClose();
        resetForm();
      }
    } catch (error) {
      console.error('User creation failed:', error);
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

  const startCamera = async () => {
    setIsCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/png');
    setPhoto(imageData);
    video.srcObject?.getTracks().forEach(track => track.stop());
    setIsCapturing(false);
  };

  const handleFileUpload = e => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result);
        setPhoto(''); // clear captured photo if any
      };
      reader.readAsDataURL(file);
    }
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
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => {
              resetForm();
              onClose();
            }}
          ></div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {errors.firstname && (
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
                  {errors.gender && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      <FiAlertCircle className="mr-1" /> {errors.gender}
                    </motion.p>
                  )}
                </div>

                {/* Blood Group */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-indigo-900'
                    }`}
                  >
                    Blood Group
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
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="inline-block ml-2 cursor-help"
                    >
                      <FiHelpCircle
                        className={`inline ${isDark ? 'text-gray-400' : 'text-indigo-400'}`}
                      />
                    </motion.span>
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
                    name="dept"
                    value={formData.dept}
                    onChange={handleChange}
                    onBlur={() => handleBlur('dept')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  >
                    <option value="">Select Department</option>
                    {isSuccessDept &&
                      data?.map(dep => (
                        <option key={dep._id} value={dep._id}>
                          {dep.deptName}
                        </option>
                      ))}
                  </select>
                  {errors.dept && (
                    <motion.p className="mt-1 text-sm text-red-500 flex items-center">
                      <FiAlertCircle className="mr-1" /> {errors.dept}
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
              </div>
              {/* 
              <div className="space-y-4">
                <label
                  className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-indigo-900'
                  }`}
                >
                  Capture User Photo
                </label>

                {photo ? (
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={photo}
                      alt="Captured"
                      className="w-40 h-40 object-cover rounded-xl border"
                    />
                    <button
                      type="button"
                      onClick={startCamera}
                      className="text-sm text-blue-500 underline"
                    >
                      Retake Photo
                    </button>
                  </div>
                ) : isCapturing ? (
                  <div className="space-y-2">
                    <video ref={videoRef} autoPlay className="w-full rounded-xl border" />
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={takePhoto}
                        className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
                      >
                        Capture
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          videoRef.current?.srcObject?.getTracks().forEach(t => t.stop());
                          setIsCapturing(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-gray-600 text-white hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startCamera}
                    disabled={true}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Start Camera
                  </button>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div> */}

              <div className="space-y-2">
                <label
                  className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-indigo-900'
                  }`}
                >
                  Upload Photo
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
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
      file:rounded-xl file:border-0 file:text-sm file:font-semibold
      file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {uploadedPhoto && (
                  <div className="mt-2">
                    <img
                      src={uploadedPhoto}
                      alt="Uploaded Preview"
                      className="w-20 h-20 object-cover rounded-xl border"
                    />
                  </div>
                )}
              </div>

              {/* Add User Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-xl transition-all duration-200 font-medium flex justify-center items-center ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-[#1976d2] text-white hover:bg-[#2b68a5]'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
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
                    <span>Submitting...</span>
                  </span>
                ) : (
                  'Add User'
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateUserModal;
