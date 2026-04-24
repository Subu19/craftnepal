import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { ImageIcon, Sparkles, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

import { useGallery } from '../../features/gallery/api/use-gallery';
import {
  Button,
  Card,
  Skeleton,
} from '../../shared/ui';
import { stagger, fadeUp, scaleIn } from '../../shared/lib/framer-motion/variants';

import { useParams, useNavigate } from 'react-router-dom';

const Gallery = () => {
  const { season: seasonParam } = useParams();
  const navigate = useNavigate();
  const { data: galleryData, isLoading, error } = useGallery();
  
  const selectedIndex = useMemo(() => {
    if (!galleryData || !seasonParam) return 0;
    const index = galleryData.findIndex(s => s.title.toLowerCase() === seasonParam.toLowerCase());
    return index === -1 ? 0 : index;
  }, [galleryData, seasonParam]);

  // Handle initial redirect to the first season's URL if no season in URL
  React.useEffect(() => {
    if (galleryData && galleryData.length > 0 && !seasonParam) {
      navigate(`/gallery/${galleryData[0].title}`, { replace: true });
    }
  }, [galleryData, seasonParam, navigate]);

  const currentSeason = useMemo(() => {
    return galleryData?.[selectedIndex] || null;
  }, [galleryData, selectedIndex]);

  const goToPrev = useCallback(() => {
    if (!galleryData) return;
    const prevIndex = (selectedIndex - 1 + galleryData.length) % galleryData.length;
    navigate(`/gallery/${galleryData[prevIndex].title}`);
  }, [galleryData, selectedIndex, navigate]);

  const goToNext = useCallback(() => {
    if (!galleryData) return;
    const nextIndex = (selectedIndex + 1) % galleryData.length;
    navigate(`/gallery/${galleryData[nextIndex].title}`);
  }, [galleryData, selectedIndex, navigate]);

  if (isLoading) return <GalleryLoadingState />;
  if (error) return <GalleryErrorState />;

  // Build visible 3-card window: [prev, center, next]
  const total = galleryData?.length || 0;
  const visibleCards =
    total === 0
      ? []
      : total === 1
        ? [{ season: galleryData![0], pos: 'center' as const, idx: 0 }]
        : total === 2
          ? [
            { season: galleryData![selectedIndex === 0 ? 1 : 0], pos: 'left' as const, idx: selectedIndex === 0 ? 1 : 0 },
            { season: galleryData![selectedIndex], pos: 'center' as const, idx: selectedIndex },
          ]
          : [
            {
              season: galleryData![(selectedIndex - 1 + total) % total],
              pos: 'left' as const,
              idx: (selectedIndex - 1 + total) % total,
            },
            {
              season: galleryData![selectedIndex],
              pos: 'center' as const,
              idx: selectedIndex,
            },
            {
              season: galleryData![(selectedIndex + 1) % total],
              pos: 'right' as const,
              idx: (selectedIndex + 1) % total,
            },
          ];

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-accent-500/10 blur-[120px] -z-10 rounded-full opacity-50" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-400 text-xs font-black uppercase tracking-widest mb-6"
          >
            <Camera size={14} />
            <span>Captured Moments</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
          >
            Server{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">
              Gallery
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Relive the greatest moments of CraftNepal. From epic builds to community events, every
            season has a story to tell.
          </motion.p>
        </motion.div>
      </section>

      {/* Season Selector */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-accent-500 rounded-full" />
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">Select Season</h2>
        </div>

        {/* 3-card carousel */}
        <div className="relative flex items-center justify-center">
          {/* Prev Button — overlaps left card */}
          <button
            onClick={goToPrev}
            disabled={total <= 1}
            className="absolute left-0 z-30 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-secondary-900/80 border border-white/10 text-white shadow-2xl backdrop-blur-md hover:bg-accent-500 hover:border-accent-500 hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous season"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>

          {/* Cards track */}
          <div className="flex items-center justify-center gap-4 w-full px-10">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleCards.map(({ season, pos, idx }) => {
                const isCenter = pos === 'center';
                return (
                  <motion.button
                    key={season.title}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.5,
                      scale: isCenter ? 1 : 0.88,
                    }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                    onClick={() => navigate(`/gallery/${galleryData![idx].title}`)}
                    className={`
                      relative overflow-hidden rounded-[2.5rem] border-2 shadow-2xl
                      transition-[border-color,box-shadow,filter] duration-500 group
                      flex-shrink-0
                      ${isCenter
                        ? 'w-full max-w-sm h-56 md:h-64 border-accent-500 ring-[6px] ring-accent-500/15 shadow-accent-500/20 z-10'
                        : 'w-full max-w-[13rem] md:max-w-[15rem] h-44 md:h-52 border-white/5 grayscale-[0.4] hover:grayscale-0 hover:border-white/20 cursor-pointer z-0'
                      }
                    `}
                    aria-label={`Select ${season.title}`}
                  >
                    <img
                      src={season.cover}
                      alt={season.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute bottom-5 left-5 text-left">
                      <h3
                        className={`font-black text-white tracking-tight leading-none mb-1 ${isCenter ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                          }`}
                      >
                        {season.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em] flex items-center gap-1.5">
                        <ImageIcon size={11} className="text-accent-400" />
                        {season.photos.length} Photos
                      </p>
                    </div>

                    {isCenter && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 bg-accent-500 text-white p-2 rounded-full shadow-xl"
                      >
                        <Sparkles size={15} />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Next Button — overlaps right card */}
          <button
            onClick={goToNext}
            disabled={total <= 1}
            className="absolute right-0 z-30 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-secondary-900/80 border border-white/10 text-white shadow-2xl backdrop-blur-md hover:bg-accent-500 hover:border-accent-500 hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next season"
          >
            <ChevronRight size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Dot indicators */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {galleryData?.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(`/gallery/${galleryData![i].title}`)}
                className={`transition-all duration-300 rounded-full ${i === selectedIndex
                    ? 'w-6 h-2 bg-accent-500'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                aria-label={`Go to season ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {(currentSeason?.photos?.length || 0) > 0 ? (
              <PhotoProvider
                maskOpacity={0.9}
                loadingElement={<Skeleton className="w-full h-full" />}
              >
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                  {currentSeason?.photos.map((photo, idx) => (
                    <PhotoView key={idx} src={photo.url}>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="relative group rounded-3xl overflow-hidden cursor-zoom-in border border-white/5 break-inside-avoid shadow-xl bg-white/[0.02]"
                      >
                        <img
                          src={photo.url}
                          alt={photo.name || 'Gallery image'}
                          loading="lazy"
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                          <div className="flex items-center gap-2 text-white/80 scale-90 group-hover:scale-100 transition-transform">
                            <Sparkles size={14} className="text-accent-400" />
                            <span className="text-xs font-black uppercase tracking-widest">
                              {currentSeason?.title}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </PhotoView>
                  ))}
                </div>
              </PhotoProvider>
            ) : (
              <div className="text-center py-32 bg-secondary-900/20 rounded-[3rem] border border-dashed border-white/10">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-700">
                  <ImageIcon size={40} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">No memories found</h3>
                <p className="text-gray-500 text-lg">Select another season to explore.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
};

const GalleryLoadingState = () => (
  <div className="max-w-7xl mx-auto px-4 pt-32 space-y-12">
    <div className="text-center space-y-4">
      <Skeleton className="h-12 w-96 mx-auto rounded-full bg-white/5" />
      <Skeleton className="h-4 w-64 mx-auto rounded-full bg-white/5" />
    </div>
    <div className="flex items-center justify-center gap-4 px-10">
      <Skeleton className="h-44 w-52 shrink-0 rounded-[2.5rem] bg-white/5 opacity-50" />
      <Skeleton className="h-64 w-80 shrink-0 rounded-[2.5rem] bg-white/5" />
      <Skeleton className="h-44 w-52 shrink-0 rounded-[2.5rem] bg-white/5 opacity-50" />
    </div>
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <Skeleton key={i} className="h-64 w-full rounded-3xl bg-white/5 break-inside-avoid" />
      ))}
    </div>
  </div>
);

const GalleryErrorState = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <Card className="max-w-md w-full bg-secondary-900/40 border-white/5 backdrop-blur-2xl p-12 text-center rounded-[3rem]">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
        <Sparkles size={40} />
      </div>
      <h2 className="text-3xl font-black text-white mb-4">Oops!</h2>
      <p className="text-gray-400 mb-8 leading-relaxed">
        We couldn't load the treasure chest of memories. Please try again or contact the admins.
      </p>
      <Button
        onClick={() => window.location.reload()}
        className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs"
      >
        Retry Fetching
      </Button>
    </Card>
  </div>
);

export default Gallery;