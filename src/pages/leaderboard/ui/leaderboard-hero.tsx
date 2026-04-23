import { motion } from "framer-motion";
const allayImage = '/assets/images/allay.png';

export function LeaderboardHero() {
  return (
    <section className="pt-32 pb-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 space-y-5 text-center lg:text-left"
      >
        <h1
          className="text-3xl sm:text-6xl lg:text-7xl font-black text-white uppercase"
          style={{
            fontFamily: "'Rubik Mono One', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Leaderboard
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
          Know your position in the leaderboard. Browse every stat leaderboard
          from the server.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center lg:justify-end"
      >
        <motion.img
          src={allayImage}
          alt="Allay"
          className="w-48 sm:w-56 lg:w-72 drop-shadow-2xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 2, -2, 0],
            filter: [
              "drop-shadow(0 20px 30px rgba(0,0,0,0.3))",
              "drop-shadow(0 25px 45px rgba(56, 189, 248, 0.4))",
              "drop-shadow(0 20px 30px rgba(0,0,0,0.3))",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}
