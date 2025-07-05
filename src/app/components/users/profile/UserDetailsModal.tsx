import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaTimes, FaUser, FaPhone, FaVenusMars, FaTint, FaPray, FaUserTie } from 'react-icons/fa';
import UserAvatar from './UserAvatar';
import InfoItem from './InfoItem';
import { UserDetailsModalProps, UserData } from './types';
import { Avatar } from '@/shared/avatar';

const UserDetails: React.FC<UserDetailsModalProps> = ({ userData }) => {
  console.log('userData', userData);
  return (
    <div className="p-6">
      <div className="grid md:grid-cols-[auto,1fr] gap-8">
        <UserAvatar src={userData.avatar} alt={userData?.firstname} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem
            icon={FaUser}
            label="Full Name"
            value={userData.firstname + ' ' + userData.lastname}
          />
          <InfoItem icon={FaVenusMars} label="Gender" value={userData.gender} />
          <InfoItem icon={FaTint} label="Blood Type" value={userData.blood} />
          <InfoItem icon={FaPray} label="Religion" value={userData?.religion || 'Empty'} />
          <InfoItem icon={FaUserTie} label="Dep" value={userData.dept.deptName} />
          <InfoItem icon={FaPhone} label="Phone Number" value={userData.phone} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
