import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchstatz = (username: string | undefined) => {
    const [loading, setLoading] = useState(true);
    const [statz, setStatz] = useState<any>(null);
    useEffect(() => {
        if (username) {
            setLoading(true);
            getData();
        }
    }, [username]);
    const getData = () => {
        axios
            .get(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "statz/" + username)
            .then((res) => {
                setStatz(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setStatz({ error: "Something went wrong", data: null });
                setLoading(false);
            });
    };

    return { loading, statz };
};

