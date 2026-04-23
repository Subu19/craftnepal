import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { api } from '../../../shared/api/client';
import type { GuidesData } from '../../../shared/types';

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

export const useGuides = (): UseQueryResult<GuidesData, Error> => {
  return useQuery({
    queryKey: ['guides'],
    queryFn: async () => {
      const { data } = await api.get<GuideResponse>('/guides');
      
      // Transform the array response into organized sections
      const guidesMap: Partial<GuidesData> = {};
      
      data.data.forEach((section) => {
        const key = section.id as keyof GuidesData;
        guidesMap[key] = {
          _id: section._id,
          id: section.id,
          header: section.header,
          data: section.data,
          image: section.image,
        };
      });
      
      return guidesMap as GuidesData;
    },
  });
};
