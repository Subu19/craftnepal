import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { Pickaxe, Swords } from "lucide-react";
import { Card } from "@/shared/ui";

const COLORS = ["#0ea5e9", "#3b82f6", "#8b5cf6", "#d946ef", "#f43f5e", "#f97316"];

const formatMinecraftId = (id: string) => {
  if (!id) return "";
  return id
    .replace("minecraft:", "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const CustomTooltip = (props: any) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary-900/95 border border-white/10 rounded-lg p-2 backdrop-blur">
        <p className="text-white text-xs font-mono">
          {payload[0].payload.name}
        </p>
        <p className="text-accent-400 text-sm font-bold">
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

interface StatsChartsProps {
  stats: any;
}

export const StatsCharts = ({ stats }: StatsChartsProps) => {
  const getTopItems = (category: string, limit = 5) => {
    if (!stats || !stats[category]) return [];
    return Object.entries(stats[category] as Record<string, number>)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, value], i) => ({
        name: formatMinecraftId(name),
        value,
        fill: COLORS[i % COLORS.length],
      }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 bg-white/5 border-white/5 hover:border-accent-500/20 transition-colors">
        <h3
          className="text-xl font-bold text-white mb-6 flex items-center gap-2"
          style={{ fontFamily: "'Geist Variable', sans-serif" }}
        >
          <Pickaxe className="w-5 h-5 text-accent-500" /> Top Blocks Mined
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getTopItems("mined")}
              layout="vertical"
              margin={{ left: 0, right: 20, top: 10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="#ffffff10"
              />
              <XAxis type="number" stroke="#888" tick={{ fontSize: 12 }} />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                stroke="#888"
                tick={{ fill: "#aaa", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {getTopItems("mined").map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 bg-white/5 border-white/5 hover:border-accent-500/20 transition-colors">
        <h3
          className="text-xl font-bold text-white mb-6 flex items-center gap-2"
          style={{ fontFamily: "'Geist Variable', sans-serif" }}
        >
          <Swords className="w-5 h-5 text-accent-500" /> Top Items Used
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getTopItems("used")}
              layout="vertical"
              margin={{ left: 0, right: 20, top: 10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="#ffffff10"
              />
              <XAxis type="number" stroke="#888" tick={{ fontSize: 12 }} />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                stroke="#888"
                tick={{ fill: "#aaa", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {getTopItems("used").map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
