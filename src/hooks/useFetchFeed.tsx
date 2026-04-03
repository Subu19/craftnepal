import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PostData } from "../types";
import { useBackgroundStore } from "../store/useBackgroundStore";

export const useFetchFeed = (posting: boolean) => {
    const [limit, setLimit] = useState(10);
    const [debouncedLimit, setDebouncedLimit] = useState(limit);

    // Debounce the limit update to prevent spamming the API
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedLimit(limit);
        }, 300);
        return () => clearTimeout(handler);
    }, [limit]);

    const {
        data: feed,
        isLoading: loading,
        isFetching: loadingMore,
        error: queryError
    } = useQuery<PostData[]>({
        queryKey: ['feed', debouncedLimit],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_API}feed/${debouncedLimit}`
            );
            const data = res.data;
            if (Array.isArray(data)) {
                return data;
            } else if (data && data.err) {
                throw new Error(data.err);
            } else {
                return data;
            }
        },
        enabled: !posting,
        staleTime: 1000 * 30, // 30 seconds for feed
    });

    const error = queryError ? (queryError as Error).message : null;

    return {
        loading: loading && !feed, // Only true on first load
        feed: feed || null,
        error: error || null,
        limit,
        setLimit,
        loadingMore: loadingMore && !!feed // True when refetching/loading more
    };
};

export const setDharaharaHero = (imageUrl: string, mode: "cover" | "contain" = "cover") => {
    // Legacy support: This will now use the store. This can't be called inside components.
    // Use the useBackgroundStore() inside components instead.
    // For outside components (utility usage), we access the store's state directly.
    useBackgroundStore.getState().setBackground(imageUrl, mode);

    // Apply basic root cleanup if needed (legacy behavior from original)
    const selectors = ["#root", "#app", "main", ".app"];
    for (const sel of selectors) {
        const node = document.querySelector<HTMLElement>(sel);
        if (node) {
            if (!node.style.position) node.style.position = "relative";
            node.style.zIndex = "1";
            if (!node.style.background) node.style.background = "transparent";
        }
    }
};

export const removeDharaharaHero = () => {
    useBackgroundStore.getState().clearBackground();
};

