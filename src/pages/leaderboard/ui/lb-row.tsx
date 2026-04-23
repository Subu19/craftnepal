import { motion } from "framer-motion";
import { type LeaderboardEntry } from "../../../features/leaderboard/hooks/use-leaderboard-stats";
import { API_BASE_URL } from "../utils/constants";
import { fmtVal } from "../utils/formatters";
import { RankBadge } from "./rank-badge";

export function LbRow({
  entry,
  unit,
  delay = 0,
}: {
  entry: LeaderboardEntry;
  unit: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.22 }}
      className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
    >
      <RankBadge rank={entry.rank} />
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-white/10">
        <img
          src={`${API_BASE_URL}/skin/face/${entry.uuid}`}
          alt={entry.name}
          className="w-full h-full object-cover"
          style={{ imageRendering: "pixelated" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://crafthead.net/avatar/${entry.uuid}`;
          }}
        />
      </div>
      <span className="flex-1 text-white text-sm font-medium truncate">
        {entry.name}
      </span>
      <span className="text-accent-400 font-bold text-sm tabular-nums">
        {fmtVal(entry.value, unit)}
      </span>
    </motion.div>
  );
}
