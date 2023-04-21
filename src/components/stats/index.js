import React, { useEffect, useState } from "react";
import clock from "../../assets/images/clock.png";
import "./main.css";
import player from "../../assets/images/player.png";
import grasspng from "../../assets/images/grass.png";
import netherpng from "../../assets/images/nether.png";
import endpng from "../../assets/images/end.png";
import swordpng from "../../assets/images/sword.png";
import deathpng from "../../assets/images/death.png";
import mobpng from "../../assets/images/mob.png";
import Aos from "aos";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import ReactECharts from "echarts-for-react";
import BubblesBack from "./bubbles";

const StatsComponent = () => {
  const [count, setCount] = useState(false);
  const [showchart, setchart] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <div className="rowflex statMainPage">
        <div className="statLeftMain">
          <img
            className="clockImage "
            src={clock}
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-easing="ease-out-back"
          ></img>
        </div>

        <div className="columnflex statRightMain">
          <div
            className="contentTitle whitetext textcenter "
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-easing="ease-out-back"
          >
            Wanna know how <br></br> many hours you wasted?
          </div>
          <div
            className="normaltext statSubText textcenter"
            data-aos="zoom-in"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-easing="ease-out"
          >
            We provide all stats of players in game including kills, playtime,
            death..etc.
          </div>
          <input
            className="statInput"
            placeholder="Enter in-game username"
            data-aos="flip-left"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-easing="ease-out-back"
          ></input>
        </div>
      </div>
      <div className="rowflex player-containner">
        <div className="columnflex player-details">
          <div className="contentTitle whitetext playername">Kp_Oli</div>
          <ScrollTrigger
            onEnter={() => setCount(true)}
            onExit={() => setCount(false)}
          >
            <Playtime count={count}></Playtime>
          </ScrollTrigger>
        </div>

        <div className="playerImage-box">
          <img className="playerImage" src={player}></img>
        </div>
      </div>
      <HostileStat></HostileStat>
      <ScrollTrigger
        onEnter={() => setchart(true)}
        onExit={() => setchart(false)}
      >
        <BlockChart show={showchart}></BlockChart>
      </ScrollTrigger>
    </>
  );
};

const BlockChart = ({ show }) => {
  const option = {
    title: {
      left: "center",
      top: 20,
      textStyle: {
        color: "#ccc",
      },
    },
    tooltip: {
      trigger: "item",
      textStyle: {
        color: "#ffff",
      },
      extraCssText:
        "background: linear-gradient(313deg,rgba(139, 139, 139, 1) 0%,rgba(255, 255, 255, 0) 100%);backdrop-filter: blur(10px);",
    },
    visualMap: {
      show: false,
      min: 0,
      max: 20000,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: "Blocks",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data: [
          { value: 15000, name: "Broken" },
          { value: 10310, name: "Placed" },
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: "radius",
        label: {
          color: "rgba(255, 255, 255, 0.3)",
        },
        labelLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          color: "#c23531",
          shadowBlur: 200,
          shadowColor: "rgba(0, 0, 0, 0.2)",
        },
        animationEasing: "cubicInOut",
        animationDelay: function (idx) {
          return Math.random() * 200;
        },
      },
    ],
  };
  return (
    <div className="pieChart">
      {show && (
        <ReactECharts
          option={option}
          style={{ height: "500px" }}
        ></ReactECharts>
      )}

      <BubblesBack></BubblesBack>
    </div>
  );
};
const Playtime = ({ count }) => {
  return (
    <div className="rowflex playtime-containner">
      <div
        className="playtime-box columnflex"
        data-aos="zoom-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
        data-aos-id="count"
      >
        <div className="rowflex wrold">
          <i class={"fa fa-circle worldIcon"}></i>
          <div className="normaltext worldtext">Overworld</div>
        </div>
        <img className="worldImage" src={grasspng}></img>
        <div className="playtime rowflex">
          {count && (
            <CountUp
              delay={0.2}
              className="playtime-num whitetext contentTitle"
              end={600}
            ></CountUp>
          )}
          <div className="hr contentTitle">hr</div>
        </div>
      </div>
      <div
        className="playtime-box columnflex"
        data-aos="zoom-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
      >
        <div className="rowflex wrold">
          <i class={"fa fa-circle worldIcon"}></i>
          <div className="normaltext worldtext">Nether</div>
        </div>
        <img className="worldImage" src={netherpng}></img>
        <div className="playtime rowflex">
          {count && (
            <CountUp
              delay={0.2}
              className="playtime-num whitetext contentTitle"
              end={120}
            ></CountUp>
          )}

          <div className="hr contentTitle">hr</div>
        </div>
      </div>

      <div
        className="playtime-box columnflex"
        data-aos="zoom-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
      >
        <div className="rowflex wrold">
          <i class={"fa fa-circle worldIcon"}></i>
          <div className="normaltext worldtext">End</div>
        </div>
        <img className="worldImage" src={endpng}></img>
        <div className="playtime rowflex">
          {count && (
            <CountUp
              delay={0.2}
              className="playtime-num whitetext contentTitle"
              end={26}
            ></CountUp>
          )}
          <div className="hr contentTitle">hr</div>
        </div>
      </div>
    </div>
  );
};
const HostileStat = () => {
  return (
    <div className="hostileStats rowflex">
      <div className="rowflex hStat">
        <div className="columnflex">
          <div className="rowflex wrold">
            <i class={"fa fa-circle worldIcon"}></i>
            <div className="normaltext">Player Kills</div>
          </div>
          <img className="worldImage" src={swordpng}></img>
        </div>
        <div className="playtime-num contentTitle whitetext">20</div>
      </div>

      <div className="rowflex hStat">
        <div className="columnflex">
          <div className="rowflex wrold">
            <i class={"fa fa-circle worldIcon"}></i>
            <div className="normaltext">Death</div>
          </div>
          <img className="worldImage" src={deathpng}></img>
        </div>
        <div className="playtime-num contentTitle whitetext">60</div>
      </div>

      <div className="rowflex hStat">
        <div className="columnflex">
          <div className="rowflex wrold">
            <i class={"fa fa-circle worldIcon"}></i>
            <div className="normaltext">Mob Kills</div>
          </div>
          <img className="worldImage" src={mobpng}></img>
        </div>
        <div className="playtime-num contentTitle whitetext">120</div>
      </div>
    </div>
  );
};

export default StatsComponent;
