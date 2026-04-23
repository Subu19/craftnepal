import { useEffect, useState } from "react";
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
    },
    {
        id: 2,
        url: slider2,
    },
    {
        id: 3,
        url: slider3,
    },
    {
        id: 4,
        url: slider4,
    },
    {
        id: 5,
        url: slider5,
    },
];

const Slider = () => {
    var auto = true;
    const [selected, setselected] = useState(1);
    const changeImg = (id) => {
        const parent = document.getElementById("slider");
        const width = parent.clientWidth;
        parent.scrollTo({ left: width * (id - 1), behavior: "smooth" });
        const elements = document.getElementsByClassName("index");
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.classList.remove("indexSelected");
        }
        document.getElementById(id + "i").classList.add("indexSelected");
    };
    useEffect(() => {
        document.getElementById(1 + "i").classList.add("indexSelected");
    }, []);
    return (
        <div className="sliderBox">
            <div className="slider" id="slider">
                {gallery.map((image) => {
                    return (
                        <div key={image.id + "image"} id={image.id + "image"} className="slide">
                            <img src={image.url} className="slider-img"></img>
                        </div>
                    );
                })}
            </div>
            <div className="slideIndex">
                {gallery.map((image) => {
                    return <i key={image.id + "i"} id={image.id + "i"} class={"fa fa-circle index "} onClick={() => changeImg(image.id)}></i>;
                })}
            </div>
        </div>
    );
};

export default Slider;
