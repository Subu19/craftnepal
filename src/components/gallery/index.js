import React, { useEffect, useRef } from "react";
import "./main.css";
import config from "../../config.json";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ScrollContainer from "react-indiana-drag-scroll";
import Aos from "aos";

const Season = ({ season }) => {
  const sliderref = useRef(null);
  const resize = () => {
    if (!sliderref.current) return;
    const slider = sliderref.current.getElement();
    const sliderBound = slider.getBoundingClientRect();
    const children = slider.getElementsByClassName("sliderItem" + season.title);
    for (const child of children) {
      const bond = child.getBoundingClientRect();
      const distance =
        sliderBound.left -
        bond.left -
        child.clientWidth / 2 +
        slider.clientWidth / 2;
      if (distance > 0) {
        if (Math.abs(distance) < 200) {
          child.classList.remove("shrinkItem1");
          child.classList.remove("shrinkItem2");
        } else if (Math.abs(distance) < 500) {
          child.classList.add("shrinkItem1");
          child.classList.remove("shrinkItem2");
        } else {
          child.classList.remove("shrinkItem1");
          child.classList.add("shrinkItem2");
        }
      } else {
        if (Math.abs(distance) < 200) {
          child.classList.remove("shrinkItem3");
          child.classList.remove("shrinkItem4");
        } else if (Math.abs(distance) < 500) {
          child.classList.add("shrinkItem3");
          child.classList.remove("shrinkItem4");
        } else {
          child.classList.remove("shrinkItem3");
          child.classList.add("shrinkItem4");
        }
      }
    }
  };
  // const wheel = (evt) => {
  //   const slider = sliderref.current.getElement();

  //   evt.preventDefault();
  //   if (evt.deltaY > 0) slider.scrollLeft += 200;
  //   else slider.scrollLeft -= 200;
  // };
  useEffect(() => {
    if (!sliderref.current) return;
    const slider = sliderref.current.getElement();
    slider.addEventListener("scroll", resize);
    // slider.addEventListener("wheel", wheel);
    // slider.scrollTo({ left: 500, behaviour: "smooth" });
    setTimeout(() => {
      resize();
    }, 1000);
    return () => {
      slider.removeEventListener("scroll", resize);
    };
  }, [sliderref.current]);
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="seasonContainner">
      <div
        className="textcenter gtitle"
        style={{ backgroundImage: `url(${season.cover})` }}
        data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
      >
        {season.title}
      </div>
      <ScrollContainer
        className="seasonSliderContainner"
        id={"slider" + season.title}
        ref={sliderref}
      >
        <div className=" fakeItem"></div>
        {/* <div className=" fakeItem"></div> */}
        <PhotoProvider>
          {season.photos.map((img) => {
            return (
              <PhotoView
                src={config.baseUrl + "Gallery/" + season.title + "/" + img}
              >
                <img
                  className={"sliderItem " + "sliderItem" + season.title}
                  src={config.baseUrl + "Gallery/" + season.title + "/" + img}
                ></img>
              </PhotoView>
            );
          })}
        </PhotoProvider>
        <div className=" fakeItem"></div>
        {/* <div className=" fakeItem"></div> */}
      </ScrollContainer>
      <hr></hr>
    </div>
  );
};

export default Season;
