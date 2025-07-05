'use client';

import React from 'react';
import SummaryCard from './SummaryCard';
import { FaHourglassHalf, FaRunning, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const SummaryCards = () => {
  const { summary } = useSelector((state: RootState) => state.log);

  return (
    <>
      <SummaryCard
        title="Total Present Today"
        value={summary.totalPresent}
        color="text-blue-600"
        icon={<FaUserCheck className="text-4xl text-blue-500" />}
      />
      <SummaryCard
        title="Absent Count"
        value={summary.totalAbsent}
        color="text-red-600"
        icon={<FaUserTimes className="text-4xl text-red-500" />}
      />

      <SummaryCard
        title="Total Leaves"
        value={summary.totalLeave}
        color="text-yellow-600"
        icon={<FaRunning className="text-4xl text-yellow-500" />}
      />
      <SummaryCard
        title="Late Entries"
        value={summary.totalLate}
        color="text-yellow-600"
        icon={<FaHourglassHalf className="text-4xl text-yellow-500" />}
      />
    </>
  );
};

export default SummaryCards;
