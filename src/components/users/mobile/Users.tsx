import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useVirtual } from 'react-virtual';
import LogEntry from './LogEntry';
import { UserEntryType } from './types';

import useIsSmallDevice from '@/hooks/useIsSmallDevice';
import PageLayout from '@/shared/pageLayout/PageLayout';

const AttendanceLogs: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [logs, setLogs] = useState<UserEntryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const isSmall = useIsSmallDevice();

  const generateMockData = (start: number, end: number): UserEntryType[] => {
    const names = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown'];
    const roles = ['admin', 'user', 'moderator', 'editor', 'viewer'];

    return Array.from({ length: end - start }, (_, index) => ({
      _id: '1',
      firstname: names[Math.floor(Math.random() * names.length)],
      lastname: '',
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48`,
      blood: '+O',
      gender: 'Male',
      phone: '0148454',
      religion: 'Islam',
      role: roles[Math.floor(Math.random() * roles.length)],
      userId: '01',
    }));
  };

  useEffect(() => {
    setLogs(generateMockData(0, 50));
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);
  }, []);

  const rowVirtualizer = useVirtual({
    size: logs.length,
    parentRef,
    estimateSize: useCallback(() => 80, []),
    overscan: 5,
  });

  const loadMore = () => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setLogs(prev => [...prev, ...generateMockData(prev.length, prev.length + 20)]);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <PageLayout pageTitle="Log List">
      <div className={`min-h-screen transition-colors duration-200`}>
        <div className="container mx-auto px-4 py-8">
          <div
            ref={parentRef}
            className="h-[calc(100vh-200px)] overflow-auto bg-gray-800"
            onScroll={e => {
              const target = e.target as HTMLDivElement;
              if (target.scrollHeight - target.scrollTop <= target.clientHeight * 1.5) {
                loadMore();
              }
            }}
          >
            <div className="relative" style={{ height: `${rowVirtualizer.totalSize}px` }}>
              {rowVirtualizer.virtualItems.map(virtualRow => (
                <div
                  key={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <LogEntry user={logs[virtualRow.index]} isDarkMode={isDarkMode} />
                </div>
              ))}
            </div>
          </div>

          {loading && (
            <div className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Loading more entries...
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default AttendanceLogs;
