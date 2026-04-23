import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { api } from '../../../shared/api/client';

export interface FeaturedLeaderboard {
  key: string;
  label: string;
  unit: string;
  entries: Array<{
    rank: number;
    name: string;
    uuid: string;
    value: number;
  }>;
}

export interface StatKey {
  key: string;
  category: string;
  stat: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  uuid: string;
  value: number;
}

export const useFetchOverview = (): UseQueryResult<FeaturedLeaderboard[], Error> => {
  return useQuery({
    queryKey: ['leaderboard', 'overview'],
    queryFn: async () => {
      const { data } = await api.get<{ data: { featured: FeaturedLeaderboard[] } }>('/leaderboard/overview');
      return data.data.featured;
    },
  });
};

export const useFetchStatKeys = (): UseQueryResult<StatKey[], Error> => {
  return useQuery({
    queryKey: ['stats', 'keys'],
    queryFn: async () => {
      const { data } = await api.get<{ data: { keys: StatKey[] } }>('/stats/keys');
      return data.data.keys;
    },
  });
};

export const useFetchStatLeaderboard = (statKey: string | null): UseQueryResult<LeaderboardEntry[], Error> => {
  return useQuery({
    queryKey: ['leaderboard', statKey],
    queryFn: async () => {
      const { data } = await api.get<{ data: { entries: LeaderboardEntry[] } }>(`/leaderboard/${statKey}`);
      return data.data.entries;
    },
    enabled: !!statKey,
  });
};
