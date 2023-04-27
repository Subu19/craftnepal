import React, { useEffect, useState } from "react";
import "./supporters.css";
import axios from "axios";
import config from "../../config.json";
const Supporters = () => {
  const [supporters, setSupporters] = useState(null);
  useEffect(() => {
    axios
      .get(config.baseUrl + "supporters.json")
      .then((res) => {
        setSupporters(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="rightFeedSection">
      <div className="contentTitle redtext textcenter">Supporters</div>
      <div className="supporterContainner">
        {supporters
          ? supporters.map((user) => {
              return <div className="supporter">{user.name}</div>;
            })
          : ""}
      </div>
    </div>
  );
};

export default Supporters;
