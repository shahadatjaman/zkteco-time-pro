import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack }) => (
  <div className="flex items-center gap-3">
    <button
      aria-label="Go back"
      onClick={onBack}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
    >
      <HiArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-200" />
    </button>
    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
  </div>
);

export default PageHeader;
