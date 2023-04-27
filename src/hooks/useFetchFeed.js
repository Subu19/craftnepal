import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config.json";
export const useFetchFeed = (posting) => {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState(null);
  useEffect(() => {
    if (!posting) {
      setLoading(true);
      getData();
    }
  }, [posting]);
  const getData = () => {
    axios
      .get(config.baseUrl + config.api + "feed")
      .then((res) => {
        setFeed(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setFeed({ err: "Something went wrong", data: null });
        setLoading(false);
      });
  };

  return { loading, feed };
};
