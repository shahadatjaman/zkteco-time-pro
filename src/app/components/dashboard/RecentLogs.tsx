'use client';

import React, { useEffect, useRef } from 'react';
import { Log } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addLiveLogs, addLog, addSummary, AttendanceLog } from '@/store/slices/logSlice';
import { Avatar } from '@/shared/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetTodayLogsQuery } from '@/store/services/attendanceLogApi';

const RecentLogs = () => {
  const { liveLogs } = useSelector((state: RootState) => state.log);
  const containerRef: any = useRef(null);

  const dispatch = useDispatch();

  const { data: logs, isLoading, isError, isFetching, refetch, isSuccess } = useGetTodayLogsQuery();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [liveLogs]);

  useEffect(() => {
    if (logs?.status === 200) {
      dispatch(addLiveLogs(logs.data.logs));
      dispatch(addSummary(logs.data.summary));
    }
  }, [logs]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        Live Activity
      </h2>
      <div
        ref={containerRef}
        className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-hide rounded"
      >
        <AnimatePresence initial={false}>
          {liveLogs?.map(log => (
            <motion.div
              key={log._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-2 hover:bg-gray-50 hover:dark:bg-gray-900 rounded"
            >
              <div className="transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-between items-center mb-2">
                  <Avatar name={log.employee.firstname} src={log.employee.avatar || ''} size="sm" />
                  <p className="font-medium ml-2">
                    {`${log.employee.firstname} ${log.employee.lastname}`}
                  </p>
                </div>
                <p
                  className={`inline-block  p-1 rounded  text-[12px]
              ${
                log.status === 'PRESENT'
                  ? 'bg-green-100 dark:bg-green-800'
                  : log.status === 'ABSENT'
                  ? 'bg-red-100 dark:bg-red-800'
                  : log.status === 'LATE'
                  ? 'bg-yellow-100 dark:bg-yellow-700'
                  : log.status === 'LEAVE'
                  ? 'bg-blue-100 dark:bg-blue-800'
                  : 'bg-gray-100 dark:bg-gray-800'
              }
              hover:opacity-80`}
                >
                  {log.status}
                </p>
              </div>
              <div className="">
                <span className="block dark:text-gray-50">Check In</span>
                <span className="text-sm dark:text-gray-400">{log.checkInAt}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecentLogs;
