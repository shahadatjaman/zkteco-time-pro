'use client';

import { useState, FC } from 'react';
import { FaTimes, FaPen, FaMoon, FaSun, FaMale, FaFemale } from 'react-icons/fa';
import { IoSchool } from 'react-icons/io5';
import { MdAccessTime } from 'react-icons/md';
import { BsCalendarDate } from 'react-icons/bs';
import { Wrapper } from './styles';
import { motion, AnimatePresence } from 'framer-motion';

import { useDispatch } from 'react-redux';
import { FiX } from 'react-icons/fi';
import { UserEntryType } from '../mobile/types';
import UserDetails from './UserDetailsModal';

// import { convertTo12HourFormat } from '@/utils/date/convertTo12HourFormat';
// import { convertDateFormat } from '@/utils';

interface IStudentAttendanceModal {
  user: UserEntryType;
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: FC<IStudentAttendanceModal> = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();
  const isDark = true;

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
              <h2 className="text-2xl font-semibold">Profile</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full transition-colors cursor-pointer"
              >
                <FiX className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-indigo-600'}`} />
              </motion.button>
            </div>
            <UserDetails userData={user} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;
