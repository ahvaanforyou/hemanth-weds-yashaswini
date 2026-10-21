import React from 'react';
import { Heart } from 'lucide-react';
import { weddingConfig } from '../wedding.config';
import { ScrollFadeSection } from './ScrollFadeSection';

export const GratitudeSection: React.FC = () => {
  return (
    <ScrollFadeSection id="gratitude" className="py-20 sm:py-32 px-4">
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

      <div className="relative z-20 mx-auto max-w-4xl text-center">
        <div className="glass-card rounded-[36px] sm:rounded-[44px] p-8 sm:p-16 border-2 border-[#D4AF37]/60 shadow-[0_25px_65px_rgba(22,46,90,0.14)] relative overflow-hidden">
          
          {/* Background wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAFDFE] via-white to-[#F2F7FC] pointer-events-none" />

          {/* Inner Border Frame */}
          <div className="pointer-events-none absolute inset-3 sm:inset-5 rounded-[28px] sm:rounded-[36px] border border-[#D4AF37]/35" />

          <div className="relative z-10 flex flex-col items-center">
            {/* ── THIRD ATTACHED IMAGE: 3D TRADITIONAL NAMASKAR COUPLE ── */}
            <div className="w-36 xs:w-44 sm:w-56 md:w-64 h-auto mb-6 drop-shadow-[0_15px_30px_rgba(22,46,90,0.18)] transition-transform duration-500 hover:scale-105">
              <img
                src="/assets/namaste-3d-couple.png"
                alt="Bride & Groom doing Namaskar in Traditional Attire"
                className="w-full h-auto object-contain mx-auto"
              />
            </div>

            <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#B28A22]">
              WITH HEARTFELT GRATITUDE
            </span>

            {/* Radiant Blue Scroll Title Effect */}
            <h2 className="mt-3 font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-blue-scroll">
              {weddingConfig.couple.groomShort}{' '}
              <span className="font-script text-3xl sm:text-5xl text-[#3A75A4] italic mx-2">&amp;</span>{' '}
              {weddingConfig.couple.brideShort}
            </h2>

            <div className="my-3 sm:my-4 flex items-center justify-center gap-3">
              <span className="h-[1px] w-14 bg-[#B8D1E8]" />
              <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="h-[1px] w-14 bg-[#B8D1E8]" />
            </div>

            {/* Parents Line */}
            <div className="max-w-md mx-auto space-y-1.5 mt-2">
              <p className="font-sans text-sm sm:text-base font-semibold text-[#162E5A]">
                Smt. Bharathi &amp; Sri Prabhakar Babu
              </p>
              <p className="font-sans text-xs uppercase tracking-widest text-[#7999B8]">
                &amp;
              </p>
              <p className="font-sans text-sm sm:text-base font-semibold text-[#162E5A]">
                Smt. Pratibha &amp; Sri Tirupathaiah
              </p>
            </div>

            {/* Heartfelt message */}
            <p className="mt-6 sm:mt-8 font-sans text-xs sm:text-base text-[#4A6D93] leading-relaxed max-w-xl mx-auto">
              Your presence, blessings, and warm prayers make this celebration truly complete and extraordinary. We are deeply grateful to have you with us as we embark on this sacred journey of love, joy, and companionship.
            </p>

            <div className="mt-7 text-sm sm:text-base font-serif italic text-[#254C78]">
              &ldquo;Where there is love, there is life.&rdquo;
            </div>
          </div>

        </div>
      </div>
    </ScrollFadeSection>
  );
};
