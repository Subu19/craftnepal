import React, { useEffect, useState, useRef, useCallback } from "react";
import "./main.css";
import "./mobile.css";
import "aos/dist/aos.css";
import clock from "../../assets/images/clock.png";
import Aos from "aos";
import CountUp from "react-countup";
import { useFetchPlayer, useSearchPlayers } from "../../hooks/useStatsApi";
import { useNavigate, useParams } from "react-router-dom";
import CreeperLoading from "../extra/CreeperLoading";

const BASE = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API;

const formatMinecraftId = (id) => {
    if (!id) return "";
    return id.replace("minecraft:", "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const OVERVIEW_STATS = [
    { key: "playTime", label: "Play Time", transform: (v) => (v || 0) / 72000, decimals: 1, suffix: " hrs", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> },
    { key: "mobKills", label: "Mob Kills", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h5v5l-10 10-5-5 10-10z"></path><path d="M6 14l4 4"></path></svg> },
    { key: "deaths", label: "Deaths", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="15" cy="12" r="1"></circle><path d="M8 20v2h8v-2"></path><path d="M12.5 17l-.5-1-.5 1h11.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"></path></svg> },
    { key: "totalBlocksMined", label: "Blocks Mined", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> },
    { key: "distanceWalked", label: "Distance", transform: (v) => (v || 0) / 100000, decimals: 2, suffix: " km", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> },
    { key: "jumps", label: "Jumps", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"></path><path d="M19 12l-7-7-7 7"></path></svg> },
    { key: "damageDealt", label: "Damage", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> },
    { key: "distanceFlown", label: "Flown", transform: (v) => (v || 0) / 100000, decimals: 2, suffix: " km", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg> },
    { key: "timesLoggedOut", label: "Logins", icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> },
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
    return (
        <div className="oGrid">
            {OVERVIEW_STATS.map((stat, i) => {
                const rawVal = overview[stat.key] || 0;
                const val = stat.transform ? stat.transform(rawVal) : rawVal;
                
                return (
                    <div className="oCell" key={stat.key} data-aos="fade-up" data-aos-delay={i * 50}>
                        <div className="oLabel">
                            <span className="oIcon">{stat.icon}</span>
                            {stat.label}
                        </div>
                        <div className="oVal">
                            <CountUp 
                                end={val} 
                                decimals={stat.decimals || 0} 
                                duration={2.5} 
                                separator="," 
                            />
                            {stat.suffix && <span className="oSuffix">{stat.suffix}</span>}
                        </div>
                    </div>
                );
            })}
        </div>
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
