import { create } from 'zustand';

interface BackgroundState {
    imageUrl: string | null;
    mode: "cover" | "contain";
    setBackground: (imageUrl: string, mode?: "cover" | "contain") => void;
    clearBackground: () => void;
}

export const useBackgroundStore = create<BackgroundState>((set) => ({
    imageUrl: null,
    mode: "cover",
    setBackground: (imageUrl, mode = "cover") => set({ imageUrl, mode }),
    clearBackground: () => set({ imageUrl: null, mode: "cover" }),
}));
