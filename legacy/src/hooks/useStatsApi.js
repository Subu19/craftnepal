import axios from "axios";
import { useEffect, useState } from "react";

const BASE = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API;

/**
 * Fetch a single player's full summary by name or UUID.
 * GET /api/player/:identifier -> PlayerSummary
 */
export const useFetchPlayer = (identifier) => {
    const [loading, setLoading] = useState(false);
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!identifier) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        setPlayer(null);
        axios
            .get(`${BASE}player/${identifier}`)
            .then((res) => {
                console.log(res.data.data.player)
                setPlayer(res.data.data.player);
                setLoading(false);
            })
            .catch(() => {
                setError("Player not found or something went wrong.");
                setLoading(false);
            });
    }, [identifier]);

    return { loading, player, error };
};

/**
 * Fetch leaderboard overview (featured leaderboards with top entries).
 * GET /api/leaderboard/overview -> FeaturedLeaderboard[]
 */
export const useFetchOverview = () => {
    const [loading, setLoading] = useState(true);
    const [overview, setOverview] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${BASE}leaderboard/overview`)
            .then((res) => {
                setOverview(res.data.data.featured);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load leaderboard overview.");
                setLoading(false);
            });
    }, []);

    return { loading, overview, error };
};

/**
 * Fetch leaderboard entries for a specific stat key.
 * GET /api/leaderboard/:stat(*) -> LeaderboardEntry[]
 */
export const useFetchStatLeaderboard = (statKey) => {
    const [loading, setLoading] = useState(false);
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!statKey) return;
        setLoading(true);
        setError(null);
        setEntries([]);
        axios
            .get(`${BASE}leaderboard/${statKey}`)
            .then((res) => {
                setEntries(res.data.data.entries);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load leaderboard.");
                setLoading(false);
            });
    }, [statKey]);

    return { loading, entries, error };
};

/**
 * Search players with debounced query.
 * GET /api/players?q=<query>&limit=10&page=1
 * Only fires when query is at least 1 character.
 */
export const useSearchPlayers = (query) => {
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if (!query || query.trim().length === 0) {
            setPlayers([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const debounce = setTimeout(() => {
            axios
                .get(`${BASE}players`, {
                    params: { q: query.trim(), limit: 10, page: 1 },
                })
                .then((res) => {
                    setPlayers(res.data.data.players || []);
                    setLoading(false);
                })
                .catch(() => {
                    setPlayers([]);
                    setLoading(false);
                });
        }, 300);

        return () => clearTimeout(debounce);
    }, [query]);

    return { loading, players };
};

/**
 * Fetch all available stat keys for search / filtering.
 * GET /api/stats/keys -> StatKeyEntry[]
 */
export const useFetchStatKeys = () => {
    const [loading, setLoading] = useState(true);
    const [statKeys, setStatKeys] = useState([]);

    useEffect(() => {
        axios
            .get(`${BASE}stats/keys`)
            .then((res) => {
                setStatKeys(res.data.data.keys);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return { loading, statKeys };
};
