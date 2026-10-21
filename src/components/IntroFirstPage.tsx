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
      className={`fixed inset-0 z-50 w-screen h-screen flex flex-col items-center text-center bg-[#F3F8FC] overflow-hidden transition-all duration-700 ease-out select-none ${
        isFading ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* ── 1. BACKGROUND MANDAP ARCHITECTURE ── */}
      {/* Mobile: transparent architectural archway and lower mandap */}
      <div className="md:hidden absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/starting-page-mandap.png"
          alt="Temple Mandap Architecture & Arch"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Desktop & Laptop (Old/original full starting page background preserved) */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/starting-page-bg.jpg"
          alt="Temple Mandap Architecture & Auspicious Hands"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6F9FD]/30 via-transparent to-[#F6F9FD]/20 pointer-events-none" />
      </div>

      {/* ── 2. TOP TYPOGRAPHY: WEDDING NAMES & DATE (COMPACT PADDING SO HANDS & BUTTON SIT IN VIEW) ── */}
      <div className="relative z-20 pt-8 xs:pt-10 sm:pt-14 md:pt-16 px-4 flex flex-col items-center shrink-0">
        {/* Groom Name */}
        <h1 className="font-serif text-[38px] xs:text-[44px] sm:text-[54px] md:text-[76px] lg:text-[84px] font-normal md:font-medium tracking-tight text-[#162E5A] leading-none drop-shadow-xs">
          Hemanth
        </h1>

        {/* weds with swashes */}
        <div className="my-1 xs:my-1.5 flex items-center justify-center gap-2.5 sm:gap-4 w-full">
          <span className="h-[1.5px] w-12 xs:w-16 sm:w-24 md:w-36 bg-gradient-to-r from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
          <span className="font-script text-2xl xs:text-3xl sm:text-4xl md:text-6xl text-[#3A75A4] italic -mt-0.5 select-none">
            weds
          </span>
          <span className="h-[1.5px] w-12 xs:w-16 sm:w-24 md:w-36 bg-gradient-to-l from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
        </div>

        {/* Bride Name */}
        <h2 className="font-serif text-[38px] xs:text-[44px] sm:text-[54px] md:text-[76px] lg:text-[84px] font-normal md:font-medium tracking-tight text-[#162E5A] leading-none drop-shadow-xs">
          Yashaswini
        </h2>

        {/* Hairline with center ornament */}
        <div className="my-2 xs:my-2.5 flex items-center justify-center gap-2.5 sm:gap-3 text-[#B28A22]">
          <span className="h-[1px] w-8 xs:w-12 sm:w-16 bg-[#C5DAEE]" />
          <span className="text-[#3A75A4] text-[10px] xs:text-xs">✣</span>
          <span className="h-[1px] w-8 xs:w-12 sm:w-16 bg-[#C5DAEE]" />
        </div>

        {/* Date in spaced uppercase */}
        <p className="font-sans text-[10px] xs:text-[11px] sm:text-xs md:text-base tracking-[0.38em] uppercase text-[#30517A] font-semibold pl-1">
          01 &nbsp;NOVEMBER&nbsp; 2026
        </p>
      </div>

      {/* ── 3. MIDDLE / LOWER SECTION: HANDS & BUTTON (CENTERED IN THE MIDDLE OF MOBILE VIEW) ── */}
      {/* MOBILE: Hands & Button sitting directly in the middle viewport */}
      <div className="md:hidden relative z-20 w-full flex flex-col items-center justify-center my-auto pointer-events-none pb-8 xs:pb-12">
        {/* Krishna & Radha Auspicious Hands extending edge-to-edge */}
        <div className="w-screen max-w-none select-none drop-shadow-md overflow-hidden flex items-center justify-center -mx-4 -mb-1 xs:mb-1">
          <img
            src="/assets/krishna-radha-hands.png"
            alt="Divine Hands of Love & Companionship"
            className="w-full min-w-[100vw] h-auto object-cover object-center scale-110"
          />
        </div>

        {/* TAP TO OPEN BUTTON positioned right in the center view below hands */}
        <div className="pointer-events-auto mt-1 xs:mt-2">
          <button
            onClick={handleTapToOpen}
            className="group relative inline-flex items-center justify-between gap-4 xs:gap-5 px-8 xs:px-10 py-3 xs:py-3.5 rounded-full bg-white text-[#152E5A] border-2 border-[#E5C378] shadow-[0_12px_36px_rgba(212,175,55,0.4),0_6px_16px_rgba(22,46,90,0.14)] hover:shadow-[0_16px_48px_rgba(212,175,55,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
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

      {/* DESKTOP & LAPTOP: Original bottom-positioned Tap to Open button (Hands already part of background) */}
      <div className="hidden md:flex relative z-20 mt-auto pb-12 sm:pb-16 md:pb-20 flex-col items-center">
        <button
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
  );
};
