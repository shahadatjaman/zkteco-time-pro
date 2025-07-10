import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

interface ConnectOptions {
  userId: string;
}

export const connectSocket = ({ userId }: ConnectOptions) => {
  if (!socket) {
    socket = io('http://localhost:3002', {
      transports: ['websocket'],
      query: {
        userId,
      },
    });
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) throw new Error('Socket not initialized');
  return socket;
};
