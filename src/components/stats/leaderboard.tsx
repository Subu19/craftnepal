import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./leaderboard.css";
import "./mobile.css";
import clockPng from "../../assets/images/minecraftclock.webp";
import goldIcon from "../../assets/images/goldIcon.webp";
import mobicon from "../../assets/images/mobicon.webp";
import killicon from "../../assets/images/killicon.webp";
import deathicon from "../../assets/images/deathicon.webp";
import bedicon from "../../assets/images/bedicon.webp";
import foodicon from "../../assets/images/foodicon.webp";
import damageicon from "../../assets/images/damageicon.webp";
import tradeicon from "../../assets/images/tradeicon.webp";
import { useFetchLeaderboard } from "../../hooks/useFetchLeaderboard";
import CreeperLoading from "../extra/CreeperLoading";
import ScrollToTop from "../extra/ScrollToTop";

interface LeaderboardData {
    playerName: string;
    value: number;
}

const LeaderboardComponent = () => {
    const [leaderboard, setLeaderboard] = useState("playtime");
    const { LBdata, loading } = useFetchLeaderboard(leaderboard);
    const mainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".lselectionContainner > *", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".lselectionContainner",
                start: "top 80%",
            }
        });
    }, { scope: mainRef });

    useGSAP(() => {
        if (!loading && LBdata?.data) {
            gsap.from(".lPlayer-row-top100", {
                y: 20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.out",
                overwrite: "auto"
            });
        }
    }, { dependencies: [LBdata, loading], scope: mainRef });

    return (
        <>
            <ScrollToTop />
            <div ref={mainRef} className="leaderboardContainnerBox" style={{ marginTop: '0' }}>
                <div className="lselectionContainner">
                    <div className="contentTitle whitetext textcenter selectionTitle" style={{ fontSize: '2.5rem' }}>
                        Leaderboard
                    </div>
                    <div className="normaltext textcenter" style={{ marginBottom: '2rem', opacity: 0.8 }}>
                        Compete with the best and see where you stand among the top 10 players.
                    </div>
                    <Selections setLeaderboard={setLeaderboard} leaderboard={leaderboard} />
                </div>
                <div className="leaderboardContainner">
                    <div className="leaderboard-header">
                        <div className="contentTitle whitetext">
                            Top <span style={{ color: "var(--lb-accent)" }}>10</span> {leaderboard === "playtime"
                                ? "Most Active"
                                : leaderboard === "balance"
                                    ? "Richest Players"
                                    : leaderboard === "mobkills"
                                        ? "Slayers"
                                        : leaderboard === "playerkills"
                                            ? "Warriors"
                                            : leaderboard === "deaths"
                                                ? "Casualties"
                                                : leaderboard === "slept"
                                                    ? "Dreamers"
                                                    : leaderboard === "hungry"
                                                        ? "Gourmets"
                                                        : leaderboard === "damage"
                                                            ? "Tanks"
                                                            : leaderboard === "trades"
                                                                ? "Merchants"
                                                                : ""}
                        </div>
                        <div className="normaltext">
                            Showing the global rankings across all the dimensions of CraftNepal.
                        </div>
                    </div>

                    <div className="lcontainner">
                        <div className="leaderboardTitles">
                            <div className="rank">Rank</div>
                            <div className="name">User</div>
                            <div className="value" style={{ textAlign: "right" }}>
                                {leaderboard === "playtime"
                                    ? "Total Hours"
                                    : leaderboard === "balance"
                                        ? "Balance"
                                        : "Total Score"}
                            </div>
                        </div>
                        {loading ? (
                            <div className="loadingContainner">
                                <CreeperLoading />
                            </div>
                        ) : (LBdata.data !== null && LBdata.error == null) ? (
                            LBdata.data.slice(0, 10).map((data: LeaderboardData, i: number) => {
                                return (
                                    <div key={i + "lbdata"} className="lPlayer-row-top100">
                                        <LeaderboardPlayer
                                            rank={i + 1}
                                            name={data.playerName}
                                            value={data.value}
                                            highlight={i % 2 === 0}
                                            convert={leaderboard === "playtime"}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <div className="normaltext textcenter" style={{ padding: '2rem' }}>Something went wrong!</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

interface SelectionsProps {
    setLeaderboard: (board: string) => void;
    leaderboard: string;
}

const Selections = ({ setLeaderboard, leaderboard }: SelectionsProps) => {
    const handleClick = (board: string) => {
        setLeaderboard(board);
        const element = document.getElementsByClassName("leaderboardContainnerBox")[0];
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    };
    return (
        <div className="lselectionLists">
            <div
                className={leaderboard === "playtime" ? "lselected llist" : "llist"}
                onClick={() => handleClick("playtime")}
            >
                <img className="llistIcon" src={clockPng} alt="clock" />
                Playtime
            </div>
            <div className={leaderboard === "balance" ? "lselected llist" : "llist"} onClick={() => handleClick("balance")}>
                <img className="llistIcon" src={goldIcon} alt="gold" />
                Balance
            </div>
            <div className={leaderboard === "mobkills" ? "lselected llist" : "llist"} onClick={() => handleClick("mobkills")}>
                <img className="llistIcon" src={mobicon} alt="mob" />
                Mob Kills
            </div>
            <div className={leaderboard === "playerkills" ? "lselected llist" : "llist"} onClick={() => handleClick("playerkills")}>
                <img className="llistIcon" src={killicon} alt="kill" />
                Player Kills
            </div>
            <div className={leaderboard === "deaths" ? "lselected llist" : "llist"} onClick={() => handleClick("deaths")}>
                <img className="llistIcon" src={deathicon} alt="death" />
                Deaths
            </div>
            <div className={leaderboard === "slept" ? "lselected llist" : "llist"} onClick={() => handleClick("slept")}>
                <img className="llistIcon" src={bedicon} alt="bed" />
                Sleepers
            </div>
            <div className={leaderboard === "hungry" ? "lselected llist" : "llist"} onClick={() => handleClick("hungry")}>
                <img className="llistIcon" src={foodicon} alt="food" />
                Hungry Players
            </div>
            <div className={leaderboard === "damage" ? "lselected llist" : "llist"} onClick={() => handleClick("damage")}>
                <img className="llistIcon" src={damageicon} alt="damage" />
                Damage Taken
            </div>
            <div className={leaderboard === "trades" ? "lselected llist" : "llist"} onClick={() => handleClick("trades")}>
                <img className="llistIcon" src={tradeicon} alt="trade" />
                Traders
            </div>
        </div>
    );
};

const GsapCounter = ({ value, label, isFloat }: { value: number; label?: string; isFloat?: boolean }) => {
    const counterRef = useRef<HTMLSpanElement>(null);
    useGSAP(() => {
        if (!counterRef.current) return;
        gsap.fromTo(counterRef.current,
            { innerText: 0 },
            {
                innerText: isFloat ? value : Math.floor(value),
                duration: 1.5,
                snap: { innerText: isFloat ? 0.1 : 1 },
                scrollTrigger: {
                    trigger: counterRef.current,
                    start: "top 95%",
                },
                onUpdate: function () {
                    if (counterRef.current) {
                        counterRef.current.innerText = isFloat
                            ? parseFloat(this.targets()[0].innerText).toFixed(1)
                            : Math.floor(parseFloat(this.targets()[0].innerText)).toLocaleString();
                    }
                }
            }
        );
    }, { dependencies: [value] });

    return <><span ref={counterRef}>0</span>{label}</>;
};

interface LeaderboardPlayerProps {
    rank: number;
    name: string;
    value: number;
    convert: boolean;
    highlight: boolean;
}

const LeaderboardPlayer = ({ rank, name, value, convert, highlight }: LeaderboardPlayerProps) => {
    const displayValue = value ?? 0;
    const rankClass = rank <= 3 ? `rank-${rank}` : "";
    const headUrl = `url('https://craftnepal-skin-api.vercel.app/skin/head/${name}')`;
    const finalValue = convert ? displayValue / 60 : displayValue;

    return (
        <div
            className={`leaderboardPlayer ${highlight ? "lhighlight" : ""} ${rankClass}`}
            style={{ "--head-url": headUrl } as React.CSSProperties}
        >
            <div className="rank">#{rank}</div>
            <div className="name">{name}</div>
            <div className="value">
                <GsapCounter value={finalValue} isFloat={convert} />
            </div>
        </div>
    );
};
export default LeaderboardComponent;
