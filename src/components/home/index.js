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
import discord from "../../assets/images/icons/discord2.png";
import enchant from "../../assets/images/icons/enchant.png";
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
                  data-text="play.craftnepal.net"
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
          Welcome to CraftNepal, our Minecraft server that has been serving the
          Minecraft community for over six years with a friendly and welcoming
          community. With vanilla tweaking plugins, we strive to provide a fun
          and engaging gaming experience for all players, whether they're
          Minecraft veterans or new to the game. We're proud to say that over
          2000 players have joined our server, and we're excited to welcome even
          more to explore the vast world of Minecraft, build amazing structures,
          and make new friends along the way. If you're looking for a
          well-established and enjoyable Minecraft server, look no further than
          CraftNepal.
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
              className="contentDesc textjustify"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              CraftNepal has a unique origin story that began with a small group
              of friends who wanted to play games together back in 2014 - 2015.
              As the Minecraft hype grew, they decided to create a vanilla
              survival server called myktmcraft, owned by Cnobi and his friends.
              The server quickly gained popularity, and players from all over
              joined to make great memories together. However, as time passed,
              the hype waned, and the server became less active.
              <br></br>
              <br></br>
              In 2019, when Minecraft became popular again, players started to
              flood in, but Cnobi was too busy to moderate the server.
              Meanwhile, a new Minecraft community in Nepal had formed:
              NepaliCrafters, owned by Subu and Code. Subu, who was a moderator
              in myktm, and the owner of NepaliCrafters and myktmcraft decided
              to merge their servers and create a bigger server located in
              Nepal, which they named CraftNepal.
              <br></br>
              <br></br>
              Since then, CraftNepal has continued to grow and evolve, and in
              2021, they introduced Seasons of Minecraft Survival. This meant
              the world resets every year, allowing Minecraft players to start a
              new adventure at every season. Today, in 2023, CraftNepal is still
              serving Minecraft players, and the community continues to thrive.
              From its humble beginnings as a group of friends playing games
              together, to a thriving Minecraft community in Nepal, CraftNepal's
              journey is a testament to the power of friendship, creativity, and
              the joy of gaming.
            </div>
          </div>
          <div className="originSlide">
            <Slider></Slider>
          </div>
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
                Automated ranking system that promotes players depending on
                their gameplay
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
                A market place where you can open your shop or buy
              </div>
            </div>
            <div
              className="feature"
              data-aos="zoom-in"
              data-aos-anchor-placement="bottom-bottom"
              data-aos-easing="ease-out-back"
            >
              <img className="featureImage" src={discord}></img>
              <div className="featureName">Sync Discord</div>
              <div className="featureDesc normaltext textcenter">
                Get your roles from ingame to discord. A fully automated rank
                sync.
              </div>
            </div>
            <div
              className="feature"
              data-aos="zoom-in"
              data-aos-anchor-placement="bottom-bottom"
              data-aos-easing="ease-out-back"
            >
              <img className="featureImage" src={enchant}></img>
              <div className="featureName">Vanilla Tweaks</div>
              <div className="featureDesc normaltext textcenter">
                Datapacks such as Dragon drop elytra, armoured elytra and soon
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
