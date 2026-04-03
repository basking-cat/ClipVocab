import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import { Search, X, Play, Clock, Bookmark, BookOpen, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { PixelSpark } from '../_shared/PixelArt';

const QUERY = 'throw under the bus';

const results = [
  {
    id: 'r1',
    videoId: 'dQw4w9WgXcQ',
    showName: 'The Office (US)',
    episode: 'S04 · E12',
    title: "Michael's Sensitivity Training",
    difficulty: 'Intermediate',
    difficultyColor: 'bg-amber-100 text-amber-800 border-amber-200',
    duration: '0:21',
    timestamp: '1:24',
    thumbnailBg: 'bg-[#DDD9D2]',
    snippet: [
      { text: 'Well, you kind of ' },
      { text: 'threw her under the bus', highlight: true },
      { text: ' in that meeting yesterday. What did you expect?' },
    ],
    saved: false,
  },
  {
    id: 'r2',
    videoId: 'cnn2024abc',
    showName: 'CNN Business',
    episode: 'Mar 14, 2024',
    title: 'CEO Interview: Leadership Decisions',
    difficulty: 'Advanced',
    difficultyColor: 'bg-rose-100 text-rose-800 border-rose-200',
    duration: '0:18',
    timestamp: '4:51',
    thumbnailBg: 'bg-[#D0CCC3]',
    snippet: [
      { text: 'The board felt he completely ' },
      { text: 'threw the CFO under the bus', highlight: true },
      { text: ' during the earnings call.' },
    ],
    saved: true,
  },
  {
    id: 'r3',
    videoId: 'comedycentral07',
    showName: 'Late Night Talk Show',
    episode: 'Jan 22, 2024',
    title: 'Comedy bit: Office politics',
    difficulty: 'Intermediate',
    difficultyColor: 'bg-amber-100 text-amber-800 border-amber-200',
    duration: '0:31',
    timestamp: '2:05',
    thumbnailBg: 'bg-[#C2BEB4]',
    snippet: [
      { text: '"You didn\'t throw me ' },
      { text: 'under the bus', highlight: true },
      { text: ' — you drove the bus over me twice!"' },
    ],
    saved: false,
  },
  {
    id: 'r4',
    videoId: 'podcastbiz88',
    showName: 'How I Built This',
    episode: 'Ep. 388',
    title: 'Startup culture and accountability',
    difficulty: 'Advanced',
    difficultyColor: 'bg-rose-100 text-rose-800 border-rose-200',
    duration: '0:24',
    timestamp: '11:37',
    thumbnailBg: 'bg-[#B8B4AA]',
    snippet: [
      { text: 'In a healthy team, nobody should ever feel like they\'re being ' },
      { text: 'thrown under the bus', highlight: true },
      { text: '.' },
    ],
    saved: false,
  },
];

function HighlightedSnippet({ parts }: { parts: { text: string; highlight?: boolean }[] }) {
  return (
    <p className="text-[#52504B] text-sm leading-relaxed">
      {parts.map((p, i) =>
        p.highlight ? (
          <mark key={i} className="bg-[#F5E2D8] text-[#8B3E23] font-semibold px-0.5 rounded not-italic">
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </p>
  );
}

export function FeedSearch() {
  const [query, setQuery] = useState(QUERY);
  const [saved, setSaved] = useState<Record<string, boolean>>({ r2: true });

  const toggleSave = (id: string) => setSaved(s => ({ ...s, [id]: !s[id] }));

  return (
    <AppShell activePage="feed">
      <div className="h-full flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* ── Sticky Search Header ── */}
        <div className="bg-[#F8F6F2] border-b border-[#DDD9D2] px-8 py-5 shrink-0 relative">
          <div className="flex items-center gap-3">
            {/* Search bar */}
            <div className="flex-1 flex items-center gap-2.5 bg-white border-2 border-[#C8623E] rounded-2xl px-4 py-2.5 shadow-[0_0_0_4px_rgba(226,112,88,0.08)]">
              <Search className="w-4 h-4 text-[#C8623E] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-[#1C1917] text-sm outline-none font-semibold"
              />
              <button onClick={() => setQuery('')} className="text-[#958F87] hover:text-[#958F87] transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 border-[#DDD9D2] text-sm font-medium text-[#52504B] hover:border-[#DDD9D2] transition-colors bg-white">
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Result meta */}
          <div className="flex items-center gap-3 mt-3">
            <p className="text-sm text-[#958F87]">
              <span className="font-bold text-[#1C1917]">{results.length} clips</span> contain
              <span className="inline-flex items-center mx-1.5 bg-[#F5E2D8] text-[#8B3E23] text-xs font-bold px-2.5 py-0.5 rounded-full">"{query}"</span>
            </p>
            <span className="text-[#DDD9D2]">·</span>
            <div className="flex gap-1.5">
              {['All', 'Intermediate', 'Advanced'].map((f, i) => (
                <button key={f} className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${i === 0 ? 'bg-[#1C1917] text-white border-[#1C1917]' : 'bg-white text-[#958F87] border-[#DDD9D2] hover:border-[#B5B0A9]'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          {/* Pixel spark — bare accent in search header corner */}
          <div className="absolute right-5 top-4 rotate-[5deg] pointer-events-none">
            <PixelSpark sz={3} fill="#7C3AED" />
          </div>
        </div>

        {/* ── Results List ── */}
        <div className="flex-1 overflow-y-auto px-8 py-5 space-y-4">
          {results.map((clip, idx) => (
            <div
              key={clip.id}
              className="bg-white rounded-2xl border border-[#DDD9D2] hover:border-[#D0CCC3] hover:shadow-md transition-all duration-200 overflow-hidden group"
            >
              <div className="flex gap-0">

                {/* Rank */}
                <div className="w-12 shrink-0 flex items-center justify-center border-r border-[#E8E5DF]">
                  <span className="text-xl font-bold font-['Playfair_Display'] text-[#DDD9D2] group-hover:text-[#D0CCC3] transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Thumbnail — 16:9 landscape (176×99px) */}
                <div className={`w-44 h-[99px] shrink-0 self-center ${clip.thumbnailBg} relative flex items-center justify-center`}>
                  <div className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/50 transition-colors">
                    <Play className="w-4 h-4 text-[#1C1917] fill-[#1C1917] ml-0.5" />
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 bg-black/50 rounded text-white text-[9px] px-1 font-mono">{clip.duration}</div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[10px] font-bold text-[#958F87] uppercase tracking-wider mb-0.5">{clip.showName} · {clip.episode}</p>
                      <h3 className="font-semibold text-[#1C1917] group-hover:text-[#C8623E] transition-colors text-sm">{clip.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${clip.difficultyColor}`}>{clip.difficulty}</span>
                      <span className="text-[10px] text-[#958F87] font-mono flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{clip.timestamp}</span>
                    </div>
                  </div>

                  {/* Transcript snippet with highlight */}
                  <div className="bg-[#F8F6F2] rounded-xl px-4 py-3 mb-3 border-l-2 border-[#C8623E]">
                    <HighlightedSnippet parts={clip.snippet} />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#958F87]">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Learn: <span className="font-semibold text-[#8B3E23]">"{QUERY}"</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSave(clip.id)}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${saved[clip.id] ? 'bg-[#F5E2D8] text-[#8B3E23] border-[#C8623E]/30' : 'bg-white text-[#958F87] border-[#DDD9D2] hover:border-[#D0CCC3]'}`}
                      >
                        <Bookmark className={`w-3 h-3 ${saved[clip.id] ? 'fill-[#C8623E] text-[#C8623E]' : ''}`} />
                        {saved[clip.id] ? 'Saved' : 'Save'}
                      </button>
                      <button className="flex items-center gap-1 text-xs font-semibold text-[#1C1917] hover:text-[#C8623E] transition-colors px-3 py-1.5 rounded-xl border border-[#DDD9D2] hover:border-[#C8623E]/40 bg-white">
                        Watch clip
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
