import React from 'react';
import { Heart } from 'lucide-react';
import { weddingConfig } from '../wedding.config';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full py-12 sm:py-16 bg-[#0F2042] text-white overflow-hidden text-center px-4">
      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37]">
          WEDDING INVITATION
        </span>

        <h3 className="mt-2.5 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
          {weddingConfig.couple.groomShort}{' '}
          <span className="font-script text-3xl sm:text-4xl text-[#8DBCE2] italic mx-1.5">&amp;</span>{' '}
          {weddingConfig.couple.brideShort}
        </h3>

        <div className="my-3 flex items-center justify-center gap-2.5">
          <span className="h-[1px] w-12 bg-white/20" />
          <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
          <span className="h-[1px] w-12 bg-white/20" />
        </div>

        <p className="font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/70">
          01 . 11 . 2026 · {weddingConfig.couple.hashtag}
        </p>

        <p className="mt-4 font-sans text-xs text-white/50">
          Crafted with love for the wedding celebration of Hemanth &amp; Yashaswini
        </p>
      </div>
    </footer>
  );
};
