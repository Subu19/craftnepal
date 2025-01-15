import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "./UserProvider";
const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState();
    const [user, loading] = useContext(UserContext);
    useEffect(() => {
        const id = user.id;
        if (id) {
            const newSocket = io(process.env.REACT_APP_BASE_URL, {
                query: { id },
                "force new connection": true,
                transports: ["websocket"],
                timeout: 10000,
                reconnectionAttempts: "Infinity",
            });
            setSocket(newSocket);
            return () => newSocket.close();
        }
    }, [user]);
    useEffect(() => {
        if (socket) {
            socket.emit("clientJoin", {
                user: user.username,
            });
        }
    }, [socket]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
