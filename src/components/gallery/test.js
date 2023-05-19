import Aos from "aos";
import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Parallax, useParallax } from "react-scroll-parallax";
import config from "../../config.json";
const Season = ({ season }) => {
  const [row, setrow] = useState(null);
  const [brk, setbrk] = useState(null);
  const [rows, setRows] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const g_row = document.getElementById(season.title);
    if (g_row.clientWidth / 150 >= 6) {
      setrow(6);
    } else {
      setrow(3);
    }
    Aos.init();
  }, []);

  const pushRows = (num) => {
    return new Promise((resolve, reject) => {
      let rows = [];
      let temprow = [];
      for (let i = 0; i < season.photos.length; i++) {
        const image = season.photos[i];
        temprow.push(image);
        if ((i + 1) % num == 0) {
          rows.push(temprow);
          temprow = [];
        }
        if (i + 1 == season.photos.length) {
          temprow ? (rows[row - 1] = [...rows[row - 1], ...temprow]) : "";
          resolve(rows);
        }
      }
    });
  };
  useEffect(() => {
    if (row) {
      setbrk(season.photos.length / row);
    }
  }, [row]);
  useEffect(() => {
    if (brk) {
      pushRows(brk.toFixed(0)).then((res) => {
        setloading(false);
        setRows(res);
      });
    }
  }, [brk]);
  const parallax =
    useParallax <
    HTMLDivElement >
    {
      translateY: [-100, 100],
      easing: [0.2, -0.6, 1, -0.6],
    };

  return (
    <div className="ggallery" id={season.title}>
      <div className="textcenter gtitle" ref={parallax.ref}>
        {season.title}
      </div>
      <div className="growContainner">
        <PhotoProvider>
          {!rows
            ? ""
            : rows.map((_row, i) => {
                return (
                  <div
                    className="g_row"
                    speed={
                      i + 1 != rows.length ? Math.floor(Math.random() * 50) : 30
                    }
                  >
                    {_row.map((img) => {
                      return (
                        <PhotoView
                          src={
                            config.baseUrl +
                            "Gallery/" +
                            season.title +
                            "/" +
                            img
                          }
                        >
                          <img
                            src={
                              config.baseUrl +
                              "Gallery/" +
                              season.title +
                              "/" +
                              img
                            }
                            className="rowImage"
                          ></img>
                        </PhotoView>
                      );
                    })}
                  </div>
                );
              })}
        </PhotoProvider>
      </div>
    </div>
  );
};

export default Season;
