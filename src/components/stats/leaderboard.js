import React, { useEffect, useState } from "react";
import "./leaderboard.css";
import "./mobile.css";
import playerPng from "../../assets/images/leaderboardMain.png";
import allayPng from "../../assets/images/allay.png";
import clockPng from "../../assets/images/minecraftclock.png";
import BlockParticles from "../extra/BlockParticles";
import goldIcon from "../../assets/images/goldIcon.png";
import mobicon from "../../assets/images/mobicon.png";
import killicon from "../../assets/images/killicon.png";
import deathicon from "../../assets/images/deathicon.png";
import bedicon from "../../assets/images/bedicon.png";
import foodicon from "../../assets/images/foodicon.png";
import damageicon from "../../assets/images/damageicon.png";
import tradeicon from "../../assets/images/tradeicon.png";
import {
  useFetchLeaderboard,
  useFetchTop10,
} from "../../hooks/useFetchLeaderboard";
import CreeperLoading from "../extra/CreeperLoading";
import aos from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "../extra/ScrollToTop";

const LeaderboardComponent = () => {
  const [leaderboard, setLeaderboard] = useState("playtime");
  const { LBdata, loading } = useFetchLeaderboard(leaderboard);
  const { loadingtop10, top10 } = useFetchTop10();
  useEffect(() => {
    aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <div className="rowflex LeaderBoardMain">
        <div className="lMainLeft columnflex">
          <div
            className="contentTitle whitetext textcenter"
            data-aos="fade-down"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-easing="ease-out-back"
          >
            Know<br></br> your position<br></br> in the leaderboard
          </div>
          <div
            className="normaltext textcenter"
            data-aos="zoom-in"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-easing="ease-out-back"
            data-aos-delay="500"
          >
            Don’t worry, we also have leaderboard for deaths
          </div>
        </div>
        <div className="lMainRight">
          <img className="floatingImg" src={allayPng}></img>
          <img
            src={playerPng}
            className="staticImg"
            data-aos="zoom-in-up"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-easing="ease-out-back"
          ></img>
        </div>
      </div>
      <div className="mainLeaderBoardContainner">
        <div className="mainLeaderBoard">
          <div className="lbanner">
            <BlockParticles></BlockParticles>
            <img src={clockPng} className="bannerImage"></img>
            <div className="contentTitle whitetext centertext">
              Top <font style={{ color: "var(--lightred)" }}>10</font> Players
            </div>
          </div>
          <div className="lListContainner">
            <div className="leaderboardTitles">
              <div className="rank">Rank</div>
              <div className="name">Player name</div>
              <div className="value endvalue">Hours</div>
            </div>
            <div className="lPlayerContainner">
              {loadingtop10
                ? "loading.."
                : top10.data && top10.err == null
                ? top10.data.map((data, i) => {
                    return (
                      <LeaderboardPlayer
                        rank={i + 1}
                        name={data.playerName}
                        value={data.value}
                        convert={true}
                      ></LeaderboardPlayer>
                    );
                  })
                : "Something went wrong!"}
            </div>
          </div>
        </div>
      </div>
      <div className="leaderboardContainnerBox">
        <div className="lselectionContainner">
          <div className="contentTitle whitetext textcenter selectionTitle">
            Top <font style={{ color: "var(--lightred)" }}>100</font>
          </div>
          <Selections
            setLeaderboard={setLeaderboard}
            leaderboard={leaderboard}
          ></Selections>
        </div>
        <div className="leaderboardContainner">
          <div className="contentTitle whitetext textcenter selectionTitle">
            {leaderboard == "playtime"
              ? "Playtime"
              : leaderboard == "mobkills" || leaderboard == "playerkills"
              ? "Player Kills"
              : leaderboard == "deaths"
              ? "Deaths"
              : leaderboard == "slept"
              ? "Sleeping"
              : leaderboard == "hungry"
              ? "Hungry Players"
              : leaderboard == "damage"
              ? "Damage Taken"
              : leaderboard == "traders"
              ? "Traders"
              : ""}
          </div>
          <div className="lcontainner">
            <div className="leaderboardTitles">
              <div className="rank">Rank</div>
              <div className="name">Player name</div>
              <div className="value endvalue">
                {leaderboard == "playtime"
                  ? "Hours"
                  : leaderboard == "mobkills" || leaderboard == "playerkills"
                  ? "Kills"
                  : leaderboard == "deaths"
                  ? "Deaths"
                  : leaderboard == "slept"
                  ? "Slept"
                  : leaderboard == "hungry"
                  ? "Times Eaten"
                  : leaderboard == "damage"
                  ? "Damage Taken"
                  : leaderboard == "trades"
                  ? "Trades"
                  : ""}
              </div>
            </div>
            {loading ? (
              <div className="loadingContainner">
                <CreeperLoading></CreeperLoading>
              </div>
            ) : LBdata.data !== null && LBdata.err == null ? (
              LBdata.data.map((data, i) => {
                return (
                  <LeaderboardPlayer
                    rank={i + 1}
                    key={i + "lbdata"}
                    name={data.playerName}
                    value={data.value}
                    highlight={i % 2 == 0 ? true : false}
                    convert={leaderboard == "playtime" ? true : false}
                  ></LeaderboardPlayer>
                );
              })
            ) : (
              <div className="normaltext">Something went wrong!</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const Selections = ({ setLeaderboard, leaderboard }) => {
  const handleClick = (board) => {
    setLeaderboard(board);
    var element = document.getElementsByClassName(
      "leaderboardContainnerBox"
    )[0];
    var headerOffset = 100;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
  return (
    <div className="lselectionLists">
      <div
        className={leaderboard == "playtime" ? "lselected llist" : "llist"}
        onClick={() => {
          handleClick("playtime");
        }}
      >
        <img className="llistIcon" src={clockPng}></img>
        Playtime
      </div>
      <div
        className={leaderboard == "balance" ? "lselected llist" : "llist"}
        onClick={() => handleClick("balance")}
      >
        <img className="llistIcon" src={goldIcon}></img>
        Balance
      </div>
      <div
        className={leaderboard == "mobkills" ? "lselected llist" : "llist"}
        onClick={() => handleClick("mobkills")}
      >
        <img className="llistIcon" src={mobicon}></img>
        Mob Kills
      </div>
      <div
        className={leaderboard == "playerkills" ? "lselected llist" : "llist"}
        onClick={() => handleClick("playerkills")}
      >
        <img className="llistIcon" src={killicon}></img>
        Player Kills
      </div>
      <div
        className={leaderboard == "deaths" ? "lselected llist" : "llist"}
        onClick={() => handleClick("deaths")}
      >
        <img className="llistIcon" src={deathicon}></img>
        Deaths
      </div>
      <div
        className={leaderboard == "slept" ? "lselected llist" : "llist"}
        onClick={() => handleClick("slept")}
      >
        <img className="llistIcon" src={bedicon}></img>
        Sleepers
      </div>
      <div
        className={leaderboard == "hungry" ? "lselected llist" : "llist"}
        onClick={() => handleClick("hungry")}
      >
        <img className="llistIcon" src={foodicon}></img>
        Hungry Players
      </div>
      <div
        className={leaderboard == "damage" ? "lselected llist" : "llist"}
        onClick={() => handleClick("damage")}
      >
        <img className="llistIcon" src={damageicon}></img>
        Damage Taken
      </div>
      <div
        className={leaderboard == "trades" ? "lselected llist" : "llist"}
        onClick={() => handleClick("trades")}
      >
        <img className="llistIcon" src={tradeicon}></img>
        Traders
      </div>
    </div>
  );
};
const LeaderboardPlayer = ({ rank, name, value, convert, highlight }) => {
  return (
    <div
      className={
        highlight ? "leaderboardPlayer lhighlight" : "leaderboardPlayer"
      }
    >
      <div className="rank">{rank}</div>
      <div className="name">{name}</div>
      <div className="value endvalue">
        {convert
          ? (value / 60).toFixed(2).toLocaleString("en", { useGrouping: true })
          : value.toLocaleString("en", { useGrouping: true })}
      </div>
    </div>
  );
};
export default LeaderboardComponent;
