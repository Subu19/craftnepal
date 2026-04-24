import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { api } from '../../../shared/api/client';
import type { GuideSection } from '../../../shared/types';

interface GuideResponse {
  err: boolean;
  data: Array<{
    _id: string;
    id: string;
    header: string;
    data: Array<{
      title: string;
      text: string;
      image?: string;
    }>;
    image?: string | null;
    __v: number;
  }>;
}

export const useGuides = (): UseQueryResult<GuideSection[], Error> => {
  return useQuery({
    queryKey: ['guides'],
    queryFn: async () => {
      const { data } = await api.get<GuideResponse>('/guides');
      return data.data as GuideSection[];
    },
  });
};
