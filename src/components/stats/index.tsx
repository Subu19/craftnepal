import { useState, useRef } from "react";
import clock from "../../assets/images/clock.png";
import "./main.css";
import "./mobile.css";

import player from "../../assets/images/player.png";
import grasspng from "../../assets/images/grass.png";
import netherpng from "../../assets/images/nether.png";
import endpng from "../../assets/images/end.png";
import swordpng from "../../assets/images/sword.png";
import deathpng from "../../assets/images/death.png";
import mobpng from "../../assets/images/mob.png";
import ReactECharts from "echarts-for-react";
import LeaderboardComponent from "./leaderboard";
import { useFetchstatz } from "../../hooks/useFetchstatz";
import { useNavigate, useParams } from "react-router-dom";
import CreeperLoading from "../extra/CreeperLoading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GsapCounter = ({ value, label }: { value: number; label?: string }) => {
    const counterRef = useRef<HTMLSpanElement>(null);
    useGSAP(() => {
        if (!counterRef.current) return;
        gsap.fromTo(counterRef.current,
            { innerText: 0 },
            {
                innerText: Math.floor(value),
                duration: 1.5,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: counterRef.current,
                    start: "top 90%",
                }
            }
        );
    }, { dependencies: [value] });

    return <><span ref={counterRef}>0</span>{label}</>;
};

const StatsComponent = () => {
    const { username } = useParams();
    const { loading, statz } = useFetchstatz(username);
    const nevigate = useNavigate();
    const mainRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const value = (document.getElementById("userInput") as HTMLInputElement).value;
        nevigate("/stats/" + value);
    };

    useGSAP(() => {
        gsap.from(".clockImage", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
        gsap.from(".statRightMain > *", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
    }, { scope: mainRef });

    useGSAP(() => {
        if (!loading && statz?.data) {
            gsap.from(".animate-detail", {
                x: -50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                force3D: true
            });
            gsap.from(".animate-player-img", {
                scale: 0.9,
                opacity: 0,
                duration: 1.2,
                ease: "expo.out",
                delay: 0.2,
                force3D: true
            });
            gsap.from(".hStat", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: ".hostileStats",
                    start: "top 85%"
                }
            });
        }
    }, { dependencies: [statz, loading], scope: mainRef });

    return (
        <div ref={mainRef}>
            <div className="statMainPage">
                <div className="container rowflex" style={{ height: '100%', alignItems: 'center' }}>
                    <div className="statLeftMain">
                        <img
                            className="clockImage "
                            src={clock}
                            alt="clock"
                        ></img>
                    </div>

                    <div className="columnflex statRightMain">
                        <div className="contentTitle whitetext textcenter " style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>
                            Search your data
                        </div>
                        <div className="normaltext statSubText textcenter" style={{ fontSize: '1.1rem', opacity: 0.8 }}>
                            Check your in-game statistics, including playtime, kills, and more.
                        </div>
                        <form className="statForm" onSubmit={(e) => handleSubmit(e)}>
                            <input
                                required={true}
                                id="userInput"
                                className="statInput"
                                placeholder="Enter in-game username"
                            ></input>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container">
                {!username ? (
                    ""
                ) : loading ? (
                    <div className="loadingContainner">
                        <CreeperLoading></CreeperLoading>
                    </div>
                ) : (statz.data == null || statz.error) ? (
                    <div className="normaltext textcenter" style={{ padding: '4rem 0' }}>
                        <div className="contentTitle whitetext textcenter">
                            {statz.error || "Something went wrong!"}
                        </div>
                        <p style={{ opacity: 0.7, marginTop: '1rem' }}>
                            {statz.error ? "Please check for any typos or capitalization." : "Make sure that the username is correct."}
                        </p>
                    </div>
                ) : (
                    <div className="player-containner" style={{ padding: '0' }}>
                        <div className="player-hero-card">
                            <div className="player-details">
                                <div className="player-status-tag animate-detail">Member</div>
                                <div className="contentTitle playername animate-detail">{statz.data.playerName || username}</div>
                                <div className="totalplaytime animate-detail">
                                    <i className="fa fa-history"></i>
                                    Total Time: <GsapCounter value={statz.data.totalPlaytime / 60} label=" hr" />
                                </div>
                                <div className="normaltext animate-detail" style={{ opacity: 0.6 }}>
                                    Currently exploring the vast world of CraftNepal.
                                </div>
                            </div>
                            <div className="playerImage-box animate-player-img">
                                <img
                                    className="playerImage"
                                    src={statz.data.playerName ? "https://craftnepal-skin-api.vercel.app/skin/body/" + statz.data.playerName : player}
                                    alt="player"
                                />
                            </div>
                        </div>

                        <div className="stats-dashboard-grid">
                            <HostileStat kills={statz.data.kills}></HostileStat>

                            <div className="world-stats-wrapper">
                                <Playtime playtime={statz.data.playtime}></Playtime>
                            </div>

                            <div className="block-section">
                                <div className="block-info">
                                    <div className="contentTitle whitetext" style={{ marginBottom: '1rem' }}>Block Activity</div>
                                    <div className="normaltext" style={{ marginBottom: '2rem', opacity: 0.7 }}>
                                        A detailed breakdown of your environmental interaction and construction efforts.
                                    </div>

                                    <div className="block-stat-item">
                                        <div className="block-bar-wrapper">
                                            <div className="block-label">
                                                <span>Blocks Broken</span>
                                                <span>{statz.data.blocks.broken.toLocaleString()}</span>
                                            </div>
                                            <div className="block-bar">
                                                <div className="block-fill broken-fill" style={{ width: `${(statz.data.blocks.broken / (statz.data.blocks.broken + statz.data.blocks.placed)) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="block-stat-item">
                                        <div className="block-bar-wrapper">
                                            <div className="block-label">
                                                <span>Blocks Placed</span>
                                                <span>{statz.data.blocks.placed.toLocaleString()}</span>
                                            </div>
                                            <div className="block-bar">
                                                <div className="block-fill placed-fill" style={{ width: `${(statz.data.blocks.placed / (statz.data.blocks.broken + statz.data.blocks.placed)) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <BlockChart blocks={statz.data.blocks}></BlockChart>
                            </div>
                        </div>
                    </div>
                )}

                <div className="leaderboard-section-wrapper" style={{ marginTop: '4rem' }}>
                    <LeaderboardComponent />
                </div>
            </div>
        </div>
    );
};

const BlockChart = ({ blocks }: { blocks: any }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: chartRef.current,
            start: "top 80%",
            onEnter: () => setIsVisible(true)
        });
    }, []);

    const option = {
        tooltip: {
            trigger: "item",
            textStyle: {
                color: "#ffff",
            },
            extraCssText: "background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);",
        },

        series: [
            {
                name: "Blocks",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: 'rgba(0,0,0,0.5)',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#fff'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: blocks.broken, name: "Broken" },
                    { value: blocks.placed, name: "Placed" },
                ],
                color: ["#2997C6", "#95DA9C"],
            },
        ],
    };
    return (
        <div ref={chartRef} className="pieChart">
            {isVisible && <ReactECharts option={option} style={{ height: "400px" }}></ReactECharts>}
        </div>
    );
};

const Playtime = ({ playtime }: { playtime: any[] }) => {
    return (
        <>
            <div className="world-card overworld">
                <img className="world-card-icon" src={grasspng} alt="world" />
                <div className="world-info">
                    <div className="world-name">Overworld</div>
                    <div className="world-value">
                        <GsapCounter value={playtime == null ? 0 : (playtime.find((world) => world.world == "world")?.value || 0) / 60} />
                        <span style={{ fontSize: '1rem', opacity: 0.5, marginLeft: '5px' }}>HR</span>
                    </div>
                </div>
            </div>

            <div className="world-card nether">
                <img className="world-card-icon" src={netherpng} alt="nether" />
                <div className="world-info">
                    <div className="world-name">Nether</div>
                    <div className="world-value">
                        <GsapCounter value={playtime == null ? 0 : (playtime.find((world) => world.world == "world_nether")?.value || 0) / 60} />
                        <span style={{ fontSize: '1rem', opacity: 0.5, marginLeft: '5px' }}>HR</span>
                    </div>
                </div>
            </div>

            <div className="world-card end">
                <img className="world-card-icon" src={endpng} alt="end" />
                <div className="world-info">
                    <div className="world-name">The End</div>
                    <div className="world-value">
                        <GsapCounter value={playtime == null ? 0 : (playtime.find((world) => world.world == "world_the_end")?.value || 0) / 60} />
                        <span style={{ fontSize: '1rem', opacity: 0.5, marginLeft: '5px' }}>HR</span>
                    </div>
                </div>
            </div>
        </>
    );
};

const HostileStat = ({ kills }: { kills: any }) => {
    return (
        <>
            <div className="stat-card">
                <div className="stat-card-header">
                    <img className="stat-card-icon" src={mobpng} alt="mob" />
                    <div className="stat-card-title">Mob Kills</div>
                </div>
                <div className="stat-card-value">
                    <GsapCounter value={!kills ? 0 : kills.mob} />
                </div>
                <div className="normaltext" style={{ opacity: 0.5 }}>Defeated hostile creatures</div>
            </div>

            <div className="stat-card">
                <div className="stat-card-header">
                    <img className="stat-card-icon" src={swordpng} alt="sword" />
                    <div className="stat-card-title">Player Kills</div>
                </div>
                <div className="stat-card-value">
                    <GsapCounter value={!kills ? 0 : kills.player} />
                </div>
                <div className="normaltext" style={{ opacity: 0.5 }}>Victories in combat</div>
            </div>

            <div className="stat-card">
                <div className="stat-card-header">
                    <img className="stat-card-icon" src={deathpng} alt="death" />
                    <div className="stat-card-title">Deaths</div>
                </div>
                <div className="stat-card-value">
                    <GsapCounter value={!kills ? 0 : kills.deaths} />
                </div>
                <div className="normaltext" style={{ opacity: 0.5 }}>Lessons learned</div>
            </div>
        </>
    );
};

export default StatsComponent;
