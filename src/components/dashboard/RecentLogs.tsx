import React from 'react';
import { Log } from './types';

interface Props {
  recentLogs: Log[];
}

const RecentLogs: React.FC<Props> = ({ recentLogs }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4">Recent Logs</h2>
    <div className="space-y-3 max-h-[300px] overflow-y-auto">
      {recentLogs.map(log => (
        <div
          key={log.id}
          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
        >
          <div>
            <p className="font-medium">{log.name}</p>
            <p className="text-sm text-gray-500">{log.status}</p>
          </div>
          <span className="text-sm text-gray-600">{log.timestamp}</span>
        </div>
      ))}
    </div>
  </div>
);

export default RecentLogs;
