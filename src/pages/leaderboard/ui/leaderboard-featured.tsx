import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { Button } from "@/shared/ui";
import { Podium } from "./podium";
import { LbRow } from "./lb-row";
import PodiumTag from "./podium-tag";

interface LeaderboardFeaturedProps {
  overview: any[];
  featuredIdx: number;
  setFeaturedIdx: (idx: number) => void;
  isLoading: boolean;
  isError: boolean;
}

export const LeaderboardFeatured = ({
  overview,
  featuredIdx,
  setFeaturedIdx,
  isLoading,
  isError,
}: LeaderboardFeaturedProps) => {
  const activeFeatured = overview?.[featuredIdx] ?? null;

  return (
    <div className="flex flex-col gap-8">
      {/* Featured tabs */}
      {overview && overview.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="overflow-x-auto w-full"
          style={{ scrollbarWidth: "none" }}
        >
          <style>{`.lb-scroll::-webkit-scrollbar{display:none}`}</style>
          <div className="lb-scroll flex gap-2 w-max pb-2">
            {overview.map((o, i) => (
              <Button
                key={o.key}
                onClick={() => setFeaturedIdx(i)}
                variant={i === featuredIdx ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap hover:cursor-pointer ${i === featuredIdx ? "shadow-[0_0_10px_rgba(235,85,105,0.3)]" : ""}`}
              >
                {o.label}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex flex-col">
        {/* Podium Area */}
        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p>Failed to load leaderboard</p>
          </div>
        ) : activeFeatured && activeFeatured.entries.length >= 3 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={featuredIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Podium featured={activeFeatured} />
            </motion.div>
          </AnimatePresence>
        ) : null}

        {/* Featured leaderboard list card */}
        {activeFeatured && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl relative z-10"
            style={{
              background: "rgba(10,12,26,0.75)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Gradient Border overlay */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                padding: "1px",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0.05), transparent)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <PodiumTag
              className={
                "absolute translate-y-[calc(-100%+1px)] max-w-[400px] translate-x-[-50%] left-[50%] z-[20] w-full"
              }
            />
            <div className="relative z-10">
              <div className="px-5 py-4 border-b border-white/5">
                <span className="text-white font-semibold text-sm">
                  {activeFeatured.label} Leaderboard
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {activeFeatured.entries.map((entry: any, i: number) => (
                    <LbRow
                      key={entry.uuid}
                      entry={entry}
                      unit={activeFeatured.unit}
                      delay={i * 0.04}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
