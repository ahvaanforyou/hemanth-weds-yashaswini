import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { toggleAudio, useAudioState } from '../lib/audio';

export const MusicButton: React.FC = () => {
  const isPlaying = useAudioState();

  return (
    <aside
      aria-label="Background music controls"
      className="fixed bottom-5 right-5 z-40"
    >
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border-2 border-[#D4AF37] backdrop-blur-md shadow-[0_8px_24px_rgba(22,46,90,0.22)] transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-[#162E5A] text-white hover:bg-[#284E88]'
            : 'bg-white/90 text-[#162E5A] hover:bg-white'
        }`}
      >
        {/* Equalizer Wave or Disc Animation */}
        <div className="relative flex items-center justify-center w-5 h-5">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5">
              <span className="w-[2.5px] bg-[#D4AF37] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3.5" />
              <span className="w-[2.5px] bg-[#D4AF37] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.15s] h-2" />
              <span className="w-[2.5px] bg-[#D4AF37] rounded-full animate-[pulse_0.75s_ease-in-out_infinite_0.3s] h-3" />
            </div>
          ) : (
            <Music className="w-4 h-4 text-[#7A98B7]" />
          )}
        </div>

        {/* Status text & Volume icon */}
        <span className="hidden sm:inline font-sans text-xs font-bold uppercase tracking-wider">
          {isPlaying ? 'Music On' : 'Muted'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#D4AF37]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#7A98B7]" />
        )}
      </button>
    </aside>
  );
};
