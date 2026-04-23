import React, { useEffect, useState } from "react";
import "./leaderboard.css";
import "./mobile.css";
import "aos/dist/aos.css";
import playerPng from "../../assets/images/leaderboardMain.png";
import allayPng from "../../assets/images/allay.png";
import {
  useFetchOverview,
  useFetchStatLeaderboard,
  useFetchStatKeys,
} from "../../hooks/useStatsApi";
import CreeperLoading from "../extra/CreeperLoading";
import aos from "aos";
import ScrollToTop from "../extra/ScrollToTop";
import { Link } from "react-router-dom";

const BASE = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API;

const formatMinecraftId = (id) => {
  if (!id) return "";
  return id
    .replace("minecraft:", "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const formatValue = (value, unit) => {
  if (!value && value !== 0) return "0";
  if (unit === "ticks") return (value / 72000).toFixed(1) + " hrs";
  if (unit === "cm")
    return value >= 100000
      ? (value / 100000).toFixed(2) + " km"
      : (value / 100).toFixed(1) + " m";
  return value.toLocaleString();
};

/* ─── Category → CSS modifier + label mapping ─── */
const CATEGORY_MAP = {
  "minecraft:mined": { mod: "mined", label: "Mined" },
  "minecraft:crafted": { mod: "crafted", label: "Crafted" },
  "minecraft:broken": { mod: "broken", label: "Broken" },
  "minecraft:used": { mod: "used", label: "Used" },
  "minecraft:picked_up": { mod: "picked_up", label: "Picked Up" },
  "minecraft:dropped": { mod: "dropped", label: "Dropped" },
  "minecraft:killed": { mod: "killed", label: "Killed" },
  "minecraft:killed_by": { mod: "killed_by", label: "Killed By" },
  "minecraft:custom": { mod: "custom", label: "Custom" },
};

const getCategoryInfo = (cat) =>
  CATEGORY_MAP[cat] || {
    mod: "default",
    label: formatMinecraftId(cat.replace("minecraft:", "")),
  };

/* ─── Inline SVG icons for categories ─── */
const CategoryIcon = ({ category }) => {
  const p = {
    className: "catIcon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (category) {
    case "minecraft:mined":
      return (
        <svg {...p}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "minecraft:crafted":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
      );
    case "minecraft:broken":
      return (
        <svg {...p}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "minecraft:used":
      return (
        <svg {...p}>
          <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
          <path d="M15 15l3-3 3 3" />
          <line x1="18" y1="12" x2="18" y2="21" />
        </svg>
      );
    case "minecraft:picked_up":
      return (
        <svg {...p}>
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      );
    case "minecraft:dropped":
      return (
        <svg {...p}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      );
    case "minecraft:killed":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="10" />
          <line x1="22" y1="12" x2="18" y2="12" />
          <line x1="6" y1="12" x2="2" y2="12" />
          <line x1="12" y1="6" x2="12" y2="2" />
          <line x1="12" y1="22" x2="12" y2="18" />
        </svg>
      );
    case "minecraft:killed_by":
      return (
        <svg {...p}>
          <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
          <path d="M8 20l2-2 2 2 2-2 2 2" />
          <path d="M3.5 17A9.5 9.5 0 0 1 12 2.5 9.5 9.5 0 0 1 20.5 17" />
          <line x1="3.5" y1="17" x2="3.5" y2="20" />
          <line x1="20.5" y1="17" x2="20.5" y2="20" />
        </svg>
      );
    case "minecraft:custom":
      return (
        <svg {...p}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
  }
};

/* ─── Medal SVG for podium ─── */
const MedalIcon = ({ place }) => {
  const colors = {
    1: { primary: "#FFD700", secondary: "#d4a017" },
    2: { primary: "#C0C0C0", secondary: "#909090" },
    3: { primary: "#CD7F32", secondary: "#9a5e25" },
  };
  const { primary, secondary } = colors[place];
  return (
    <svg className="podMedal" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 2L12 10L16 2"
        stroke={secondary}
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="12"
        cy="15"
        r="7"
        fill={primary}
        opacity="0.18"
        stroke={primary}
        strokeWidth="1.5"
      />
      <polygon
        points="12,10 13.5,13 17,13.5 14.5,15.8 15.2,19.2 12,17.5 8.8,19.2 9.5,15.8 7,13.5 10.5,13"
        fill={primary}
        opacity="0.75"
      />
    </svg>
  );
};

/* ─── Empty state icon ─── */
const EmptyIcon = () => (
  <svg
    className="browseEmptyIcon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

/* ══════════════════════════════════════════
   Main Component
══════════════════════════════════════════ */
const LeaderboardComponent = () => {
  const { loading: ovLoading, overview, error: ovError } = useFetchOverview();
  const { loading: keysLoading, statKeys } = useFetchStatKeys();
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [selectedStat, setSelectedStat] = useState(null);
  const [catFilter, setCatFilter] = useState("all");
  const [search, setSearch] = useState("");
  const {
    loading: lbLoading,
    entries: lbEntries,
    error: lbError,
  } = useFetchStatLeaderboard(selectedStat);

  useEffect(() => {
    aos.init({ duration: 900, once: true });
  }, []);

  const categories = ["all", ...new Set(statKeys.map((k) => k.category))];
  const filtered = statKeys.filter((k) => {
    if (catFilter !== "all" && k.category !== catFilter) return false;
    if (
      search &&
      !formatMinecraftId(k.stat).toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const activeFeatured = overview[featuredIdx] || null;

  return (
    <>
      <ScrollToTop />

      {/* ── Hero ── */}
      <div className="rowflex LeaderBoardMain">
        <div className="lMainLeft columnflex">
          <div
            className="contentTitle whitetext textcenter"
            data-aos="fade-down"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-easing="ease-out-back"
          >
            Know
            <br /> your position
            <br /> in the leaderboard
          </div>
          <div
            className="normaltext textcenter"
            data-aos="zoom-in"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-easing="ease-out-back"
            data-aos-delay="500"
          >
            Browse every stat leaderboard from the server
          </div>
        </div>
        <div className="lMainRight">
          <img className="floatingImg" src={allayPng} alt="" />
          <img
            src={playerPng}
            className="staticImg"
            alt=""
            data-aos="zoom-in-up"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-easing="ease-out-back"
          />
        </div>
      </div>

      {/* ── Featured ── */}
      <section className="featured">
        <h2 className="secHeading" data-aos="fade-up">
          Featured
        </h2>

        {ovLoading ? (
          <div className="loadingContainner">
            <CreeperLoading />
          </div>
        ) : ovError ? (
          <p className="normaltext textcenter">{ovError}</p>
        ) : (
          overview.length > 0 && (
            <>
              {/* Tabs */}
              <div className="fTabs" data-aos="fade-up">
                {overview.map((b, i) => (
                  <button
                    key={b.key}
                    className={`fTab ${i === featuredIdx ? "fTabOn" : ""}`}
                    onClick={() => setFeaturedIdx(i)}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {/* Podium */}
              {activeFeatured && activeFeatured.entries.length >= 3 && (
                <Podium
                  entries={activeFeatured.entries}
                  unit={activeFeatured.unit}
                />
              )}

              {/* Rest (4+) */}
              {activeFeatured && activeFeatured.entries.length > 3 && (
                <div className="restList" data-aos="fade-up">
                  {activeFeatured.entries.slice(3).map((e) => (
                    <Link
                      to={`/stats/${e.name}`}
                      className="restRow"
                      key={e.uuid}
                    >
                      <span className="restRank">{e.rank}</span>
                      <img
                        className="restHead"
                        src={`${BASE}skin/head/${e.uuid}`}
                        alt=""
                      />
                      <span className="restName">{e.name}</span>
                      <span className="restVal">
                        {formatValue(e.value, activeFeatured.unit)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )
        )}
      </section>

      {/* ── Browse All ── */}
      <section className="browse">
        <h2 className="secHeading" data-aos="fade-up">
          Browse All
        </h2>
        <div className="browseSplit" data-aos="fade-up">
          {/* Left: stat picker */}
          <div className="browseLeft">
            <div className="browseBar">
              <select
                className="bSelect"
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "all"
                      ? "All Categories"
                      : formatMinecraftId(c.replace("minecraft:", ""))}
                  </option>
                ))}
              </select>
              <input
                className="bSearch"
                placeholder="Search stats…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="bKeys">
              {keysLoading ? (
                <p className="normaltext textcenter">Loading…</p>
              ) : filtered.length === 0 ? (
                <p className="normaltext textcenter">No stats found</p>
              ) : (
                filtered.map((k) => {
                  const catInfo = getCategoryInfo(k.category);
                  return (
                    <div
                      key={k.key}
                      className={`bKey ${selectedStat === k.key ? "bKeyOn" : ""}`}
                      onClick={() => setSelectedStat(k.key)}
                    >
                      <span className={`bKeyCat bKeyCat--${catInfo.mod}`}>
                        <CategoryIcon category={k.category} />
                        {catInfo.label}
                      </span>
                      <span className="bKeyName">
                        {formatMinecraftId(k.stat)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right: leaderboard result */}
          <div className="browseRight" id="browseTable">
            {selectedStat ? (
              <div className="browseResult">
                <h2 className="secHeading">
                  {formatMinecraftId(selectedStat.split("/").pop())}
                </h2>
                {lbLoading ? (
                  <div className="loadingContainner">
                    <CreeperLoading />
                  </div>
                ) : lbError ? (
                  <p className="normaltext textcenter">{lbError}</p>
                ) : lbEntries.length === 0 ? (
                  <p className="normaltext textcenter">No entries</p>
                ) : (
                  <div className="lbRows">
                    {lbEntries.map((e, i) => (
                      <Link
                        to={`/stats/${e.name}`}
                        key={e.uuid}
                        className={`lbRow ${i % 2 === 0 ? "lbRowAlt" : ""}`}
                      >
                        <span className="lbRank">{e.rank}</span>
                        <img
                          className="lbHead"
                          src={`${BASE}skin/head/${e.uuid}`}
                          alt=""
                        />
                        <span className="lbName">{e.name}</span>
                        <span className="lbVal">
                          {e.value.toLocaleString()}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="browseEmpty">
                <EmptyIcon />
                <p className="normaltext textcenter">
                  Select a stat to view the leaderboard
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

/* ── Podium ── */
const Podium = ({ entries, unit }) => {
  const [first, second, third] = entries;
  return (
    <div className="podium" data-aos="fade-up">
      <PodiumSlot entry={second} unit={unit} place={2} />
      <PodiumSlot entry={first} unit={unit} place={1} />
      <PodiumSlot entry={third} unit={unit} place={3} />
    </div>
  );
};

const PodiumSlot = ({ entry, unit, place }) => {
  const cls = place === 1 ? "podFirst" : place === 2 ? "podSecond" : "podThird";
  return (
    <Link to={`/stats/${entry.name}`} className={`podSlot ${cls}`}>
      <div className="podPlayer">
        <img
          className="podSkin"
          src={`${BASE}skin/body/${entry.uuid}`}
          alt={entry.name}
        />
        <span className="podName">{entry.name}</span>
        <span className="podVal">{formatValue(entry.value, unit)}</span>
      </div>
      <div className="podPedestal">
        <MedalIcon place={place} />
        <span className="podRank">{place}</span>
      </div>
    </Link>
  );
};

export default LeaderboardComponent;
