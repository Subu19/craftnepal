import "./main.css";
import logo from "../../../assets/svg/craftnepal.svg";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="footerContainner">
        <div className="footerMain">
          <img className="footerLogo" src={logo} alt="logo" loading="lazy"></img>
          <div className="contentTitle">CraftNepal</div>
          <div className="normaltext">A Minecraft SMP</div>
        </div>
        <div className="usefulLinks">
          <div className="contactTitle">Sitemap</div>
          <div className="usefulLink">
            <b>Server Stats</b>
            <span>Real-time player data</span>
          </div>
          <div className="usefulLink">
            <b>Global Leaderboard</b>
            <span>Top ranking players</span>
          </div>
          <div className="usefulLink">
            <b>Community Feed</b>
            <span>Latest player highlights</span>
          </div>
        </div>
        <div className="contactUs">
          <div className="contactTitle">Contacts</div>
          <iframe
            src="https://discord.com/widget?id=725033293636042773&theme=dark"
            width="300"
            height="250"
            allowTransparency={true}
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            title="discord"
            loading="lazy"
          ></iframe>

          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcraftnepalmc&tabs&width=300&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="300"
            height="130"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="facebook"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Footer;
