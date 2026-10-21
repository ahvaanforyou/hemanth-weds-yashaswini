import React, { useState } from 'react';
import { MapPin, Navigation, Calendar, ExternalLink } from 'lucide-react';
import { weddingConfig } from '../wedding.config';
import { ScrollFadeSection } from './ScrollFadeSection';

export const VenueSection: React.FC = () => {
  const venues = weddingConfig.venues;
  const [activeVenueId, setActiveVenueId] = useState(venues[0].id);

  const currentVenue = venues.find((v) => v.id === activeVenueId) || venues[0];

  return (
    <ScrollFadeSection id="venue" className="py-20 sm:py-32 px-4">
      {/* ── STANDARD LANDSCAPE MANDAP BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/mandap-landscape-bg.jpg"
          alt="Temple Mandap Architecture"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FD]/92 to-[#FFFFFF]" />
      </div>

      {/* Repeating Blue Floral Accent - Bottom Right (Hidden on mobile to avoid overlapping controls) */}
      <div className="hidden sm:block absolute bottom-2 right-2 w-48 sm:w-64 md:w-80 pointer-events-none select-none z-10 opacity-85 drop-shadow-sm">
        <img
          src="/assets/flower-branch-full.png"
          alt=""
          className="w-full h-auto object-contain rotate-180"
        />
      </div>

      <div className="relative z-20 mx-auto max-w-6xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <p className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase font-bold text-[#4B709E]">
              FIND US ON MAPS
            </p>
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-blue-scroll">
            Venues &amp; Directions
          </h2>

          <div className="my-3 flex items-center justify-center gap-3">
            <span className="h-[1px] w-14 bg-[#B8D1E8]" />
            <span className="font-script text-3xl sm:text-4xl text-[#3A75A4]">the way to celebrate</span>
            <span className="h-[1px] w-14 bg-[#B8D1E8]" />
          </div>

          <p className="font-sans text-xs sm:text-base text-[#5578A0] max-w-lg mx-auto">
            Choose a location below to view the interactive map and start GPS navigation directly.
          </p>

          {/* Larger Venue Selector Tabs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {venues.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVenueId(v.id)}
                className={`px-5 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-sans font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeVenueId === v.id
                    ? 'bg-[#162E5A] text-white shadow-lg ring-2 ring-[#D4AF37]'
                    : 'bg-white/90 text-[#3D5F86] hover:bg-white border-2 border-[#D0E2F2]'
                }`}
              >
                {v.city.split(',')[0]} · {v.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* ── EXPANDED VENUE CONTENT & MAP GRID ── */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Details Card */}
          <div className="lg:col-span-5 text-left flex flex-col">
            <div className="glass-card rounded-3xl p-7 sm:p-10 border-2 border-[#D0E2F2] shadow-[0_20px_50px_rgba(22,46,90,0.1)] flex flex-col justify-between h-full">
              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#E5F0FA] text-[#255184] font-sans text-xs font-bold tracking-widest uppercase mb-4">
                  {currentVenue.label}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-scroll leading-snug">
                  {currentVenue.name}
                </h3>

                <p className="mt-3 font-sans text-sm sm:text-base text-[#4E7199] leading-relaxed">
                  {currentVenue.address}
                </p>

                {/* Celebrations Hosted Here */}
                <div className="mt-7 pt-6 border-t border-[#D0E2F2]/80">
                  <p className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-[#B28A22] mb-3.5">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    Ceremonies Hosted Here
                  </p>
                  <ul className="space-y-2.5">
                    {currentVenue.eventsHosted.map((evt, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-sm sm:text-base text-[#162E5A] font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                        <span>{evt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Google Maps Navigation Button */}
              <div className="mt-8 pt-4">
                <a
                  href={currentVenue.mapsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full px-7 py-4 rounded-full bg-[#162E5A] text-white hover:bg-[#284E88] text-xs sm:text-sm font-bold uppercase tracking-widest transition-all shadow-md group cursor-pointer"
                >
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] group-hover:rotate-45 transition-transform" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Embedded Interactive Map */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[380px] xs:h-[440px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_25px_65px_rgba(22,46,90,0.16)] bg-[#E8F1FA]">
              <iframe
                title={`Map location of ${currentVenue.name}`}
                src={currentVenue.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
              
              <div className="pointer-events-none absolute inset-3 rounded-2xl border border-[#D4AF37]/35" />
            </div>
            <p className="mt-3 text-center font-sans text-xs sm:text-sm text-[#6C8DAE]">
              {currentVenue.city} · Click inside map or open Google Maps for live GPS route
            </p>
          </div>

        </div>
      </div>
    </ScrollFadeSection>
  );
};
