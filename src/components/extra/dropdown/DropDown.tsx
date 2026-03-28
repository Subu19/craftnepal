import { useState } from "react";
import "./main.css";
import CustomMarkDown from "../CustomMarkDown";
import { motion, AnimatePresence } from "framer-motion";

interface DropDownData {
    title: string;
    text: string;
}

interface DropDownProps {
    show: string | null;
    toggle: (title: string) => void;
    data: DropDownData;
}

const DropDown = ({ show, toggle, data }: DropDownProps) => {
    const isOpen = show === data.title;

    return (
        <div className={`dropdownBox-modern ${isOpen ? "active" : ""}`}>
            <div className="dropdownHeader-modern" onClick={() => toggle(data.title)}>
                <span className="dropdownTitle-modern">{data.title}</span>
                <motion.i
                    className="fa fa-chevron-down downIcon-modern"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="dropdownContent-modern"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="dropDownText-modern">
                            <CustomMarkDown>{data.text}</CustomMarkDown>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const DropDowns = ({ data }: { data: DropDownData[] }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const toggle = (header: string) => {
        setSelected(prev => prev === header ? null : header);
    };

    return (
        <div className="dropdowns-container-modern">
            {data && Array.isArray(data) ? data.map((dropdown, i) => (
                <DropDown key={i} show={selected} toggle={toggle} data={dropdown} />
            )) : null}
        </div>
    );
};
export default DropDowns;
