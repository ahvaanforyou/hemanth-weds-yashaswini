import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Camera, X } from 'lucide-react';
import { weddingConfig } from '../wedding.config';
import { ScrollFadeSection } from './ScrollFadeSection';

export const PotdumpCarousel: React.FC = () => {
  const images = weddingConfig.potdump;
  const totalPhotos = images.length || 1;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic carousel rotation every 3.2 seconds (pauses on hover or when lightbox is open)
  useEffect(() => {
    if (isPaused || lightboxImg || totalPhotos <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalPhotos);
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, lightboxImg, totalPhotos]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        setActiveIndex((prev) => (prev + 1) % totalPhotos);
      } else {
        setActiveIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const nextPhoto = () => setActiveIndex((prev) => (prev + 1) % totalPhotos);
  const prevPhoto = () => setActiveIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);

  // Exact 3D Wheel Transform from Hitesh Wedding (with infinite circular loop)
  const getCardTransform = (idx: number, total: number) => {
    let diff = idx - activeIndex;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;

    if (diff === 0) {
      return {
        transform: 'translate(-50%, -50%) translate3d(0, 0, 0) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 30,
        pointerEvents: 'auto' as const,
      };
    } else if (diff === -1) {
      return {
        transform: isMobile
          ? 'translate(-50%, -50%) translate3d(-26%, 0, -60px) rotateY(16deg) scale(0.88)'
          : 'translate(-50%, -50%) translate3d(-34%, 0, -120px) rotateY(20deg) scale(0.90)',
        opacity: 0.42,
        zIndex: 10,
        pointerEvents: 'auto' as const,
      };
    } else if (diff === 1) {
      return {
        transform: isMobile
          ? 'translate(-50%, -50%) translate3d(26%, 0, -60px) rotateY(-16deg) scale(0.88)'
          : 'translate(-50%, -50%) translate3d(34%, 0, -120px) rotateY(-20deg) scale(0.90)',
        opacity: 0.42,
        zIndex: 10,
        pointerEvents: 'auto' as const,
      };
    } else {
      return {
        transform: 'translate(-50%, -50%) translate3d(0, 0, -220px) scale(0.72)',
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none' as const,
      };
    }
  };

  return (
    <ScrollFadeSection id="potdump" className="relative overflow-hidden px-4 py-16 sm:py-24">
      {/* ── STANDARD LANDSCAPE MANDAP BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/mandap-landscape-bg.jpg"
          alt="Temple Mandap Architecture"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FD]/92 to-[#FFFFFF]" />
      </div>

      {/* Repeating Blue Floral Accent - Top Right */}
      <div className="absolute top-2 right-2 w-48 sm:w-64 md:w-80 pointer-events-none select-none z-10 opacity-85 drop-shadow-sm">
        <img
          src="/assets/flower-branch-full.png"
          alt=""
          className="w-full h-auto object-contain scale-x-[-1]"
        />
      </div>

      <div className="relative z-20 mx-auto max-w-6xl text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Camera className="w-4 h-4 text-[#D4AF37]" />
          <p className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase font-bold text-[#4B709E]">
            PHOTO DUMP &amp; CANDID MOMENTS
          </p>
          <Camera className="w-4 h-4 text-[#D4AF37]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-blue-scroll">
          Glimpses of Pure Joy
        </h2>

        <div className="my-3 flex items-center justify-center gap-3">
          <span className="h-[1px] w-14 bg-[#B8D1E8]" />
          <span className="font-script text-3xl sm:text-4xl text-[#3A75A4]">captured in love</span>
          <span className="h-[1px] w-14 bg-[#B8D1E8]" />
        </div>

        <p className="font-sans text-xs sm:text-base text-[#5578A0] max-w-md mx-auto">
          A photo dump of candid laughter, stolen glances, and our sweetest memories together.
        </p>

        {/* ── 3D WHEEL CAROUSEL STAGE (EXACTLY MATCHING HITESH WEDDING TEMPLATE) ── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={(e) => {
            setIsPaused(true);
            handleTouchStart(e);
          }}
          onTouchEnd={(e) => {
            setIsPaused(false);
            handleTouchEnd(e);
          }}
          className="relative mt-8 sm:mt-12 h-[340px] xs:h-[380px] sm:h-[480px] md:h-[530px] w-full flex items-center justify-center select-none"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {/* Previous Photo Navigation Button */}
          <button
            type="button"
            onClick={prevPhoto}
            aria-label="Previous photo"
            className="absolute left-1 sm:left-4 z-40 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#FAC12C] text-[#2B1207] shadow-[0_4px_16px_rgba(43,18,7,0.35)] border border-[#FFFDF5] backdrop-blur-md transition-all duration-300 hover:bg-[#FFFDF5] hover:text-[#2B1207] hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
          </button>

          {/* Next Photo Navigation Button */}
          <button
            type="button"
            onClick={nextPhoto}
            aria-label="Next photo"
            className="absolute right-1 sm:right-4 z-40 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#FAC12C] text-[#2B1207] shadow-[0_4px_16px_rgba(43,18,7,0.35)] border border-[#FFFDF5] backdrop-blur-md transition-all duration-300 hover:bg-[#FFFDF5] hover:text-[#2B1207] hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
          </button>

          {/* Photos on the 3D Wheel with Smooth Spring Animation */}
          {images.map((item, idx) => {
            const style = getCardTransform(idx, images.length);
            const isCenter = idx === activeIndex;

            return (
              <div
                key={idx}
                onClick={() => {
                  if (isCenter) {
                    setLightboxImg(item.image);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  ...style,
                  transition:
                    'transform 0.48s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease, box-shadow 0.45s ease',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                className={`group absolute top-1/2 left-1/2 w-[92%] xs:w-[90%] sm:w-[86%] md:w-[88%] max-w-5xl h-[300px] xs:h-[340px] sm:h-[440px] md:h-[490px] overflow-hidden rounded-[24px] sm:rounded-[36px] border-[2.5px] sm:border-[3px] border-[#D4AF37] ring-1 ring-[#FFF2B2]/60 shadow-[0_16px_44px_rgba(212,175,55,0.28)] bg-[#0A1424] cursor-pointer ${
                  isCenter ? 'hover:shadow-[0_24px_60px_rgba(212,175,55,0.45)]' : 'hover:opacity-75'
                }`}
              >
                {/* Ambient Blurred Backdrop Matching the Photo Palette */}
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                />

                {/* Pristine Full Photo (Uncropped - Complete Size Visible) */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-3">
                  <img
                    src={item.image}
                    alt={item.caption}
                    loading="eager"
                    className="max-w-full max-h-full object-contain rounded-[18px] sm:rounded-[28px] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                {/* Subtle Gradient Overlay for Text Legibility at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-20" />

                {/* Inner Gold Border Frame */}
                <div className="pointer-events-none absolute inset-2 sm:inset-3.5 rounded-[18px] sm:rounded-[30px] border border-[#D4AF37]/50 z-20" />

                {/* Corner Floral Accent */}
                <img
                  src="/assets/flower-branch-full.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-4 -right-4 w-32 sm:w-52 h-auto opacity-50 sm:opacity-65 select-none object-contain rotate-180 z-20"
                />

                {/* Top Corner Badge: Photo counter */}
                <div className="absolute right-2.5 top-2.5 sm:right-5 sm:top-5 z-30 flex items-center gap-1 sm:gap-1.5 rounded-full bg-black/60 px-2.5 py-0.5 sm:px-4 sm:py-2 font-sans text-[8.5px] xs:text-[9.5px] sm:text-xs uppercase tracking-wider text-white font-bold backdrop-blur-md border border-white/20 shadow-md">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  {idx + 1} OF {images.length}
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 text-left text-white z-30 flex items-end justify-between pointer-events-none">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#162E5A]/90 border border-[#D4AF37] text-[10px] sm:text-xs font-sans font-bold tracking-widest uppercase text-[#F5E4B2]">
                      {item.tag}
                    </span>
                    <p className="mt-2 font-serif text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow-md">
                      {item.caption}
                    </p>
                  </div>
                  <span className="hidden sm:inline-block font-sans text-xs tracking-wider text-[#D4AF37] font-semibold">
                    Tap to expand ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Wheel Dots & Swipe Hint */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? 'w-8 bg-[#162E5A] border-2 border-[#FAC12C]'
                    : 'w-2.5 bg-[#FAC12C]/60 hover:bg-[#FAC12C]'
                }`}
              />
            ))}
          </div>
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#4B709E] mt-1">
            SWIPE OR CLICK ARROWS TO SPIN • TAP CARD TO ENLARGE
          </p>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl"
          >
            <img src={lightboxImg} alt="Enlarged gallery view" className="w-full h-full object-contain" />
            <button
              onClick={() => setLightboxImg(null)}
              aria-label="Close image"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </ScrollFadeSection>
  );
};
