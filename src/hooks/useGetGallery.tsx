import axios from "axios";
import { useEffect, useState } from "react";
import { SeasonData } from "../types";

export const useGetGallery = (posting: boolean) => {
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState<SeasonData[] | null>(null);

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get<SeasonData[]>(
          `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_API}gallery`
        );
        if (mounted) {
          if (Array.isArray(res.data)) {
            setGallery(res.data);
          } else {
            console.error("Gallery data is not an array:", res.data);
            setGallery([]);
          }
        }
      } catch (err) {
        if (mounted) {
          console.error("Failed to fetch gallery:", err);
          setGallery([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (!posting) {
      getData();
    }

    return () => {
      mounted = false;
    };
  }, [posting]);

  return { loading, gallery };
};

