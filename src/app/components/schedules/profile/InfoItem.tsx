import React from 'react';
import { IconType } from 'react-icons';

interface InfoItemProps {
  icon: IconType;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
    <Icon className="text-gray-600 w-5 h-5 mr-3" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium">{value}</p>
    </div>
  </div>
);

export default InfoItem;
