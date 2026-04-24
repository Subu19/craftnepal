import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/shared/lib/framer-motion/variants";

import type { GuideSection } from "@/shared/types";
import { Book } from "lucide-react";

interface GuidesQuickNavProps {
  guides: GuideSection[];
}

const colors = [
  "text-green-400",
  "text-orange-400",
  "text-red-400",
  "text-blue-400",
  "text-purple-400",
  "text-yellow-400",
  "text-pink-400",
  "text-cyan-400",
];

export const GuidesQuickNav = ({ guides }: GuidesQuickNavProps) => {
  const scrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!guides || guides.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 -mt-10 mb-20 relative z-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {guides.map((sec, idx) => (
          <motion.button
            key={sec.id}
            variants={fadeUp}
            onClick={() => scrollIntoView(sec.id)}
            className="group relative p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-500/30 hover:bg-white/10 transition-all text-center flex flex-col items-center gap-3 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {sec.icon ? (
              <img
                src={sec.icon}
                alt={sec.id}
                className="h-12 drop-shadow-lg group-hover:scale-110 transition-transform object-contain"
              />
            ) : (
              <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-accent-400 group-hover:scale-110 transition-transform">
                <Book size={24} />
              </div>
            )}

            <span
              className={`text-sm font-bold uppercase tracking-widest ${colors[idx % colors.length]}`}
            >
              {sec.id}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};
