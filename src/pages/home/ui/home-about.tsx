import { motion } from "framer-motion";
import { stagger, fadeUp, scaleIn } from "@/shared/lib/framer-motion/variants";

export const HomeAbout = () => {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="py-28 flex flex-col items-center text-center"
    >
      <motion.h2
        variants={fadeUp}
        className="text-2xl md:text-3xl text-white uppercase"
        style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
      >
        What is CraftNepal?
      </motion.h2>
      <motion.div
        variants={fadeUp}
        className="mt-10 text-gray-300 text-lg leading-[1.9] max-w-4xl"
      >
        Welcome to CraftNepal, our Minecraft server that has been serving the
        Minecraft community for over six years with a friendly and welcoming
        community. With vanilla tweaking plugins, we strive to provide a fun and
        engaging gaming experience for all players, whether they're Minecraft
        veterans or new to the game. We're proud to say that over 2000 players
        have joined our server, and we're excited to welcome even more to
        explore the vast world of Minecraft, build amazing structures, and make
        new friends along the way.
      </motion.div>
      <motion.img
        variants={scaleIn}
        src="/assets/images/hills.png"
        alt="CraftNepal Hills"
        className="mt-16 w-[75%] max-w-[750px] rounded-3xl"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))",
        }}
      />
    </motion.section>
  );
};
