import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import Coffee from "../components/extra/Coffee/Coffee";
import { Helmet } from "react-helmet";
import { useGetGallery } from "../hooks/useGetGallery";
import CreeperLoading from "../components/extra/CreeperLoading";
import Season from "../components/gallery";
import Aos from "aos";
import Footer from "../components/extra/footer/Footer";

const Gallery = () => {
  const { loading, gallery } = useGetGallery(false);
  const [loadDom, setLoadDom] = useState(false);
  useEffect(() => {
    if (document.readyState !== "complete") {
      document.onreadystatechange = () => {
        if (document.readyState == "complete") {
          setLoadDom(true);
        }
        console.log(document.readyState);
      };
    } else {
      setLoadDom(true);
    }
    Aos.init();
  }, []);
  return (
    <div className="main">
      <Helmet>
        <title>Feed-CraftNepal</title>
        <meta property="og:title" content="Gallery-CraftNepal" />
        <meta name="description" content="Have a look at our season gallery." />
      </Helmet>
      <Coffee></Coffee>
      <Nav selected="gallery" focused={false}></Nav>
      <div
        className="contentTitle textcenter whitetext gallerytitle"
        data-aos="zoom-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
      >
        We treasure memories <br></br> from every season
      </div>
      <div
        className="normaltext textcenter gallerysubtitle"
        data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
      >
        Here are all the memories made by players in game
      </div>
      {loading || !loadDom ? (
        <div className="loadingContainner">
          <CreeperLoading></CreeperLoading>
        </div>
      ) : gallery != null && gallery.length ? (
        gallery.map((season) => {
          return <Season season={season}></Season>;
        })
      ) : (
        <>
          <div className=" contentTitle redtext textcenter gallerytitle">
            Something went wrong
          </div>
          <div className="normaltext textcenter">
            Please try again or contact admins in discord
          </div>
        </>
      )}
      <Footer></Footer>
    </div>
  );
};

export default Gallery;
