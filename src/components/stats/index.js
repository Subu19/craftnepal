import React, { useEffect, useState, useRef, useCallback } from "react";
import "./main.css";
import "./mobile.css";
import "aos/dist/aos.css";
import clock from "../../assets/images/clock.png";
import Aos from "aos";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useFetchPlayer, useSearchPlayers } from "../../hooks/useStatsApi";
import { useNavigate, useParams } from "react-router-dom";
import CreeperLoading from "../extra/CreeperLoading";

const BASE = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API;

const formatMinecraftId = (id) => {
    if (!id) return "";
    return id.replace("minecraft:", "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const OVERVIEW_STATS = [
    { key: "playTime", label: "Play Time", transform: (v) => (v || 0) / 72000, decimals: 1, suffix: " hrs" },
    { key: "mobKills", label: "Mob Kills" },
    { key: "deaths", label: "Deaths" },
    { key: "totalBlocksMined", label: "Blocks Mined" },
    { key: "distanceWalked", label: "Distance", transform: (v) => (v || 0) / 100000, decimals: 2, suffix: " km" },
    { key: "jumps", label: "Jumps" },
    { key: "damageDealt", label: "Damage" },
    { key: "distanceFlown", label: "Flown", transform: (v) => (v || 0) / 100000, decimals: 2, suffix: " km" },
    { key: "timesLoggedOut", label: "Logins" },
];

const STAT_CATEGORIES = [
    { key: "custom", label: "Custom" },
    { key: "mined", label: "Mined" },
    { key: "used", label: "Used" },
    { key: "picked_up", label: "Picked Up" },
    { key: "dropped", label: "Dropped" },
    { key: "killed", label: "Killed" },
    { key: "killed_by", label: "Killed By" },
    { key: "crafted", label: "Crafted" },
    { key: "broken", label: "Broken" },
];

const StatsComponent = () => {
    const { username } = useParams();
    const { loading, player: playerData, error } = useFetchPlayer(username);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("custom");
    const [searchTerm, setSearchTerm] = useState("");

    const [inputValue, setInputValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const { loading: searchLoading, players: searchResults } = useSearchPlayers(inputValue);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = inputValue.trim();
        if (value) { navigate("/stats/" + value); setShowDropdown(false); }
    };

    const handleSelectPlayer = useCallback((name) => {
        setInputValue(name);
        setShowDropdown(false);
        navigate("/stats/" + name);
    }, [navigate]);

    const handleInputChange = (e) => { setInputValue(e.target.value); setShowDropdown(true); };

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
                inputRef.current && !inputRef.current.contains(e.target)) setShowDropdown(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => { Aos.init({ duration: 1000 }); }, []);

    return (
        <>
            {/* ── Hero ── */}
            <div className="rowflex statMainPage">
                <div className="statLeftMain">
                    <img className="clockImage" src={clock} alt="Clock"
                        data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-easing="ease-out-back" />
                </div>
                <div className="columnflex statRightMain">
                    <div className="contentTitle whitetext textcenter"
                        data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-easing="ease-out-back">
                        Player<br /> Statistics
                    </div>
                    <div className="normaltext statSubText textcenter"
                        data-aos="zoom-in" data-aos-anchor-placement="bottom-bottom" data-aos-easing="ease-out">
                        Search any player to view their complete in-game statistics.
                    </div>
                    <form autoComplete="off" className="statForm" onSubmit={handleSubmit}>
                        <div className="statInputWrapper" data-aos="flip-left"
                            data-aos-anchor-placement="bottom-bottom" data-aos-easing="ease-out-back">
                            <input name="playername" required ref={inputRef} id="userInput"
                                className="statInput" placeholder="Enter in-game username"
                                value={inputValue} onChange={handleInputChange}
                                onFocus={() => inputValue.trim() && setShowDropdown(true)}
                                autoComplete="off" />
                            {showDropdown && inputValue.trim().length > 0 && (
                                <div className="playerDropdown" ref={dropdownRef}>
                                    {searchLoading ? (
                                        <div className="ddItem ddMuted">Searching…</div>
                                    ) : searchResults.length > 0 ? (
                                        searchResults.map((p) => (
                                            <div key={p.uuid} className="ddItem" onClick={() => handleSelectPlayer(p.name)}>
                                                <img className="ddHead" src={`${BASE}skin/head/${p.uuid}`} alt="" />
                                                <span>{p.name}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="ddItem ddMuted">No players found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* ── Player Content ── */}
            {!username ? null : loading ? (
                <div className="loadingContainner"><CreeperLoading /></div>
            ) : error || !playerData ? (
                <div className="statsError">
                    <div className="contentTitle whitetext textcenter">Something went wrong!</div>
                    <p className="normaltext textcenter">Make sure the username is correct</p>
                </div>
            ) : (
                <>
                    {/* Profile */}
                    <div className="profile" data-aos="fade-up">
                        <div className="profileSkin">
                            <img className="bodySkin" src={`${BASE}skin/body/${playerData.uuid}`} alt={playerData.name} />
                        </div>
                        <div className="profileInfo">
                            <h1 className="profileName">{playerData.name}</h1>
                            <span className="profileUuid">{playerData.uuid}</span>
                            <div className="profileLine"></div>
                            <OverviewStats overview={playerData.overview} />
                        </div>
                    </div>

                    {/* Detailed Stats */}
                    <div className="detailed" data-aos="fade-up">
                        <h2 className="detailedHeading">Detailed Stats</h2>
                        <div className="pills">
                            {STAT_CATEGORIES.map((c) => (
                                <button key={c.key}
                                    className={`pill ${activeTab === c.key ? "pillOn" : ""}`}
                                    onClick={() => { setActiveTab(c.key); setSearchTerm(""); }}>
                                    {c.label}
                                </button>
                            ))}
                        </div>
                        <input className="detailedFilter" placeholder="Filter stats…"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <StatTable stats={playerData.stats[activeTab] || {}} searchTerm={searchTerm} />
                    </div>
                </>
            )}
        </>
    );
};

/* ─── Overview ─── */
const OverviewStats = ({ overview }) => {
    const [counting, setCounting] = useState(false);
    return (
        <ScrollTrigger onEnter={() => setCounting(true)} onExit={() => setCounting(false)}>
            <div className="oGrid">
                {OVERVIEW_STATS.map((s) => (
                    <div className="oCell" key={s.key}>
                        <span className="oLabel">{s.label}</span>
                        <span className="oVal">
                            {counting ? (
                                <CountUp end={s.transform ? s.transform(overview[s.key]) : (overview[s.key] || 0)}
                                    duration={2} separator="," decimals={s.decimals || 0} suffix={s.suffix || ""} />
                            ) : "0"}
                        </span>
                    </div>
                ))}
            </div>
        </ScrollTrigger>
    );
};

/* ─── Stat Table ─── */
const StatTable = ({ stats, searchTerm }) => {
    const rows = Object.entries(stats)
        .filter(([k]) => formatMinecraftId(k).toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => b[1] - a[1]);

    if (!rows.length) return <div className="tableEmpty">No stats found</div>;

    return (
        <div className="sTable">
            {rows.map(([k, v], i) => (
                <div className={`sRow ${i % 2 === 0 ? "sRowAlt" : ""}`} key={k}>
                    <span className="sName">{formatMinecraftId(k)}</span>
                    <span className="sVal">{v.toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
};

export default StatsComponent;
