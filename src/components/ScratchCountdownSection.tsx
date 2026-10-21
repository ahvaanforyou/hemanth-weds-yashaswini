import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../wedding.config';
import { ScrollFadeSection } from './ScrollFadeSection';
import { Sparkles, RotateCcw } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const ScratchCountdownSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerCardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [scratchProgress, setScratchProgress] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const strokeCounterRef = useRef<number>(0);
  const lastCheckTimeRef = useRef<number>(0);
  const hasRevealedRef = useRef<boolean>(false);
  const isScratchingRef = useRef<boolean>(false);

  // 1. Live Countdown ticker to the wedding date
  useEffect(() => {
    const targetIso = weddingConfig.muhurtham.targetIso;
    const targetTime = new Date(targetIso).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Center Confetti Explosion
  const triggerCenterConfetti = useCallback(() => {
    if (!timerCardRef.current) return;
    const rect = timerCardRef.current.getBoundingClientRect();

    const centerX = (rect.left + rect.width / 2) / window.innerWidth;
    const centerY = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 150,
      spread: 360,
      startVelocity: 44,
      ticks: 260,
      gravity: 0.7,
      origin: { x: centerX, y: centerY },
      colors: ['#D4AF37', '#6FA4DC', '#162E5A', '#F5E4B2', '#FFFFFF', '#3B82F6'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
      zIndex: 99999,
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 360,
        startVelocity: 28,
        ticks: 200,
        gravity: 0.8,
        origin: { x: centerX, y: centerY },
        colors: ['#D4AF37', '#93C5FD', '#FFFFFF'],
        scalar: 0.95,
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    }, 200);
  }, []);

  // 3. Initialize Canvas (Horizontally Big)
  const initCanvas = useCallback(() => {
    if (hasRevealedRef.current) return;
    const canvas = canvasRef.current;
    const timerCard = timerCardRef.current;
    if (!canvas || !timerCard) return;

    const rect = timerCard.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    if (width === 0 || height === 0) return;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Elegant Royal Navy + Ice Blue + Shimmering Gold Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#162E5A');
    grad.addColorStop(0.25, '#2A558C');
    grad.addColorStop(0.5, '#D4AF37');
    grad.addColorStop(0.75, '#568CBF');
    grad.addColorStop(1, '#0F2042');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Ornate Inner Gold Foil Frame
    ctx.strokeStyle = 'rgba(255, 240, 180, 0.9)';
    ctx.lineWidth = 3;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    ctx.strokeStyle = 'rgba(22, 46, 90, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(24, 24, width - 48, height - 48);

    // Delicate Star Accents
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    const sparkleCoords = [
      [40, 40], [width - 40, 40], [40, height - 40], [width - 40, height - 40],
      [width * 0.2, 30], [width * 0.8, 30], [width * 0.2, height - 30], [width * 0.8, height - 30],
    ];
    sparkleCoords.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Centered Call to Action Text
    const centerY = height / 2;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = 'bold 15px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = '#FFF5C0';
    ctx.fillText('✨  SCRATCH TO REVEAL  ✨', width / 2, centerY - 32);

    ctx.font = '600 32px "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('The Countdown to Forever', width / 2, centerY + 6);

    ctx.font = 'italic 15px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText('Swipe or drag finger / mouse to unveil the timer', width / 2, centerY + 42);

    ctx.restore();

    setIsRevealed(false);
    setScratchProgress(0);
    lastPointRef.current = null;
    strokeCounterRef.current = 0;
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!hasRevealedRef.current) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  // 4. Scratch Calculation
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealedRef.current) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const stride = 14;

    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let transparentCount = 0;
      let totalSampled = 0;

      for (let y = 0; y < height; y += stride) {
        for (let x = 0; x < width; x += stride) {
          const index = (y * width + x) * 4;
          if (data[index + 3] < 128) {
            transparentCount++;
          }
          totalSampled++;
        }
      }

      const percent = totalSampled > 0 ? Math.round((transparentCount / totalSampled) * 100) : 0;
      setScratchProgress(percent);

      if (percent >= 38 && !hasRevealedRef.current) {
        hasRevealedRef.current = true;
        setIsRevealed(true);
        triggerCenterConfetti();
        ctx.clearRect(0, 0, width, height);
      }
    } catch {}
  }, [triggerCenterConfetti]);

  const scratchAt = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealedRef.current) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'destination-out';

    const radius = 42;

    if (lastPointRef.current) {
      const last = lastPointRef.current;
      const dist = Math.hypot(x - last.x, y - last.y);
      const steps = Math.max(1, Math.floor(dist / 6));

      for (let i = 0; i <= steps; i++) {
        const cx = last.x + (x - last.x) * (i / steps);
        const cy = last.y + (y - last.y) * (i / steps);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    lastPointRef.current = { x, y };
    strokeCounterRef.current++;

    const now = performance.now();
    if (strokeCounterRef.current % 4 === 0 || now - lastCheckTimeRef.current > 120) {
      lastCheckTimeRef.current = now;
      checkScratchPercentage();
    }
  }, [checkScratchPercentage]);

  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (hasRevealedRef.current) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isScratchingRef.current = true;
    setIsScratching(true);
    const coords = getCanvasCoords(e.clientX, e.clientY);
    if (coords) scratchAt(coords.x, coords.y);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratchingRef.current || hasRevealedRef.current) return;
    const coords = getCanvasCoords(e.clientX, e.clientY);
    if (coords) scratchAt(coords.x, coords.y);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    isScratchingRef.current = false;
    setIsScratching(false);
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  const handleReset = () => {
    hasRevealedRef.current = false;
    setIsRevealed(false);
    initCanvas();
  };

  return (
    <ScrollFadeSection id="countdown" className="py-20 sm:py-28 px-4">
      {/* ── STANDARD LANDSCAPE MANDAP BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/mandap-landscape-bg.jpg"
          alt="Temple Mandap Architecture"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FD]/92 to-[#FFFFFF]" />
      </div>

      {/* Repeating Blue Floral Accent - Top Left */}
      <div className="absolute top-2 left-2 w-48 sm:w-64 pointer-events-none select-none z-10 opacity-85 drop-shadow-sm">
        <img src="/assets/flower-branch-full.png" alt="" className="w-full h-auto object-contain" />
      </div>

      <div className="relative z-20 mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <p className="font-sans text-xs sm:text-sm tracking-[0.28em] uppercase font-bold text-[#4B709E]">
            AUSPICIOUS COUNTDOWN
          </p>
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        </div>

        {/* Radiant Blue Scroll Title Effect */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-blue-scroll">
          Every Moment Closer to Forever
        </h2>

        <div className="my-3 flex items-center justify-center gap-3">
          <span className="h-[1px] w-14 bg-[#B8D1E8]" />
          <span className="font-script text-3xl sm:text-4xl text-[#3A75A4]">with divine blessings</span>
          <span className="h-[1px] w-14 bg-[#B8D1E8]" />
        </div>

        <p className="font-sans text-xs sm:text-base text-[#4E6F97] max-w-xl mx-auto">
          Scratch the golden shimmer card below to unveil our live countdown to the sacred Muhurtham!
        </p>

        {/* ── HORIZONTALLY BIG INTERACTIVE SCRATCH CARD CONTAINER ── */}
        <div ref={containerRef} className="relative mt-12 sm:mt-16 mx-auto w-full max-w-4xl lg:max-w-5xl">
          
          {/* Main Card (Horizontally Big & Spacious) */}
          <div
            ref={timerCardRef}
            className="relative glass-card rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 border-2 border-[#D4AF37] shadow-[0_25px_65px_rgba(22,46,90,0.16)] overflow-hidden"
          >
            {/* Background wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFD] via-white to-[#EBF3FA] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#B28A22]">
                SACRED MUHURTHAM COUNTDOWN
              </span>

              <h3 className="mt-1 font-serif text-2xl sm:text-4xl md:text-5xl text-[#162E5A] font-bold">
                01 November 2026 · 5:30 AM
              </h3>

              <p className="font-sans text-xs sm:text-base text-[#5D7C9F] mt-1 font-medium">
                Thula Lagnam · Srikrishna Convention Hall, Bagepalli
              </p>

              {/* Horizontally Big Countdown Digits Grid */}
              <div className="grid grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-10 w-full max-w-3xl">
                {/* Days */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-7 rounded-2xl bg-white border border-[#D0E2F2] shadow-sm">
                  <span className="font-serif text-3xl sm:text-6xl md:text-7xl font-bold text-[#162E5A] leading-none">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="mt-2.5 font-sans text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#5779A1]">
                    DAYS
                  </span>
                </div>

                {/* Hours */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-7 rounded-2xl bg-white border border-[#D0E2F2] shadow-sm">
                  <span className="font-serif text-3xl sm:text-6xl md:text-7xl font-bold text-[#162E5A] leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="mt-2.5 font-sans text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#5779A1]">
                    HOURS
                  </span>
                </div>

                {/* Minutes */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-7 rounded-2xl bg-white border border-[#D0E2F2] shadow-sm">
                  <span className="font-serif text-3xl sm:text-6xl md:text-7xl font-bold text-[#162E5A] leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="mt-2.5 font-sans text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#5779A1]">
                    MINS
                  </span>
                </div>

                {/* Seconds */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-7 rounded-2xl bg-white border border-[#D0E2F2] shadow-sm">
                  <span className="font-serif text-3xl sm:text-6xl md:text-7xl font-bold text-[#D4AF37] leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="mt-2.5 font-sans text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#5779A1]">
                    SECS
                  </span>
                </div>
              </div>

              <p className="mt-8 sm:mt-10 font-serif italic text-base sm:text-lg text-[#274972]">
                &ldquo;Two hearts, one soul, beginning their forever journey.&rdquo;
              </p>
            </div>
          </div>

          {/* ── CANVAS SCRATCH LAYER OVERLAY ── */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              touchAction: 'none',
              cursor: isScratching ? 'grabbing' : 'grab',
              opacity: isRevealed ? 0 : 1,
              pointerEvents: isRevealed ? 'none' : 'auto',
              transition: isRevealed ? 'opacity 0.6s ease-out' : 'none',
            }}
            className="absolute inset-0 rounded-[32px] sm:rounded-[40px] shadow-lg z-20"
          />

          {/* Scratch Progress indicator & Re-scratch Button */}
          <div className="mt-4 flex items-center justify-between px-3 text-xs sm:text-sm text-[#5D7C9F]">
            <span>
              {isRevealed ? (
                <span className="text-[#B28A22] font-semibold flex items-center gap-1.5">
                  ✨ Unveiled! Welcome to our countdown!
                </span>
              ) : (
                <span>Scratched: {scratchProgress}%</span>
              )}
            </span>

            {isRevealed && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#D0E2F2] text-[#162E5A] hover:bg-[#F4F8FC] transition-all text-xs font-semibold shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
                Scratch again
              </button>
            )}
          </div>
        </div>

      </div>
    </ScrollFadeSection>
  );
};
