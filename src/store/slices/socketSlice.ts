import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  connected: boolean;
  lastMessage: string | null;
  socket: any;
}

const initialState: SocketState = {
  connected: false,
  lastMessage: null,
  socket: null,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },
    setSocket(state, action: PayloadAction<any>) {
      state.socket = action.payload;
    },
    setLastMessage(state, action: PayloadAction<string>) {
      state.lastMessage = action.payload;
    },
  },
});

export const { setConnected, setLastMessage, setSocket } = socketSlice.actions;
export default socketSlice.reducer;
