import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./main.css";
import "./mobile.css";

import craftnepal from "../../assets/svg/craftnepal.svg";
import Slider from "../extra/Slider";
import hills from "../../assets/images/hills.png";
import timber from "../../assets/images/timber.png";
import rank from "../../assets/images/icons/rank.png";
import market from "../../assets/images/icons/market.png";
import discord from "../../assets/images/icons/discord2.png";
import enchant from "../../assets/images/icons/enchant.png";
import skills from "../../assets/images/icons/skills.png";
import voicemod from "../../assets/images/icons/voicemod.png";
import waypoints from "../../assets/images/icons/waypoints.png";
import worldmap from "../../assets/images/icons/worldmap.png";

import heart from "../../assets/images/icons/heart.png";
import love from "../../assets/images/icons/love.png";
import trailer from "../../assets/video/trailer.mp4";

import { Reveal, RevealText } from "../animations/Reveal";

interface Particle {
  id: number;
  x: number;
  y: number;
  initialX: number;
  initialY: number;
  rotation: number;
  img: string;
  size: number;
}

interface Feature {
  img: string;
  name: string;
  desc: string;
}

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !iconRef.current) return;

    // Entrance animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.7)"
      }
    );

    // Description entrance
    const descEl = cardRef.current.querySelector('.featureDesc');
    if (descEl) {
      gsap.fromTo(
        descEl,
        { opacity: 0, y: 8, force3D: true },
        { opacity: 1, y: 0, duration: 0.5, delay: index * 0.1 + 0.15, ease: 'power2.out', force3D: true }
      );
    }

    // Idle animation for icon
    gsap.to(iconRef.current, {
      y: -6,
      duration: 3.5 + Math.random() * 0.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 0.4,
      force3D: true
    });

  }, { scope: container, dependencies: [index] });

  const { contextSafe } = useGSAP({ scope: container });

  const handleMouseEnter = contextSafe(() => {
    if (!cardRef.current || !iconRef.current) return;

    gsap.to(cardRef.current, {
      y: -6, duration: 0.35, ease: "cubic.out", force3D: true
    });

    gsap.to(iconRef.current, {
      scale: 1.12, rotation: 6, duration: 0.4, ease: "power2.out", force3D: true
    });

    gsap.to(".featureInfo", {
      "--brightness": "1.1", duration: 0.25, ease: "power1.inOut"
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (!cardRef.current || !iconRef.current) return;

    gsap.to(cardRef.current, {
      y: 0, duration: 0.45, ease: "power2.out", force3D: true
    });

    gsap.to(iconRef.current, {
      scale: 1, rotation: 0, duration: 0.5, ease: "power2.out", force3D: true
    });

    gsap.to(".featureInfo", {
      "--brightness": "1", duration: 0.25, ease: "power1.inOut"
    });
  });

  return (
    <div ref={container} className="feature-wrapper">
      <div
        ref={cardRef}
        className="featureRow"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="featureIconBox">
          <img
            ref={iconRef}
            className="featureIcon"
            src={feature.img}
            alt={feature.name}
          />
        </div>
        <div className="featureInfo">
          <div className="featureName">{feature.name}</div>
          <div className="featureDesc">{feature.desc}</div>
        </div>
      </div>
    </div>
  );
};

const HomeComponent = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [copied, setCopied] = useState(false);
  const [copiedHytale, setCopiedHytale] = useState(false);
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const logoY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const logoRotate = useTransform(scrollYProgress, [0, 0.5], [0, -5]);

  const mainScope = useRef(null);

  const spawnParticles = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonGroupRef.current) return;
    const containerRect = buttonGroupRef.current.getBoundingClientRect();
    const clickX = e.clientX - containerRect.left;
    const clickY = e.clientY - containerRect.top;

    const newParticles = Array.from({ length: 8 }).map((_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const velocity = 50 + Math.random() * 50;
      const targetX = Math.cos(angle) * velocity;
      const targetY = Math.sin(angle) * velocity;

      return {
        id: Math.random() + Date.now() + i,
        x: targetX,
        y: targetY,
        initialX: clickX,
        initialY: clickY,
        rotation: (Math.random() - 0.5) * 120,
        img: Math.random() > 0.5 ? heart : love,
        size: Math.random() * 10 + 15
      };
    });

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(n => n.id === p.id)));
    }, 1200);
  };

  useGSAP(() => {
    const titles = document.querySelectorAll<HTMLElement>('.contentTitle');
    if (!titles || titles.length === 0) return;

    gsap.to(titles, {
      y: 3.5,
      duration: 7,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.8,
      force3D: true
    });
  }, { scope: mainScope });

  return (
    <div ref={mainScope} className="mainComponent">
      <section className="mainPage">
        <motion.i
          className="fa fa-angle-double-down icon"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        ></motion.i>
        <div className="mainRightContainner">
          <motion.div
            className="title whitetext"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="highlight">
              <RevealText text="For the" delay={0.2} />
            </div>
            <RevealText text="Crafters" delay={0.4} />
            <div className="highlight">
              <RevealText text="By the" delay={0.6} />
            </div>
            <RevealText text="Crafters" delay={0.8} />
          </motion.div>
          <motion.div
            className="subtitle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            A Nepali Server for <span className="text-minecraft">Minecraft</span> & <span className="text-hytale">Hytale</span>.
          </motion.div>

          <motion.div
            className="buttons"
            ref={buttonGroupRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              position: 'relative'
            }}
          >
            <AnimatePresence>
              {particles.map(p => (
                <motion.img
                  key={p.id}
                  src={p.img}
                  className="expert-particle"
                  initial={{
                    left: p.initialX,
                    top: p.initialY,
                    opacity: 1,
                    scale: 0.5,
                    rotate: 0
                  }}
                  animate={{
                    x: p.x,
                    y: p.y,
                    opacity: 0,
                    scale: 1.5,
                    rotate: p.rotation
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    zIndex: 10,
                    pointerEvents: 'none'
                  }}
                  alt=""
                />
              ))}
            </AnimatePresence>

            <button
              className={`btn btn-minecraft ${copied ? "start" : ""}`}
              onClick={(e) => {
                spawnParticles(e);
                navigator.clipboard.writeText("play.craftnepal.net");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <p
                data-text={copied ? "COPIED IP!" : "play.craftnepal.net"}
                data-title="Join CraftNepal"
              ></p>
            </button>

            <button
              className={`btn btn-hytale ${copiedHytale ? "start" : ""}`}
              onClick={(e) => {
                spawnParticles(e);
                navigator.clipboard.writeText("hytale.craftnepal.com");
                setCopiedHytale(true);
                setTimeout(() => setCopiedHytale(false), 2000);
              }}
            >
              <p
                data-text={copiedHytale ? "COPIED IP!" : "hytale.craftnepal.com"}
                data-title="Join HytaleNepal"
              ></p>
            </button>
          </motion.div>
        </div>

        <motion.img
          src={craftnepal}
          className="mainLogo"
          style={{
            y: logoY,
            scale: logoScale,
            rotateZ: logoRotate
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          alt="CraftNepal Logo"
        />
      </section>

      <div className="mainContent">
        <Reveal center>
          <div className="contentTitle whitetext">
            What is CraftNepal?
          </div>
        </Reveal>

        <Reveal delay={0.4} center>
          <div className="contentDesc textcenter">
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
        </Reveal>

        <motion.div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.img
            src={hills}
            className="mainImage"
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <hr />

        <div className="originContainner">
          <Reveal center>
            <div className="contentTitle whitetext originTitle">
              What's the origin?
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="contentDesc textjustify">
              CraftNepal has a unique origin story that began with a small group
              of friends who wanted to play games together back in 2014 - 2015.
              As the Minecraft hype grew, they decided to create a vanilla
              survival server called myktmcraft, owned by Cnobi and his friends.
              The server quickly gained popularity, and players from all over
              joined to make great memories together. However, as time passed,
              the hype waned, and the server became less active.
              <br /><br />
              In 2019, when Minecraft became popular again, players started to
              flood in, but Cnobi was too busy to moderate the server.
              Meanwhile, a new Minecraft community in Nepal had formed:
              NepaliCrafters, owned by Subu and Code. Subu, who was a moderator
              in myktm, and the owner of NepaliCrafters and myktmcraft decided
              to merge their servers and create a bigger server located in
              Nepal, which they named CraftNepal.
              <br /><br />
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
          </Reveal>
        </div>

        <div className="originSlide">
          <Slider />
        </div>

        <hr />

        <motion.div
          className="goalContainner"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <video className="goalVideo" autoPlay loop muted playsInline>
            <source src={trailer} type="video/mp4" />
          </video>
          <div className="goalOverlay"></div>
          <div className="goalContent" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="goal">
              <RevealText text="Goal?" delay={0.2} center />
            </div>
            <div className="contentTitle whitetext textcenter goalQuote">
              <RevealText text="&quot;We just wanna have fun together&quot;" delay={0.5} center />
            </div>
          </div>
        </motion.div>

        <div className="featureBox">
          <Reveal center>
            <div className="contentTitle whitetext">
              Our Features
            </div>
          </Reveal>

          <div className="featureList">
            {[
              { img: skills, name: "Skills and Abilities", desc: "Level up your skills in mining, farming etc. to gain extra Abilities" },
              { img: worldmap, name: "World Map", desc: "Find your way back home with this live map" },
              { img: voicemod, name: "Voice Mod", desc: "Talk to your friends within the game in 3d environment." },
              { img: waypoints, name: "WayPoints", desc: "Need to travel far? No, worries. Teleport to different location in the world in seconds." },
              { img: timber, name: "Timber", desc: "Tree falls upon cutting it from root by an axe" },
              { img: rank, name: "Ranks", desc: "Automated ranking system that promotes players depending on their gameplay" },
              { img: market, name: "Market Place", desc: "A market place where you can open your shop to buy/sell" },
              { img: discord, name: "Sync Discord", desc: "Get your roles from ingame to discord. A fully automated rank sync." },
              { img: enchant, name: "Vanilla Tweaks", desc: "Datapacks such as Dragon drop elytra, armoured elytra and so on" }
            ].map((f, idx) => (
              <FeatureCard key={idx} feature={f} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;

