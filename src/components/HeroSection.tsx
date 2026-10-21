import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { weddingConfig } from '../wedding.config';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
      {/* ── 1. LEFT BACKGROUND: HIGH-RES COUPLE ON TERRACE SUNSET PHOTO (ZOOMED & CENTERED TO STAND OUT) ── */}
      {/* On mobile: semi-elliptical arched frame matching reference image 1, zoomed in for crystal clear face view */}
      <div className="relative w-full lg:absolute lg:inset-y-0 lg:left-0 lg:w-[70%] xl:w-[72%] h-[380px] xs:h-[420px] sm:h-[480px] lg:h-full overflow-hidden bg-[#0F1E33] shrink-0 rounded-b-[48%_38px] sm:rounded-b-[50%_60px] lg:rounded-none shadow-md lg:shadow-none z-10">
        <img
          src="/client-images/hero-couple-landscape.jpg"
          alt="Hemanth & Yashaswini"
          className="w-full h-full object-cover object-[36%_22%] lg:object-[36%_center] scale-135 xs:scale-140 lg:scale-115 transition-transform duration-1000 ease-out hover:scale-145 lg:hover:scale-120"
        />
        {/* Subtle sunset warmth wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Mobile Arch Accent Floral Spray along Bottom-Left of the Arched Couple Photo */}
        <div className="lg:hidden absolute -bottom-6 -left-6 w-36 xs:w-44 pointer-events-none select-none z-20 drop-shadow-md">
          <img
            src="/assets/flower-branch-full.png"
            alt=""
            className="w-full h-auto object-contain rotate-[-15deg]"
          />
        </div>
      </div>

      {/* ── 2. DESKTOP LAYERED S-WAVE CURTAIN DIVIDER ── */}
      <svg
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        {/* Secondary Soft Translucent Accent Wave */}
        <path
          d="M 890,0 C 800,320 680,660 460,900 L 1440,900 L 1440,0 Z"
          fill="rgba(224, 238, 252, 0.65)"
        />
        {/* Primary Crisp White Sweep Swooping Smoothly Across Groom & Bottom */}
        <path
          d="M 940,0 C 840,320 730,660 520,900 L 1440,900 L 1440,0 Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* ── 3. FLORAL BOUQUET NESTING ON BOTTOM WAVE CREST (DESKTOP) ── */}
      <div className="hidden lg:block absolute bottom-0 left-[32%] xl:left-[34%] 2xl:left-[35%] w-[300px] xl:w-[350px] pointer-events-none select-none z-20 drop-shadow-md">
        <img
          src="/assets/flower-branch-full.png"
          alt=""
          className="w-full h-auto object-contain rotate-[-10deg] translate-y-[22%]"
        />
      </div>

      {/* ── 4. RIGHT CONTENT AREA: TYPOGRAPHY & 3-COLUMN CARD ── */}
      <div className="relative z-20 w-full lg:w-[49%] xl:w-[48%] lg:ml-auto min-h-[500px] lg:h-full flex flex-col justify-between items-center text-center px-4 xs:px-6 sm:px-10 lg:px-12 py-6 sm:py-10 lg:py-12 bg-white lg:bg-transparent overflow-hidden">
        
        {/* Top-Right Floral Bouquet (Hidden on mobile to avoid overlapping text, visible on desktop) */}
        <div className="hidden lg:block absolute top-0 right-0 w-44 sm:w-56 lg:w-68 pointer-events-none select-none z-10 opacity-95 drop-shadow-sm">
          <img
            src="/assets/flower-branch-full.png"
            alt=""
            className="w-full h-auto object-contain scale-x-[-1] -translate-y-2 translate-x-2"
          />
        </div>

        {/* Mobile Bottom-Right Floral Spray tucked cleanly beneath the 3-column card */}
        <div className="lg:hidden absolute -bottom-6 -right-6 w-36 xs:w-44 pointer-events-none select-none z-10 opacity-90 drop-shadow-sm">
          <img
            src="/assets/flower-branch-full.png"
            alt=""
            className="w-full h-auto object-contain scale-x-[-1] rotate-12"
          />
        </div>

        {/* Top Spacer for vertical balance */}
        <div className="w-full h-2 sm:h-4 lg:h-6" />

        {/* ── CENTER: VECTOR TYPOGRAPHY (MATCHING REFERENCE IMAGE 1) ── */}
        <div className="relative z-20 my-auto flex flex-col items-center py-3 sm:py-6 w-full">
          {/* THE WEDDING OF with Star & Hairlines */}
          <div className="flex flex-col items-center">
            <p className="font-sans text-[11px] xs:text-xs sm:text-sm tracking-[0.38em] uppercase font-semibold text-[#2C4872]">
              THE WEDDING OF
            </p>
            <div className="mt-1.5 sm:mt-2.5 flex items-center justify-center gap-3 sm:gap-4">
              <span className="h-[1px] w-10 sm:w-16 bg-[#B2CAE2]" />
              <span className="text-[#142952] text-xs">★</span>
              <span className="h-[1px] w-10 sm:w-16 bg-[#B2CAE2]" />
            </div>
          </div>

          {/* Groom Name */}
          <h1 className="mt-3 sm:mt-5 font-serif text-[44px] xs:text-[54px] sm:text-[68px] lg:text-[76px] xl:text-[88px] font-normal tracking-tight text-[#142952] leading-[1.02] drop-shadow-xs">
            Hemanth
          </h1>

          {/* weds script with graceful curved swashes */}
          <div className="my-1 sm:my-2 flex items-center justify-center gap-2.5 sm:gap-4 w-full">
            <span className="h-[1.5px] w-12 xs:w-16 sm:w-20 bg-gradient-to-r from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
            <span className="font-script text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-[#3A7BBF] italic -mt-1 select-none">
              weds
            </span>
            <span className="h-[1.5px] w-12 xs:w-16 sm:w-20 bg-gradient-to-l from-transparent via-[#4B88BD] to-[#4B88BD] rounded-full" />
          </div>

          {/* Bride Name */}
          <h2 className="font-serif text-[44px] xs:text-[54px] sm:text-[68px] lg:text-[76px] xl:text-[88px] font-normal tracking-tight text-[#142952] leading-[1.02] drop-shadow-xs">
            Yashaswini
          </h2>
        </div>

        {/* ── BOTTOM: FROSTED 3-COLUMN CARD (MATCHING REFERENCE IMAGE 1) ── */}
        <div className="relative z-20 w-full max-w-[480px] sm:max-w-[510px] lg:max-w-[530px] pb-2 sm:pb-4">
          <div className="bg-white/95 rounded-3xl p-3.5 xs:p-4 sm:p-5 border border-[#E2EEF8] shadow-[0_14px_36px_rgba(20,45,85,0.06)]">
            <div className="grid grid-cols-3 divide-x divide-[#E3EDF6] items-center text-center">
              
              {/* Column 1: DATE */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-2.5">
                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5F0FA] flex items-center justify-center text-[#30598D] mb-1 sm:mb-2 shadow-xs">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#30598D]" />
                </div>
                <span className="font-sans text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-[#6B8BAF]">
                  DATE
                </span>
                <p className="mt-0.5 sm:mt-1 font-serif text-[11px] xs:text-xs sm:text-base lg:text-lg font-semibold text-[#142952] leading-tight">
                  01 NOV 2026
                </p>
                <p className="mt-0.5 sm:mt-1 font-sans text-[8.5px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8BA4BD] font-medium">
                  {weddingConfig.muhurtham.dayOfWeek}
                </p>
              </div>

              {/* Column 2: TIME */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-2.5">
                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5F0FA] flex items-center justify-center text-[#30598D] mb-1 sm:mb-2 shadow-xs">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#30598D]" />
                </div>
                <span className="font-sans text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-[#6B8BAF]">
                  TIME
                </span>
                <p className="mt-0.5 sm:mt-1 font-serif text-[11px] xs:text-xs sm:text-base lg:text-lg font-semibold text-[#142952] leading-tight">
                  5:30 AM - 6:30 AM
                </p>
                <p className="mt-0.5 sm:mt-1 font-sans text-[8.5px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8BA4BD] font-medium">
                  {weddingConfig.muhurtham.lagnam}
                </p>
              </div>

              {/* Column 3: VENUE (Clickable) */}
              <a
                href="https://maps.app.goo.gl/xFLQDRQ85W8K1r127?g_st=ac"
                target="_blank"
                rel="noreferrer"
                title="Open Srikrishna Convention Hall in Google Maps"
                className="flex flex-col items-center justify-center px-1 sm:px-2.5 group/venue cursor-pointer hover:bg-[#F6FAFD] rounded-2xl py-1 transition-colors"
              >
                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5F0FA] flex items-center justify-center text-[#30598D] mb-1 sm:mb-2 shadow-xs group-hover/venue:bg-[#142952] group-hover/venue:text-white transition-colors">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="font-sans text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-[#6B8BAF]">
                  VENUE
                </span>
                <p className="mt-0.5 sm:mt-1 font-serif text-[11px] xs:text-xs sm:text-sm lg:text-[14px] font-semibold text-[#142952] leading-tight group-hover/venue:text-[#2563EB] transition-colors">
                  Srikrishna<br />Convention Hall
                </p>
                <p className="mt-0.5 sm:mt-1 font-sans text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#8BA4BD] font-medium">
                  BAGEPALLI, KARNATAKA
                </p>
              </a>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
