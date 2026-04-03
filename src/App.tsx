import "./App.css";
import Path from "./routes/path";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Background from "./components/background/Background";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserStore } from "./store/useUserStore";
import { useSocketStore } from "./store/useSocketStore";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
});

function App() {
    const checkAuth = useUserStore((state) => state.checkAuth);
    const user = useUserStore((state) => state.user);
    const connect = useSocketStore((state) => state.connect);
    const disconnect = useSocketStore((state) => state.disconnect);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (user?.id && user?.username) {
            connect(user.id, user.username);
        } else {
            disconnect();
        }
    }, [user, connect, disconnect]);

    return (
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <Background />
                <Helmet>
                    <meta property="og:image" content="https://cdn.discordapp.com/attachments/1101600766533308496/1102489437268627456/CN.png" />
                </Helmet>
                <Path />
            </HelmetProvider>
        </QueryClientProvider>
    );
}

export default App;


