import { create } from 'zustand';
import axios from 'axios';

interface UserState {
    user: any;
    isAuthenticating: boolean;
    checkAuth: () => Promise<void>;
    setUser: (user: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: {},
    isAuthenticating: false,
    checkAuth: async () => {
        set({ isAuthenticating: true });
        axios.defaults.withCredentials = true;
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_CHECK_AUTH}`
            );
            set({ user: res.data, isAuthenticating: false });
        } catch (err) {
            console.error("Auth check failed:", err);
            set({ user: {}, isAuthenticating: false });
        }
    },
    setUser: (user) => set({ user }),
}));
