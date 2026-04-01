import { useContext, useRef } from "react";
import "./user.css";
import discordIcon from "../../assets/images/icons/discord.png";
import { UserContext } from "../../providers/UserProvider";

import { Link } from "react-router-dom";

const UserComponent = () => {
    const [user, gettingUser] = useContext(UserContext);
    const userMenuref = useRef<HTMLDialogElement>(null);

    const handleLogin = () => {
        window.location.href = import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_LOGIN;
    };

    return (
        <div className="userComponent">
            <dialog ref={userMenuref} className="userDialog">
                <div className="dialogContainner">
                    <div className="dialogHeader">
                        <b className="">You are admin! This is what you can do {":)"}</b>
                        <i className="fa fa-window-close dialog-close" onClick={() => userMenuref.current?.close()}></i>
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
                <div className="mybutton" onClick={handleLogin}>
                    <img src={discordIcon} className="loginIcon" alt="discord"></img>
                    Login
                </div>
            ) : (
                <img
                    className="userImage"
                    onClick={() => (user.isAdmin ? userMenuref.current?.showModal() : "")}
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                    alt="user"
                ></img>
            )}
        </div>
    );
};

export default UserComponent;
