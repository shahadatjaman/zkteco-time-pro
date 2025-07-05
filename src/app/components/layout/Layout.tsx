'use client';

import { toggleSidebar } from '@/store/slices/sidebarSlice';
import React, { FC, useEffect, useState } from 'react';
import { FiBell, FiLogOut, FiMenu, FiSearch } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';

import { useDispatch, useSelector } from 'react-redux';

const PrimaryMenu = dynamic(() => import('./PrimaryMenu'), { ssr: false });

import { RootState } from '@/store/store';
import dynamic from 'next/dynamic';
import { decodeToken } from '@/utils/decodeToken';
import { setCredentials } from '@/store/slices/authSlice';
import { useSocket } from '@/hooks/useSocket';
import { useLogoutMutation } from '@/store/services/authApi';
import { useRouter } from 'next/navigation';
import { addLiveLog, addLog, AttendanceLog } from '@/store/slices/logSlice';
import { setDeviceInfo } from '@/store/slices/deviceSlice';

interface ILayout {
  children: React.ReactNode;
}
const Layout: FC<ILayout> = ({ children }) => {
  const dispatch = useDispatch();
  const { isSidebarExpanded, activeMenu } = useSelector((state: RootState) => state.sidebar);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { socket } = useSelector((state: RootState) => state.socket);

  const { user } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

  const [logout, { isLoading }] = useLogoutMutation();

  useSocket(); // Subscribes to socket events

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const user: any = decodeToken(token);

      dispatch(setCredentials({ user: user, accessToken: token }));
    }
  }, []);

  useEffect(() => {
    try {
      console.log('socket', socket);
      if (socket) {
        socket.on('live_logs', (data: AttendanceLog) => {
          dispatch(addLiveLog(data));
          dispatch(addLog(data));
        });

        // socket.on('device-info', (data: any) => {
        //   console.log('device-info', data);
        //   dispatch(setDeviceInfo(data));
        // });
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [socket]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const logoutHandler = async () => {
    const response: any = await logout();
    if (response && response?.data && response?.data.status === 200) {
      router.push('/login');
    }
  };

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

          {/* User Info + Logout */}
          <div className="border-t dark:border-gray-700 p-4 flex justify-between w-full">
            <div className="flex w-[50%] items-center space-x-3 mb-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              {isSidebarExpanded && (
                <div className="flex-1">
                  <h3 className="text-sm font-medium dark:text-white">
                    {user?.name && user?.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                </div>
              )}
            </div>
            {/* Logout Button */}
            <button
              onClick={logoutHandler}
              disabled={isLoading}
              className="flex w-[50%] cursor-pointer items-center px-2 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <ImSpinner2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <FiLogOut className="w-5 h-5 mr-2" />
              )}
              {isSidebarExpanded && (isLoading ? 'Logging out...' : 'Logout')}
            </button>
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
