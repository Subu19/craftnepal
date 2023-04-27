import React, { useEffect } from "react";
import dharara from "../../assets/images/dharara.png";
import "./main.css";
import "./mobile.css";

import craftnepal from "../../assets/svg/craftnepal.svg";
import aos from "aos";
import "aos/dist/aos.css";
import Slider from "../extra/Slider";
import hills from "../../assets/images/hills.png";
import icon from "../../assets/images/icons/others.png";
import rank from "../../assets/images/icons/rank.png";
import market from "../../assets/images/icons/market.png";

const HomeComponent = () => {
  useEffect(() => {
    aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <div className="mainComponent">
      <img src={dharara} className="background"></img>
      <i class="fa fa-angle-double-down icon"></i>
      <div className="mainPage">
        <div className="flexcolumn mainRightContainner">
          <div
            className="title whitetext"
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-easing="ease-out-back"
          >
            <div className="highlight">For the</div>
            Crafters
            <div className="highlight">By the</div>
            Crafters
          </div>
          <div className="normaltext subtitle">
            A Minecraft SMP server for all nepalese
            <div class="buttons">
              <button
                class="btn"
                onClick={() => {
                  navigator.clipboard.writeText("play.craftnepal.tk");
                  document
                    .getElementsByClassName("btn")[0]
                    .classList.toggle("start");
                  setTimeout(() => {
                    document
                      .getElementsByClassName("btn")[0]
                      .classList.toggle("start");
                  }, 1000);
                }}
              >
                <span></span>
                <p
                  data-start="Copied"
                  data-text="play.craftnepal.tk"
                  data-title="JOIN US"
                ></p>
              </button>
            </div>
          </div>
        </div>

        <img
          src={craftnepal}
          className="mainLogo"
          data-aos="zoom-out-down"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-easing="ease-out-back"
        ></img>
      </div>

      <div className="mainContent">
        <div
          className="contentTitle whitetext"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="500"
        >
          What is CraftNepal?
        </div>
        <div
          className="contentDesc textcenter"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="500"
        >
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the great
          explorer of the truth, the master-builder of human happiness. No one
          rejects, dislikes, or avoids pleasure itself, because it is pleasure,
          but because those who do not know how to pursue pleasure rationally
          encounter consequences that are extremely painful. Nor again is there
          anyone who loves or pursues or desires to obtain pain of itself,
          because it is pain, but because occasionally circumstances occur in
          which toil and pain can procure him some great pleasure.
        </div>
        <img src={hills} className="mainImage"></img>
        <hr></hr>

        <div className="rowflex originContainner">
          <div className="columnflex">
            <div
              className="contentTitle whitetext originTitle"
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
              data-aos-duration="500"
            >
              What's the origin?
            </div>
            <div
              className="contentDesc"
              data-aos="fade-right"
              data-aos-anchor-placement="bottom-bottom"
            >
              On the other hand, we denounce with righteous indignation and
              dislike men who are so beguiled and demoralized by the charms of
              pleasure of the moment, so blinded by desire, that they cannot
              foresee the pain and trouble that are bound to ensue; and equal
              blame belongs to those who fail in their duty through weakness of
              will
            </div>
          </div>
          <Slider></Slider>
        </div>

        <hr></hr>
        <div className="columnflex goalContainner">
          <div className="redtext contentTitle textcenter">Goal?</div>
          <br />
          <div
            className="contentTitle whitetext textcenter goal"
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
          >
            "We just want to play minecraft :)"{" "}
          </div>
        </div>
        <div className="featureBox">
          <div
            className="contentTitle whitetext"
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
          >
            Our Features
          </div>
          <div className="featuerContainner">
            <div
              className="feature"
              data-aos="zoom-in"
              data-aos-anchor-placement="bottom-bottom"
              data-aos-easing="ease-out-back"
            >
              <img className="featureImage" src={icon}></img>
              <div className="featureName">Timber</div>
              <div className="featureDesc normaltext textcenter">
                Tree falls upon cutting it from root by an axe
              </div>
            </div>
            <div
              className="feature"
              data-aos="zoom-in"
              data-aos-anchor-placement="bottom-bottom"
              data-aos-easing="ease-out-back"
            >
              <img className="featureImage" src={rank}></img>
              <div className="featureName">Ranks</div>
              <div className="featureDesc normaltext textcenter">
                Tree falls upon cutting it from root by an axe
              </div>
            </div>
            <div
              className="feature"
              data-aos="zoom-in"
              data-aos-anchor-placement="bottom-bottom"
              data-aos-easing="ease-out-back"
            >
              <img className="featureImage" src={market}></img>
              <div className="featureName">Market Place</div>
              <div className="featureDesc normaltext textcenter">
                Tree falls upon cutting it from root by an axe
              </div>
            </div>
            <div
              className="feature"
              data-aos="zoom-in"
              data-aos-anchor-placement="bottom-bottom"
              data-aos-easing="ease-out-back"
            >
              <img className="featureImage" src={icon}></img>
              <div className="featureName">Timber</div>
              <div className="featureDesc normaltext textcenter">
                Tree falls upon cutting it from root by an axe
              </div>
            </div>
            <div
              className="feature"
              data-aos="zoom-in"
              data-aos-anchor-placement="bottom-bottom"
              data-aos-easing="ease-out-back"
            >
              <img className="featureImage" src={icon}></img>
              <div className="featureName">Timber</div>
              <div className="featureDesc normaltext textcenter">
                Tree falls upon cutting it from root by an axe
              </div>
            </div>
          </div>
          {/* <iframe
            src="https://discord.com/widget?id=725033293636042773&theme=dark"
            width="300"
            height="300"
            allowtransparency="true"
            style={{ borderRadius: "20px" }}
            frameborder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>

          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcraftnepalmc&tabs=timeline&width=300&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=258255879149997"
            width="300"
            height="300"
            frameborder="0"
            style={{ borderRadius: "20px" }}
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe> */}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
