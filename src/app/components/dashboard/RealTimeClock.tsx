'use client';

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FaClock } from 'react-icons/fa';

const RealTimeClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Current Time</h2>
        <FaClock className="text-2xl dark:text-gray-500 text-white" />
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-gray-800 dark:text-white">
          {format(currentTime, 'HH:mm:ss')}
        </p>
        <p className="text-gray-500 mt-2">{format(currentTime, 'EEEE, MMMM do, yyyy')}</p>
      </div>
    </div>
  );
};

export default RealTimeClock;
