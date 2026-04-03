import { useSocketStore } from "../store/useSocketStore";

export function useSocket() {
    return useSocketStore((state) => state.socket) || undefined;
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
    // This is now purely for compatibility and doesn't wrap context anymore
    return <>{children}</>;
}

