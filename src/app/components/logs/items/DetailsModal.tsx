'use client';

import { FC } from 'react';
import { FaTimes, FaMale, FaFemale } from 'react-icons/fa';
import { IoSchool } from 'react-icons/io5';
import { MdAccessTime } from 'react-icons/md';
import { BsCalendarDate } from 'react-icons/bs';
import { motion } from 'framer-motion';

import convertDateFormat, { convertTo12HourFormat } from '@/utils';
import { AttendanceLog } from '@/store/slices/logSlice';
import { FiX } from 'react-icons/fi';
import { Avatar } from '@/shared/avatar';

interface IAttendanceModal {
  log: AttendanceLog;
  onClose: () => void;
}

const AttendanceModal: FC<IAttendanceModal> = props => {
  const { log, onClose } = props;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <IoSchool className="text-blue-500" />
          Attendance Log
        </h2>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full transition-colors cursor-pointer"
          >
            <FiX className={`w-6 h-6  text-gray-300`} />
          </motion.button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {/* <img
              src={log.employee.avatar || ''}
              alt={log.employee.firstname}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
            /> */}

            <Avatar size="lg" src={log.employee.avatar || ''} name={log.employee.firstname} />
            <div>
              <h3 className="text-xl font-semibold">{`${log.employee.firstname} ${log.employee.lastname}`}</h3>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                {log.employee.gender === 'Male' ? (
                  <FaMale className="text-blue-500" />
                ) : (
                  <FaFemale className="text-pink-500" />
                )}
                {log.employee.gender}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Employee ID:</span>
              <span>{log.employee.userId}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Shift:</span>
              <span>{log.shiftId.shiftName}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MdAccessTime className="text-gray-500" />
            <span className="font-semibold">Check-in Time:</span>
            <span>{log.checkInAt ? convertTo12HourFormat(log.checkInAt) : 'Not Available'}</span>
          </div>

          <div className="flex items-center gap-2">
            <MdAccessTime className="text-gray-500" />
            <span className="font-semibold">Check-out Time:</span>
            <span>{log.checkOutAt ? convertTo12HourFormat(log.checkOutAt) : 'Not Available'}</span>
          </div>

          <div className="flex items-center gap-2">
            <BsCalendarDate className="text-gray-500" />
            <span className="font-semibold">Record Date:</span>
            <span>{convertDateFormat(log.logDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                log.status === 'PRESENT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {log.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
