'use client';

import React, { useState } from 'react';
import { FiPhone, FiMonitor, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

type Device = {
  id: number;
  type: 'mobile' | 'desktop';
  location: string;
  lastActive: string;
};

const DevicesSection: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      type: 'mobile',
      location: 'New York, USA',
      lastActive: '2024-01-20T10:30:00',
    },
    {
      id: 2,
      type: 'desktop',
      location: 'London, UK',
      lastActive: '2024-01-20T09:45:00',
    },
  ]);

  const handleDeviceLogout = (id: number) => {
    setDevices(devices.filter(device => device.id !== id));
    toast.success('Device logged out successfully!');
  };

  const handleLogoutAll = () => {
    setDevices([]);
    toast.success('Logged out from all devices!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Logged in Devices</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {devices.map(device => (
          <div key={device.id} className="border rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {device.type === 'mobile' ? (
                <FiPhone className="text-2xl" />
              ) : (
                <FiMonitor className="text-2xl" />
              )}
              <div>
                <p className="font-medium">{device.location}</p>
                <p className="text-sm text-gray-500">
                  Last active: {new Date(device.lastActive).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDeviceLogout(device.id)}
              className="text-red-600 hover:text-red-800"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleLogoutAll}
        className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
      >
        Logout All Devices
      </button>
    </div>
  );
};

export default DevicesSection;
