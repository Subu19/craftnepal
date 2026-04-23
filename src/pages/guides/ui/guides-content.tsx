import { motion } from "framer-motion";
import {
  ShieldCheck,
  Terminal,
  Trophy,
  ShoppingBag,
  HelpCircle,
  Book,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { MarkdownContent } from "@/shared/ui/components/markdown-content";
import { SectionHeader } from "@/pages/guides/ui/section-header";
import { fadeUp } from "@/shared/lib/framer-motion/variants";

const autorank = "/assets/images/guide/autorank.png";

interface GuidesContentProps {
  guidesData: any;
  isLoading: boolean;
}

export const GuidesContent = ({ guidesData, isLoading }: GuidesContentProps) => {
  const getGuidesByCategory = (category: string) => {
    if (!guidesData) return [];
    const section = guidesData[category as keyof typeof guidesData];
    return section?.data || [];
  };

  const rulesData = getGuidesByCategory("Rules");
  const marketData = getGuidesByCategory("Market");
  const ranksData = getGuidesByCategory("Ranks");
  const faqData = getGuidesByCategory("FAQ");
  const othersData = getGuidesByCategory("Others");
  const commandData = guidesData?.Commands?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-24">
      {/* Rules */}
      <motion.section
        id="rules"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="relative"
      >
        <SectionHeader
          title="Rules"
          icon={ShieldCheck}
          iconColorClass="text-green-400"
          bgColorClass="bg-green-500/10"
          borderColorClass="border-green-500/20"
        />

        <div className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/5 p-8 md:p-12">
          <p className="text-gray-400 mb-8 text-lg">
            In our community, we expect every player to maintain respect and
            follow our guidelines to ensure a fair experience for everyone.
          </p>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {isLoading
              ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-full bg-white/5 rounded-2xl animate-pulse"
                  />
                ))
              : rulesData.map((item: any, i: number) => (
                <AccordionItem
                  key={i}
                  value={`rule-${i}`}
                  className="border-white/10 px-6 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-colors border-none"
                >
                  <AccordionTrigger className="text-white hover:no-underline font-bold py-6">
                    <span className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 text-xs">
                        {i + 1}
                      </span>
                      {item.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-12 pr-6">
                    <MarkdownContent content={item.text} />
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="mt-4 rounded-xl border border-white/10 max-w-full h-auto"
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </motion.section>

      {/* Commands */}
      <motion.section
        id="commands"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <SectionHeader
          title="Commands"
          icon={Terminal}
          iconColorClass="text-blue-400"
          bgColorClass="bg-blue-500/10"
          borderColorClass="border-blue-500/20"
        />

        <div className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/5 p-8 md:p-12">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {isLoading
              ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-full bg-white/5 rounded-2xl animate-pulse"
                  />
                ))
              : commandData.map((item: any, i: number) => (
                <AccordionItem
                  key={i}
                  value={`cmd-${i}`}
                  className="border-white/10 px-6 data-open:pb-6 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-colors border-none"
                >
                  <AccordionTrigger className="text-white hover:no-underline font-bold py-6">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <MarkdownContent content={item.text} />
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </motion.section>

      {/* Ranks */}
      <motion.section
        id="ranks"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <SectionHeader
          title="Ranks"
          icon={Trophy}
          iconColorClass="text-orange-400"
          bgColorClass="bg-orange-500/10"
          borderColorClass="border-orange-500/20"
        />

        <div className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/5 p-8 md:p-12 overflow-hidden group">
          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            Experience our progressive ranking system! Complete requirements
            in-game to level up and unlock new perks, commands, and roles.
          </p>

          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4 mb-10"
          >
            {isLoading
              ? Array(2)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-full bg-white/5 rounded-2xl animate-pulse"
                  />
                ))
              : ranksData.map((item: any, i: number) => (
                <AccordionItem
                  key={i}
                  value={`rank-${i}`}
                  className="border-white/10 px-6 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-colors border-none"
                >
                  <AccordionTrigger className="text-white hover:no-underline font-bold py-6">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <MarkdownContent content={item.text} />
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="mt-4 rounded-xl border border-white/10 w-full"
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 cursor-zoom-in">
            <motion.img
              src={autorank}
              alt="Rank Requirements"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a1f] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="text-white">
                <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1">
                  Interactive Guide
                </p>
                <p className="text-lg font-bold">
                  Rank Requirements & Progression
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Market */}
      <motion.section
        id="market"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <SectionHeader
          title="Market"
          icon={ShoppingBag}
          iconColorClass="text-red-400"
          bgColorClass="bg-red-500/10"
          borderColorClass="border-red-500/20"
        />

        <div className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/5 p-8 md:p-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 mb-8">
            <p className="text-gray-300 leading-relaxed italic">
              "One diamond on our server is worth $200. Market sales are taxed
              at 5% to maintain a healthy economy."
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {isLoading
              ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-full bg-white/5 rounded-2xl animate-pulse"
                  />
                ))
              : marketData.map((item: any, i: number) => (
                <AccordionItem
                  key={i}
                  value={`market-${i}`}
                  className="border-white/10 px-6 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-colors border-none"
                >
                  <AccordionTrigger className="text-white hover:no-underline font-bold py-6">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <MarkdownContent content={item.text} />
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="mt-4 rounded-xl border border-white/10 max-w-full h-auto"
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        id="faq"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <SectionHeader
          title="FAQ"
          icon={HelpCircle}
          iconColorClass="text-purple-400"
          bgColorClass="bg-purple-500/10"
          borderColorClass="border-purple-500/20"
        />

        <div className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/5 p-8 md:p-12">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {isLoading
              ? Array(2)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-full bg-white/5 rounded-2xl animate-pulse"
                  />
                ))
              : faqData.map((item: any, i: number) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-none px-6 rounded-2xl bg-white/5"
                >
                  <AccordionTrigger className="text-white hover:no-underline font-bold py-6">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <MarkdownContent content={item.text} />
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="mt-4 rounded-xl border border-white/10 max-w-full h-auto"
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </motion.section>

      {/* Others */}
      {othersData.length > 0 && (
        <motion.section
          id="others"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionHeader
            title="Others"
            icon={Book}
            iconColorClass="text-yellow-400"
            bgColorClass="bg-yellow-500/10"
            borderColorClass="border-yellow-500/20"
          />

          <div className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/5 p-8 md:p-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {othersData.map((item: any, i: number) => (
                <AccordionItem
                  key={i}
                  value={`others-${i}`}
                  className="border-white/10 px-6 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-colors border-none"
                >
                  <AccordionTrigger className="text-white hover:no-underline font-bold py-6">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <MarkdownContent content={item.text} />
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="mt-4 rounded-xl border border-white/10 max-w-full h-auto"
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>
      )}
    </div>
  );
};
