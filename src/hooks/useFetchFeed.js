import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config.json";
export const useFetchFeed = (posting) => {
  const [limit, setLimit] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState(null);
  useEffect(() => {
    if (!posting) {
      getData();
    }
  }, [posting]);
  useEffect(() => {
    setLoadingMore(true);
    getData();
  }, [limit]);
  const getData = () => {
    axios
      .get(config.baseUrl + config.api + "feed/" + limit)
      .then((res) => {
        setFeed(res.data);
        setLoading(false);
        setLoadingMore(false);
      })
      .catch((err) => {
        setFeed({ err: "Something went wrong", data: null });
        setLoading(false);
        setLoadingMore(false);
      });
  };

  return { loading, feed, limit, setLimit, loadingMore };
};
