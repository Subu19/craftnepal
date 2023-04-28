import React, { useContext } from "react";
import "./user.css";
import discordIcon from "../../assets/images/icons/discord.png";
import { UserContext } from "../../providers/UserProvider";
import config from "../../config.json";
const UserComponent = () => {
  const [user, gettingUser] = useContext(UserContext);
  return (
    <div className="userComponent">
      {user == null || gettingUser || user.err ? (
        <div
          className="mybutton"
          onClick={() => (window.location = config.baseUrl + config.login)}
        >
          <img src={discordIcon} className="loginIcon"></img>
          Login
        </div>
      ) : (
        <img
          className="userImage"
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
        ></img>
      )}
    </div>
  );
};

export default UserComponent;
