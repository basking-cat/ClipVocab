import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import { Search, X, Play, Clock, Bookmark, BookOpen, ChevronRight, SlidersHorizontal } from 'lucide-react';

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
    thumbnailBg: 'bg-[#E8E4DB]',
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
    <p className="text-[#5C5856] text-sm leading-relaxed">
      {parts.map((p, i) =>
        p.highlight ? (
          <mark key={i} className="bg-[#FDE2CD] text-[#A6452B] font-semibold px-0.5 rounded not-italic">
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
        <div className="bg-[#FDFBF7] border-b border-[#E8E4DB] px-8 py-5 shrink-0">
          <div className="flex items-center gap-3">
            {/* Search bar */}
            <div className="flex-1 flex items-center gap-2.5 bg-white border-2 border-[#E27058] rounded-2xl px-4 py-2.5 shadow-[0_0_0_4px_rgba(226,112,88,0.08)]">
              <Search className="w-4 h-4 text-[#E27058] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-[#2C2A29] text-sm outline-none font-semibold"
              />
              <button onClick={() => setQuery('')} className="text-[#B5B0AA] hover:text-[#827D79] transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 border-[#E8E4DB] text-sm font-medium text-[#5C5856] hover:border-[#D6D2C9] transition-colors bg-white">
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Result meta */}
          <div className="flex items-center gap-3 mt-3">
            <p className="text-sm text-[#827D79]">
              <span className="font-bold text-[#2C2A29]">{results.length} clips</span> contain
              <span className="inline-flex items-center mx-1.5 bg-[#FDE2CD] text-[#A6452B] text-xs font-bold px-2.5 py-0.5 rounded-full">"{query}"</span>
            </p>
            <span className="text-[#E8E4DB]">·</span>
            <div className="flex gap-1.5">
              {['All', 'Intermediate', 'Advanced'].map((f, i) => (
                <button key={f} className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${i === 0 ? 'bg-[#2C2A29] text-white border-[#2C2A29]' : 'bg-white text-[#827D79] border-[#E8E4DB] hover:border-[#C5C0BB]'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results List ── */}
        <div className="flex-1 overflow-y-auto px-8 py-5 space-y-4">
          {results.map((clip, idx) => (
            <div
              key={clip.id}
              className="bg-white rounded-2xl border border-[#E8E4DB] hover:border-[#D0CCC3] hover:shadow-md transition-all duration-200 overflow-hidden group"
            >
              <div className="flex gap-0">

                {/* Rank */}
                <div className="w-12 shrink-0 flex items-center justify-center border-r border-[#F2EFE9]">
                  <span className="text-xl font-bold font-['Playfair_Display'] text-[#E8E4DB] group-hover:text-[#D0CCC3] transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Thumbnail */}
                <div className={`w-28 shrink-0 ${clip.thumbnailBg} relative flex items-center justify-center`}>
                  <div className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/50 transition-colors">
                    <Play className="w-4 h-4 text-[#2C2A29] fill-[#2C2A29] ml-0.5" />
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 bg-black/50 rounded text-white text-[9px] px-1 font-mono">{clip.duration}</div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[10px] font-bold text-[#827D79] uppercase tracking-wider mb-0.5">{clip.showName} · {clip.episode}</p>
                      <h3 className="font-semibold text-[#2C2A29] group-hover:text-[#E27058] transition-colors text-sm">{clip.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${clip.difficultyColor}`}>{clip.difficulty}</span>
                      <span className="text-[10px] text-[#827D79] font-mono flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{clip.timestamp}</span>
                    </div>
                  </div>

                  {/* Transcript snippet with highlight */}
                  <div className="bg-[#F8F6F1] rounded-xl px-4 py-3 mb-3 border-l-2 border-[#E27058]">
                    <HighlightedSnippet parts={clip.snippet} />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#827D79]">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Learn: <span className="font-semibold text-[#A6452B]">"{QUERY}"</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSave(clip.id)}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${saved[clip.id] ? 'bg-[#FDE2CD] text-[#A6452B] border-[#E27058]/30' : 'bg-white text-[#827D79] border-[#E8E4DB] hover:border-[#D0CCC3]'}`}
                      >
                        <Bookmark className={`w-3 h-3 ${saved[clip.id] ? 'fill-[#E27058] text-[#E27058]' : ''}`} />
                        {saved[clip.id] ? 'Saved' : 'Save'}
                      </button>
                      <button className="flex items-center gap-1 text-xs font-semibold text-[#2C2A29] hover:text-[#E27058] transition-colors px-3 py-1.5 rounded-xl border border-[#E8E4DB] hover:border-[#E27058]/40 bg-white">
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
