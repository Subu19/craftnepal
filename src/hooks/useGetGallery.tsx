import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SeasonData } from "../types";

export const useGetGallery = (posting: boolean) => {
  const { data: gallery, isLoading: loading, error } = useQuery<SeasonData[]>({
    queryKey: ['gallery'],
    queryFn: async () => {
      const res = await axios.get<SeasonData[]>(
        `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_API}gallery`
      );
      if (Array.isArray(res.data)) {
        return res.data;
      }
      console.error("Gallery data is not an array:", res.data);
      return [];
    },
    enabled: !posting,
    staleTime: 1000 * 60 * 30, // 30 minutes for gallery as it doesn't change often
  });

  return { loading, gallery: gallery || null, error };
};


