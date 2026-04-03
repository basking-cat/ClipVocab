import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import { Play, ChevronUp, ChevronDown, Bookmark, BookOpen, Volume2, Search, X, Sparkles, CheckCircle2 } from 'lucide-react';

const reels = [
  {
    id: 'r1',
    videoId: 'dQw4w9WgXcQ',
    showName: 'The Office (US)',
    episode: 'S04 · E12',
    bg: 'from-[#2C2A29] via-[#3D3532] to-[#1A1211]',
    accent: '#E27058',
    targetWord: 'throw under the bus',
    wordType: 'Idiom',
    definition: 'To betray a colleague to avoid blame for yourself.',
    transcript: [
      { speaker: 'Jim', active: false, text: 'You kind of ' },
      { speaker: 'Jim', active: true,  text: 'threw her under the bus' },
      { speaker: 'Jim', active: false, text: ' in that meeting.' },
    ],
    saved: false,
  },
  {
    id: 'r2',
    videoId: 'lex401abc',
    showName: 'Lex Fridman Podcast',
    episode: 'Ep. 401',
    bg: 'from-[#1A2030] via-[#1E2840] to-[#0D1220]',
    accent: '#7C9EE8',
    targetWord: 'nuance',
    wordType: 'Noun',
    definition: 'A subtle difference in meaning, expression, or sound.',
    transcript: [
      { speaker: 'Lex', active: false, text: 'There\'s a lot of ' },
      { speaker: 'Lex', active: true,  text: 'nuance' },
      { speaker: 'Lex', active: false, text: ' to how language models understand context.' },
    ],
    saved: false,
  },
];

export function FeedDefault() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [searchValue, setSearchValue] = useState('');
  const [wordCardOpen, setWordCardOpen] = useState(true);

  const reel = reels[currentIdx];
  const isSaved = saved[reel.id];

  const prev = () => setCurrentIdx(i => Math.max(0, i - 1));
  const next = () => setCurrentIdx(i => Math.min(reels.length - 1, i + 1));
  const toggleSave = () => setSaved(s => ({ ...s, [reel.id]: !s[reel.id] }));

  return (
    <AppShell activePage="feed">
      {/* Full-height content area */}
      <div className="relative h-screen overflow-hidden bg-[#1A1918]" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* ── Video Background ── */}
        <div className={`absolute inset-0 bg-gradient-to-br ${reel.bg} transition-all duration-700`}>
          {/* Film-grain texture */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
          />
          {/* Subtle scanlines */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }}
          />
        </div>

        {/* ── Top Bar: Search ── */}
        <div className="absolute top-0 left-0 right-0 z-30 px-6 pt-5 pb-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5">
              <Search className="w-4 h-4 text-white/60 shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Search a word or phrase…"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none font-medium"
              />
              {searchValue && (
                <button onClick={() => setSearchValue('')} className="text-white/40 hover:text-white/80">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2.5">
              <Sparkles className="w-3.5 h-3.5 text-white/60" />
              <span className="text-xs text-white/60 font-medium">Comedy, Tech</span>
            </div>
          </div>
        </div>

        {/* ── Center Play Button ── */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={() => setIsPlaying(p => !p)}
            className={`transition-all duration-300 ${isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center hover:bg-white/25`}
          >
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </button>
        </div>

        {/* ── Right Rail: Actions ── */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-5">
          <button
            onClick={prev}
            disabled={currentIdx === 0}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20 transition-colors"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <button
            onClick={toggleSave}
            className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${isSaved ? 'bg-[#E27058]/80 border-[#E27058] scale-110' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'text-white fill-white' : 'text-white'}`} />
          </button>

          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">
            <Volume2 className="w-4 h-4" />
          </button>

          <button
            onClick={next}
            disabled={currentIdx === reels.length - 1}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20 transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </button>

          {/* Reel counter dots */}
          <div className="flex flex-col gap-1.5 mt-2">
            {reels.map((_, i) => (
              <div key={i} className={`rounded-full transition-all ${i === currentIdx ? 'w-1.5 h-4 bg-white' : 'w-1.5 h-1.5 bg-white/30'}`} />
            ))}
          </div>
        </div>

        {/* ── Bottom Overlay: Source + Transcript + Word Card ── */}
        <div className="absolute bottom-0 left-0 right-16 z-20 px-6 pb-6 pt-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">

          {/* Source */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-5 bg-white/10 backdrop-blur-sm rounded flex items-center justify-center">
              <span className="text-[9px] font-bold text-white/80">▶</span>
            </div>
            <span className="text-white/70 text-xs font-semibold">{reel.showName}</span>
            <span className="text-white/40 text-xs">{reel.episode}</span>
          </div>

          {/* Transcript */}
          <p className="text-white/90 text-xl font-light leading-snug mb-5 max-w-xl">
            {reel.transcript.map((seg, i) =>
              seg.active ? (
                <span key={i} className="font-bold px-1.5 py-0.5 rounded-md" style={{ background: reel.accent + '40', borderBottom: `2px solid ${reel.accent}`, color: 'white' }}>
                  {seg.text}
                </span>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </p>

          {/* Word Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-300">
            <button
              onClick={() => setWordCardOpen(o => !o)}
              className="w-full flex items-center justify-between px-5 py-3.5"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-white/70" />
                <span className="text-white font-semibold text-sm">"{reel.targetWord}"</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/60">{reel.wordType}</span>
              </div>
              <ChevronUp className={`w-4 h-4 text-white/50 transition-transform ${wordCardOpen ? '' : 'rotate-180'}`} />
            </button>

            {wordCardOpen && (
              <div className="px-5 pb-4 border-t border-white/10">
                <p className="text-white/70 text-sm leading-relaxed mt-3 mb-4">{reel.definition}</p>
                <button className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: reel.accent, color: 'white' }}>
                  {isSaved ? <span className="flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> Saved to deck</span> : 'Save & study this phrase'}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Progress bar at very bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30">
          <div className="h-full bg-white/50 w-1/3 transition-all duration-300" />
        </div>
      </div>
    </AppShell>
  );
}
