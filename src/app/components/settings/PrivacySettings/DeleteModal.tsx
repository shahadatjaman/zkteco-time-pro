'use client';

import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
}

const DeleteModal: React.FC<Props> = ({ onClose }) => {
  const confirmDelete = () => {
    toast.success('Account deleted successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center space-x-2 text-red-600 mb-4">
          <FiAlertTriangle className="text-2xl" />
          <h3 className="text-xl font-bold dark:text-gray-100">Delete Account</h3>
        </div>
        <p className="text-gray-600 mb-4">
          This action cannot be undone. All your data will be permanently deleted.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
