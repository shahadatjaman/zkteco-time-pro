import React from 'react';
import { SummaryCardProps } from './types';

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, color, icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
      </div>
      {icon}
    </div>
  </div>
);

export default SummaryCard;
