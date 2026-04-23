import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { api } from '../../../shared/api/client';
import type { Leaderboard } from '../../../shared/types';

export const useLeaderboard = (
  type: 'playtime' | 'kills' | 'level' | 'blocks_broken',
  limit = 50
): UseQueryResult<Leaderboard, Error> => {
  return useQuery({
    queryKey: ['leaderboard', type, limit],
    queryFn: async () => {
      const { data } = await api.get<Leaderboard>(`/leaderboards/${type}`, {
        params: { limit },
      });
      return data;
    },
  });
};

export const useAllLeaderboards = (): UseQueryResult<Record<string, Leaderboard>, Error> => {
  return useQuery({
    queryKey: ['leaderboards', 'all'],
    queryFn: async () => {
      const { data } = await api.get<Record<string, Leaderboard>>('/leaderboards');
      return data;
    },
  });
};
