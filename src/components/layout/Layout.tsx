'use client';

import { toggleSidebar } from '@/store/slices/sidebarSlice';
import React, { FC, useState } from 'react';
import { FiBell, FiMenu, FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

const PrimaryMenu = dynamic(() => import('./PrimaryMenu'), { ssr: false });

import { RootState } from '@/store/store';
import dynamic from 'next/dynamic';

interface ILayout {
  children: React.ReactNode;
}
const Layout: FC<ILayout> = ({ children }) => {
  const dispatch = useDispatch();
  const { isSidebarExpanded, activeMenu } = useSelector((state: RootState) => state.sidebar);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out z-50
        ${isSidebarExpanded ? 'w-64' : 'w-20'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
            {isSidebarExpanded && (
              <span className="text-xl font-semibold dark:text-white">ZKTimey</span>
            )}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:block hidden"
            >
              <FiMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <PrimaryMenu expanded={isSidebarExpanded} />
          </nav>

          <div className="border-t dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              {isSidebarExpanded && (
                <div className="flex-1">
                  <h3 className="text-sm font-medium dark:text-white">John Doe</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div className={`flex flex-col min-h-screen ${isSidebarExpanded ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <header className="h-16 bg-white dark:bg-gray-800 shadow-sm fixed top-0 right-0 left-0 z-30 lg:left-64">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
              >
                <FiMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              {/* <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div> */}
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiBell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="text-sm font-medium dark:text-white">
                  {isDarkMode ? 'Light' : 'Dark'}
                </span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 lg:p-6 mt-16 bg-gray-50 dark:bg-gray-900">
          <div className="w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
