import React, { useContext, useRef } from "react";
import "./user.css";
import discordIcon from "../../assets/images/icons/discord.png";
import { UserContext } from "../../providers/UserProvider";
import config from "../../config.json";
import { Link } from "react-router-dom";
const UserComponent = () => {
  const [user, gettingUser] = useContext(UserContext);
  const userMenuref = useRef();

  return (
    <div className="userComponent">
      <dialog ref={userMenuref} className="userDialog">
        <div className="dialogContainner">
          <div className="dialogHeader">
            <b className="">You are admin! This is what you can do {":)"}</b>
            <i
              class="fa fa-window-close dialog-close"
              onClick={() => userMenuref.current.close("")}
            ></i>
          </div>

          <Link to={"/manage-gallery"} className="dialogOptions">
            Manage Gallery
          </Link>
          <Link to={"/guidecms"} className="dialogOptions">
            GuideCMS
          </Link>
          <Link to={"/soon"} className="dialogOptions">
            Soon
          </Link>
          <Link to={"/soon"} className="dialogOptions">
            Soon
          </Link>
          <Link to={"/soon"} className="dialogOptions">
            Soon
          </Link>
        </div>
      </dialog>
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
          onClick={() => (user.isAdmin ? userMenuref.current.showModal() : "")}
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
        ></img>
      )}
    </div>
  );
};

export default UserComponent;
