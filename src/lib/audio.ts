import { useState, useEffect } from 'react';
import { weddingConfig } from '../wedding.config';

let globalAudio: HTMLAudioElement | null = null;
let isAudioPlaying = false;
const listeners = new Set<(playing: boolean) => void>();

function notify() {
  const isPlaying = !!globalAudio && !globalAudio.paused && !globalAudio.muted;
  isAudioPlaying = isPlaying;
  listeners.forEach((listener) => listener(isPlaying));
}

export function getAudio(): HTMLAudioElement {
  if (!globalAudio && typeof window !== 'undefined') {
    globalAudio = new Audio(weddingConfig.audio.src);
    globalAudio.loop = true;
    globalAudio.volume = weddingConfig.audio.volume ?? 0.5;
    globalAudio.preload = 'auto';

    globalAudio.addEventListener('play', notify);
    globalAudio.addEventListener('pause', notify);
    globalAudio.addEventListener('ended', notify);
    globalAudio.addEventListener('volumechange', notify);
  }
  return globalAudio!;
}

export function startAudio() {
  if (typeof window === 'undefined') return;
  const audio = getAudio();
  audio.muted = false;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Auto-unlock on next interaction if browser blocked
      const unlock = () => {
        audio.play().catch(() => {});
        window.removeEventListener('click', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
    });
  }
  notify();
}

export function toggleAudio() {
  const audio = getAudio();
  if (audio.paused || audio.muted) {
    audio.muted = false;
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
  notify();
}

export function useAudioState() {
  const [playing, setPlaying] = useState<boolean>(() => {
    return !!globalAudio && !globalAudio.paused && !globalAudio.muted;
  });

  useEffect(() => {
    const handler = (status: boolean) => setPlaying(status);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  return playing;
}
