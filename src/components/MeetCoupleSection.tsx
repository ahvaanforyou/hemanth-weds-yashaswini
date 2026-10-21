import React, { useState, useEffect } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../wedding.config';
import { ScrollFadeSection } from './ScrollFadeSection';

interface PersonDetails {
  name: string;
  role: string;
  parents: string;
  bio: string;
  photo: string;
  quote: string;
}

export const MeetCoupleSection: React.FC = () => {
  const [activeModal, setActiveModal] = useState<PersonDetails | null>(null);

  const brideData: PersonDetails = {
    name: weddingConfig.couple.bride,
    role: 'The Bride',
    parents: weddingConfig.couple.brideParents,
    bio: weddingConfig.couple.brideBio,
    photo: weddingConfig.couple.bridePhoto,
    quote: 'In his warmth and gentle spirit, I have found my forever home.',
  };

  const groomData: PersonDetails = {
    name: weddingConfig.couple.groom,
    role: 'The Groom',
    parents: weddingConfig.couple.groomParents,
    bio: weddingConfig.couple.groomBio,
    photo: weddingConfig.couple.groomPhoto,
    quote: 'Her radiant smile brings pure happiness into my world every single day.',
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    if (activeModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  return (
    <ScrollFadeSection id="couple" className="py-20 sm:py-32 px-4">
      {/* ── STANDARD LANDSCAPE MANDAP BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/mandap-landscape-bg.jpg"
          alt="Temple Mandap Architecture"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FD]/92 to-[#FFFFFF]" />
      </div>

      {/* Repeating Blue Floral Accent - Bottom Left */}
      <div className="absolute bottom-2 left-2 w-48 sm:w-64 md:w-80 pointer-events-none select-none z-10 opacity-85 drop-shadow-sm">
        <img
          src="/assets/flower-branch-full.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative z-20 mx-auto max-w-5xl text-center">
        {/* Header without the mini star symbol */}
        <p className="font-sans text-xs sm:text-sm tracking-[0.32em] uppercase font-bold text-[#4B709E] mb-2">
          TOGETHER WITH THEIR FAMILIES
        </p>

        {/* Radiant Blue Scroll Title Effect */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-blue-scroll">
          Meet the Bride &amp; Groom
        </h2>

        <div className="my-3 flex items-center justify-center gap-3">
          <span className="h-[1px] w-14 bg-[#B8D1E8]" />
          <span className="font-script text-3xl sm:text-4xl text-[#3A75A4]">two hearts, one destiny</span>
          <span className="h-[1px] w-14 bg-[#B8D1E8]" />
        </div>

        <p className="font-sans text-xs sm:text-base text-[#5578A0] max-w-lg mx-auto">
          Click on each portrait to view their details and parentage.
        </p>

        {/* ── LARGER BRIDE & GROOM CARDS ── */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
          
          {/* BRIDE CARD */}
          <div
            onClick={() => setActiveModal(brideData)}
            className="group cursor-pointer glass-card rounded-3xl p-8 sm:p-10 border-2 border-[#D0E2F2] hover:border-[#D4AF37] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(22,46,90,0.16)] hover:-translate-y-2 flex flex-col items-center"
          >
            {/* Extra Large Portrait Container */}
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full p-2.5 bg-gradient-to-tr from-[#D4AF37] via-[#94BEE5] to-[#D4AF37] shadow-lg group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-[#EBF3FA]">
                <img
                  src={brideData.photo}
                  alt={brideData.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-2 right-4 w-11 h-11 rounded-full bg-[#162E5A] text-[#D4AF37] flex items-center justify-center border-2 border-white shadow-md group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <span className="mt-7 font-sans text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#B28A22]">
              {brideData.role}
            </span>

            <h3 className="mt-1.5 font-serif text-3xl sm:text-4xl font-semibold text-blue-scroll">
              {brideData.name}
            </h3>

            <p className="mt-2.5 font-sans text-xs sm:text-base text-[#4E7199] font-medium leading-relaxed max-w-xs">
              {brideData.parents}
            </p>

            <span className="mt-5 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#EBF3FA] text-xs sm:text-sm font-semibold text-[#162E5A] group-hover:bg-[#162E5A] group-hover:text-white transition-all shadow-xs">
              <span>View Details</span>
              <span>&rarr;</span>
            </span>
          </div>

          {/* GROOM CARD */}
          <div
            onClick={() => setActiveModal(groomData)}
            className="group cursor-pointer glass-card rounded-3xl p-8 sm:p-10 border-2 border-[#D0E2F2] hover:border-[#D4AF37] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(22,46,90,0.16)] hover:-translate-y-2 flex flex-col items-center"
          >
            {/* Extra Large Portrait Container */}
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full p-2.5 bg-gradient-to-tr from-[#D4AF37] via-[#94BEE5] to-[#D4AF37] shadow-lg group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-[#EBF3FA]">
                <img
                  src={groomData.photo}
                  alt={groomData.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-2 right-4 w-11 h-11 rounded-full bg-[#162E5A] text-[#D4AF37] flex items-center justify-center border-2 border-white shadow-md group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <span className="mt-7 font-sans text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#B28A22]">
              {groomData.role}
            </span>

            <h3 className="mt-1.5 font-serif text-3xl sm:text-4xl font-semibold text-blue-scroll">
              {groomData.name}
            </h3>

            <p className="mt-2.5 font-sans text-xs sm:text-base text-[#4E7199] font-medium leading-relaxed max-w-xs">
              {groomData.parents}
            </p>

            <span className="mt-5 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#EBF3FA] text-xs sm:text-sm font-semibold text-[#162E5A] group-hover:bg-[#162E5A] group-hover:text-white transition-all shadow-xs">
              <span>View Details</span>
              <span>&rarr;</span>
            </span>
          </div>

        </div>
      </div>

      {/* ── POP-UP MODAL DETAILS WITH CROSS BUTTON ── */}
      {activeModal && (
        <div
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-[#D4AF37] shadow-[0_25px_60px_rgba(22,46,90,0.35)] overflow-hidden animate-fade-in-up"
          >
            {/* Top decorative blue floral corner */}
            <div className="absolute top-2 right-2 w-36 pointer-events-none select-none z-10 opacity-80">
              <img src="/assets/flower-branch-full.png" alt="" className="w-full h-auto object-contain scale-x-[-1]" />
            </div>

            {/* Cross (Close) Button on Top-Right */}
            <button
              onClick={() => setActiveModal(null)}
              aria-label="Close details"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-[#D0E2F2] flex items-center justify-center text-[#162E5A] hover:bg-[#162E5A] hover:text-white transition-all duration-200 shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="p-7 sm:p-10 flex flex-col items-center text-center">
              <div className="w-36 h-36 rounded-full p-1.5 bg-gradient-to-tr from-[#D4AF37] to-[#80A8D2] shadow-md mb-4">
                <img
                  src={activeModal.photo}
                  alt={activeModal.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <span className="font-sans text-xs font-bold tracking-[0.25em] uppercase text-[#B28A22]">
                {activeModal.role}
              </span>

              <h3 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#162E5A]">
                {activeModal.name}
              </h3>

              <div className="my-2.5 flex items-center justify-center gap-2">
                <span className="h-[1px] w-12 bg-[#B8D1E8]" />
                <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="h-[1px] w-12 bg-[#B8D1E8]" />
              </div>

              {/* Parents note */}
              <p className="font-sans text-sm sm:text-base font-semibold text-[#162E5A] bg-[#F1F6FB] px-5 py-2.5 rounded-2xl border border-[#D0E2F2] w-full">
                {activeModal.parents}
              </p>

              {/* Bio 1-2 lines */}
              <p className="mt-4 font-sans text-sm sm:text-base text-[#4E7199] leading-relaxed">
                {activeModal.bio}
              </p>

              {/* Poetic quote */}
              <p className="mt-3 font-serif italic text-sm sm:text-base text-[#244975]">
                &ldquo;{activeModal.quote}&rdquo;
              </p>

              <button
                onClick={() => setActiveModal(null)}
                className="mt-7 px-8 py-2.5 rounded-full bg-[#162E5A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#284E88] transition-colors cursor-pointer shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </ScrollFadeSection>
  );
};
