'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiAlertTriangle } from 'react-icons/fi';
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi';
import { TbPlugConnected } from 'react-icons/tb';
import { useCreateDeviceMutation, useGetDevicesQuery } from '@/store/services/deviceApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateDevice } from '@/store/slices/deviceSlice';
import { getLastConnectedTime } from '@/utils/getLastConnectedTime';

type ToastType = 'success' | 'error' | '';

interface ToastState {
  show: boolean;
  message: string;
  type: ToastType;
}

interface ErrorState {
  ip: string;
  port: string;
}

const DeviceConnection = () => {
  const [showWarning, setShowWarning] = useState<boolean>(true);

  const [ipAddress, setIpAddress] = useState<string>('');
  const [port, setPort] = useState<string>('');

  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: '' });
  const [errors, setErrors] = useState<ErrorState>({ ip: '', port: '' });
  const { socket } = useSelector((state: RootState) => state.socket);

  const { data: realTimeDeviceStatus } = useSelector((state: RootState) => state.device);

  const [createDevice, { isLoading: isLoadingCreate }]: any = useCreateDeviceMutation();

  const { data: devices, isLoading, isError, isSuccess, error, refetch } = useGetDevicesQuery();

  const dispatch = useDispatch();

  const fetchDeviceInfo = async () => {
    const result: any = await refetch();
    if (result.isSuccess) {
      const { deviceIp, devicePort, status, lastConnectedAt } = result.data?.data[0];

      setIpAddress(deviceIp);
      setPort(devicePort);

      dispatch(updateDevice({ lastConnectedAt, status }));
    }
  };

  useEffect(() => {
    fetchDeviceInfo();
  }, []);

  const validateIP = (ip: string): boolean => {
    const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const validatePort = (port: string): boolean => {
    const portNum = parseInt(port);
    return !isNaN(portNum) && portNum >= 1 && portNum <= 65535;
  };

  const handleIPChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setIpAddress(value);
    if (value && !validateIP(value)) {
      setErrors(prev => ({ ...prev, ip: 'Invalid IP address format' }));
    } else {
      setErrors(prev => ({ ...prev, ip: '' }));
    }
  };

  const handlePortChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPort(value);
    if (value && !validatePort(value)) {
      setErrors(prev => ({ ...prev, port: 'Port must be between 1 and 65535' }));
    } else {
      setErrors(prev => ({ ...prev, port: '' }));
    }
  };

  const handleConnect = async (): Promise<void> => {
    try {
      await createDevice({ deviceIp: ipAddress, devicePort: port });
      if (socket) {
        socket.emit('restartDevice');
      }
    } catch (error) {}
  };

  const isFormValid = ipAddress && port && !errors.ip && !errors.port;

  if (isLoading) return <p>loading...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
      {showWarning && (
        <div className="mb-6 bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiAlertTriangle className="text-orange-500 text-xl" />
              <p className="text-gray-800 font-medium">
                Please ensure port forwarding is properly configured on your network for successful
                device connection.
              </p>
            </div>
            {/* <button
              onClick={() => setShowWarning(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Dismiss warning"
            >
              <IoMdClose className="text-xl" />
            </button> */}
          </div>
        </div>
      )}

      <div className="mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <h2 className="text-2xl flex justify-between items-center font-bold text-gray-800 dark:text-gray-200 mb-6">
          Device Connection
          <span className="text-[16px]">
            {realTimeDeviceStatus &&
              realTimeDeviceStatus.status === 'OFFLINE' &&
              getLastConnectedTime(realTimeDeviceStatus.lastConnectedAt)}
          </span>
        </h2>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="ip"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Device IP Address
            </label>
            <input
              id="ip"
              type="text"
              value={ipAddress}
              onChange={handleIPChange}
              placeholder="e.g., 192.168.1.100"
              className={`w-full px-4 py-2 border rounded-lg dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.ip ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={errors.ip ? 'true' : 'false'}
            />
            {errors.ip && <p className="mt-1 text-sm text-red-500">{errors.ip}</p>}
          </div>

          <div>
            <label
              htmlFor="port"
              className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-1"
            >
              Port Number
            </label>
            <input
              id="port"
              type="number"
              value={port}
              onChange={handlePortChange}
              placeholder="e.g., 4370"
              className={`w-full px-4 py-2 border dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.port ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={errors.port ? 'true' : 'false'}
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-100">
              Default port for most ZKTeco devices is 4370
            </p>
            {errors.port && <p className="mt-1 text-sm text-red-500">{errors.port}</p>}
          </div>

          <button
            onClick={handleConnect}
            disabled={!isFormValid || isLoadingCreate}
            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
              isFormValid && !isLoadingCreate
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            {isLoadingCreate ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <TbPlugConnected className="text-xl" />
                <span>Connect & Restart Device</span>
              </>
            )}
          </button>

          <div className="flex items-center space-x-2 justify-center mt-4">
            {realTimeDeviceStatus && realTimeDeviceStatus.status === 'ONLINE' && (
              <>
                <BiCheckCircle className="text-green-500 text-xl" />
                <span className="text-green-500 font-medium">Connected</span>
              </>
            )}

            {realTimeDeviceStatus && realTimeDeviceStatus.status === 'OFFLINE' && (
              <>
                <BiErrorCircle className="text-red-500 text-xl" />
                <span className="text-red-500 font-medium">Disconnected</span>
              </>
            )}
            {!realTimeDeviceStatus && (
              <>
                <BiErrorCircle className="text-red-500 text-xl" />
                <span className="text-red-500 font-medium">Disconnected</span>
              </>
            )}
          </div>
        </div>
      </div>

      {toast.show && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white transition-opacity duration-300`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default DeviceConnection;
