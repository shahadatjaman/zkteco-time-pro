'use client';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { Department } from '@/app/components/dep/items/InfiniteTable';

import { useUpdateScheduleMutation } from '@/store/services/scheduleApi';
import { updateSchedule } from '@/store/slices/scheduleSlice';
import { useGetDepartmentsQuery } from '@/store/services/deptApi';

type Schedule = {
  dept: string;
  shiftName: string;
  startAt: string;
  endAt: string;
  days: string[];
};

type FormData = {
  dept: Department;
  shiftName: string;
  startAt: string;
  endAt: string;
  days: string[];
};

type Errors = Partial<Record<keyof FormData, string>>;
type Touched = Partial<Record<keyof FormData, boolean>>;

interface IShift {
  _id: string;
  dept: Department;
  shiftName: string;
  startAt: string;
  endAt: string;
  days: string[];
}

interface UpdateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: IShift | null;
}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const UpdateScheduleModal: React.FC<UpdateScheduleModalProps> = ({ isOpen, onClose, schedule }) => {
  const [formData, setFormData] = useState<Schedule>({
    dept: '',
    shiftName: '',
    startAt: '',
    endAt: '',
    days: [],
  });

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const isDark = true;
  const dispatch = useDispatch<AppDispatch>();

  const [updateScheduleApi, { isLoading }] = useUpdateScheduleMutation();

  const {
    data,
    isLoading: isLoadingDept,
    refetch,
    isSuccess: isSuccessDept,
  } = useGetDepartmentsQuery();

  useEffect(() => {
    if (isOpen) refetch();
  }, [isOpen, refetch]);

  useEffect(() => {
    if (schedule) {
      setFormData({
        dept: schedule.dept._id,
        shiftName: schedule.shiftName || '',
        startAt: schedule.startAt || '',
        endAt: schedule.endAt || '',
        days: schedule.days || [],
      });
    }
  }, [schedule]);

  const validateField = (name: keyof FormData, value: string | string[]): string => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return 'This field is required';
    }
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response: any = await updateScheduleApi({
        id: schedule?._id,
        body: formData,
      }).unwrap();

      console.log('response at 117', response);
      if (response?.status === 200) {
        dispatch(updateSchedule(response.data));
        onClose();
      }
    } catch (error) {
      // if (error && error.status === 400) {
      //   setErrors(prev => ({ ...prev, endAt: 'endAt must be later than startAt' }));
      // }
      console.error('error', error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => {
      const days = prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day];
      return { ...prev, days };
    });
  };

  const closeHandler = () => {
    setErrors({});
    onClose();
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
          <div className="fixed inset-0 bg-black/50" onClick={closeHandler}></div>
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
              <h2 className="text-2xl font-semibold">Update Schedule</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeHandler}
                className="p-2 rounded-full transition-colors cursor-pointer"
              >
                <FiX className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-indigo-600'}`} />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Department & Shift Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      data.map((dep, index) => (
                        <option key={index} value={dep._id}>
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

                <div>
                  <label className="block text-sm font-medium mb-1">Shift Name</label>
                  <input
                    type="text"
                    name="shiftName"
                    value={formData.shiftName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('shiftName')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                    placeholder="e.g. Morning"
                  />
                  {errors.shiftName && (
                    <motion.p className="mt-1 text-sm text-red-500 flex items-center">
                      <FiAlertCircle className="mr-1" /> {errors.shiftName}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Time Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <input
                    type="time"
                    name="startAt"
                    value={formData.startAt}
                    onChange={handleChange}
                    onBlur={() => handleBlur('startAt')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.startAt && (
                    <motion.p className="mt-1 text-sm text-red-500 flex items-center">
                      <FiAlertCircle className="mr-1" /> {errors.startAt}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <input
                    type="time"
                    name="endAt"
                    value={formData.endAt}
                    onChange={handleChange}
                    onBlur={() => handleBlur('endAt')}
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-500'
                        : 'bg-white border-indigo-200 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.endAt && (
                    <motion.p className="mt-1 text-sm text-red-500 flex items-center">
                      <FiAlertCircle className="mr-1" /> {errors.endAt}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Days of Week */}
              <div>
                <label className="block text-sm font-medium mb-2">Days</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {weekDays.map(day => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.days.includes(day)}
                        onChange={() => handleDayToggle(day)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
                {errors.days && (
                  <motion.p className="mt-1 text-sm text-red-500 flex items-center">
                    <FiAlertCircle className="mr-1" /> {errors.days}
                  </motion.p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-3 px-6 rounded-xl transition-all duration-200 font-medium ${
                  isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-[#1976d2] text-white hover:bg-[#2b68a5]'
                } flex justify-center items-center`}
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Schedule'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateScheduleModal;
