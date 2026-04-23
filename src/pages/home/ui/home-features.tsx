import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/shared/lib/framer-motion/variants";

const features = [
  {
    icon: "/assets/images/icons/skills.png",
    title: "Skills and Abilities",
    desc: "Level up your skills in mining, farming etc. to gain extra Abilities",
  },
  {
    icon: "/assets/images/icons/worldmap.png",
    title: "World Map",
    desc: "Find your way back home with this live map",
  },
  {
    icon: "/assets/images/icons/voicemod.png",
    title: "Voice Mod",
    desc: "Talk to your friends within the game in 3d environment.",
  },
  {
    icon: "/assets/images/icons/waypoints.png",
    title: "WayPoints",
    desc: "Teleport to different locations in the world in seconds.",
  },
  {
    icon: "/assets/images/icons/others.png", // timberIcon used others.png
    title: "Timber",
    desc: "Tree falls upon cutting it from root by an axe",
  },
  {
    icon: "/assets/images/icons/rank.png",
    title: "Ranks",
    desc: "Automated ranking system that promotes players depending on their gameplay",
  },
  {
    icon: "/assets/images/icons/market.png",
    title: "Market Place",
    desc: "A market place where you can open your shop to buy/sell",
  },
  {
    icon: "/assets/images/icons/discord2.png",
    title: "Sync Discord",
    desc: "Get your roles from ingame to discord. A fully automated rank sync.",
  },
  {
    icon: "/assets/images/icons/enchant.png",
    title: "Vanilla Tweaks",
    desc: "Datapacks such as Dragon drop elytra, armoured elytra and so on",
  },
];

export const HomeFeatures = () => {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-28"
    >
      <div className="bg-[rgba(217,217,217,0.06)] backdrop-blur-sm rounded-[40px] shadow-[0_0_40px_rgba(0,0,0,0.15)] border border-white/5 px-8 py-14 md:px-14 md:py-20">
        <h2
          className="text-2xl md:text-3xl text-white uppercase text-center mb-16"
          style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
        >
          Our Features
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              custom={i}
              className="group flex flex-col items-center text-center cursor-default"
            >
              <div className="w-16 h-16 mb-5">
                <img
                  src={f.icon}
                  alt={f.title}
                  className="w-full h-full object-contain grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-125"
                />
              </div>
              <h3 className="text-accent-500 font-bold text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
