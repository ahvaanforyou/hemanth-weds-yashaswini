import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { startAudio } from '../lib/audio';

interface IntroFirstPageProps {
  onOpen: () => void;
}

export const IntroFirstPage: React.FC<IntroFirstPageProps> = ({ onOpen }) => {
  const [isFading, setIsFading] = useState(false);

  const handleTapToOpen = () => {
    startAudio();
    setIsFading(true);
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 w-screen h-screen overflow-hidden transition-all duration-700 ease-out select-none bg-[#F3F8FC] ${
        isFading ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* ════════════════════════════════════════════════════════════════════════
          📱 MOBILE LAYOUT (EXACTLY MATCHING ATTACHED REFERENCE IMAGE)
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden relative w-full h-full flex flex-col items-center justify-between overflow-hidden">
        {/* Exact Pixel-Perfect Mobile Composition Asset as Background */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <img
            src="/assets/starting-page-mobile-full.png"
            alt="Hemanth weds Yashaswini Invitation"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Hotspot & Tap to Open Interactive Action */}
        {/* 1. Transparent full-screen click target */}
        <div
          onClick={handleTapToOpen}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Tap to open wedding invitation"
        />

        {/* 2. Interactive Styled Button overlaying the visual button position exactly */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[32%] xs:bottom-[33%] sm:bottom-[34%] z-20 pointer-events-auto"
        >
          <button
            type="button"
            onClick={handleTapToOpen}
            className="group relative inline-flex items-center justify-between gap-4 xs:gap-5 px-7 xs:px-9 py-2.5 xs:py-3.5 rounded-full bg-white/95 text-[#152E5A] border-2 border-[#E5C378] shadow-[0_12px_36px_rgba(212,175,55,0.4),0_6px_16px_rgba(22,46,90,0.14)] hover:shadow-[0_16px_48px_rgba(212,175,55,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="font-sans text-xs xs:text-sm font-bold tracking-[0.25em] uppercase text-[#162E5A] pl-1">
              TAP TO OPEN
            </span>
            <span className="flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-[#FAFBFD] border border-[#E5C378] text-[#162E5A] group-hover:bg-[#162E5A] group-hover:text-white transition-colors duration-300">
              <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          💻 DESKTOP & LAPTOP LAYOUT (PRESERVED IN FULL ORIGINAL GLORY)
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex relative w-full h-full flex-col justify-between items-center text-center overflow-hidden">
        {/* Full Desktop Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/assets/starting-page-bg.jpg"
            alt="Temple Mandap Architecture & Auspicious Hands"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F6F9FD]/30 via-transparent to-[#F6F9FD]/20 pointer-events-none" />
        </div>

        {/* Desktop Top Typography */}
        <div className="relative z-20 pt-16 px-4 flex flex-col items-center">
          <h1 className="font-serif text-[76px] lg:text-[84px] font-medium tracking-tight text-[#162E5A] leading-none drop-shadow-sm">
            Hemanth
          </h1>

          <div className="my-2 flex items-center justify-center gap-4 w-full">
            <span className="h-[1.5px] w-28 md:w-36 bg-gradient-to-r from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
            <span className="font-script text-5xl md:text-6xl text-[#3A75A4] italic -mt-1 select-none">
              weds
            </span>
            <span className="h-[1.5px] w-28 md:w-36 bg-gradient-to-l from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
          </div>

          <h2 className="font-serif text-[76px] lg:text-[84px] font-medium tracking-tight text-[#162E5A] leading-none drop-shadow-sm">
            Yashaswini
          </h2>

          <div className="my-3 flex items-center justify-center gap-3 text-[#B28A22]">
            <span className="h-[1px] w-16 bg-[#C5DAEE]" />
            <span className="text-[#3A75A4] text-xs">✣</span>
            <span className="h-[1px] w-16 bg-[#C5DAEE]" />
          </div>

          <p className="font-sans text-base tracking-[0.38em] uppercase text-[#30517A] font-semibold pl-1">
            01 &nbsp;NOVEMBER&nbsp; 2026
          </p>
        </div>

        {/* Desktop Bottom Button */}
        <div className="relative z-20 pb-16 md:pb-20 flex flex-col items-center">
          <button
            type="button"
            onClick={handleTapToOpen}
            className="group relative inline-flex items-center justify-between gap-5 px-9 xs:px-11 py-3.5 xs:py-4 rounded-full bg-white text-[#152E5A] border-2 border-[#D4AF37] shadow-[0_12px_36px_rgba(212,175,55,0.4),0_6px_16px_rgba(22,46,90,0.14)] hover:shadow-[0_16px_48px_rgba(212,175,55,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="font-sans text-xs xs:text-sm sm:text-base font-bold tracking-[0.25em] uppercase text-[#162E5A] pl-1">
              TAP TO OPEN
            </span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F4F8FC] border border-[#D4AF37] group-hover:bg-[#162E5A] group-hover:text-white transition-colors duration-300">
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
