import { useState } from "react";
import {
  useFetchOverview,
  useFetchStatKeys,
  useFetchStatLeaderboard,
} from "../../features/leaderboard/hooks/use-leaderboard-stats";
import { LeaderboardHero, LeaderboardFeatured, LeaderboardBrowse } from "./ui";

export default function Leaderboard() {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const {
    data: overview,
    isLoading: overviewLoading,
    isError: overviewError,
  } = useFetchOverview();
  const { data: statKeys, isLoading: keysLoading } = useFetchStatKeys();
  const { data: lbEntries, isLoading: lbLoading } =
    useFetchStatLeaderboard(selectedStat);

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <LeaderboardHero />

        <div className="flex flex-col gap-8">
          <LeaderboardFeatured
            overview={overview ?? []}
            featuredIdx={featuredIdx}
            setFeaturedIdx={setFeaturedIdx}
            isLoading={overviewLoading}
            isError={overviewError}
          />

          <LeaderboardBrowse
            statKeys={statKeys ?? []}
            lbEntries={lbEntries ?? []}
            keysLoading={keysLoading}
            lbLoading={lbLoading}
            selectedStat={selectedStat}
            setSelectedStat={setSelectedStat}
          />
        </div>
      </div>
    </div>
  );
}
