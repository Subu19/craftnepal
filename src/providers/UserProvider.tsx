import axios from "axios";
import React, { useEffect, useState, ReactNode } from "react";

export const UserContext = React.createContext<[any, boolean]>([{}, false]);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<any>({});
    const [gettingUser, setloading] = useState<boolean>(false);
    useEffect(() => {
        setloading(true);
        axios.defaults.withCredentials = true;
        axios.post(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_CHECK_AUTH).then((res) => {
            setUser(res.data);
            setloading(false);
        });
    }, []);
    return <UserContext.Provider value={[user, gettingUser]}>{children}</UserContext.Provider>;
};
