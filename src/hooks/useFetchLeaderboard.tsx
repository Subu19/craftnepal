import axios from "axios";
import { useEffect, useState } from "react";

interface LeaderboardResponse {
    data: any[] | null;
    error: string | null;
}

export const useFetchLeaderboard = (board: string) => {
    const [loading, setLoading] = useState(true);
    const [LBdata, setLBdata] = useState<LeaderboardResponse>({ data: null, error: null });

    useEffect(() => {
        if (board) {
            setLoading(true);
            const getData = () => {
                axios
                    .get(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "leaderboard/" + board)
                    .then((res) => {
                        setLBdata({
                            data: res.data.data,
                            error: res.data.error || null
                        });
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.error("Leaderboard fetch error:", err);
                        setLBdata({ error: "Something went wrong", data: null });
                        setLoading(false);
                    });
            };
            getData();
        }
    }, [board]);

    return { loading, LBdata };
};

export const useFetchTop15 = () => {
    const [loadingtop15, setLoading] = useState(true);
    const [top15, setLBdata] = useState<LeaderboardResponse>({ data: null, error: null });

    useEffect(() => {
        const getData = () => {
            axios
                .get(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "leaderboard/top")
                .then((res) => {
                    setLBdata({
                        data: res.data.data,
                        error: res.data.error || null
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Top 15 fetch error:", err);
                    setLBdata({ error: "Something went wrong", data: null });
                    setLoading(false);
                });
        };
        getData();
    }, []);

    return { loadingtop15, top15 };
};
