'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  FiCopy,
  FiRefreshCw,
  FiCheck,
  FiX,
  FiWifi,
  FiUsers,
  FiClock,
  FiAlertTriangle,
} from 'react-icons/fi';
import { BiLoaderAlt } from 'react-icons/bi';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setDeviceInfo } from '@/store/slices/deviceSlice';
import { getCountdownString } from '@/utils';

// Types
type DeviceStatusType = 'ONLINE' | 'OFFLINE' | 'reconnecting';

interface DeviceData {
  ipAddress: string;
  port: string;
  status: DeviceStatusType;
  totalUsers: number;
  deviceTime: Date;
  lastConnected: Date;
}

interface StatusIndicatorProps {
  status: DeviceStatusType;
}

interface CopyButtonProps {
  text: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = memo(({ status }) => {
  const statusConfig: Record<DeviceStatusType, { color: string; icon: React.ElementType }> = {
    ONLINE: { color: 'bg-green-500', icon: FiCheck },
    OFFLINE: { color: 'bg-red-500', icon: FiX },
    reconnecting: { color: 'bg-yellow-500', icon: BiLoaderAlt },
  };

  const Icon = statusConfig[status].icon;

  return (
    <div className="flex items-center gap-2">
      <div className={`${statusConfig[status].color} w-3 h-3 rounded-full animate-pulse`} />
      <Icon className="w-5 h-5" />
      <span className="capitalize">{status}</span>
    </div>
  );
});

const CopyButton: React.FC<CopyButtonProps> = memo(({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="p-2 hover:dark:bg-gray-800 cursor-pointer rounded-full transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
    </button>
  );
});

const DeviceStatus: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const { deviceInfo, deviceTime } = useSelector((state: RootState) => state.device);
  const { socket } = useSelector((state: RootState) => state.socket);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('socket', socket);
  //   if (socket) {
  //     socket.on('device-info', (deviceData: any) => {
  //       // handle deviceData in your UI
  //       console.log('deviceData', deviceData);
  //       dispatch(setDeviceInfo(deviceData));
  //     });
  //   }
  // }, [socket]);

  if (!deviceInfo) {
    return (
      <div className="flex items-center justify-center bg-gray-800 h-[10vh]">
        <div className="text-center">
          <BiLoaderAlt className="w-10 h-10 animate-spin mx-auto text-blue-500" />
          <p className="mt-4 text-gray-600">Fetching device information...</p>
        </div>
      </div>
    );
  }

  return (
    deviceInfo && (
      <div className="bg-white dark:bg-gray-800  rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold mb-4">Device Info</h1>
            <button
              onClick={() => {}}
              className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiRefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-200">
                Device Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">IP Address:</span>
                  <div className="flex items-center">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {deviceInfo?.deviceIp}
                    </code>
                    <CopyButton text={deviceInfo.deviceIp} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Port:</span>
                  <div className="flex items-center">
                    <code className="bg-gray-100 px-2 py-1 rounded dark:bg-gray-800">
                      {deviceInfo.devicePort}
                    </code>
                    <CopyButton text={deviceInfo.devicePort} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-900">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-200">
                Connection Status
              </h2>
              <StatusIndicator status={deviceInfo.status || 'OFFLINE'} />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2 dark:bg-gray-900">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-200">
                Device Metadata
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <FiUsers className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Total Users</p>
                    <p className="font-semibold">{deviceInfo?.users?.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Device Time</p>
                    {deviceTime && <p className="font-semibold">{format(deviceTime, 'PPp')}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FiWifi className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Last Connected</p>
                    {deviceInfo.lastConnectedAt && (
                      <p className="font-semibold">{format(deviceInfo.lastConnectedAt, 'PPp')}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500 text-right">
            Last updated: {format(lastUpdated, 'PPp')}
          </div>
        </div>
      </div>
    )
  );
};

export default DeviceStatus;
