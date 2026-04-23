export function RankBadge({ rank }: { rank: number }) {
  const base =
    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0";
  if (rank === 1)
    return (
      <div
        className={`${base} bg-gradient-to-br from-yellow-300 to-amber-500 text-white shadow-lg shadow-yellow-500/30`}
      >
        {rank}
      </div>
    );
  if (rank === 2)
    return (
      <div
        className={`${base} bg-gradient-to-br from-slate-300 to-slate-500 text-white`}
      >
        {rank}
      </div>
    );
  if (rank === 3)
    return (
      <div
        className={`${base} bg-gradient-to-br from-orange-300 to-orange-600 text-white`}
      >
        {rank}
      </div>
    );
  return (
    <div className={`${base} bg-white/8 text-gray-400 border border-white/10`}>
      {rank}
    </div>
  );
}
