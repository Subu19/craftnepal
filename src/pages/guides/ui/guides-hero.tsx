import { motion } from "framer-motion";
import Particle from "./particles";

const lantern = "/assets/images/guide/lantern.png";
const etable = "/assets/images/guide/etable.png";

export const GuidesHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      {/* Hanging Lantern - Stuck to top of screen */}
      <div className="absolute top-[-70px] right-[-20px] md:right-10 z-30 pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-full h-full bg-orange-500/5 blur-[120px] rounded-full scale-[2.5] animate-pulse" />
        <img
          src={lantern}
          alt="Lantern"
          className="w-32 md:w-72 relative z-10 drop-shadow-[0_0_100px_rgba(255,184,78,0.6)]"
        />
      </div>

      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-500/[0.03] blur-[180px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left max-w-xl"
          >
            <h1
              className="text-3xl sm:text-6xl md:text-7xl font-black text-white uppercase leading-none mb-6"
              style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
            >
              Lost?
              <br />
              <span className="text-accent-500">Help Yourself</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl tracking-wide">
              Everything you need to know about surviving and thriving in
              CraftNepal. From basic rules to advanced market mechanics.
            </p>
          </motion.div>

          <div className="relative flex items-center justify-center">
            {/* Particles Container */}
            <div className="absolute top-[-800px] left-[-100px] inset-0 z-10 pointer-events-none flex items-center justify-center">
              <div className="w-[200%] aspect-[465/145] opacity-30">
                <Particle />
              </div>
            </div>

            <div className="relative z-20 flex flex-col items-center pointer-events-none select-none">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 0.9,
                  scale: 1,
                  y: [0, -25, 0],
                }}
                transition={{
                  opacity: { duration: 1 },
                  scale: { duration: 1 },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                src={etable}
                alt="Enchanting Table"
                className="w-72 md:w-[350px] lg:w-[450px] grayscale-[0.1] drop-shadow-[0_0_150px_rgba(139,92,246,0.25)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
