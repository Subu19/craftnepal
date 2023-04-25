import axios from "axios";
import { useEffect, useState } from "react";

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
      .get("https://backend.subasacharya.com.np/api/statz/" + username)
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
