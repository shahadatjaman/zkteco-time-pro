import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Device {
  _id: string;
  name: string;
  ip: string;
  port: number;
  location?: string;
  status?: 'ONLINE' | 'OFFLINE';
  lastConnectedAt?: string;
}

export interface IDevice {
  _id: string;
  deviceName?: string;
  deviceIp: string;
  devicePort: string;
  status?: 'ONLINE' | 'OFFLINE';
  users?: string[]; // Array of MongoDB ObjectId strings
  lastConnectedAt?: string;
}

export interface UpdateDevice {
  _id?: string;
  name?: string;
  ip?: string;
  port?: number;
  location?: string;
  status?: 'ONLINE' | 'OFFLINE';
  lastConnectedAt?: string;
}

interface DeviceState {
  data: Device | any;
  deviceInfo: IDevice | null;
  deviceTime: '';
}

const initialState: DeviceState = {
  data: null,
  deviceInfo: null,
  deviceTime: '',
};

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: (state, action: PayloadAction<Device>) => {
      state.data = action.payload;
    },
    updateDevice: (state, action: PayloadAction<UpdateDevice>) => {
      const newData = action.payload;
      state.data = { ...state.data, ...newData };
    },

    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.data = action.payload;
    },

    setDeviceInfo: (state, action) => {
      state.deviceInfo = action.payload;
    },

    setDeviceTime: (state, action) => {
      state.deviceTime = action.payload;
    },
  },
});

export const {
  addDevice,
  updateDevice,
  setDeviceInfo,
  setDevices,
  setDeviceTime,
} = deviceSlice.actions;

export default deviceSlice.reducer;
