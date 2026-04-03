import { useGSAP } from "@gsap/react";
import Nav from "../components/Nav/Nav";
import Coffee from "../components/extra/Coffee/Coffee";
import { Helmet } from "react-helmet-async";
import { useGetGallery } from "../hooks/useGetGallery";
import CreeperLoading from "../components/extra/CreeperLoading";
import GallerySection from "../components/gallery/GallerySection";
import Footer from "../components/extra/footer/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const { loading, gallery } = useGetGallery(false);
    const hasData = Array.isArray(gallery) && gallery.length > 0;
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (loading || !hasData) return;

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".gallerytitle .word", {
            y: 100,
            rotateX: -90,
            opacity: 0,
            duration: 1.5,
            stagger: 0.1,
            transformOrigin: "bottom center",
            force3D: true
        })
            .from(".gallerysubtitle", {
                opacity: 0,
                y: 20,
                duration: 1
            }, "-=1");

        gsap.to(".gallerytitle", {
            backgroundPosition: "200% center",
            duration: 8,
            repeat: -1,
            ease: "none"
        });

    }, { dependencies: [loading, hasData], scope: containerRef });

    return (
        <div className="main gallery-page-container" ref={containerRef}>
            <Helmet>
                <title>Gallery | CraftNepal</title>
                <meta property="og:title" content="Memories | CraftNepal Gallery" />
                <meta name="description" content="Explore the legendary memories from Season 3, 4, 5, and 6 of CraftNepal." />
            </Helmet>
            <Coffee />
            <Nav selected="gallery" focused={false} />

            <div className="section-header-wrapper">
                <h1 className="contentTitle textcenter whitetext gallerytitle">
                    {"Lovely Memories".split(" ").map((word, index, arr) => (
                        <span key={index} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                            {word}{index !== arr.length - 1 ? "\u00A0" : ""}
                        </span>
                    ))}
                </h1>

                <div className="gallerysubtitle">
                    We Treasure Memories <br />
                    From All Seasons
                </div>
            </div>

            {loading ? (
                <div className="loadingContainner">
                    <CreeperLoading />
                </div>
            ) : hasData ? (
                <GallerySection seasons={gallery || []} />
            ) : (
                <div className="error-state">
                    <div className="contentTitle redtext textcenter gallerytitle">
                        {"Missions Encountered an Error".split(" ").map((word, index, arr) => (
                            <span key={index} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                                {word}{index !== arr.length - 1 ? "\u00A0" : ""}
                            </span>
                        ))}
                    </div>
                    <div className="normaltext textcenter">
                        We couldn't load the archives. Please return to the spawn or contact discord admins.
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Gallery;

