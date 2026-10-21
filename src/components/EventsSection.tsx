import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { weddingConfig, EventItem } from '../wedding.config';
import { ScrollFadeSection } from './ScrollFadeSection';
import {
  ArrowRight,
  X,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Shirt,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const EventsSection: React.FC = () => {
  const events = weddingConfig.events;
  const totalEvents = events.length || 1;

  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
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

  // Automatic carousel rotation every 3.2 seconds (pauses on hover or when modal is open)
  useEffect(() => {
    if (isPaused || activeModalEvent || totalEvents <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalEvents);
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, activeModalEvent, totalEvents]);

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
        setActiveIndex((prev) => (prev + 1) % totalEvents);
      } else {
        setActiveIndex((prev) => (prev - 1 + totalEvents) % totalEvents);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const nextEvent = () => setActiveIndex((prev) => (prev + 1) % totalEvents);
  const prevEvent = () => setActiveIndex((prev) => (prev - 1 + totalEvents) % totalEvents);

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

  const triggerConfetti = () => {
    confetti({
      particleCount: 140,
      spread: 360,
      startVelocity: 42,
      ticks: 260,
      gravity: 0.6,
      origin: { x: 0.5, y: 0.45 },
      colors: ['#D4AF37', '#4E88BD', '#162E5A', '#F9E29D', '#FFFFFF', '#E11D48'],
      shapes: ['circle', 'square'],
      zIndex: 99999,
    });
  };

  const handleOpenEventModal = (event: EventItem) => {
    const idx = events.findIndex((e) => e.name === event.name);
    if (idx !== -1) {
      setActiveIndex(idx);
    }
    triggerConfetti();
    setActiveModalEvent(event);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalEvent(null);
    };
    if (activeModalEvent) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalEvent]);

  // Card themes matching Hitesh wedding template exactly
  const cardThemes: Record<
    string,
    {
      titleColor: string;
      titleShadow: string;
      gradientOverlay: string;
      btnBg: string;
      btnRing: string;
      btnColor: string;
      topIcon: React.ReactNode;
      dateBadge: string;
    }
  > = {
    haldi: {
      titleColor: 'text-[#5C2E00]',
      titleShadow: 'drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]',
      gradientOverlay: 'from-[#FFF8E7] via-[#FFF3D6]/95 via-40% sm:via-48% to-transparent',
      btnBg: 'bg-gradient-to-br from-[#D98A16] via-[#B87A0D] to-[#8C5503] hover:from-[#E59620] hover:to-[#A36605]',
      btnRing: 'ring-[#E5B842] border-white/90',
      btnColor: 'text-white',
      dateBadge: '• FRIDAY, 30 OCT',
      topIcon: (
        <svg className="w-6 h-6 sm:w-9 sm:h-9 text-[#B5780E] drop-shadow-sm" viewBox="0 0 48 48" fill="currentColor">
          <path d="M24 5c-1.8 6-5.5 10.5-10 13 3.5 3 8 5 10 11.5 2-6.5 6.5-8.5 10-11.5-4.5-2.5-8.2-7-10-13z" />
          <path d="M11 18c-4 3.5-8 8.5-6.5 14.5 4.5-1 9-4.5 11-8-2.5-2.5-4-4.5-4.5-6.5z" opacity="0.85" />
          <path d="M37 18c-.5 2-2 4-4.5 6.5 2 3.5 6.5 7 11 8 1.5-6-2.5-11-6.5-14.5z" opacity="0.85" />
          <circle cx="24" cy="35" r="2.8" />
        </svg>
      ),
    },
    'wedding-dinner': {
      titleColor: 'text-[#FFF4D0]',
      titleShadow: 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]',
      gradientOverlay: 'from-[#170520] via-[#240833]/95 via-40% sm:via-48% to-transparent',
      btnBg: 'bg-gradient-to-br from-[#6C1A58] via-[#4A0E3D] to-[#2E0527] hover:from-[#7E2167] hover:to-[#3D0A32]',
      btnRing: 'ring-[#D4AF37] border-[#FFF4D0]',
      btnColor: 'text-[#FFF4D0]',
      dateBadge: '• SATURDAY, 31 OCT',
      topIcon: (
        <svg className="w-6 h-6 sm:w-9 sm:h-9 text-[#F5DE98] drop-shadow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      ),
    },
    muhurtham: {
      titleColor: 'text-[#6B091B]',
      titleShadow: 'drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]',
      gradientOverlay: 'from-[#FFF4F4] via-[#FEEBEB]/95 via-40% sm:via-48% to-transparent',
      btnBg: 'bg-gradient-to-br from-[#96152F] via-[#7B1226] to-[#500816] hover:from-[#A81B38] hover:to-[#630A1C]',
      btnRing: 'ring-[#E5B842] border-white/90',
      btnColor: 'text-white',
      dateBadge: '• SUNDAY, 01 NOV',
      topIcon: (
        <svg className="w-6 h-6 sm:w-9 sm:h-9 text-[#7B1226] drop-shadow-sm" viewBox="0 0 48 48" fill="currentColor">
          <path d="M24 8c-2.2 4.5-6.5 7.5-11 8 3.5 3.5 8 4.5 9 9 1-4.5 5.5-5.5 9-9-4.5-.5-8.8-3.5-7-8z" />
          <path d="M13 19c-3.5 2.5-6.5 6.5-5.5 11.5 4-.5 8-3.5 9.5-6-1.5-2-3-3.5-4-5.5z" opacity="0.85" />
          <path d="M35 19c-1 2-2.5 3.5-4 5.5 1.5 2.5 5.5 5.5 9.5 6 1-5-2-9-5.5-11.5z" opacity="0.85" />
          <circle cx="24" cy="32" r="2.5" />
        </svg>
      ),
    },
    reception: {
      titleColor: 'text-[#FFF4D0]',
      titleShadow: 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]',
      gradientOverlay: 'from-[#0F1E3D] via-[#162E5A]/95 via-40% sm:via-48% to-transparent',
      btnBg: 'bg-gradient-to-br from-[#162E5A] via-[#1F3D73] to-[#0E1E3D] hover:from-[#21437D] hover:to-[#162E5A]',
      btnRing: 'ring-[#D4AF37] border-[#FFF4D0]',
      btnColor: 'text-[#FFF4D0]',
      dateBadge: '• FRIDAY, 06 NOV',
      topIcon: (
        <svg className="w-6 h-6 sm:w-9 sm:h-9 text-[#F5DE98] drop-shadow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
  };

  return (
    <ScrollFadeSection id="events" className="relative overflow-hidden px-4 py-16 sm:py-24">
      {/* ── STANDARD LANDSCAPE MANDAP BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/mandap-landscape-bg.jpg"
          alt="Temple Mandap Architecture"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FD]/92 to-[#FFFFFF]" />
      </div>

      {/* Repeating Blue Floral Accent - Top Left */}
      <div className="absolute top-2 left-2 w-48 sm:w-64 md:w-80 pointer-events-none select-none z-10 opacity-85 drop-shadow-sm">
        <img
          src="/assets/flower-branch-full.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative z-20 mx-auto max-w-6xl text-center">
        <p className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase font-bold text-[#4B709E] mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          THE CELEBRATIONS
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </p>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-blue-scroll">
          Order of Events
        </h2>

        <div className="my-3 flex items-center justify-center gap-3">
          <span className="h-[1px] w-14 bg-[#B8D1E8]" />
          <span className="font-script text-3xl sm:text-4xl text-[#3A75A4]">celebrate with us</span>
          <span className="h-[1px] w-14 bg-[#B8D1E8]" />
        </div>

        <p className="font-sans text-xs sm:text-base text-[#5578A0] max-w-lg mx-auto">
          Tap any celebration card to view venue details, dress code &amp; directions
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
          className="relative mt-8 sm:mt-12 h-[300px] xs:h-[330px] sm:h-[420px] md:h-[460px] w-full flex items-center justify-center select-none"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {/* Previous Card Navigation Button (Royal Navy & Blue Theme) */}
          <button
            type="button"
            onClick={prevEvent}
            aria-label="Previous celebration"
            className="absolute left-1 sm:left-4 z-40 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#162E5A] text-white shadow-[0_4px_16px_rgba(22,46,90,0.45)] border-2 border-[#8BBBE5] backdrop-blur-md transition-all duration-300 hover:bg-[#20437E] hover:border-white hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
          </button>

          {/* Next Card Navigation Button (Royal Navy & Blue Theme) */}
          <button
            type="button"
            onClick={nextEvent}
            aria-label="Next celebration"
            className="absolute right-1 sm:right-4 z-40 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#162E5A] text-white shadow-[0_4px_16px_rgba(22,46,90,0.45)] border-2 border-[#8BBBE5] backdrop-blur-md transition-all duration-300 hover:bg-[#20437E] hover:border-white hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
          </button>

          {/* Cards on the 3D Wheel with Smooth Spring Animation */}
          {events.map((event, idx) => {
            const themeKey =
              event.id === 'haldi'
                ? 'haldi'
                : event.id === 'wedding-dinner'
                ? 'wedding-dinner'
                : event.id === 'reception'
                ? 'reception'
                : 'muhurtham';
            const theme = cardThemes[themeKey] || cardThemes.haldi;
            const style = getCardTransform(idx, events.length);
            const isCenter = idx === activeIndex;

            return (
              <div
                key={event.name}
                onClick={() => {
                  if (isCenter) {
                    handleOpenEventModal(event);
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
                className={`group absolute top-1/2 left-1/2 w-[92%] xs:w-[90%] sm:w-[86%] md:w-[88%] max-w-5xl h-[260px] xs:h-[290px] sm:h-[390px] md:h-[430px] overflow-hidden rounded-[24px] sm:rounded-[36px] border-[2.5px] sm:border-[3px] border-[#4B88BD] ring-1 ring-[#8BBBE5]/60 shadow-[0_16px_44px_rgba(22,46,90,0.32)] bg-[#1A050A] cursor-pointer ${
                  isCenter ? 'hover:shadow-[0_24px_60px_rgba(32,67,126,0.45)] ring-2 ring-[#8BBBE5]/80' : 'hover:opacity-75'
                }`}
              >
                {/* Full Background Image */}
                <img
                  src={event.image}
                  alt={event.name}
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover object-right sm:object-center opacity-90 sm:opacity-95 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                />

                {/* Seamless Linear Gradient matching the background image from left to right */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${theme.gradientOverlay} pointer-events-none z-10 transition-opacity duration-300`}
                />

                {/* Floral Accents on Corners */}
                <img
                  src="/assets/flower-branch-full.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-4 -right-4 w-32 sm:w-52 h-auto opacity-50 sm:opacity-65 group-hover:opacity-80 select-none object-contain rotate-180 z-20 transition-all duration-500 group-hover:scale-105"
                />

                {/* Inner Outline Frame (Theme Blue) */}
                <div className="pointer-events-none absolute inset-2 sm:inset-3.5 rounded-[18px] sm:rounded-[30px] border border-[#8BBBE5]/50 z-20" />

                {/* Left-Aligned Seamless Text & Action Column */}
                <div className="relative z-30 flex h-full items-center pl-4 xs:pl-6 sm:pl-10 md:pl-14">
                  <div className="flex flex-col items-center justify-center text-center w-[175px] xs:w-[210px] sm:w-[320px] md:w-[360px] max-w-[58%] sm:max-w-[48%] transition-transform duration-300 group-hover:scale-[1.02]">
                    {/* Top Motif Icon */}
                    <div className="mb-0.5 sm:mb-2 transition-transform duration-300 group-hover:scale-110">
                      {theme.topIcon}
                    </div>

                    {/* Traditional Script Title (Matching Reference Image) */}
                    <h3
                      className={`font-script italic font-bold tracking-tight ${theme.titleColor} ${theme.titleShadow} ${
                        event.name.length > 18
                          ? 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl leading-tight'
                          : event.name.length > 10
                          ? 'text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-tight'
                          : 'text-4xl xs:text-5xl sm:text-6xl md:text-7xl leading-none'
                      } max-w-full break-words`}
                    >
                      {event.name}
                    </h3>

                    {/* Auspicious Tilak Flourish */}
                    <img
                      src="/assets/gold-flourish.png"
                      alt=""
                      className="w-24 xs:w-28 sm:w-44 h-auto scale-y-[-1] object-contain drop-shadow-sm my-1 xs:my-1.5 sm:my-2 brightness-110"
                    />

                    {/* Modern Circular Arrow Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEventModal(event);
                      }}
                      aria-label={`View details for ${event.name}`}
                      className={`group/btn relative mt-1 sm:mt-2 flex h-10 w-10 xs:h-11 xs:w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full ${theme.btnBg} ${theme.btnColor} border-[2px] sm:border-[2.5px] border-[#8BBBE5] shadow-[0_4px_16px_rgba(0,0,0,0.28)] ring-2 sm:ring-2 ring-[#4B88BD]/70 transition-all duration-300 group-hover:scale-110 group-hover:ring-4 group-hover:ring-[#4B88BD]/90 active:scale-95 cursor-pointer`}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/35 pointer-events-none" />
                      <ArrowRight className="relative z-10 h-5 w-5 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Corner Accent Date Badge */}
                <div className="absolute right-2.5 top-2.5 sm:right-5 sm:top-5 z-30 flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/95 px-2.5 py-0.5 sm:px-4 sm:py-2 font-serif text-[8.5px] xs:text-[9.5px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-[#162E5A] font-bold backdrop-blur-md border border-[#4B88BD] sm:border-2 shadow-md">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4B88BD]" />
                  {theme.dateBadge}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Wheel Dots & Swipe Hint */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2.5">
            {events.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to event ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? 'w-8 bg-[#162E5A] border-2 border-[#4B88BD]'
                    : 'w-2.5 bg-[#4B88BD]/40 hover:bg-[#4B88BD]'
                }`}
              />
            ))}
          </div>
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#4B709E] mt-1">
            SWIPE OR CLICK ARROWS TO SPIN • TAP CARD FOR DETAILS
          </p>
        </div>
      </div>

      {/* Expanded Modal */}
      {activeModalEvent && (
        <div
          onClick={() => setActiveModalEvent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-md p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white border-2 border-[#4B88BD] shadow-[0_25px_70px_rgba(22,46,90,0.35)] animate-fade-in-up"
          >
            <div className="relative h-52 sm:h-60 w-full overflow-hidden">
              <img
                src={activeModalEvent.image}
                alt={activeModalEvent.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

              <button
                onClick={() => setActiveModalEvent(null)}
                aria-label="Close event details"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#162E5A] text-white hover:bg-[#20437E] border border-[#8BBBE5] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-left">
                <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#8BBBE5]">
                  {activeModalEvent.day}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mt-1 drop-shadow-md">
                  {activeModalEvent.name}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 text-left space-y-4">
              <p className="font-serif italic text-sm sm:text-base text-[#274E7C] border-l-2 border-[#D4AF37] pl-3">
                &ldquo;{activeModalEvent.tagline}&rdquo;
              </p>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F4F8FC] border border-[#D0E2F2]">
                <Clock className="w-5 h-5 text-[#2B578C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-xs font-bold tracking-wider uppercase text-[#54759D]">
                    TIME &amp; MUHURTHAM
                  </p>
                  <p className="font-serif text-base sm:text-lg font-semibold text-[#162E5A] mt-0.5">
                    {activeModalEvent.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F4F8FC] border border-[#D0E2F2]">
                <MapPin className="w-5 h-5 text-[#2B578C] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-sans text-xs font-bold tracking-wider uppercase text-[#54759D]">
                    VENUE &amp; DIRECTIONS
                  </p>
                  <p className="font-serif text-base font-semibold text-[#162E5A] mt-0.5">
                    {activeModalEvent.place}
                  </p>
                  <p className="font-sans text-xs text-[#5578A0] mt-0.5">
                    {activeModalEvent.address}
                  </p>
                  <a
                    href={activeModalEvent.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#1F4C82] hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {activeModalEvent.dressCode && (
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFFDF5] border border-[#F3E7C4]">
                  <Shirt className="w-5 h-5 text-[#B28A22] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs font-bold tracking-wider uppercase text-[#967417]">
                      RECOMMENDED ATTIRE
                    </p>
                    <p className="font-sans text-xs sm:text-sm font-semibold text-[#735406] mt-0.5">
                      {activeModalEvent.dressCode}
                    </p>
                  </div>
                </div>
              )}

              {activeModalEvent.note && (
                <div className="p-4 rounded-2xl bg-[#F6F9FD] border border-[#D9E6F2]">
                  <p className="font-sans text-xs sm:text-sm text-[#385B84] leading-relaxed">
                    {activeModalEvent.note}
                  </p>
                  {activeModalEvent.funLines && (
                    <p className="mt-2 font-serif italic text-xs sm:text-sm text-[#274E7C]">
                      {activeModalEvent.funLines}
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={() => setActiveModalEvent(null)}
                className="w-full py-3.5 rounded-full bg-[#162E5A] text-white font-sans text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-[#0E1E3D] transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </ScrollFadeSection>
  );
};
