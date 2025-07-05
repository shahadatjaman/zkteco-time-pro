'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

type Preferences = {
  profilePrivacy: boolean;
  twoFactor: boolean;
  searchIndex: boolean;
};

const PrivacyPreferences: React.FC = () => {
  const [privacyPreferences, setPrivacyPreferences] = useState<Preferences>({
    profilePrivacy: false,
    twoFactor: false,
    searchIndex: true,
  });

  const togglePreference = (key: keyof Preferences) => {
    setPrivacyPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Privacy setting updated!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Privacy Preferences
      </h2>
      <div className="space-y-4">
        {Object.entries(privacyPreferences).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                disabled={true}
                onChange={() => togglePreference(key as keyof Preferences)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPreferences;
