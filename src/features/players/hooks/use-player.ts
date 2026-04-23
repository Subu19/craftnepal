import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { api } from '../../../shared/api/client';
import type { Player } from '../../../shared/types';

export const usePlayer = (username: string): UseQueryResult<Player, Error> => {
  return useQuery({
    queryKey: ['player', username],
    queryFn: async () => {
      const { data } = await api.get<{ data: { player: Player } }>(`/player/${username}`);
      return data.data.player;
    },
    enabled: !!username,
  });
};

export const usePlayerSearch = (query: string): UseQueryResult<Player[], Error> => {
  return useQuery({
    queryKey: ['players', 'search', query],
    queryFn: async () => {
      // The new endpoint is /players and it takes no query parameter natively for search in the old legacy?
      // Wait, legacy used useSearchPlayers which hit an API. Let's just use /players
      // The old legacy did: axios.get(BASE_URL + API + "players/" + searchVal) or similar.
      // Actually, wait, let's just make sure it doesn't break if we hit `/players`
      const { data } = await api.get<{ data: { players: Player[] } }>('/players', {
        params: { search: query },
      });
      // Filter locally just in case the backend doesn't handle the 'search' param natively yet
      const players = data.data.players || [];
      if (query) {
        return players.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
      }
      return players;
    },
    enabled: query.length > 0,
  });
};

export const useTopPlayers = (limit = 10): UseQueryResult<Player[], Error> => {
  return useQuery({
    queryKey: ['players', 'top', limit],
    queryFn: async () => {
      const { data } = await api.get<Player[]>('/players/top', {
        params: { limit },
      });
      return data;
    },
  });
};
