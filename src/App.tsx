import React, { useState, useEffect } from 'react';
import { IntroFirstPage } from './components/IntroFirstPage';
import { HeroSection } from './components/HeroSection';
import { ScratchCountdownSection } from './components/ScratchCountdownSection';
import { MeetCoupleSection } from './components/MeetCoupleSection';
import { PotdumpCarousel } from './components/PotdumpCarousel';
import { EventsSection } from './components/EventsSection';
import { VenueSection } from './components/VenueSection';
import { RsvpSection } from './components/RsvpSection';
import { GratitudeSection } from './components/GratitudeSection';
import { Footer } from './components/Footer';
import { MusicButton } from './components/MusicButton';

export const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  // Manage body scroll lock until tap to open
  useEffect(() => {
    if (!isOpened) {
      document.body.classList.add('door-locked');
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove('door-locked');
    }
    return () => {
      document.body.classList.remove('door-locked');
    };
  }, [isOpened]);

  return (
    <div className="relative min-h-screen bg-[#F6F9FD] text-[#162E5A] selection:bg-[#D4AF37]/30 selection:text-[#162E5A]">
      {/* 1. Tap to Open First Page Screen */}
      {!isOpened && (
        <IntroFirstPage onOpen={() => setIsOpened(true)} />
      )}

      {/* 2. Main Wedding Website */}
      <main className={`transition-opacity duration-700 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection />
        <ScratchCountdownSection />
        <MeetCoupleSection />
        <PotdumpCarousel />
        <EventsSection />
        <VenueSection />
        <RsvpSection />
        <GratitudeSection />
        <Footer />
        <MusicButton />
      </main>
    </div>
  );
};

export default App;
