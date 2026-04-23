import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trophy, ChevronDown } from "lucide-react";
import { Button } from "@/shared/ui";
import { LbRow } from "./lb-row";
import { fmt } from "../utils/formatters";

interface LeaderboardBrowseProps {
  statKeys: any[];
  lbEntries: any[];
  keysLoading: boolean;
  lbLoading: boolean;
  selectedStat: string | null;
  setSelectedStat: (key: string) => void;
}

export const LeaderboardBrowse = ({
  statKeys,
  lbEntries,
  keysLoading,
  lbLoading,
  selectedStat,
  setSelectedStat,
}: LeaderboardBrowseProps) => {
  const [showBrowse, setShowBrowse] = useState(false);
  const [catFilter, setCatFilter] = useState("all");
  const [search, setSearch] = useState("");

  const categories = statKeys
    ? ["all", ...new Set(statKeys.map((k) => k.category))]
    : ["all"];
    
  const filteredKeys = (statKeys ?? []).filter((k) => {
    if (catFilter !== "all" && k.category !== catFilter) return false;
    if (search && !fmt(k.stat).toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const selectedStatKey = statKeys?.find((k) => k.key === selectedStat);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <button
        onClick={() => setShowBrowse((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl cursor-pointer transition-all hover:bg-white/10"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span className="text-white font-semibold text-sm">
          Browse All Stats
        </span>
        <motion.div
          animate={{ rotate: showBrowse ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {showBrowse && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="mt-3 rounded-2xl overflow-hidden flex flex-col md:block"
              style={{
                background: "rgba(10,12,26,0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="p-4 border-b border-white/5 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-3.5 h-3.5 pointer-events-none" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search stats..."
                    className="w-full pl-9 pr-4 py-2 rounded-lg text-sm text-white placeholder-gray-600 bg-white/5 border border-white/10 focus:outline-none focus:border-accent-500/50 transition-colors"
                  />
                </div>

                <div
                  className="overflow-x-auto w-full"
                  style={{ scrollbarWidth: "none" }}
                >
                  <div className="flex gap-1.5 w-max pb-1">
                    <style>{`.cat-strip::-webkit-scrollbar{display:none}`}</style>
                    {categories.map((c) => (
                      <Button
                        key={c}
                        onClick={() => setCatFilter(c)}
                        variant={catFilter === c ? "default" : "outline"}
                        size="sm"
                        className={`whitespace-nowrap shrink-0 hover:cursor-pointer ${catFilter === c ? "shadow-[0_0_10px_rgba(235,85,105,0.3)]" : ""}`}
                      >
                        {c === "all" ? "All" : fmt(c)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ minHeight: 420 }}
              >
                <div
                  className="border-b md:border-b-0 md:border-r border-white/5 overflow-y-auto"
                  style={{ maxHeight: 520 }}
                >
                  {keysLoading ? (
                    <div className="p-6 text-center text-gray-500 text-sm">
                      Loading stats…
                    </div>
                  ) : filteredKeys.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 text-sm">
                      No stats found
                    </div>
                  ) : (
                    filteredKeys.map((k) => (
                      <button
                        key={k.key}
                        onClick={() => setSelectedStat(k.key)}
                        className={`w-full text-left px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer ${
                          selectedStat === k.key
                            ? "bg-accent-500/15 border-l-2 border-l-accent-500 pl-3"
                            : ""
                        }`}
                      >
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                          {fmt(k.category)}
                        </div>
                        <div className="text-sm font-medium text-white mt-0.5 break-words">
                          {fmt(k.stat)}
                        </div>
                      </button>
                    ))
                  )}
                </div>

                <div className="flex flex-col relative h-[500px] md:h-auto">
                  {!selectedStat ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-gray-600">
                      <Trophy className="w-10 h-10 mb-3 opacity-30" />
                      <p className="text-sm">
                        Select a stat to see the leaderboard
                      </p>
                    </div>
                  ) : lbLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="w-8 h-8 border-4 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
                    </div>
                  ) : !lbEntries || lbEntries.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-gray-600 text-sm">
                      No entries found
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedStat}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex flex-col h-full"
                      >
                        <div className="px-4 py-3 border-b border-white/5 shrink-0">
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                            {selectedStatKey
                              ? fmt(selectedStatKey.category)
                              : ""}
                          </p>
                          <p className="text-sm font-semibold text-white mt-0.5">
                            {selectedStatKey
                              ? fmt(selectedStatKey.stat)
                              : selectedStat}
                          </p>
                        </div>

                        <div className="overflow-y-auto flex-1">
                          {lbEntries.map((entry, i) => (
                            <LbRow
                              key={`${entry.uuid}-${i}`}
                              entry={entry}
                              unit=""
                              delay={Math.min(i * 0.02, 0.3)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
