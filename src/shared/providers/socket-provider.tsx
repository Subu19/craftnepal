import React, { useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from './auth-provider';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = React.createContext<SocketContextType | undefined>(undefined);

export function useSocket(): SocketContextType {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      // Not logged in — disconnect any existing socket
      if (socket) {
        socket.close();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    // Derive the socket URL from the API URL (strip /api suffix)
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    const socketUrl = apiUrl.replace('/api', '');

    const newSocket = io(socketUrl, {
      query: { id: user.id },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
      transports: ['websocket'],
      timeout: 10000,
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
