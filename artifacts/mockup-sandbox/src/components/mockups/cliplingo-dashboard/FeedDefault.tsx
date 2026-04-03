import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import {
  Play, ChevronUp, ChevronDown, Bookmark, BookOpen,
  Volume2, Search, X, Sparkles, CheckCircle2, Languages,
  Clock, Brain, TrendingUp, Zap
} from 'lucide-react';

const reels = [
  {
    id: 'r1',
    videoId: 'YT_abc123',
    showName: 'The Office (US)',
    episode: 'S04 · E12',
    clipRange: '1:22 → 1:43',
    bg: 'from-[#7A5C50] via-[#5C4038] to-[#3D2820]',
    accent: '#E27058',
    targetWord: 'throw under the bus',
    wordType: 'Idiom',
    wordTypeJa: '慣用句',
    definition: 'To betray a colleague to avoid blame for yourself.',
    definitionJa: '自分の責任を逃れるために同僚を裏切ること。',
    lines: [
      { speaker: 'Michael', active: false, en: 'So the presentation went fine. I handled it.', ja: null },
      { speaker: 'Jim', active: false, en: "Really? Because Pam looked pretty upset when she left.", ja: null },
      { speaker: 'Michael', active: false, en: "I just… clarified a few things. That's all.", ja: null },
      {
        speaker: 'Jim', active: true,
        en: [
          { text: 'You kind of ', highlight: false },
          { text: 'threw her under the bus', highlight: true },
          { text: ' in there, man.', highlight: false },
        ],
        ja: '君は彼女をスケープゴートにしたようなものだよ。',
      },
      { speaker: 'Michael', active: false, en: "I was protecting the branch! There's a difference.", ja: null },
    ],
    phraseJa: '（誰かを）見捨てる・スケープゴートにする',
    relatedWords: ['scapegoat', 'blame-shifting', 'backstab'],
    preferences: ['Comedy', 'Business English'],
    studyCount: 2,
  },
  {
    id: 'r2',
    videoId: 'YT_def456',
    showName: 'Lex Fridman Podcast',
    episode: 'Ep. 401',
    clipRange: '4:51 → 5:14',
    bg: 'from-[#3A4A6A] via-[#2A3850] to-[#1A2438]',
    accent: '#7C9EE8',
    targetWord: 'nuance',
    wordType: 'Noun',
    wordTypeJa: '名詞',
    definition: 'A subtle difference in meaning, expression, or sound.',
    definitionJa: '意味・表現・響きにおける微妙な差異や濃淡のこと。',
    lines: [
      { speaker: 'Guest', active: false, en: 'People assume these models just pattern-match.', ja: null },
      { speaker: 'Lex', active: false, en: "Yeah, but that framing misses a lot.", ja: null },
      {
        speaker: 'Lex', active: true,
        en: [
          { text: "There's a lot of ", highlight: false },
          { text: 'nuance', highlight: true },
          { text: ' to how language models actually understand context.', highlight: false },
        ],
        ja: '言語モデルが文脈を理解するうえには多くのニュアンスがある。',
      },
      { speaker: 'Guest', active: false, en: "Exactly. And that's what makes alignment so hard.", ja: null },
      { speaker: 'Lex', active: false, en: "The more I study it, the more I appreciate the depth.", ja: null },
    ],
    phraseJa: 'ニュアンス・微妙な差異',
    relatedWords: ['subtlety', 'connotation', 'implication'],
    preferences: ['Tech', 'Science'],
    studyCount: 0,
  },
];

export function FeedDefault() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [searchValue, setSearchValue] = useState('');
  const [wordCardOpen, setWordCardOpen] = useState(true);
  const [showJa, setShowJa] = useState(true);
  const [marked, setMarked] = useState<Record<string, boolean>>({});

  const reel = reels[currentIdx];
  const isSaved = saved[reel.id];
  const isMarked = marked[reel.id];

  const prev = () => { setCurrentIdx(i => Math.max(0, i - 1)); setWordCardOpen(true); };
  const next = () => { setCurrentIdx(i => Math.min(reels.length - 1, i + 1)); setWordCardOpen(true); };
  const toggleSave = () => setSaved(s => ({ ...s, [reel.id]: !s[reel.id] }));
  const toggleMark = () => setMarked(m => ({ ...m, [reel.id]: !m[reel.id] }));

  const activeLine = reel.lines.find(l => l.active);

  return (
    <AppShell activePage="feed">
      <div className="relative h-screen overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* ── Warm, lighter cinematic background ── */}
        <div className={`absolute inset-0 bg-gradient-to-br ${reel.bg} transition-all duration-700`}>
          <div className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
          />
        </div>

        {/* ── Top Bar ── */}
        <div className="absolute top-0 left-0 right-0 z-30 px-5 pt-4 pb-3 bg-gradient-to-b from-black/40 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="flex-1 flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-3.5 py-2">
              <Search className="w-3.5 h-3.5 text-white/60 shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Search a word or phrase…"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none"
              />
              {searchValue && (
                <button onClick={() => setSearchValue('')} className="text-white/40 hover:text-white/80">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-3 py-2">
              <Sparkles className="w-3 h-3 text-white/60" />
              <span className="text-[11px] text-white/60 font-medium">{reel.preferences.join(', ')}</span>
            </div>
            <button
              onClick={() => setShowJa(v => !v)}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl border backdrop-blur-md text-[11px] font-semibold transition-all ${showJa ? 'bg-white/25 border-white/50 text-white' : 'bg-white/10 border-white/20 text-white/50'}`}
            >
              <Languages className="w-3 h-3" />
              日本語
            </button>
          </div>
        </div>

        {/* ── Center Play button ── */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pb-48">
          <button
            onClick={() => setIsPlaying(p => !p)}
            className={`transition-all duration-300 ${isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/35 flex items-center justify-center hover:bg-white/30`}
          >
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </button>
        </div>

        {/* ── Right Rail ── */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
          <button onClick={prev} disabled={currentIdx === 0}
            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white disabled:opacity-25 hover:bg-white/25 transition-colors">
            <ChevronUp className="w-4 h-4" />
          </button>

          <button onClick={toggleSave}
            className={`w-11 h-11 rounded-full backdrop-blur-md border flex flex-col items-center justify-center gap-0.5 transition-all ${isSaved ? 'bg-[#E27058]/90 border-[#E27058] scale-110' : 'bg-white/15 border-white/30 hover:bg-white/25'}`}>
            <Bookmark className={`w-4 h-4 ${isSaved ? 'text-white fill-white' : 'text-white'}`} />
            {isSaved && <span className="text-[8px] text-white font-bold leading-none">Saved</span>}
          </button>

          <button onClick={toggleMark}
            className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${isMarked ? 'bg-emerald-500/80 border-emerald-400' : 'bg-white/15 border-white/30 hover:bg-white/25'}`}>
            <Zap className={`w-4 h-4 ${isMarked ? 'text-white fill-white' : 'text-white/80'}`} />
          </button>

          <button className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white/75 hover:bg-white/25 transition-colors">
            <Volume2 className="w-3.5 h-3.5" />
          </button>

          <button onClick={next} disabled={currentIdx === reels.length - 1}
            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white disabled:opacity-25 hover:bg-white/25 transition-colors">
            <ChevronDown className="w-4 h-4" />
          </button>

          <div className="flex flex-col gap-1.5 mt-1">
            {reels.map((_, i) => (
              <div key={i} className={`rounded-full transition-all ${i === currentIdx ? 'w-1.5 h-4 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`} />
            ))}
          </div>
        </div>

        {/* ── Bottom: Transcript + Word Card ── */}
        <div className="absolute bottom-0 left-0 right-14 z-20 px-5 pb-4 pt-12 bg-gradient-to-t from-black/65 via-black/35 to-transparent">

          {/* Source row */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-4 bg-white/15 rounded flex items-center justify-center">
              <span className="text-[7px] font-bold text-white">▶</span>
            </div>
            <span className="text-white/80 text-xs font-semibold">{reel.showName}</span>
            <span className="text-white/45 text-xs">{reel.episode}</span>
            <span className="text-white/25 text-xs">·</span>
            <div className="flex items-center gap-1 text-white/40 text-[10px] font-mono">
              <Clock className="w-2.5 h-2.5" />
              {reel.clipRange}
            </div>
            <span className="text-[9px] text-white/20 font-mono">{reel.videoId}</span>
          </div>

          {/* Multi-line transcript */}
          <div className="mb-3 space-y-1">
            {reel.lines.map((line, i) => {
              if (line.active) {
                const parts = line.en as { text: string; highlight: boolean }[];
                return (
                  <div key={i}>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold text-white/50 w-14 shrink-0 pt-0.5 text-right">{line.speaker}:</span>
                      <p className="text-white text-base font-medium leading-snug">
                        {parts.map((seg, j) =>
                          seg.highlight ? (
                            <span key={j} className="font-bold px-1 py-0.5 rounded" style={{ background: reel.accent + '45', borderBottom: `2px solid ${reel.accent}` }}>
                              {seg.text}
                            </span>
                          ) : (
                            <span key={j}>{seg.text}</span>
                          )
                        )}
                      </p>
                    </div>
                    {showJa && (
                      <div className="flex items-start gap-2 mt-0.5">
                        <span className="text-[8px] font-bold text-white/25 w-14 shrink-0 text-right pt-0.5">JA</span>
                        <p className="text-white/50 text-xs leading-relaxed">{line.ja}</p>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-white/35 w-14 shrink-0 pt-0.5 text-right">{line.speaker}:</span>
                  <p className="text-white/55 text-sm leading-snug">{line.en as string}</p>
                </div>
              );
            })}
          </div>

          {/* Word Card */}
          <div className="bg-white/12 backdrop-blur-xl border border-white/25 rounded-2xl overflow-hidden">
            <button
              onClick={() => setWordCardOpen(o => !o)}
              className="w-full flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <BookOpen className="w-3.5 h-3.5 text-white/65 shrink-0" />
                <span className="text-white font-semibold text-sm">"{reel.targetWord}"</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/15 text-white/60">{reel.wordType}</span>
                {showJa && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-white/45">{reel.wordTypeJa}</span>}
                {reel.studyCount > 0 && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-500/35">
                    {reel.studyCount}× studied
                  </span>
                )}
              </div>
              <ChevronUp className={`w-3.5 h-3.5 text-white/45 transition-transform shrink-0 ${wordCardOpen ? '' : 'rotate-180'}`} />
            </button>

            {wordCardOpen && (
              <div className="border-t border-white/15">
                <div className="px-4 pt-3 pb-2 space-y-1.5">
                  <p className="text-white/80 text-sm leading-relaxed">{reel.definition}</p>
                  {showJa && (
                    <div className="flex items-start gap-1.5">
                      <span className="text-[9px] font-bold text-white/30 mt-0.5 shrink-0">JA</span>
                      <p className="text-white/55 text-xs leading-relaxed">
                        <span className="font-semibold text-white/65">{reel.phraseJa}</span>
                        <span className="text-white/30 mx-1.5">—</span>
                        {reel.definitionJa}
                      </p>
                    </div>
                  )}
                </div>

                <div className="px-4 py-2 border-t border-white/10">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <TrendingUp className="w-3 h-3 text-white/35" />
                    <span className="text-[10px] font-bold text-white/35 uppercase tracking-wider">Related words</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {reel.relatedWords.map(w => (
                      <span key={w} className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/60 cursor-pointer hover:bg-white/20 hover:text-white/90 transition-colors">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-4 pb-3.5 pt-2 flex gap-2">
                  <button onClick={toggleMark}
                    className={`flex-1 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all border ${isMarked ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40' : 'bg-white/10 text-white/65 border-white/20 hover:bg-white/18'}`}
                  >
                    {isMarked ? <><CheckCircle2 className="w-3.5 h-3.5" /> Got it!</> : <><Brain className="w-3.5 h-3.5" /> Mark as studied</>}
                  </button>
                  <button onClick={toggleSave}
                    className="flex-[2] py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isSaved ? 'rgba(226,112,88,0.4)' : reel.accent, color: 'white', border: isSaved ? `1px solid ${reel.accent}60` : 'none' }}
                  >
                    {isSaved
                      ? <span className="flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> Saved to deck</span>
                      : 'Save & study this phrase'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/15 z-30">
          <div className="h-full bg-white/60 w-1/3 transition-all duration-300" />
        </div>

      </div>
    </AppShell>
  );
}
