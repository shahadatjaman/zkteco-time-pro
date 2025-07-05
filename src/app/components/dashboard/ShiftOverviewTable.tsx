import React from 'react';
import { Employee } from './types';

interface Props {
  employeeData: Employee[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'on-time':
      return 'bg-green-100 text-green-800';
    case 'late':
      return 'bg-yellow-100 text-yellow-800';
    case 'absent':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ShiftOverviewTable: React.FC<Props> = ({ employeeData }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4">Shift Overview</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-900">
            <th className="px-4 py-2 text-left">Employee Name</th>
            <th className="px-4 py-2 text-left">Shift Timing</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map(emp => (
            <tr key={emp.id} className="border-t">
              <td className="px-4 py-2">{emp.name}</td>
              <td className="px-4 py-2">{emp.shift}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(emp.status)}`}>
                  {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ShiftOverviewTable;
