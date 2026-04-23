import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CopyIpButton } from "@/features/copy-ip/ui/copy-ip-button";
import { stagger, fadeUp } from "@/shared/lib/framer-motion/variants";

export const HomeHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dharara background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: `url(/assets/images/dharara.png)` }}
      />
      {/* Gradient overlay to blend into body */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-[#0b1a1f]" />

      {/* Hero content */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95]"
              style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
            >
              <span className="text-accent-500">For the</span>
              <br />
              <span className="text-white">Crafters</span>
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95] mt-2"
              style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
            >
              <span className="text-accent-500">By the</span>
              <br />
              <span className="text-white">Crafters</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/70 text-lg md:text-xl tracking-widest uppercase mt-8 font-medium"
            >
              Ultimate Nepalese Minecraft Server
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6">
              <CopyIpButton />
            </motion.div>
          </motion.div>

          {/* Right: Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="hidden md:flex justify-center items-center"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
              }}
              style={{ willChange: "transform" }}
            >
              <motion.img
                src="/assets/images/craftnepal.svg"
                alt="CraftNepal"
                className="w-[75%] max-w-[450px]"
                style={{
                  filter: "drop-shadow(0 0px 60px rgba(235,85,105,0.15))",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-8 h-8 text-white/40" />
      </motion.div>
    </section>
  );
};
