import MongoDBDashboard from '@/app/components/dashboard/DatabaseOverview';
import Device from '@/app/components/dashboard/Device';

import HolidayCalendar from '@/app/components/dashboard/HolidayCalendar';

import RecentLogs from '@/app/components/dashboard/RecentLogs';

import SummaryCards from '@/app/components/dashboard/SummaryCards';

import { Employee, Holiday, Log } from '@/app/components/dashboard/types';
import React from 'react';

const AttendanceDashboard: React.FC = () => {
  const holidays: Holiday[] = [
    { date: '2024-01-01', name: "New Year's Day" },
    { date: '2024-01-15', name: 'Martin Luther King Jr. Day' },
    { date: '2024-02-19', name: 'Presidents Day' },
  ];

  return (
    <div className="p-4 md:p-8 custom-scrollbar">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <SummaryCards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Device />
          </div>

          <div className="space-y-6">
            {/* <RealTimeClock /> */}
            <RecentLogs />
            <HolidayCalendar holidays={holidays} />
          </div>
        </div>
        <MongoDBDashboard />
      </div>
    </div>
  );
};

export default AttendanceDashboard;
