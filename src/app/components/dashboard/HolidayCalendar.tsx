import React from 'react';
import { Holiday } from './types';
import { format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';

interface Props {
  holidays: Holiday[];
}

const HolidayCalendar: React.FC<Props> = ({ holidays }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Upcoming Holidays</h2>
      <FaCalendarAlt className="text-2xl text-gray-500" />
    </div>
    <div className="space-y-3">
      {holidays.map((holiday, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 hover:dark:bg-gray-900 rounded"
        >
          <p className="font-medium">{holiday.name}</p>
          <span className="text-sm text-gray-600">
            {format(new Date(holiday.date), 'MMM dd, yyyy')}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default HolidayCalendar;
