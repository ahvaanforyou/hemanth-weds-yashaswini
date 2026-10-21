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
      className={`fixed inset-0 z-50 w-screen h-screen flex flex-col justify-between items-center text-center bg-[#EAF2F9] overflow-hidden transition-all duration-700 ease-out select-none ${
        isFading ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* ── 2ND ATTACHED IMAGE AS FULLSCREEN BACKGROUND (ALREADY HAS HANDS & MANDAP COMPOSED) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/starting-page-bg.jpg"
          alt="Temple Mandap Architecture & Auspicious Hands"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft atmospheric gradient wash for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6F9FD]/30 via-transparent to-[#F6F9FD]/20 pointer-events-none" />
      </div>

      {/* ── 1. TOP TYPOGRAPHY: WEDDING NAMES & DATE ── */}
      <div className="relative z-20 pt-8 xs:pt-12 sm:pt-14 md:pt-16 px-4 flex flex-col items-center">
        {/* Groom Name */}
        <h1 className="font-serif text-[42px] xs:text-[52px] sm:text-[66px] md:text-[78px] lg:text-[84px] font-medium tracking-tight text-[#162E5A] leading-none drop-shadow-sm">
          Hemanth
        </h1>

        {/* weds with decorative swashes */}
        <div className="my-1.5 sm:my-2.5 flex items-center justify-center gap-3 sm:gap-4 w-full">
          <span className="h-[1.5px] w-14 xs:w-20 sm:w-28 md:w-36 bg-gradient-to-r from-transparent to-[#4B88BD] rounded-full" />
          <span className="font-script text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#3A75A4] italic -mt-1 select-none">
            weds
          </span>
          <span className="h-[1.5px] w-14 xs:w-20 sm:w-28 md:w-36 bg-gradient-to-l from-transparent to-[#4B88BD] rounded-full" />
        </div>

        {/* Bride Name */}
        <h2 className="font-serif text-[42px] xs:text-[52px] sm:text-[66px] md:text-[78px] lg:text-[84px] font-medium tracking-tight text-[#162E5A] leading-none drop-shadow-sm">
          Yashaswini
        </h2>

        {/* Divider Sparkle Motif */}
        <div className="my-2 sm:my-2.5 flex items-center justify-center text-[#B28A22] text-xs sm:text-sm">
          <span className="tracking-[0.3em] font-serif">✦</span>
        </div>

        {/* Date in spaced uppercase */}
        <p className="font-sans text-xs xs:text-sm sm:text-base md:text-lg tracking-[0.38em] uppercase text-[#30517A] font-semibold pl-1">
          01 &nbsp;NOVEMBER&nbsp; 2026
        </p>
      </div>

      {/* ── 2. TAP TO OPEN BUTTON PLACED RIGHT OVER LOWER MANDAP STEPS ── */}
      <div className="relative z-20 pb-12 sm:pb-16 md:pb-20 flex flex-col items-center">
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
