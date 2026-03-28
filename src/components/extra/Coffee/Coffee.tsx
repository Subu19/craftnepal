import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./main.css";
import esewa from "../../../assets/images/esewa.png";

const Coffee = () => {
    const [show, toggle] = useState(false);

    return (
        <>
            {/* The Soft Floating Trigger Button */}
            <motion.div 
                className="coffeeTrigger"
                whileHover={{ scale: 1.05, background: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggle(!show)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <i className={`fa ${show ? "fa-times" : "fa-coffee"}`}></i>
            </motion.div>

            {/* The Soft Translucent Popup */}
            <AnimatePresence>
                {show && (
                    <motion.div 
                        className="coffeePanel"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    >
                        <div className="panelHeader">
                            <h3 className="panelTitle">Chya Kham na :)</h3>
                            <p className="panelSubtitle">Support server growth</p>
                        </div>
                        
                        <div className="panelContent">
                            <div className="supportCard">
                                <img
                                    className="supportImage"
                                    src={esewa}
                                    alt="Support"
                                />
                            </div>
                        </div>

                        <div className="panelFooter">
                            <p>Hand-crafted with love.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Backdrop for closing */}
            <AnimatePresence>
                {show && (
                    <motion.div 
                        className="coffeeBackdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => toggle(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Coffee;
