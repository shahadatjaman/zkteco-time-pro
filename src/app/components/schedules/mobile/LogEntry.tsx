import React from 'react';
import { format } from 'date-fns';
import { UserEntryType } from './types';

interface Props {
  user: UserEntryType;
  isDarkMode: boolean;
}

const LogEntry: React.FC<Props> = ({ user, isDarkMode }) => {
  return (
    <div
      className={`p-4 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-md mb-4 transition-colors duration-200`}
    >
      <div className="flex items-center space-x-4">
        <img src={user.avatar} alt={user.firstname} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {user.firstname}
          </h3>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>ID: {user.userId}</p>
            <p>Phone: {user.phone}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm`}>
          <span className={`px-3 py-1 rounded-full text-sm`}>{user.role}</span>
        </span>
      </div>
    </div>
  );
};

export default LogEntry;
