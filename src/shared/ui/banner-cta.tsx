import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface BannerCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonIcon?: LucideIcon;
}

export const BannerCTA = ({
  title,
  description,
  buttonText,
  buttonHref,
  buttonIcon: ButtonIcon,
}: BannerCTAProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-accent-500/20 via-primary-500/10 to-transparent p-12 rounded-[40px] border border-white/5 relative overflow-hidden"
    >
      <div className="relative z-10">
        <h2
          className="text-3xl md:text-5xl font-black text-white uppercase mb-6"
          style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
        >
          {title}
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          {description}
        </p>
        <a
          href={buttonHref}
          className="inline-flex items-center gap-3 px-10 py-5 bg-accent-500 hover:bg-accent-600 text-white font-black uppercase rounded-2xl transition-all duration-300"
          style={{
            fontFamily: "'Rubik Mono One', sans-serif",
            fontSize: "14px",
          }}
        >
          {buttonText} {ButtonIcon && <ButtonIcon size={20} />}
        </a>
      </div>
    </motion.div>
  );
};
