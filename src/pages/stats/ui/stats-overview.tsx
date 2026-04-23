import { motion } from "framer-motion";
import { Clock, Swords, Skull, Pickaxe, Map as MapIcon, ArrowUp, Target, LogOut, Info } from "lucide-react";
import CountUp from "react-countup";
import { Card, HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/ui";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3006/api";

const overviewIcons: Record<string, React.ReactNode> = {
  playTime: <Clock className="w-5 h-5 text-sky-500" />,
  mobKills: <Swords className="w-5 h-5 text-blue-500" />,
  deaths: <Skull className="w-5 h-5 text-purple-500" />,
  totalBlocksMined: <Pickaxe className="w-5 h-5 text-fuchsia-500" />,
  distanceWalked: <MapIcon className="w-5 h-5 text-rose-500" />,
  jumps: <ArrowUp className="w-5 h-5 text-orange-500" />,
  damageDealt: <Target className="w-5 h-5 text-sky-500" />,
  distanceFlown: <LogOut className="w-5 h-5 text-blue-500" />,
  timesLoggedOut: <LogOut className="w-5 h-5 text-purple-500" />,
};

const SafeCountUp =
  typeof CountUp === "object" && (CountUp as any).default
    ? (CountUp as any).default
    : CountUp;

interface StatsOverviewProps {
  player: any;
}

export const StatsOverview = ({ player }: StatsOverviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="col-span-1 flex flex-col items-center justify-center p-8 relative overflow-hidden group bg-white/5 border-white/5 hover:border-accent-500/30 transition-all">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-500/5 to-transparent opacity-50" />
          <div className="relative z-10 w-32 h-64 mx-auto drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
            <img
              src={`${API_BASE_URL}/skin/body/${player.uuid}`}
              alt={`${player.name} skin`}
              className="w-full h-full object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <h2
            className="text-2xl font-bold text-white mt-6 text-center tracking-wide"
            style={{ fontFamily: "'Geist Variable', sans-serif" }}
          >
            {player.name}
          </h2>
          <p className="text-xs text-gray-500 mt-2 font-mono break-all text-center px-2">
            {player.uuid}
          </p>
        </Card>

        <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.entries(player.overview).map(([key, value], index) => {
            let displayValue = value as number;
            let suffix = "";
            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            if (key === "playTime") {
              displayValue = (value as number) / 72000;
              suffix = " hrs";
            }
            if (key.includes("distance")) {
              displayValue = (value as number) / 100000;
              suffix = " km";
            }

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Card className="h-full flex flex-col p-5 bg-white/5 hover:bg-white/10 transition-all border-white/5 hover:border-white/20 cursor-help group">
                      <div className="flex items-center gap-3 mb-3 text-gray-400 group-hover:text-white transition-colors">
                        <div className="p-2 bg-primary-950/50 rounded-lg shadow-inner ring-1 ring-white/5">
                          {overviewIcons[key] || (
                            <Target className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                      <div className="mt-auto">
                        <span
                          className="text-2xl md:text-3xl font-bold text-white"
                          style={{
                            fontFamily: "'Geist Variable', sans-serif",
                          }}
                        >
                          <SafeCountUp
                            end={displayValue}
                            decimals={displayValue % 1 !== 0 ? 2 : 0}
                            duration={2.5}
                            separator=","
                          />
                        </span>
                        <span className="text-sm text-gray-500 ml-1 font-medium">
                          {suffix}
                        </span>
                      </div>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 bg-primary-900 border-white/10 text-white">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Info className="w-4 h-4 text-accent-500" /> {label}
                      </h4>
                      <p className="text-sm text-gray-400">
                        Total accumulated {label.toLowerCase()} for this
                        player across all sessions.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
