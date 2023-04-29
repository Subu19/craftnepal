import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config.json";
export const useFetchLeaderboard = (board) => {
  const [loading, setLoading] = useState(true);
  const [LBdata, setLBdata] = useState(null);
  useEffect(() => {
    if (board) {
      setLoading(true);
      getData();
    }
  }, [board]);
  const getData = () => {
    axios
      .get(config.baseUrl + config.api + "leaderboard/" + board)
      .then((res) => {
        setLBdata(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLBdata({ err: "Something went wrong", data: null });
        setLoading(false);
      });
  };

  return { loading, LBdata };
};
export const useFetchTop10 = () => {
  const [loadingtop10, setLoading] = useState(true);
  const [top10, setLBdata] = useState(null);
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  const getData = () => {
    axios
      .get(config.baseUrl + config.api + "leaderboard/top")
      .then((res) => {
        setLBdata(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLBdata({ err: "Something went wrong", data: null });
        setLoading(false);
      });
  };

  return { loadingtop10, top10 };
};
