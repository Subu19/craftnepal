import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Skull } from "lucide-react";
import { usePlayer } from "@/features/players/hooks/use-player";
import { Card } from "@/shared/ui";
import { StatsHero, StatsOverview, StatsCharts, StatsTable } from "./ui";

export default function Stats() {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedPlayerUUID, setSelectedPlayerUUID] = useState("");

  const {
    data: player,
    isLoading: playerLoading,
    isError,
  } = usePlayer(selectedPlayer);

  const handleSelectPlayer = useCallback((name: string, uuid: string) => {
    setSelectedPlayer(name);
    setSelectedPlayerUUID(uuid);
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 pt-32 px-6">
      {/* ── HERO SECTION ── */}
      <StatsHero
        onSelectPlayer={handleSelectPlayer}
        selectedPlayerUUID={selectedPlayerUUID}
        initialValue={selectedPlayer}
      />

      {/* ── MAIN CONTENT ── */}
      {selectedPlayer && playerLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="h-64 flex items-center justify-center bg-primary-900/20 border-white/5">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
              <p className="text-gray-400">
                Loading {selectedPlayer}'s statistics...
              </p>
            </div>
          </Card>
        </motion.div>
      )}

      {selectedPlayer && isError && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="text-center py-16 border-red-500/30 bg-red-500/5">
            <Skull className="w-16 h-16 mx-auto text-red-500 mb-4 opacity-80" />
            <h2
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Geist Variable', sans-serif" }}
            >
              Player Not Found
            </h2>
            <p className="text-gray-400">
              We couldn't find any statistics for "{selectedPlayer}". Make sure
              the username is correct.
            </p>
          </Card>
        </motion.div>
      )}

      {selectedPlayer && !playerLoading && player && player.overview && (
        <div className="space-y-8">
          <StatsOverview player={player} />
          {player.stats && <StatsCharts stats={player.stats} />}
          {player.stats && <StatsTable stats={player.stats} />}
        </div>
      )}
    </div>
  );
}
