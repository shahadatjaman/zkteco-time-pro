import React from 'react';

interface AddPersonButtonProps {
  onClick?: () => void;
}

const AddPersonButton: React.FC<AddPersonButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
    aria-label="Add new person"
  >
    Add New Person
  </button>
);

export default AddPersonButton;
