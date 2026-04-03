import { create } from 'zustand';
import io, { Socket } from "socket.io-client";

interface SocketState {
    socket: Socket | null;
    connect: (userId: string, username: string) => void;
    disconnect: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
    socket: null,
    connect: (userId, username) => {
        const existing = get().socket;
        if (existing) {
            existing.close();
        }

        const newSocket = io(import.meta.env.VITE_APP_BASE_URL, {
            query: { id: userId },
            forceNew: true,
            transports: ["websocket"],
            timeout: 10000,
            reconnectionAttempts: Infinity,
        });

        newSocket.on("connect", () => {
             newSocket.emit("clientJoin", {
                user: username,
            });
        });

        set({ socket: newSocket });
    },
    disconnect: () => {
        const socket = get().socket;
        if (socket) {
            socket.close();
            set({ socket: null });
        }
    },
}));
