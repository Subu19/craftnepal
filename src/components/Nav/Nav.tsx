import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../css/nav.css";
import "../../css/mobile.css";

import gallery from "../../assets/images/icons/gallery-new.webp";
import logo from "../../assets/svg/CN.svg";
import home from "../../assets/images/home.webp";
import guide from "../../assets/images/guide-new.webp";
import stats from "../../assets/images/stats-new.webp";
import pin from "../../assets/images/icons/worldmap.webp";

import feed from "../../assets/images/feed-new.webp";
import { Link } from "react-router-dom";
import { clearScrollHistory } from "../extra/Clearscroll";
import UserComponent from "../extra/UserComponent";

interface NavProps {
    selected: string;
    focused: boolean;
}

const Nav = ({ selected, focused }: NavProps) => {
    const [mobilenav, setMobilenav] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollToTop = document.getElementById("scrollToTop");
            if (window.scrollY > 200) {
                if (scrollToTop) scrollToTop.classList.add("showScrollToTop");
            } else {
                if (scrollToTop) scrollToTop.classList.remove("showScrollToTop");
            }
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMenu = () => {
        setMobilenav(!mobilenav);
    };

    const navLinks = [
        { name: "Stats", path: "/stats", icon: stats, id: "stats" },
        { name: "Feed", path: "/feed", icon: feed, id: "feed" },
        { name: "Guide", path: "/guide", icon: guide, id: "guide" },
        { name: "Gallery", path: "/gallery", icon: gallery, id: "gallery" },
        { name: "Map", path: "/map", icon: pin, id: "map" },
    ];

    const MotionLink = motion(Link);

    return (
        <>
            <motion.div
                className={`navbar ${(scrolled || focused || mobilenav) ? "dynamicNav" : ""}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <Link className="navLogo" to={"/"} onClick={clearScrollHistory}>
                    <motion.img
                        src={logo}
                        className="logo"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    />
                </Link>
                <div className="navLinks">
                    {navLinks.map((link) => (
                        <MotionLink
                            key={link.id}
                            onClick={clearScrollHistory}
                            to={link.path}
                            className={"nav " + (selected === link.id ? "selected" : "")}
                        >
                            <img className="navImg" src={link.icon} alt={link.id} />
                            <div>{link.name}</div>

                        </MotionLink>
                    ))}
                </div>
                <UserComponent />
                <i
                    className="material-icons menuIcon"
                    onClick={handleMenu}
                >
                    {mobilenav ? "close" : "menu"}
                </i>

                <AnimatePresence>
                    {mobilenav && (
                        <motion.div
                            className="mobileNavLinks openMobileNav"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <Link to={"/"} className={"nav " + (selected === "home" ? "selected" : "")} onClick={() => { setMobilenav(false); clearScrollHistory(); }}>
                                <img className="navImg" src={home} alt="home" />
                                <div>Home</div>
                            </Link>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.id}
                                    to={link.path}
                                    className={"nav " + (selected === link.id ? "selected" : "")}
                                    onClick={() => { setMobilenav(false); clearScrollHistory(); }}
                                >
                                    <img className="navImg" src={link.icon} alt={link.id} />
                                    <div>{link.name}</div>
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default Nav;
