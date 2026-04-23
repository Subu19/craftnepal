import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Card, Button, Input } from "@/shared/ui";

const STAT_CATEGORIES = [
  { key: "custom", label: "Custom" },
  { key: "mined", label: "Mined" },
  { key: "used", label: "Used" },
  { key: "picked_up", label: "Picked Up" },
  { key: "dropped", label: "Dropped" },
  { key: "killed", label: "Killed" },
  { key: "killed_by", label: "Killed By" },
  { key: "crafted", label: "Crafted" },
  { key: "broken", label: "Broken" },
] as const;

type StatCategory = (typeof STAT_CATEGORIES)[number]["key"];

const formatMinecraftId = (id: string) => {
  if (!id) return "";
  return id
    .replace("minecraft:", "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

interface StatsTableProps {
  stats: any;
}

export const StatsTable = ({ stats }: StatsTableProps) => {
  const [activeTab, setActiveTab] = useState<StatCategory>("custom");
  const [tableFilter, setTableFilter] = useState("");

  return (
    <Card className="overflow-hidden p-0 bg-white/5 border-white/5">
      <div className="p-6 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3
            className="text-xl font-bold text-white"
            style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
          >
            Detailed Statistics
          </h3>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              value={tableFilter}
              onChange={(e) => setTableFilter(e.target.value)}
              className="w-full pl-9 bg-primary-950/50 border-white/10 text-white rounded-xl focus-visible:ring-accent-500"
              placeholder="Filter entries..."
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {STAT_CATEGORIES.map((cat) => (
            <Button
              key={cat.key}
              onClick={() => {
                setActiveTab(cat.key);
                setTableFilter("");
              }}
              variant={activeTab === cat.key ? "default" : "outline"}
              size="sm"
              className={`${activeTab === cat.key ? "shadow-[0_0_10px_rgba(235,85,105,0.3)]" : ""} hover:cursor-pointer`}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-primary-900/20 max-h-[500px] overflow-y-auto custom-scrollbar">
        {(() => {
          const activeData = stats[activeTab] || {};
          const entries = Object.entries(activeData as Record<string, number>)
            .filter(([key]) =>
              formatMinecraftId(key)
                .toLowerCase()
                .includes(tableFilter.toLowerCase()),
            )
            .sort((a, b) => b[1] - a[1]);

          if (entries.length === 0) {
            return (
              <div className="text-center py-12 text-gray-500">
                No entries found for "{tableFilter}" in {activeTab}.
              </div>
            );
          }

          return (
            <table className="w-full text-left text-sm">
              <thead className="bg-primary-800 sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-300">
                    Item / Statistic
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-300 text-right">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {entries.map(([key, value], i) => (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.2,
                      delay: Math.min(i * 0.02, 0.5),
                    }}
                    key={key}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-3 text-gray-300 group-hover:text-white transition-colors">
                      {formatMinecraftId(key)}
                    </td>
                    <td className="px-6 py-3 text-right font-mono text-accent-400">
                      {value.toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          );
        })()}
      </div>
    </Card>
  );
};
