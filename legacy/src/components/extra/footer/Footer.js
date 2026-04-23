import React from "react";
import "./main.css";
import discord from "../../../assets/images/icons/discord.png";
import logo from "../../../assets/svg/craftnepal.svg";
const Footer = () => {
  return (
    <div className="Footer">
      <div className="footerContainner">
        <div className="footerMain">
          <img className="footerLogo" src={logo}></img>
          <div className="contentTitle whitetext">CraftNepal</div>
          <div className="normaltext">A Minecraft SMP</div>
        </div>
        <div className="usefulLinks">
          <div className="contactTitle">Pages</div>

          <div className="usefulLink">
            <b className="redtext">Stats</b>
            <text>Get in-game stats of any player</text>
          </div>
          <div className="usefulLink">
            <b className="redtext">Leaderboard</b>
            <text>It has all leaderboards from ingame including top 100</text>
          </div>
          <div className="usefulLink">
            <b className="redtext">Feed</b>
            <text>Share your memories from ingame by posting here</text>
          </div>
          <div className="usefulLink">
            <b className="redtext">Guide</b>
            <text>All the help that you need is available here</text>
          </div>
        </div>
        <div className="contactUs">
          <div className="contactTitle">Contacts</div>
          <iframe
            src="https://discord.com/widget?id=725033293636042773&theme=dark"
            width="300"
            height="250"
            allowtransparency="true"
            frameborder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>

          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcraftnepalmc&tabs&width=300&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="300"
            height="130"
            frameborder="0"
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Footer;
