import { motion } from "framer-motion";
import { ImageSlider } from "@/shared/ui/image-slider/image-slider";
import { stagger, fadeUp, scaleIn } from "@/shared/lib/framer-motion/variants";

const sliderImages = [
  "/assets/images/slider1.png",
  "/assets/images/slider2.png",
  "/assets/images/slider3.png",
  "/assets/images/slider4.png",
  "/assets/images/slider5.png",
];

const originStory = [
  "CraftNepal has a unique origin story that began with a small group of friends who wanted to play games together back in 2014 - 2015. As the Minecraft hype grew, they decided to create a vanilla survival server called myktmcraft, owned by Cnobi and his friends. The server quickly gained popularity, and players from all over joined to make great memories together. However, as time passed, the hype waned, and the server became less active.",
  "In 2019, when Minecraft became popular again, players started to flood in, but Cnobi was too busy to moderate the server. Meanwhile, a new Minecraft community in Nepal had formed: NepaliCrafters, owned by Subu and Code. Subu, who was a moderator in myktm, and the owner of NepaliCrafters and myktmcraft decided to merge their servers and create a bigger server located in Nepal, which they named CraftNepal.",
  "Since then, CraftNepal has continued to grow and evolve, and in 2021, they introduced Seasons of Minecraft Survival. This meant the world resets every year, allowing Minecraft players to start a new adventure at every season. Today, CraftNepal is still serving Minecraft players, and the community continues to thrive.",
];

export const HomeOrigin = () => {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-28"
    >
      <motion.h2
        variants={fadeUp}
        className="text-2xl md:text-3xl text-white uppercase text-center mb-16"
        style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
      >
        What's the origin?
      </motion.h2>

      {/* Story card — vertical, horizontal text */}
      <motion.div variants={fadeUp}>
        <div className="relative rounded-2xl p-px bg-gradient-to-br from-accent-500/40 via-primary-400/20 to-transparent">
          <div className="rounded-2xl bg-[rgba(11,26,31,0.85)] backdrop-blur-md p-8 md:p-10 relative">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-14 h-14 border-t-2 border-l-2 border-accent-500/50 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-14 h-14 border-b-2 border-r-2 border-accent-500/50 rounded-br-2xl" />
            <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-primary-400/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-14 h-14 border-b-2 border-l-2 border-primary-400/30 rounded-bl-2xl" />

            {/* Horizontal timeline */}
            <div className="space-y-8">
              {originStory.map((paragraph, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-accent-500/80 ring-4 ring-accent-500/20" />
                    {i < originStory.length - 1 && (
                      <div className="w-px flex-1 mt-2 bg-gradient-to-b from-accent-500/30 to-transparent min-h-[40px]" />
                    )}
                  </div>
                  <p className="text-gray-300 leading-[1.8] text-base">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Slider — full width below */}
      <motion.div variants={scaleIn} className="mt-12">
        <ImageSlider images={sliderImages} />
      </motion.div>
    </motion.section>
  );
};
