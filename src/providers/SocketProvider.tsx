import React, { useContext, useEffect, useState, ReactNode } from "react";
import io, { Socket } from "socket.io-client";
import { UserContext } from "./UserProvider";

const SocketContext = React.createContext<Socket | undefined>(undefined);

export function useSocket() {
    return useContext(SocketContext);
}

interface SocketProviderProps {
    children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
    const [socket, setSocket] = useState<Socket>();
    const [user] = useContext(UserContext);
    
    useEffect(() => {
        const id = user?.id;
        if (id) {
            const newSocket = io(import.meta.env.VITE_APP_BASE_URL, {
                query: { id },
                forceNew: true,
                transports: ["websocket"],
                timeout: 10000,
                reconnectionAttempts: Infinity,
            });
            setSocket(newSocket);
            return () => {
                newSocket.close();
            };
        }
    }, [user]);

    useEffect(() => {
        if (socket && user?.username) {
            socket.emit("clientJoin", {
                user: user.username,
            });
        }
    }, [socket, user]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
