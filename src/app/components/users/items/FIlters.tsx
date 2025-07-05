'use client';

import React from 'react';
import { FaFileExport } from 'react-icons/fa';

interface FiltersProps {
  isDark: boolean;
}

const Filters: React.FC<FiltersProps> = ({ isDark }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <select
        className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
          isDark
            ? 'bg-gray-800 border-gray-600 text-white focus:ring-blue-400'
            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
        }`}
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select
        className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
          isDark
            ? 'bg-gray-800 border-gray-600 text-white focus:ring-blue-400'
            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
        }`}
      >
        <option value="">All Roles</option>
        <option value="Student">Student</option>
        <option value="Class Representative">Class Representative</option>
      </select>
    </div>
  );
};

export default Filters;
