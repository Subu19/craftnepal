import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "@/shared/lib/framer-motion/variants";

export const HomeGoal = () => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/assets/trailer.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0b1a1f]/60" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 flex flex-col items-center justify-center text-center py-32"
      >
        <motion.div
          variants={fadeUp}
          className="text-accent-500 text-2xl uppercase mb-6"
          style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
        >
          Goal?
        </motion.div>
        <motion.div
          variants={scaleIn}
          className="text-3xl md:text-5xl text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
        >
          "We just want to
          <br />
          play minecraft :)"
        </motion.div>
      </motion.div>
    </section>
  );
};
