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

  // Automatic carousel rotation every 3.2 seconds
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

  // Exact 3D Wheel Transform (Circular loop)
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
          ? 'translate(-50%, -50%) translate3d(-38%, 0, -60px) rotateY(16deg) scale(0.88)'
          : 'translate(-50%, -50%) translate3d(-52%, 0, -120px) rotateY(20deg) scale(0.90)',
        opacity: 0.45,
        zIndex: 10,
        pointerEvents: 'auto' as const,
      };
    } else if (diff === 1) {
      return {
        transform: isMobile
          ? 'translate(-50%, -50%) translate3d(38%, 0, -60px) rotateY(-16deg) scale(0.88)'
          : 'translate(-50%, -50%) translate3d(52%, 0, -120px) rotateY(-20deg) scale(0.90)',
        opacity: 0.45,
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

      {/* Repeating Blue Floral Accent - Top Right (Hidden on mobile to avoid overlapping header) */}
      <div className="hidden sm:block absolute top-2 right-2 w-48 sm:w-64 md:w-80 pointer-events-none select-none z-10 opacity-85 drop-shadow-sm">
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
          Candid laughter, stolen glances, and our sweetest memories together. Tap any photo to enlarge.
        </p>

        {/* ── 3D LARGE-FORMAT IMAGES CAROUSEL (NO CARD BOXES, NO TEXT OVERLAYS) ── */}
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
          className="relative mt-8 sm:mt-14 h-[420px] xs:h-[480px] sm:h-[560px] md:h-[640px] w-full flex items-center justify-center select-none"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {/* Previous Photo Navigation Button (Royal Navy & Ice Blue theme) */}
          <button
            type="button"
            onClick={prevPhoto}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#162E5A] text-white shadow-[0_4px_16px_rgba(22,46,90,0.45)] border-2 border-[#8BBBE5] backdrop-blur-md transition-all duration-300 hover:bg-[#20437E] hover:border-white hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
          </button>

          {/* Next Photo Navigation Button (Royal Navy & Ice Blue theme) */}
          <button
            type="button"
            onClick={nextPhoto}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#162E5A] text-white shadow-[0_4px_16px_rgba(22,46,90,0.45)] border-2 border-[#8BBBE5] backdrop-blur-md transition-all duration-300 hover:bg-[#20437E] hover:border-white hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
          </button>

          {/* Large-Format Couple Images Moving in 3D Carousel Motion */}
          {images.map((item, idx) => {
            const style = getCardTransform(idx, images.length);
            const isCenter = idx === activeIndex;

            // Precision center alignment to frame keeping couple centered & balanced
            const objectPositionClass =
              item.image.includes('couple-real-1')
                ? 'object-cover object-[center_35%]'
                : item.image.includes('couple-real-2')
                ? 'object-cover object-[center_42%]'
                : item.image.includes('couple-real-3')
                ? 'object-cover object-[center_38%]'
                : item.image.includes('couple-real-4')
                ? 'object-cover object-[center_42%]'
                : 'object-cover object-center';

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
                className={`group absolute top-1/2 left-1/2 w-[76%] xs:w-[72%] sm:w-[420px] md:w-[460px] lg:w-[480px] h-[390px] xs:h-[450px] sm:h-[530px] md:h-[600px] lg:h-[620px] overflow-hidden rounded-[26px] sm:rounded-[36px] border-[2.5px] sm:border-[3.5px] border-[#4B88BD] shadow-[0_20px_50px_rgba(22,46,90,0.28)] bg-white cursor-pointer ${
                  isCenter ? 'hover:shadow-[0_26px_65px_rgba(32,67,126,0.45)] ring-2 ring-[#8BBBE5]/70' : 'hover:opacity-75'
                }`}
              >
                {/* Large Format Pristine Photo */}
                <img
                  src={item.image}
                  alt={item.caption}
                  loading="eager"
                  className={`w-full h-full ${objectPositionClass} transition-transform duration-700 ease-out group-hover:scale-105`}
                />

                {/* Subtle Inner Theme Inset Frame */}
                <div className="pointer-events-none absolute inset-2 sm:inset-3 rounded-[20px] sm:rounded-[30px] border border-[#8BBBE5]/50 z-10" />
              </div>
            );
          })}
        </div>

        {/* Carousel Wheel Dots */}
        <div className="mt-6 sm:mt-10 flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? 'w-8 bg-[#162E5A] border-2 border-[#4B88BD]'
                    : 'w-2.5 bg-[#4B88BD]/40 hover:bg-[#4B88BD]'
                }`}
              />
            ))}
          </div>
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#4B709E] mt-1">
            SWIPE OR CLICK ARROWS TO SPIN • TAP PHOTO TO ENLARGE
          </p>
        </div>
      </div>

      {/* Lightbox Zoom Modal (Uncropped Photo View) */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden border-2 border-[#4B88BD] shadow-2xl flex items-center justify-center bg-black/60 p-1"
          >
            <img src={lightboxImg} alt="Enlarged gallery view" className="max-w-full max-h-[88vh] object-contain rounded-2xl" />
            <button
              onClick={() => setLightboxImg(null)}
              aria-label="Close image"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#162E5A] text-white flex items-center justify-center hover:bg-[#20437E] border border-[#8BBBE5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </ScrollFadeSection>
  );
};
