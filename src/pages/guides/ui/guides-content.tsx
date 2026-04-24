import { motion } from "framer-motion";
import {
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
import type { GuideSection } from "@/shared/types";

interface GuidesContentProps {
  guides: GuideSection[];
  isLoading: boolean;
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

const bgColors = [
  "bg-green-500/10",
  "bg-orange-500/10",
  "bg-red-500/10",
  "bg-blue-500/10",
  "bg-purple-500/10",
  "bg-yellow-500/10",
  "bg-pink-500/10",
  "bg-cyan-500/10",
];

const borderColors = [
  "border-green-500/20",
  "border-orange-500/20",
  "border-red-500/20",
  "border-blue-500/20",
  "border-purple-500/20",
  "border-yellow-500/20",
  "border-pink-500/20",
  "border-cyan-500/20",
];

export const GuidesContent = ({ guides, isLoading }: GuidesContentProps) => {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-8">
            <div className="h-16 w-64 bg-white/5 rounded-2xl animate-pulse" />
            <div className="h-96 w-full bg-white/5 rounded-[32px] animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (!guides || guides.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-24">
      {guides.map((section, idx) => (
        <motion.section
          key={section.id}
          id={section.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative"
        >
          <SectionHeader
            title={section.id}
            icon={section.icon || Book}
            iconColorClass={colors[idx % colors.length]}
            bgColorClass={bgColors[idx % bgColors.length]}
            borderColorClass={borderColors[idx % borderColors.length]}
          />

          <div className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/5 p-8 md:p-12 overflow-hidden">
            {section.header && (
              <div className="mb-10">
                <MarkdownContent content={section.header} />
              </div>
            )}

            {section.image && (
              <div className="mb-10 relative rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src={section.image}
                  alt={section.id}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a1f] via-transparent to-transparent opacity-40" />
              </div>
            )}

            <Accordion type="single" collapsible className="w-full space-y-4">
              {section.data.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`${section.id}-item-${i}`}
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
                        className="mt-6 rounded-xl border border-white/10 max-w-full h-auto shadow-lg"
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>
      ))}
    </div>
  );
};
