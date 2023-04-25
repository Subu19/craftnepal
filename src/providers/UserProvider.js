import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config.json";
export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [gettingUser, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    axios.defaults.withCredentials = true;
    axios.post(config.baseUrl + config.checkAuth).then((res) => {
      setUser(res.data);
      setloading(false);
    });
  }, []);
  return (
    <UserContext.Provider value={[user, gettingUser]}>
      {children}
    </UserContext.Provider>
  );
};
