'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PasswordSection from './PasswordSection';
import DevicesSection from './DevicesSection';
import PrivacyPreferences from './PrivacyPreferences';
import DataControl from './DataControl';
import DeleteModal from './DeleteModal';
import 'react-toastify/dist/ReactToastify.css';
import DeviceConnection from './DeviceConnection';

const PrivacySettings = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="min-h-screen  md:p-8 dark:text-gray-100">
      <ToastContainer />
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Privacy & Settings</h1>
        <PasswordSection />
        <DeviceConnection />

        {/* <DevicesSection /> */}

        <PrivacyPreferences />
        {/* <DataControl onDelete={() => setShowDeleteModal(true)} /> */}
        {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} />}
      </div>
    </div>
  );
};

export default PrivacySettings;
