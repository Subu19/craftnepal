import { useState } from "react";
import "./slider.css";
import slider1 from "../../assets/images/slider1.png";
import slider2 from "../../assets/images/slider2.png";
import slider3 from "../../assets/images/slider3.png";
import slider4 from "../../assets/images/slider4.png";
import slider5 from "../../assets/images/slider5.png";

const gallery = [
    {
        id: 1,
        url: slider1,
        icon: "fas fa-walking",
        title: "Blonkisoaz",
        subtitle: "Omuke trughte a otufta",
    },
    {
        id: 2,
        url: slider2,
        icon: "fas fa-snowflake",
        title: "Oretemauw",
        subtitle: "Omuke trughte a otufta",
    },
    {
        id: 3,
        url: slider3,
        icon: "fas fa-tree",
        title: "Iteresuselle",
        subtitle: "Omuke trughte a otufta",
    },
    {
        id: 4,
        url: slider4,
        icon: "fas fa-tint",
        title: "Idiefe",
        subtitle: "Omuke trughte a otufta",
    },
    {
        id: 5,
        url: slider5,
        icon: "fas fa-sun",
        title: "Inatethi",
        subtitle: "Omuke trughte a otufta",
    },
];

const Slider = () => {
    const [activeId, setActiveId] = useState(1);

    return (
        <div className="slider-container">
            <div className="slider-options">
                {gallery.map((image) => (
                    <div
                        key={image.id}
                        className={`slider-option ${activeId === image.id ? "active" : ""}`}
                        style={{ "--optionBackground": `url(${image.url})` } as React.CSSProperties}
                        onMouseEnter={() => setActiveId(image.id)}
                    >
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;