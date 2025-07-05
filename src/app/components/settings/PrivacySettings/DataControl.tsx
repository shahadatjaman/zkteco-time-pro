'use client';

import React from 'react';
import { FiDownload, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface Props {
  onDelete: () => void;
}

const DataControl: React.FC<Props> = ({ onDelete }) => {
  const handleDataDownload = () => {
    toast.info('Preparing your data for download...');
    setTimeout(() => {
      toast.success('Data ready for download!');
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Data Control</h2>
      <div className="space-y-4">
        <button
          onClick={handleDataDownload}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 flex items-center justify-center space-x-2"
        >
          <FiDownload />
          <span>Download My Data</span>
        </button>
        <button
          onClick={onDelete}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 flex items-center justify-center space-x-2"
        >
          <FiTrash2 />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  );
};

export default DataControl;
