'use client';

import { useGetDatabseStatsQuery } from '@/store/services/zktecoApi';
import React, { useState, useEffect } from 'react';
import {
  FiDatabase,
  FiLayers,
  FiEye,
  FiUsers,
  FiFileText,
  FiHardDrive,
  FiArchive,
  FiFolder,
  FiCpu,
  FiActivity,
} from 'react-icons/fi';
import { MongoDbStats } from '../../../store/services/zktecoApi';
import { IconType } from 'react-icons';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  status?: string;
}

const StatCard: React.FC<StatCardProps> = React.memo(({ title, value, icon: Icon, status }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-600 text-sm font-medium dark:text-gray-50">{title}</div>
        <Icon className="text-blue-500 text-xl" />
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-100">{value}</div>
      {status && (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === 'OK' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
});

const DatabaseOverview = () => {
  const [stats, setStats] = useState<MongoDbStats>({
    db: '',
    collections: 0,
    views: 0,
    objects: 0,
    avgObjSize: 0,
    dataSize: 0,
    storageSize: 0,
    indexes: 0,
    indexSize: 0,
    totalSize: 0,
    scaleFactor: 0,
    fsUsedSize: 0,
    fsTotalSize: 0,
    ok: 0,
  });

  const [loading, setLoading] = useState(true);

  const {
    data: databseStats,
    isLoading,
    isError,
    isFetching,
    refetch,
    isSuccess,
  } = useGetDatabseStatsQuery();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (databseStats) {
      setStats(databseStats);
    }
  }, [databseStats]);

  const statistics = [
    { title: 'Average Document Size', value: stats.avgObjSize, icon: FiFileText },
    { title: 'Data Size', value: stats.dataSize, icon: FiHardDrive },
    { title: 'Storage Size', value: stats.storageSize, icon: FiArchive },

    { title: 'Total Size', value: stats.totalSize, icon: FiHardDrive },
    { title: 'File System Used', value: stats.fsUsedSize, icon: FiCpu },
    { title: 'File System Total', value: stats.fsTotalSize, icon: FiCpu },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  console.log('databseStats', databseStats);

  return (
    <div className="animate-fadeIn dark:bg-gray-800 p-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Database Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statistics.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            // status={stat.}
          />
        ))}
      </div>
    </div>
  );
};

export default DatabaseOverview;
