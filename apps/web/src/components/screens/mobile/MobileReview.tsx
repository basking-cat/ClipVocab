"use client";

import React, { useState } from 'react';
import { Mic, Send, Sparkles } from 'lucide-react';
import { MobileShell } from './_shared/MobileShell';
import { PixelGem } from '../_shared/PixelArt';

export function MobileReview() {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <MobileShell activePage="review">
      <div className="flex-1 flex flex-col min-h-0 px-4">

        {/* Progress bar */}
        <div className="py-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-[#E8E5DF] rounded-full overflow-hidden">
              <div className="h-full bg-[#C8623E] rounded-full" style={{ width: '26%' }} />
            </div>
            <span className="text-[11px] font-bold text-[#52504B] shrink-0">12 / 47</span>
          </div>
          <p className="text-[9px] font-bold text-[#A09890] uppercase tracking-widest mt-1.5">Daily Review · Words Reviewed</p>
        </div>

        {/* AI eval badge */}
        <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-xl px-3 py-2 mb-3 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-violet-600 shrink-0" />
          <span className="text-[11px] font-semibold text-violet-700">AI Evaluation — write a sentence, get scored</span>
        </div>

        {/* Flashcard */}
        <div className="relative bg-white border-2 border-[#1C1917] rounded-2xl p-5 shadow-[4px_4px_0_#1C1917] shrink-0">
          {/* Pixel gem accent */}
          <div className="absolute -right-2 -top-3 rotate-[5deg] pointer-events-none">
            <PixelGem sz={3} fill="#6B6AE0" />
          </div>

          {/* Source */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-4 bg-[#1C1917] rounded flex items-center justify-center shrink-0">
              <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 text-white">
                <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-[#52504B]">From: <span className="text-[#1C1917]">The Office (US)</span> · S04E12</span>
            <button className="ml-auto">
              <svg viewBox="0 0 16 16" className="w-4 h-4 text-[#A09890]">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M7 10.5V8L6 7.5M8 5.5H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Context label */}
          <p className="text-[9px] font-bold text-[#A09890] uppercase tracking-widest mb-2">Context</p>

          {/* Sentence */}
          <p className="text-[15px] font-medium text-[#1C1917] leading-relaxed">
            She really{' '}
            <mark className="not-italic font-bold px-1.5 py-0.5 rounded bg-amber-300 text-[#1C1917] border border-[#1C1917] shadow-[1px_1px_0_#1C1917]" style={{ textDecoration: 'none' }}>
              cut to the chase
            </mark>
            {' '}in that meeting and got everyone back on track.
          </p>
        </div>

        {/* Write your own */}
        <div className="mt-4 shrink-0">
          <p className="text-[10px] font-bold text-[#A09890] uppercase tracking-widest mb-2">Write your own sentence using this phrase</p>
          <div className="relative bg-white border border-[#DDD9D2] rounded-xl overflow-hidden">
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="e.g. He cut to the chase and told us the budget was cut..."
              className="w-full bg-transparent text-sm text-[#1C1917] placeholder:text-[#A09890] outline-none resize-none px-4 pt-3 pb-10 leading-relaxed"
              rows={3}
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <button className="w-7 h-7 rounded-full bg-[#F0EDE6] flex items-center justify-center">
                <Mic className="w-3.5 h-3.5 text-[#A09890]" />
              </button>
            </div>
          </div>
        </div>

        {/* Submit CTA */}
        <button
          onClick={() => setSubmitted(s => !s)}
          className={`mt-3 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold border transition-all shrink-0 ${
            submitted
              ? 'bg-emerald-400 border-emerald-500 text-[#1C1917]'
              : 'bg-[#1C1917] border-[#1C1917] text-white shadow-[3px_3px_0_#C8623E] hover:shadow-[2px_2px_0_#C8623E] hover:translate-x-[1px] hover:translate-y-[1px]'
          }`}
        >
          <Send className="w-4 h-4" />
          {submitted ? 'Score: 84/100 — Nice!' : 'Submit for AI Review'}
        </button>

        {/* Coming up */}
        <div className="mt-3 pb-2 shrink-0">
          <p className="text-[9px] font-bold text-[#A09890] uppercase tracking-widest mb-2">Coming Up</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
            {['nuance', 'reckon', 'bear with me'].map(w => (
              <div key={w} className="flex-shrink-0 bg-white border border-[#DDD9D2] rounded-xl px-3 py-2">
                <p className="text-[11px] font-bold italic text-[#1C1917]" style={{ fontFamily: 'Playfair Display, serif' }}>"{w}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </MobileShell>
  );
}
