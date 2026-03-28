import axios from "axios";
import { useEffect, useState } from "react";
import { PostData } from "../types";

export const useFetchFeed = (posting: boolean) => {
    const [limit, setLimit] = useState(10);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [feed, setFeed] = useState<PostData[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!posting) {
            setLoading(true);
            getData();
        }
    }, [posting]);

    useEffect(() => {
        setLoadingMore(true);
        getData();
    }, [limit]);

    const getData = () => {
        axios
            .get(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "feed/" + limit)
            .then((res) => {
                const data = res.data;
                if (Array.isArray(data)) {
                    setFeed(data);
                    setError(null);
                } else if (data && data.err) {
                    setError(data.err);
                    setFeed(null);
                } else {
                    setFeed(data);
                    setError(null);
                }
                setLoading(false);
                setLoadingMore(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Something went wrong");
                setFeed(null);
                setLoading(false);
                setLoadingMore(false);
            });
    };

    return { loading, feed, error, limit, setLimit, loadingMore };
};

export const setDharaharaHero = (imageUrl: string, mode: "cover" | "contain" = "cover") => {
    const existing = document.getElementById("dharahara-hero-bg");
    if (existing) existing.remove();

    if (!imageUrl) return;

    const el = document.createElement("div");
    el.id = "dharahara-hero-bg";
    Object.assign(el.style, {
        position: "fixed",
        inset: "0px",
        width: "100%",
        height: "100vh",
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: mode === "cover" ? "cover" : "contain",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundColor: "transparent",
        pointerEvents: "none",
        zIndex: "-1000",
    } as Partial<CSSStyleDeclaration>);

    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";

    document.body.insertBefore(el, document.body.firstChild);

    const selectors = ["#root", "#app", "main", ".app", "body > div:first-child"];
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
    const existing = document.getElementById("dharahara-hero-bg");
    if (existing) existing.remove();
};
