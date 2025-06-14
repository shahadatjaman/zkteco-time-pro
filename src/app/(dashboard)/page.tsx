import HolidayCalendar from '@/components/dashboard/HolidayCalendar';
import RealTimeClock from '@/components/dashboard/RealTimeClock';
import RecentLogs from '@/components/dashboard/RecentLogs';
import ShiftOverviewTable from '@/components/dashboard/ShiftOverviewTable';
import SummaryCard from '@/components/dashboard/SummaryCard';
import { Employee, Holiday, Log } from '@/components/dashboard/types';
import React from 'react';
import { FaUserCheck, FaUserTimes, FaHourglassHalf } from 'react-icons/fa';

const AttendanceDashboard: React.FC = () => {
  const employeeData: Employee[] = [
    { id: 1, name: 'John Smith', shift: '09:00 - 17:00', status: 'on-time' },
    { id: 2, name: 'Emma Wilson', shift: '08:00 - 16:00', status: 'late' },
    { id: 3, name: 'Michael Brown', shift: '10:00 - 18:00', status: 'absent' },
    { id: 4, name: 'Sarah Davis', shift: '09:00 - 17:00', status: 'on-time' },
    { id: 5, name: 'James Johnson', shift: '08:00 - 16:00', status: 'late' },
  ];
  const recentLogs: Log[] = [
    { id: 1, name: 'John Smith', timestamp: '08:55', status: 'Checked In' },
    { id: 2, name: 'Emma Wilson', timestamp: '08:15', status: 'Checked In' },
    { id: 3, name: 'Sarah Davis', timestamp: '09:02', status: 'Checked In' },
    { id: 4, name: 'James Johnson', timestamp: '08:30', status: 'Checked In' },
    { id: 5, name: 'Michael Brown', timestamp: '--:--', status: 'Absent' },
  ];
  const holidays: Holiday[] = [
    { date: '2024-01-01', name: "New Year's Day" },
    { date: '2024-01-15', name: 'Martin Luther King Jr. Day' },
    { date: '2024-02-19', name: 'Presidents Day' },
  ];

  return (
    <div className="p-4 md:p-8 custom-scrollbar">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Total Check-ins Today"
            value={42}
            color="text-blue-600"
            icon={<FaUserCheck className="text-4xl text-blue-500" />}
          />
          <SummaryCard
            title="Absent Count"
            value={5}
            color="text-red-600"
            icon={<FaUserTimes className="text-4xl text-red-500" />}
          />
          <SummaryCard
            title="Late Entries"
            value={8}
            color="text-yellow-600"
            icon={<FaHourglassHalf className="text-4xl text-yellow-500" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ShiftOverviewTable employeeData={employeeData} />
          </div>
          <div className="space-y-6">
            {/* <RealTimeClock /> */}
            <RecentLogs recentLogs={recentLogs} />
            <HolidayCalendar holidays={holidays} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
