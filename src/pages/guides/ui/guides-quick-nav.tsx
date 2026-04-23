import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/shared/lib/framer-motion/variants";

const rulesIcon = "/assets/images/guide/rules.png";
const rankIcon = "/assets/images/guide/rank.png";
const marketIcon = "/assets/images/guide/market.png";
const commandIcon = "/assets/images/guide/command.png";
const faqIcon = "/assets/images/guide/faq.png";
const othersIcon = "/assets/images/guide/others.png";

const sections = [
  { id: "rules", title: "Rules", icon: rulesIcon, color: "text-green-400" },
  { id: "ranks", title: "Ranks", icon: rankIcon, color: "text-orange-400" },
  { id: "market", title: "Market", icon: marketIcon, color: "text-red-400" },
  {
    id: "commands",
    title: "Commands",
    icon: commandIcon,
    color: "text-blue-400",
  },
  { id: "faq", title: "FAQ", icon: faqIcon, color: "text-purple-400" },
  {
    id: "others",
    title: "Others",
    icon: othersIcon,
    color: "text-yellow-400",
  },
];

export const GuidesQuickNav = () => {
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

  return (
    <section className="max-w-7xl mx-auto px-6 -mt-10 mb-20 relative z-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {sections.map((sec) => (
          <motion.button
            key={sec.id}
            variants={fadeUp}
            onClick={() => scrollIntoView(sec.id)}
            className="group relative p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-500/30 hover:bg-white/10 transition-all text-center flex flex-col items-center gap-3 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={sec.icon}
              alt={sec.title}
              className="h-12 drop-shadow-lg group-hover:scale-110 transition-transform"
            />
            <span
              className={`text-sm font-bold uppercase tracking-widest ${sec.color}`}
            >
              {sec.title}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};
