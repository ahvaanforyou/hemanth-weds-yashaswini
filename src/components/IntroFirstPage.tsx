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
      className={`fixed inset-0 z-50 w-screen h-[100dvh] flex flex-col items-center text-center bg-[#F3F8FC] overflow-hidden transition-all duration-700 ease-out select-none ${
        isFading ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* ── 1. BACKGROUND MANDAP ARCHITECTURE ── */}
      {/* Mobile: Perfect center-aligned mandap & arch anchored to the top so arch never cuts */}
      <div className="md:hidden absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <img
          src="/assets/starting-page-mandap.png"
          alt="Temple Mandap Architecture & Arch"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Desktop & Laptop Background */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/starting-page-bg.jpg"
          alt="Temple Mandap Architecture & Auspicious Hands"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6F9FD]/30 via-transparent to-[#F6F9FD]/20 pointer-events-none" />
      </div>

      {/* ── 2. MOBILE LAYOUT (PRECISELY POSITIONED PER ANNOTATION) ── */}
      <div className="md:hidden relative z-20 w-full h-[100dvh] flex flex-col items-center pointer-events-none">
        {/* Top Typography: nestled gracefully inside upper arch, lowered into clear white area */}
        <div className="pt-16 xs:pt-20 sm:pt-24 px-4 flex flex-col items-center shrink-0">
          <h1 className="font-serif text-[38px] xs:text-[44px] font-normal tracking-tight text-[#162E5A] leading-none drop-shadow-xs">
            Hemanth
          </h1>

          <div className="my-1 xs:my-1.5 flex items-center justify-center gap-2.5 sm:gap-4 w-full">
            <span className="h-[1.5px] w-12 xs:w-16 bg-gradient-to-r from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
            <span className="font-script text-2xl xs:text-3xl text-[#3A75A4] italic -mt-0.5 select-none">
              weds
            </span>
            <span className="h-[1.5px] w-12 xs:w-16 bg-gradient-to-l from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
          </div>

          <h2 className="font-serif text-[38px] xs:text-[44px] font-normal tracking-tight text-[#162E5A] leading-none drop-shadow-xs">
            Yashaswini
          </h2>

          <div className="my-1.5 xs:my-2 flex items-center justify-center gap-2.5 text-[#B28A22]">
            <span className="h-[1px] w-8 xs:w-10 bg-[#C5DAEE]" />
            <span className="text-[#3A75A4] text-[10px]">✣</span>
            <span className="h-[1px] w-8 xs:w-10 bg-[#C5DAEE]" />
          </div>

          <p className="font-sans text-[10px] xs:text-[11px] tracking-[0.38em] uppercase text-[#30517A] font-semibold pl-1">
            01 &nbsp;NOVEMBER&nbsp; 2026
          </p>
        </div>

        {/* Auspicious Hands: lowered into the open white space */}
        <div className="w-screen max-w-none select-none drop-shadow-md overflow-hidden flex items-center justify-center -mx-4 mt-7 xs:mt-9">
          <img
            src="/assets/krishna-radha-hands.png"
            alt="Divine Hands of Love & Companionship"
            className="w-full min-w-[100vw] h-auto object-cover object-center scale-100 xs:scale-105"
          />
        </div>

        {/* Tap to Open Button: brought comfortably higher above the temple */}
        <div className="pointer-events-auto mt-auto mb-32 xs:mb-36 sm:mb-40">
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

      {/* ── 3. DESKTOP & LAPTOP LAYOUT (PRESERVED) ── */}
      <div className="hidden md:flex relative z-20 w-full h-full flex-col items-center justify-between pointer-events-none pt-16 pb-16">
        <div className="px-4 flex flex-col items-center shrink-0">
          <h1 className="font-serif text-[76px] lg:text-[84px] font-medium tracking-tight text-[#162E5A] leading-none drop-shadow-xs">
            Hemanth
          </h1>

          <div className="my-1.5 flex items-center justify-center gap-4 w-full">
            <span className="h-[1.5px] w-36 bg-gradient-to-r from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
            <span className="font-script text-6xl text-[#3A75A4] italic -mt-0.5 select-none">
              weds
            </span>
            <span className="h-[1.5px] w-36 bg-gradient-to-l from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
          </div>

          <h2 className="font-serif text-[76px] lg:text-[84px] font-medium tracking-tight text-[#162E5A] leading-none drop-shadow-xs">
            Yashaswini
          </h2>

          <div className="my-2.5 flex items-center justify-center gap-3 text-[#B28A22]">
            <span className="h-[1px] w-16 bg-[#C5DAEE]" />
            <span className="text-[#3A75A4] text-xs">✣</span>
            <span className="h-[1px] w-16 bg-[#C5DAEE]" />
          </div>

          <p className="font-sans text-base tracking-[0.38em] uppercase text-[#30517A] font-semibold pl-1">
            01 &nbsp;NOVEMBER&nbsp; 2026
          </p>
        </div>

        <div className="pointer-events-auto">
          <button
            onClick={handleTapToOpen}
            className="group relative inline-flex items-center justify-between gap-5 px-11 py-4 rounded-full bg-white text-[#152E5A] border-2 border-[#D4AF37] shadow-[0_12px_36px_rgba(212,175,55,0.4),0_6px_16px_rgba(22,46,90,0.14)] hover:shadow-[0_16px_48px_rgba(212,175,55,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="font-sans text-base font-bold tracking-[0.25em] uppercase text-[#162E5A] pl-1">
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
