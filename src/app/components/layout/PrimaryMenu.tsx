'use client';

import { setActiveMenu } from '@/store/slices/sidebarSlice';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { FC, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { FcDepartment } from 'react-icons/fc';
import { FiCalendar, FiChevronDown, FiHome, FiSettings } from 'react-icons/fi';
import { TbLogs, TbTimeDuration0 } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';

interface PrimaryMenuProps {
  expanded: boolean;
}

interface MenuItem {
  id: string;
  icon: React.ElementType;
  label: string;
  subItems: string[];
}

const PrimaryMenu: FC<PrimaryMenuProps> = ({ expanded }) => {
  const [activeMenus, setActiveMenus] = useState<any>();

  const dispatch = useDispatch();
  const activeMenu = useSelector((state: RootState) => state.sidebar?.activeMenu);

  const menuItems: MenuItem[] = [
    { id: '/', icon: FiHome, label: 'Home', subItems: [] },
    { id: 'department', icon: FcDepartment, label: 'Departments', subItems: [] },
    { id: 'users', icon: FaUsers, label: 'Users', subItems: [] },
    { id: 'schedules', icon: TbTimeDuration0, label: 'Schedule', subItems: [] },
    { id: 'logs', icon: TbLogs, label: 'Logs', subItems: [] },
    { id: 'settings', icon: FiSettings, label: 'Settings', subItems: [] },
  ];

  const toggleMenu = (index: any) => {
    setActiveMenus((prev: any) => (prev === index ? null : index));
  };

  return (
    <ul className="space-y-1 px-3">
      {menuItems.map((item, index) => (
        <li key={item.id}>
          <Link href={item.id}>
            {' '}
            <button
              onClick={() => {
                toggleMenu(index);
                dispatch(setActiveMenu(item.id));
              }}
              className={`w-full cursor-pointer flex items-center justify-between space-x-3 p-3 rounded-lg transition-colors duration-200
              ${
                activeMenu === item.id
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="flex space-x-3">
                <item.icon className="w-6 h-6" />
                {expanded && <span className="font-medium">{item.label}</span>}
              </span>

              {expanded && item.subItems.length > 0 && (
                <FiChevronDown
                  size={16}
                  className={`transition-transform duration-200
                        ${
                          activeMenus === index && item.id === activeMenu
                            ? 'transform rotate-180'
                            : ''
                        }`}
                />
              )}
            </button>
          </Link>
          {item.subItems && (
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out
                      ${activeMenus === index ? 'max-h-48' : 'max-h-0'}`}
            >
              {item.subItems.map((subItem, subIndex) => (
                <button
                  key={subIndex}
                  className={`w-full flex items-center pl-12 pr-4 py-2
                          ${
                            true
                              ? 'hover:bg-gray-700 text-gray-400'
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                >
                  {subItem}
                </button>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PrimaryMenu;
