import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertCircle, FiHelpCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useUpdateUserMutation } from '@/store/services/userApi';
import { updateAUser } from '@/store/slices/userSlice';
import { getUpdatedValues } from '@/utils/getUpdatedValues';
import { useGetDepartmentsQuery } from '@/store/services/deptApi';
import { Department } from '../../dep/items/InfiniteTable';

type User = {
  _id: string;
  firstname: string;
  lastname: string;
  gender: string;
  blood: string;
  religion: string;
  dept: string;
  phone: string;
  card: string;
  photoUrl?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  existingUser: any;
};

const init: any = {
  firstname: '',
  lastname: '',
  gender: '',
  blood: '',
  religion: '',
  dept: '',
  phone: '',
  card: '',
};

const UpdateUserModal: React.FC<Props> = ({ isOpen, onClose, existingUser }) => {
  const [formData, setFormData] = useState(init);
  const [uploadedPhoto, setUploadedPhoto] = useState('');
  const [photo, setPhoto] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const isDark = true;

  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    data,
    isLoading: isLoadingDept,
    isError,
    isFetching,
    refetch,
    isSuccess: isSuccessDept,
  } = useGetDepartmentsQuery();

  useEffect(() => {
    refetch();
  }, [isOpen]);

  useEffect(() => {
    if (existingUser) {
      const { _id, photoUrl, ...rest } = existingUser;
      setFormData(rest);
      setUploadedPhoto(photoUrl || '');
    }
  }, [existingUser, isOpen]);

  const validateField = (name: string, value: string): any => {
    switch (name) {
      case 'firstname':
      case 'dept':
      case 'gender':
        if (!value) return 'This field is required';
        break;
      case 'card':
        if (value && !/^[0-9]{4,16}$/.test(value)) return 'Card number must be 4–16 digits';
        break;
    }
    return '';
  };

  const validateForm = (): any => {
    const newErrors: any = {};
    Object.keys(formData).forEach((key: any) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
        setPhoto('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !existingUser) return;

    const finalPhoto = uploadedPhoto || photo;
    const form: any = new FormData();

    const validFormData = getUpdatedValues(existingUser, formData);

    Object.entries(validFormData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (finalPhoto) {
      const blob = await (await fetch(finalPhoto)).blob();
      form.append('file', blob, 'user-photo.png');
    }

    try {
      const res: any = await updateUser({ data: form, _id: existingUser._id }).unwrap();

      if (res.status === 200) {
        dispatch(updateAUser(res.data));
        onClose();
      }
    } catch (error) {
      console.error('User update failed:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm"
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
              <h2 className="text-2xl font-semibold">Update User</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full cursor-pointer"
              >
                <FiX className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-indigo-600'}`} />
              </motion.button>
            </div>

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
                    <motion.p className="mt-1 text-sm text-red-500 flex items-center">
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
                    <motion.p className="mt-1 text-sm text-red-500 flex items-center">
                      <FiAlertCircle className="mr-1" /> {errors.gender}
                    </motion.p>
                  )}
                </div>

                {/* Role */}
                {/* <div>
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
                </div> */}

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
                    {!isLoadingDept &&
                      isSuccessDept &&
                      data.map((dep: Department) => (
                        <option key={dep.deptName} value={dep.deptName}>
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

                {!uploadedPhoto && existingUser.avatar && (
                  <div className="mt-2">
                    <img
                      src={existingUser.avatar}
                      alt="Uploaded Preview"
                      className="w-20 h-20 object-cover rounded-xl border"
                    />
                  </div>
                )}

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

export default UpdateUserModal;
