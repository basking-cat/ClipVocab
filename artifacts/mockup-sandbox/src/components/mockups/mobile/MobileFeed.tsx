import React, { useState } from 'react';
import { Search, Bell, Bookmark, Clock } from 'lucide-react';
import { MobileShell, LogoMark } from './_shared/MobileShell';
import { PixelStar } from '../_shared/PixelArt';

const clips = [
  {
    id: 'c1',
    show: 'The Office (US)',
    episode: 'S04 · E12',
    clipRange: '1:22–1:43',
    phrase: 'throw under the bus',
    wordType: 'Idiom',
    difficulty: 'Intermediate',
    diffColor: 'bg-amber-200',
    saved: false,
  },
  {
    id: 'c2',
    show: 'Lex Fridman Podcast',
    episode: 'Ep. 401',
    clipRange: '4:51–5:14',
    phrase: 'nuance',
    wordType: 'Noun',
    difficulty: 'Advanced',
    diffColor: 'bg-rose-200',
    saved: true,
  },
  {
    id: 'c3',
    show: 'Late Night Talk Show',
    episode: 'Jan 22, 2024',
    clipRange: '8:55–9:15',
    phrase: 'reckon',
    wordType: 'Verb',
    difficulty: 'Intermediate',
    diffColor: 'bg-amber-200',
    saved: false,
  },
];

const filters = ['All', 'Comedy', 'Business', 'Tech', 'Podcasts', 'Sports'];

export function MobileFeed() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [saved, setSaved] = useState<Record<string, boolean>>({ c2: true });

  return (
    <MobileShell activePage="feed">

      {/* Header */}
      <div className="relative px-5 pt-2 pb-3 shrink-0">
        <div className="flex items-center justify-between">
          <LogoMark />
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#EDEBE5] transition-colors">
              <Search className="w-5 h-5 text-[#52504B]" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#EDEBE5] transition-colors relative">
              <Bell className="w-5 h-5 text-[#52504B]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C8623E] rounded-full border border-[#F8F6F2]" />
            </button>
          </div>
        </div>
        <p className="text-[13px] text-[#52504B] mt-1.5 font-medium">Good morning, Felix · <span className="text-[#A09890] font-normal">3 clips today</span></p>

        {/* Pixel star — bare accent */}
        <div className="absolute right-16 top-1 rotate-[4deg] pointer-events-none">
          <PixelStar sz={3} fill="#10B981" />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-5 pb-3 overflow-x-auto shrink-0 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${
              activeFilter === f
                ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-[2px_2px_0_#6B4226]'
                : 'bg-white text-[#52504B] border-[#DDD9D2] hover:border-[#A09890]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Section label */}
      <div className="px-5 pb-2 shrink-0">
        <span className="text-[10px] font-bold text-[#A09890] uppercase tracking-widest">Today's Clips</span>
      </div>

      {/* Clip list */}
      <div className="flex-1 overflow-y-auto px-5 pb-2 space-y-3">
        {clips.map(clip => (
          <div key={clip.id} className="bg-white rounded-2xl border border-[#DDD9D2] overflow-hidden">
            {/* Thumbnail */}
            <div className="h-28 bg-[#1C1917] relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                <svg viewBox="0 0 16 16" className="w-4 h-4 text-white translate-x-[1px]">
                  <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="currentColor" />
                </svg>
              </div>
              {/* Difficulty badge — sticker */}
              <div className={`absolute top-2 left-2 ${clip.diffColor} text-[#1C1917] text-[9px] font-bold px-2 py-0.5 rounded border border-[#1C1917] shadow-[1px_1px_0_#1C1917]`}>
                {clip.difficulty}
              </div>
              {/* Time */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white/65 text-[9px] font-mono">
                <Clock className="w-2.5 h-2.5" />
                {clip.clipRange}
              </div>
            </div>

            {/* Info */}
            <div className="px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-[#A09890] uppercase tracking-wider truncate">{clip.show} · {clip.episode}</p>
                  <p
                    className="text-[15px] font-bold italic text-[#1C1917] mt-0.5 leading-snug"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    "{clip.phrase}"
                  </p>
                </div>
                <button
                  onClick={() => setSaved(s => ({ ...s, [clip.id]: !s[clip.id] }))}
                  className="shrink-0 mt-1"
                >
                  <Bookmark className={`w-4 h-4 transition-colors ${saved[clip.id] ? 'text-[#C8623E] fill-[#C8623E]' : 'text-[#A09890]'}`} />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {/* Word type — sticker */}
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-violet-200 text-[#1C1917] border border-[#1C1917] shadow-[1px_1px_0_#1C1917]">
                  {clip.wordType}
                </span>
                <button className="ml-auto text-[10px] font-bold text-[#C8623E] border border-[#C8623E]/40 px-2.5 py-0.5 rounded-full hover:bg-[#C8623E]/5 transition-colors">
                  Watch clip →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}
