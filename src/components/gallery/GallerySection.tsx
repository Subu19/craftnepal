import { useState, useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "./GalleryStyles.css";
import { SeasonData } from "../../types";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
    seasons: SeasonData[];
}

const ITEMS_PER_PAGE = 15;

const GallerySection = ({ seasons }: GallerySectionProps) => {
    const [activeSeasonIndex, setActiveSeasonIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const containerRef = useRef<HTMLDivElement>(null);
    const masonryRef = useRef<HTMLDivElement>(null);
    const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

    // Filter valid seasons and sort (descending order, CraftNepal = 6)
    const safeSeasons = useMemo(() => {
        if (!Array.isArray(seasons)) return [];
        return [...seasons].sort((a, b) => {
            const getSeasonNum = (title: string) => {
                const t = title.toLowerCase();
                if (t.includes('craftnepal')) return 6;
                const match = t.match(/season[- ]?(\d+)/);
                return match ? parseInt(match[1], 10) : 0;
            };
            return getSeasonNum(b.title) - getSeasonNum(a.title);
        });
    }, [seasons]);

    const activeSeason = safeSeasons[activeSeasonIndex];

    // Distribute images into 3 columns for Masonry effect
    const columns = useMemo(() => {
        if (!activeSeason?.photos) return [[], [], []];
        const currentPhotos = activeSeason.photos.slice(0, visibleCount);
        const cols: string[][] = [[], [], []];
        currentPhotos.forEach((photo, index) => {
            cols[index % 3].push(photo);
        });
        return cols;
    }, [activeSeason, visibleCount]);

    // Handle Tab Change
    const handleTabChange = (index: number) => {
        if (index === activeSeasonIndex) return;
        setActiveSeasonIndex(index);
        setVisibleCount(ITEMS_PER_PAGE);

        // Brief scroll up if needed
        if (containerRef.current) {
            const top = containerRef.current.getBoundingClientRect().top + window.scrollY - 150;
            if (window.scrollY > top) {
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    };

    // Infinite Scroll Logic with ScrollTrigger
    useGSAP(() => {
        if (!loadMoreTriggerRef.current || !activeSeason?.photos) return;

        const totalPhotos = activeSeason.photos.length;

        if (visibleCount >= totalPhotos) {
            // Kill existing trigger if we reached the end
            ScrollTrigger.getById("infinite-scroll")?.kill();
            return;
        }

        ScrollTrigger.create({
            id: "infinite-scroll",
            trigger: loadMoreTriggerRef.current,
            start: "top bottom+=100", // Start loading when trigger is 100px below viewport
            onEnter: () => {
                setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, totalPhotos));
            },
            // Refresh on resize to ensure trigger position is correct
            invalidateOnRefresh: true
        });

        return () => {
            ScrollTrigger.getById("infinite-scroll")?.kill();
        };
    }, [visibleCount, activeSeason]);

    // Entrance for container
    useGSAP(() => {
        if (!containerRef.current) return;
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.2 }
        );
    }, []);

    if (!activeSeason) return null;

    return (
        <div ref={containerRef} className="gallery-section-container">

            {/* Tabs Navigation */}
            <div className="season-tabs">
                {safeSeasons.map((season, idx) => (
                    <button
                        key={season.title}
                        className={`season-tab ${idx === activeSeasonIndex ? 'active' : ''}`}
                        onClick={() => handleTabChange(idx)}
                    >
                        {season.title === 'CraftNepal' ? 'Season 6' : season.title}
                    </button>
                ))}
            </div>

            <PhotoProvider
                speed={() => 250}
                easing={(type) => (type === 2 ? 'ease-in' : 'ease-out')}
                maskOpacity={0.9}
            >
                <div ref={masonryRef} className="gallery-masonry">
                    {/* Render 3 Columns */}
                    {columns.map((colImages, colIndex) => (
                        <div key={colIndex} className="gallery-column">
                            {colImages.map((photo, imgIndex) => {
                                const src = `${import.meta.env.VITE_APP_BASE_URL}/Gallery/${encodeURIComponent(activeSeason.title)}/${encodeURIComponent(photo)}`;
                                return (
                                    <GalleryItem key={`${colIndex}-${photo}`} src={src} alt={`${activeSeason.title} ${imgIndex}`} />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </PhotoProvider>

            {/* Infinite Scroll Trigger / Loader */}
            {activeSeason.photos && visibleCount < activeSeason.photos.length && (
                <div ref={loadMoreTriggerRef} className="load-more-container">
                    <div className="loading-dots">
                        <span>.</span><span>.</span><span>.</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// Sub-component for individual image handling
const GalleryItem = ({ src, alt }: { src: string, alt: string }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <PhotoView src={src}>
            <div className={`gallery-item ${loaded ? 'loaded' : 'loading'}`}>
                {!loaded && <div className="skeleton-card" style={{ height: Math.floor(Math.random() * (400 - 200 + 1) + 200) + 'px' }} />}
                <img
                    src={src}
                    alt={alt}
                    className={`gallery-image ${loaded ? 'gallery-image-loaded' : 'gallery-image-loading'}`}
                    onLoad={() => setLoaded(true)}
                    loading="lazy"
                />
            </div>
        </PhotoView>
    );
};

export default GallerySection;
