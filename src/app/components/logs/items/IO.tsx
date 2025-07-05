'use client';

import React, { useState, useEffect, useCallback, MouseEvent } from 'react';
import { FaTimes, FaClock, FaUser, FaBuilding } from 'react-icons/fa';
import { format } from 'date-fns';
import { AttendanceLog } from '@/store/slices/logSlice';
import Image from 'next/image';
import AttendanceModal from './DetailsModal';

interface AttendanceLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeData: AttendanceLog;
}

const AttendanceLogModal: React.FC<AttendanceLogModalProps> = ({
  isOpen,
  onClose,
  employeeData,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(isOpen);
    // if (isOpen) {
    //   document.body.style.overflow = 'hidden';
    // }
    // return () => {
    //   document.body.style.overflow = 'unset';
    // };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const roleColors: Record<string, string> = {
    'Senior Developer': 'bg-blue-100 text-blue-800',
    'Team Lead': 'bg-purple-100 text-purple-800',
    'Scrum Master': 'bg-green-100 text-green-800',
  };

  if (!isOpen) return null;

  if (!employeeData) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full max-w-4xl p-6  bg-gray-900 text-white border-gray-700 rounded-lg shadow-xl transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } mx-4 max-h-[90vh] overflow-y-auto`}
      >
        <AttendanceModal log={employeeData} onClose={onClose} />
      </div>
    </div>
  );
};

export default AttendanceLogModal;

// <div className="p-6">
//   <div className="flex flex-col items-center mb-8">
//     <div className="relative w-24 h-24 mb-4">
//       <img
//         src={employeeData.employee.avatar || ''}
//         alt={employeeData.employee.firstname}
//         className="rounded-full w-full h-full object-cover"
//         loading="lazy"
//       />
//     </div>
//     <h2 className="text-2xl font-bold text-gray-900">{employeeData.employee.firstname}</h2>
//     <div className="mt-2 px-4 py-2 bg-gray-100 rounded-lg font-mono text-gray-700">
//       {employeeData.userId}
//     </div>
//   </div>

//   <div className="grid md:grid-cols-2 gap-6">
//     <div className="space-y-6">
//       <div>
//         <label className="text-sm text-gray-500">Department</label>
//         <div className="flex items-center mt-1">
//           <FaBuilding className="mr-2 text-gray-400" />
//           {/* <span className="font-semibold text-gray-900">{data.employee.dept}</span> */}
//         </div>
//       </div>

//       <div>
//         <label className="text-sm text-gray-500">Roles</label>
//         <div className="flex flex-wrap gap-2 mt-1">
//           <span
//             className={`px-3 py-1 rounded-full text-sm
//               'bg-gray-100 text-gray-800'}`}
//           >
//             {employeeData.employee.roles}
//           </span>
//         </div>
//       </div>

//       <div>
//         <label className="text-sm text-gray-500">Status</label>
//         <div className="mt-1">
//           <span className="px-4 py-2 rounded-full text-sm font-semibold bg-orange-100 text-orange-800">
//             {employeeData.status}
//           </span>
//         </div>
//       </div>
//     </div>

//     <div className="space-y-6">
//       <div>
//         <label className="text-sm text-gray-500">Check-in/Check-out</label>
//         <div className="space-y-2 mt-1">
//           <div className="flex items-center">
//             <FaClock className="mr-2 text-green-500" />
//             <span className="font-semibold text-gray-900">
//               {/* In: {format(new Date(employeeData.checkInAt), 'hh:mm a')} */}
//             </span>
//           </div>
//           <div className="flex items-center">
//             <FaClock className="mr-2 text-red-500" />
//             <span className="font-semibold text-gray-900">
//               {/* Out: {format(new Date(employeeData.checkOutAt || ''), 'hh:mm a')} */}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div>
//         <label className="text-sm text-gray-500">Location</label>
//         {/* <div className="mt-1 font-semibold text-gray-900">{data.location}</div> */}
//       </div>

//       <div>
//         <label className="text-sm text-gray-500">Shift</label>
//         {/* <div className="mt-1 font-semibold text-gray-900">{data.shift}</div> */}
//       </div>

//       <div>
//         <label className="text-sm text-gray-500">Supervisor</label>
//         <div className="flex items-center mt-1">
//           <FaUser className="mr-2 text-gray-400" />
//           {/* <span className="font-semibold text-gray-900">{data.supervisor}</span> */}
//         </div>
//       </div>

//     </div>
//   </div>
// </div>
