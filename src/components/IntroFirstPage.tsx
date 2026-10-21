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
      className={`fixed inset-0 z-50 w-screen h-screen flex flex-col justify-between items-center text-center bg-[#F3F8FC] overflow-hidden transition-all duration-700 ease-out select-none ${
        isFading ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* ── 1. BACKGROUND ARCH & MANDAP ARCHITECTURE (CLEAN TRANSPARENT ASSET) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/starting-page-mandap.png"
          alt="Temple Mandap Architecture & Arch"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── 2. TOP TYPOGRAPHY: WEDDING NAMES & DATE (MATCHING REFERENCE IMAGE 2) ── */}
      <div className="relative z-20 pt-10 xs:pt-14 sm:pt-16 md:pt-20 px-4 flex flex-col items-center">
        {/* Groom Name */}
        <h1 className="font-serif text-[42px] xs:text-[50px] sm:text-[62px] md:text-[72px] font-normal tracking-tight text-[#162E5A] leading-none drop-shadow-xs">
          Hemanth
        </h1>

        {/* weds with rounded curved swashes */}
        <div className="my-1.5 xs:my-2 sm:my-3 flex items-center justify-center gap-2.5 sm:gap-3.5 w-full">
          <span className="h-[1.5px] w-12 xs:w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
          <span className="font-script text-3xl xs:text-4xl sm:text-5xl text-[#3A75A4] italic -mt-1 select-none">
            weds
          </span>
          <span className="h-[1.5px] w-12 xs:w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
        </div>

        {/* Bride Name */}
        <h2 className="font-serif text-[42px] xs:text-[50px] sm:text-[62px] md:text-[72px] font-normal tracking-tight text-[#162E5A] leading-none drop-shadow-xs">
          Yashaswini
        </h2>

        {/* Hairline with center diamond sparkle */}
        <div className="my-2.5 xs:my-3 flex items-center justify-center gap-2.5 sm:gap-3 text-[#B28A22]">
          <span className="h-[1px] w-10 xs:w-14 sm:w-20 bg-[#C5DAEE]" />
          <span className="text-[#3A75A4] text-[10px] xs:text-xs">✣</span>
          <span className="h-[1px] w-10 xs:w-14 sm:w-20 bg-[#C5DAEE]" />
        </div>

        {/* Date in spaced uppercase */}
        <p className="font-sans text-[11px] xs:text-xs sm:text-sm tracking-[0.38em] uppercase text-[#30517A] font-semibold pl-1">
          01 &nbsp;NOVEMBER&nbsp; 2026
        </p>
      </div>

      {/* ── 3. CENTER / LOWER-MIDDLE: KRISHNA & RADHA AUSPICIOUS HANDS + TAP TO OPEN BUTTON ── */}
      <div className="relative z-20 w-full flex flex-col items-center justify-end pb-8 xs:pb-10 sm:pb-12 pointer-events-none">
        
        {/* Krishna & Radha Auspicious Hands Overlay */}
        <div className="w-[94%] xs:w-[88%] sm:w-[480px] md:w-[540px] max-w-lg mb-3 xs:mb-4 select-none drop-shadow-md">
          <img
            src="/assets/krishna-radha-hands.png"
            alt="Divine Hands of Love & Companionship"
            className="w-full h-auto object-contain mx-auto"
          />
        </div>

        {/* TAP TO OPEN BUTTON (Matches reference exactly, with theme blue border & shadow) */}
        <div className="pointer-events-auto">
          <button
            onClick={handleTapToOpen}
            className="group relative inline-flex items-center justify-between gap-4 xs:gap-6 px-8 xs:px-10 sm:px-12 py-3 xs:py-3.5 sm:py-4 rounded-full bg-white text-[#152E5A] border-2 border-[#E5C378] shadow-[0_12px_36px_rgba(212,175,55,0.35),0_6px_16px_rgba(22,46,90,0.12)] hover:shadow-[0_16px_48px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="font-sans text-xs xs:text-sm sm:text-base font-bold tracking-[0.25em] uppercase text-[#162E5A] pl-1">
              TAP TO OPEN
            </span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FAFBFD] border border-[#E5C378] text-[#162E5A] group-hover:bg-[#162E5A] group-hover:text-white transition-colors duration-300">
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
