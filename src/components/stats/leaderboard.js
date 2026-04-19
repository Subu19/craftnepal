import React, { useEffect, useState } from "react";
import "./leaderboard.css";
import "./mobile.css";
import "aos/dist/aos.css";
import playerPng from "../../assets/images/leaderboardMain.png";
import allayPng from "../../assets/images/allay.png";
import { useFetchOverview, useFetchStatLeaderboard, useFetchStatKeys } from "../../hooks/useStatsApi";
import CreeperLoading from "../extra/CreeperLoading";
import aos from "aos";
import ScrollToTop from "../extra/ScrollToTop";
import { Link } from "react-router-dom";

const BASE = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API;

const formatMinecraftId = (id) => {
    if (!id) return "";
    return id.replace("minecraft:", "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const formatValue = (value, unit) => {
    if (!value && value !== 0) return "0";
    if (unit === "ticks") return (value / 72000).toFixed(1) + " hrs";
    if (unit === "cm") return value >= 100000 ? (value / 100000).toFixed(2) + " km" : (value / 100).toFixed(1) + " m";
    return value.toLocaleString();
};

const LeaderboardComponent = () => {
    const { loading: ovLoading, overview, error: ovError } = useFetchOverview();
    const { loading: keysLoading, statKeys } = useFetchStatKeys();
    const [featuredIdx, setFeaturedIdx] = useState(0);
    const [selectedStat, setSelectedStat] = useState(null);
    const [catFilter, setCatFilter] = useState("all");
    const [search, setSearch] = useState("");
    const { loading: lbLoading, entries: lbEntries, error: lbError } = useFetchStatLeaderboard(selectedStat);

    useEffect(() => { aos.init({ duration: 1000 }); }, []);

    const categories = ["all", ...new Set(statKeys.map((k) => k.category))];
    const filtered = statKeys.filter((k) => {
        if (catFilter !== "all" && k.category !== catFilter) return false;
        if (search && !formatMinecraftId(k.stat).toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const handlePickStat = (key) => {
        setSelectedStat(key);
        setTimeout(() => {
            const el = document.getElementById("browseTable");
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
        }, 80);
    };

    const activeFeatured = overview[featuredIdx] || null;

    return (
        <>
            <ScrollToTop />

            {/* ── Hero ── */}
            <div className="rowflex LeaderBoardMain">
                <div className="lMainLeft columnflex">
                    <div className="contentTitle whitetext textcenter"
                        data-aos="fade-down" data-aos-anchor-placement="bottom-bottom" data-aos-easing="ease-out-back">
                        Know<br /> your position<br /> in the leaderboard
                    </div>
                    <div className="normaltext textcenter"
                        data-aos="zoom-in" data-aos-anchor-placement="bottom-bottom" data-aos-easing="ease-out-back" data-aos-delay="500">
                        Browse every stat leaderboard from the server
                    </div>
                </div>
                <div className="lMainRight">
                    <img className="floatingImg" src={allayPng} alt="" />
                    <img src={playerPng} className="staticImg" alt=""
                        data-aos="zoom-in-up" data-aos-anchor-placement="bottom-bottom" data-aos-easing="ease-out-back" />
                </div>
            </div>

            {/* ── Featured Leaderboards ── */}
            <section className="featured">
                <h2 className="secHeading" data-aos="fade-right">Featured</h2>

                {ovLoading ? (
                    <div className="loadingContainner"><CreeperLoading /></div>
                ) : ovError ? (
                    <p className="normaltext textcenter">{ovError}</p>
                ) : overview.length > 0 && (
                    <>
                        {/* Tabs */}
                        <div className="fTabs" data-aos="fade-up">
                            {overview.map((b, i) => (
                                <button key={b.key}
                                    className={`fTab ${i === featuredIdx ? "fTabOn" : ""}`}
                                    onClick={() => setFeaturedIdx(i)}>
                                    {b.label}
                                </button>
                            ))}
                        </div>

                        {/* Podium */}
                        {activeFeatured && activeFeatured.entries.length >= 3 && (
                            <Podium entries={activeFeatured.entries} unit={activeFeatured.unit} />
                        )}

                        {/* Rest (4–10) */}
                        {activeFeatured && activeFeatured.entries.length > 3 && (
                            <div className="restList" data-aos="fade-up">
                                {activeFeatured.entries.slice(3).map((e) => (
                                    <Link to={`/stats/${e.name}`} className="restRow" key={e.uuid}>
                                        <span className="restRank">{e.rank}</span>
                                        <img className="restHead" src={`${BASE}skin/head/${e.uuid}`} alt="" />
                                        <span className="restName">{e.name}</span>
                                        <span className="restVal">{formatValue(e.value, activeFeatured.unit)}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* ── Browse All ── */}
            <section className="browse">
                <h2 className="secHeading" data-aos="fade-right">Browse All</h2>
                <div className="browseBar" data-aos="fade-up">
                    <select className="bSelect" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c === "all" ? "All Categories" : formatMinecraftId(c.replace("minecraft:", ""))}</option>
                        ))}
                    </select>
                    <input className="bSearch" placeholder="Search stats…" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="bKeys" data-aos="fade-up">
                    {keysLoading ? (
                        <p className="normaltext textcenter">Loading…</p>
                    ) : filtered.length === 0 ? (
                        <p className="normaltext textcenter" style={{ gridColumn: "1/-1" }}>No stats found</p>
                    ) : (
                        filtered.map((k) => (
                            <div key={k.key}
                                className={`bKey ${selectedStat === k.key ? "bKeyOn" : ""}`}
                                onClick={() => handlePickStat(k.key)}>
                                <span className="bKeyCat">{formatMinecraftId(k.category.replace("minecraft:", ""))}</span>
                                <span className="bKeyName">{formatMinecraftId(k.stat)}</span>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* ── Selected leaderboard table ── */}
            {selectedStat && (
                <section className="browseResult" id="browseTable">
                    <h2 className="secHeading">
                        {formatMinecraftId(selectedStat.split("/").pop())}
                    </h2>
                    {lbLoading ? (
                        <div className="loadingContainner"><CreeperLoading /></div>
                    ) : lbError ? (
                        <p className="normaltext textcenter">{lbError}</p>
                    ) : lbEntries.length === 0 ? (
                        <p className="normaltext textcenter">No entries</p>
                    ) : (
                        <div className="lbRows">
                            {lbEntries.map((e, i) => (
                                <Link to={`/stats/${e.name}`} key={e.uuid}
                                    className={`lbRow ${i % 2 === 0 ? "lbRowAlt" : ""}`}>
                                    <span className="lbRank">{e.rank}</span>
                                    <img className="lbHead" src={`${BASE}skin/head/${e.uuid}`} alt="" />
                                    <span className="lbName">{e.name}</span>
                                    <span className="lbVal">{e.value.toLocaleString()}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            )}
        </>
    );
};

/* ─── Podium ─── */
const Podium = ({ entries, unit }) => {
    const [first, second, third] = entries;
    return (
        <div className="podium" data-aos="zoom-in">
            <PodiumSlot entry={second} unit={unit} place={2} />
            <PodiumSlot entry={first} unit={unit} place={1} />
            <PodiumSlot entry={third} unit={unit} place={3} />
        </div>
    );
};

const PodiumSlot = ({ entry, unit, place }) => {
    const cls = place === 1 ? "podFirst" : place === 2 ? "podSecond" : "podThird";
    const badge = place === 1 ? "podGold" : place === 2 ? "podSilver" : "podBronze";
    return (
        <Link to={`/stats/${entry.name}`} className={`podSlot ${cls}`}>
            <img className="podSkin" src={`${BASE}/skin/body/${entry.uuid}`} alt={entry.name} />
            <span className={`podBadge ${badge}`}>{place}</span>
            <span className="podName">{entry.name}</span>
            <span className="podVal">{formatValue(entry.value, unit)}</span>
        </Link>
    );
};

export default LeaderboardComponent;
