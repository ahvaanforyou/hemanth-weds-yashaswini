import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, X, Send, Sparkles, UserCheck, Edit3 } from 'lucide-react';
import { weddingConfig } from '../wedding.config';
import { ScrollFadeSection } from './ScrollFadeSection';

type AttendanceStatus = 'attending' | 'declining' | null;

interface RsvpRecord {
  name: string;
  contact: string;
  guestCount: number;
  attendance: Record<string, AttendanceStatus>;
  message: string;
  submittedAt: string;
}

const STORAGE_KEY = 'hemanth_yashaswini_rsvp';

export const RsvpSection: React.FC = () => {
  const events = weddingConfig.events;

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(() => {
    const initial: Record<string, AttendanceStatus> = {};
    events.forEach((ev) => {
      initial[ev.id] = 'attending';
    });
    return initial;
  });
  const [message, setMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<RsvpRecord | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const setEventStatus = (eventId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({
      ...prev,
      [eventId]: status,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!contact.trim()) {
      setErrorMsg('Please provide your phone number or email.');
      return;
    }

    const hasAnySelection = Object.values(attendance).some((status) => status !== null);
    if (!hasAnySelection) {
      setErrorMsg('Please select your attendance status for at least one celebration.');
      return;
    }

    setIsSubmitting(true);

    const record: RsvpRecord = {
      name: name.trim(),
      contact: contact.trim(),
      guestCount,
      attendance,
      message: message.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    // Asynchronously send to Google Sheets webhook if configured
    const webhookUrl = (weddingConfig as any).rsvp?.googleSheetWebhookUrl;
    if (webhookUrl && webhookUrl.trim().length > 0) {
      try {
        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: record.name,
            contact: record.contact,
            guestCount: record.guestCount,
            haldi: record.attendance['haldi'] === 'attending' ? 'Yes' : 'No',
            wedding: record.attendance['wedding-dinner'] === 'attending' ? 'Yes' : 'No',
            muhurtham: record.attendance['muhurtham'] === 'attending' ? 'Yes' : 'No',
            reception: record.attendance['reception'] === 'attending' ? 'Yes' : 'No',
            message: record.message,
            submittedAt: new Date().toISOString(),
          }),
        }).catch((err) => {
          console.warn('Google Sheet RSVP sync notice:', err);
        });
      } catch (err) {
        console.warn('Google Sheet RSVP sync notice:', err);
      }
    }

    setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      } catch {}
      setSubmittedData(record);
      setIsSubmitting(false);

      // Joyous Confetti
      confetti({
        particleCount: 140,
        spread: 360,
        startVelocity: 42,
        origin: { x: 0.5, y: 0.55 },
        colors: ['#D4AF37', '#3B82F6', '#162E5A', '#FDE68A', '#FFFFFF'],
        zIndex: 99999,
      });
    }, 600);
  };

  const handleEdit = () => {
    if (submittedData) {
      setName(submittedData.name);
      setContact(submittedData.contact);
      setGuestCount(submittedData.guestCount);
      setAttendance(submittedData.attendance);
      setMessage(submittedData.message);
    }
    setSubmittedData(null);
  };

  return (
    <ScrollFadeSection id="rsvp" className="py-20 sm:py-32 px-4">
      {/* ── STANDARD LANDSCAPE MANDAP BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/mandap-landscape-bg.jpg"
          alt="Temple Mandap Architecture"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FD]/92 to-[#FFFFFF]" />
      </div>

      {/* Repeating Blue Floral Accent - Top Left (Hidden on mobile to avoid overlapping header) */}
      <div className="hidden sm:block absolute top-2 left-2 w-48 sm:w-64 pointer-events-none select-none z-10 opacity-85 drop-shadow-sm">
        <img
          src="/assets/flower-branch-full.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative z-20 mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <p className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase font-bold text-[#4B709E]">
            HONOR US WITH YOUR PRESENCE
          </p>
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        </div>

        {/* Radiant Blue Scroll Title Effect */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-blue-scroll">
          RSVP &amp; Blessings
        </h2>

        <div className="my-3 flex items-center justify-center gap-3">
          <span className="h-[1px] w-14 bg-[#B8D1E8]" />
          <span className="font-script text-3xl sm:text-4xl text-[#3A75A4]">we look forward to seeing you</span>
          <span className="h-[1px] w-14 bg-[#B8D1E8]" />
        </div>

        <p className="font-sans text-xs sm:text-base text-[#5578A0] max-w-lg mx-auto">
          Please let us know your attendance for each ceremony by selecting &ldquo;Attending&rdquo; or &ldquo;Not Attending&rdquo; below.
        </p>

        {/* ── FORM OR CONFIRMATION CARD ── */}
        <div className="relative mt-12 sm:mt-16 mx-auto w-full max-w-2xl">
          <div className="glass-card rounded-3xl p-6 sm:p-12 border-2 border-[#D0E2F2] shadow-[0_25px_60px_rgba(22,46,90,0.12)]">
            
            {submittedData ? (
              /* Confirmation Screen */
              <div className="flex flex-col items-center text-center animate-fade-in py-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E8F3FD] border-2 border-[#D4AF37] flex items-center justify-center text-[#162E5A] mb-4 shadow-sm">
                  <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#28578C]" />
                </div>

                <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-[#B28A22]">
                  RSVP RECORDED
                </span>

                <h3 className="mt-1 font-serif text-2xl sm:text-4xl font-semibold text-[#162E5A]">
                  Thank You, {submittedData.name}!
                </h3>

                <p className="mt-3 font-sans text-sm sm:text-base text-[#4E7197] leading-relaxed max-w-lg">
                  Your response has been noted for {submittedData.guestCount} guest(s). Hemanth, Yashaswini, and their families warmly appreciate your response!
                </p>

                {/* Event Attendance Summary List */}
                <div className="mt-7 w-full p-5 rounded-2xl bg-[#F4F8FC] border border-[#D0E2F2] text-left">
                  <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#5779A1] mb-3">
                    Your Attendance Status:
                  </p>
                  <ul className="space-y-2.5">
                    {events.map((ev) => {
                      const status = submittedData.attendance[ev.id];
                      return (
                        <li key={ev.id} className="flex items-center justify-between gap-2 text-sm sm:text-base">
                          <span className="font-medium text-[#162E5A]">{ev.name}</span>
                          {status === 'attending' ? (
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-bold uppercase">
                              <Check className="w-3.5 h-3.5" /> Attending
                            </span>
                          ) : status === 'declining' ? (
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-300 text-xs font-bold uppercase">
                              <X className="w-3.5 h-3.5" /> Not Attending
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">Not specified</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <button
                  onClick={handleEdit}
                  className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#D0E2F2] text-[#162E5A] hover:bg-[#F4F8FC] transition-colors text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-[#D4AF37]" />
                  Modify Response
                </button>
              </div>
            ) : (
              /* RSVP Form */
              <form onSubmit={handleSubmit} className="text-left space-y-6">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#355780] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Srikanth Sharma & Family"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#D0E2F2] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 text-sm sm:text-base text-[#162E5A] placeholder-[#90A7C0] outline-none transition-all"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#355780] mb-2">
                    Phone Number or Email *
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. +91 98765 43210 or your@email.com"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#D0E2F2] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 text-sm sm:text-base text-[#162E5A] placeholder-[#90A7C0] outline-none transition-all"
                  />
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#355780] mb-2">
                    Number of Guests Attending
                  </label>
                  <div className="flex items-center gap-2 sm:gap-3">
                    {[1, 2, 3, 4, '5+'].map((num, idx) => {
                      const val = idx + 1;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestCount(val)}
                          className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all cursor-pointer ${
                            guestCount === val
                              ? 'bg-[#162E5A] text-white shadow-md ring-2 ring-[#D4AF37]'
                              : 'bg-white border border-[#D0E2F2] text-[#42658C] hover:bg-[#F4F8FC]'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Event Attendance Selection */}
                <div>
                  <label className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#355780] mb-3">
                    Will you attend? (Select for each ceremony) *
                  </label>
                  <div className="space-y-3">
                    {events.map((ev) => {
                      const currentStatus = attendance[ev.id];
                      return (
                        <div
                          key={ev.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#D0E2F2] shadow-xs"
                        >
                          <div>
                            <p className="font-serif text-base sm:text-lg font-semibold text-[#162E5A]">
                              {ev.name}
                            </p>
                            <p className="font-sans text-xs text-[#5A7C9F]">
                              {ev.day} · {ev.time}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setEventStatus(ev.id, 'attending')}
                              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                currentStatus === 'attending'
                                  ? 'bg-[#162E5A] text-white shadow-sm ring-1 ring-[#D4AF37]'
                                  : 'bg-[#F4F8FC] border border-[#D0E2F2] text-[#5578A0] hover:bg-white'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Attending</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setEventStatus(ev.id, 'declining')}
                              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                currentStatus === 'declining'
                                  ? 'bg-slate-700 text-white shadow-sm'
                                  : 'bg-[#F4F8FC] border border-[#D0E2F2] text-[#5578A0] hover:bg-white'
                              }`}
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Not Attending</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Blessing message */}
                <div>
                  <label className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#355780] mb-2">
                    A Blessing or Message for the Couple
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a sweet wish or blessing..."
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#D0E2F2] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 text-sm sm:text-base text-[#162E5A] placeholder-[#90A7C0] outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 sm:py-5 rounded-full bg-[#162E5A] text-white hover:bg-[#284E88] text-xs sm:text-sm font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit RSVP & Warm Wishes'}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </ScrollFadeSection>
  );
};
