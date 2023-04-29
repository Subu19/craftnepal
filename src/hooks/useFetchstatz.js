import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config.json";

export const useFetchstatz = (username) => {
  const [loading, setLoading] = useState(true);
  const [statz, setStatz] = useState(null);
  useEffect(() => {
    if (username) {
      setLoading(true);
      getData();
    }
  }, [username]);
  const getData = () => {
    axios
      .get(config.baseUrl + config.api + "statz/" + username)
      .then((res) => {
        setStatz(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setStatz({ err: "Something went wrong", data: null });
        setLoading(false);
      });
  };

  return { loading, statz };
};
