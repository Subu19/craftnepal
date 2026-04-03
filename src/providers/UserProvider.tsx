import React from "react";
import { useUserStore } from "../store/useUserStore";

// Maintaining UserContext for legacy code compatibility during migration
export const UserContext = React.createContext<[any, boolean]>([{}, false]);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const user = useUserStore((state) => state.user);
    const isAuthenticating = useUserStore((state) => state.isAuthenticating);
    
    return (
        <UserContext.Provider value={[user, isAuthenticating]}>
            {children}
        </UserContext.Provider>
    );
};

