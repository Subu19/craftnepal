import { useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/api/client';
import type { SeasonGallery } from '../../../shared/types';

export const useGallery = () => {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const response = await api.get<{ data: SeasonGallery[] }>('/gallery');
      return response.data.data;
    },
  });
};
