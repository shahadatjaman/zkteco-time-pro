import React from 'react';
import { HiRefresh } from 'react-icons/hi';

interface RefreshButtonProps {
  onClick: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Refresh list"
    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 inline-flex items-center justify-center"
  >
    <HiRefresh className="w-5 h-5 text-gray-600" />
  </button>
);

export default RefreshButton;
