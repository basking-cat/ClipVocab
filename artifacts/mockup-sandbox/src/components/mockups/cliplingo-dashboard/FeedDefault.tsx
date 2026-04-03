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
    bg: 'from-[#2C2A29] via-[#3D3532] to-[#1A1211]',
    accent: '#E27058',
    targetWord: 'throw under the bus',
    wordType: 'Idiom',
    wordTypeJa: '慣用句',
    definition: 'To betray a colleague to avoid blame for yourself.',
    definitionJa: '自分の責任を逃れるために同僚を裏切ること。',
    transcript: [
      { active: false, text: 'You kind of ' },
      { active: true,  text: 'threw her under the bus' },
      { active: false, text: ' in that meeting.' },
    ],
    transcriptJa: '君は会議で彼女をスケープゴートにしたようなものだよ。',
    phraseJa: '（誰かを）見捨てる・裏切る',
    relatedWords: ['scapegoat', 'blame-shifting', 'backstab'],
    preferences: ['Comedy', 'Business English'],
    studyCount: 2,
  },
  {
    id: 'r2',
    videoId: 'YT_def456',
    showName: 'Lex Fridman Podcast',
    episode: 'Ep. 401',
    clipRange: '4:51 → 5:09',
    bg: 'from-[#1A2030] via-[#1E2840] to-[#0D1220]',
    accent: '#7C9EE8',
    targetWord: 'nuance',
    wordType: 'Noun',
    wordTypeJa: '名詞',
    definition: 'A subtle difference in meaning, expression, or sound.',
    definitionJa: '意味・表現・響きにおける微妙な差異や濃淡のこと。',
    transcript: [
      { active: false, text: 'There\'s a lot of ' },
      { active: true,  text: 'nuance' },
      { active: false, text: ' to how language models understand context.' },
    ],
    transcriptJa: '言語モデルが文脈を理解するうえには多くのニュアンスがある。',
    phraseJa: 'ニュアンス・微妙なニュアンス',
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

  return (
    <AppShell activePage="feed">
      <div className="relative h-screen overflow-hidden bg-[#1A1918]" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* ── Cinematic Background ── */}
        <div className={`absolute inset-0 bg-gradient-to-br ${reel.bg} transition-all duration-700`}>
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
          />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }}
          />
        </div>

        {/* ── Top Bar ── */}
        <div className="absolute top-0 left-0 right-0 z-30 px-5 pt-4 pb-3 bg-gradient-to-b from-black/65 to-transparent">
          <div className="flex items-center gap-2.5">
            {/* Search input */}
            <div className="flex-1 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3.5 py-2">
              <Search className="w-3.5 h-3.5 text-white/55 shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Search a word or phrase…"
                className="flex-1 bg-transparent text-white placeholder:text-white/35 text-sm outline-none"
              />
              {searchValue && (
                <button onClick={() => setSearchValue('')} className="text-white/40 hover:text-white/80">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Preference tags */}
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2">
              <Sparkles className="w-3 h-3 text-white/55" />
              <span className="text-[11px] text-white/55 font-medium">{reel.preferences.join(', ')}</span>
            </div>

            {/* JP toggle */}
            <button
              onClick={() => setShowJa(v => !v)}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl border backdrop-blur-md text-[11px] font-semibold transition-all ${showJa ? 'bg-white/20 border-white/40 text-white' : 'bg-white/08 border-white/15 text-white/45'}`}
            >
              <Languages className="w-3 h-3" />
              日本語
            </button>
          </div>
        </div>

        {/* ── Center Play button ── */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={() => setIsPlaying(p => !p)}
            className={`transition-all duration-300 ${isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center hover:bg-white/25`}
          >
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </button>
        </div>

        {/* ── Right Rail ── */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
          <button onClick={prev} disabled={currentIdx === 0}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white disabled:opacity-25 hover:bg-white/20 transition-colors">
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Save (SAVED_CLIP: clip + word) */}
          <button onClick={toggleSave}
            className={`w-11 h-11 rounded-full backdrop-blur-md border flex flex-col items-center justify-center gap-0.5 transition-all ${isSaved ? 'bg-[#E27058]/80 border-[#E27058] scale-110' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>
            <Bookmark className={`w-4 h-4 ${isSaved ? 'text-white fill-white' : 'text-white'}`} />
            {isSaved && <span className="text-[8px] text-white font-bold leading-none">Saved</span>}
          </button>

          {/* Mark as studied (STUDY_EVENT) */}
          <button onClick={toggleMark}
            className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${isMarked ? 'bg-emerald-500/70 border-emerald-400' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>
            <Zap className={`w-4 h-4 ${isMarked ? 'text-white fill-white' : 'text-white/70'}`} />
          </button>

          <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/65 hover:bg-white/20 transition-colors">
            <Volume2 className="w-3.5 h-3.5" />
          </button>

          <button onClick={next} disabled={currentIdx === reels.length - 1}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white disabled:opacity-25 hover:bg-white/20 transition-colors">
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Reel dots */}
          <div className="flex flex-col gap-1.5 mt-1">
            {reels.map((_, i) => (
              <div key={i} className={`rounded-full transition-all ${i === currentIdx ? 'w-1.5 h-4 bg-white' : 'w-1.5 h-1.5 bg-white/30'}`} />
            ))}
          </div>
        </div>

        {/* ── Bottom Content ── */}
        <div className="absolute bottom-0 left-0 right-14 z-20 px-5 pb-4 pt-16 bg-gradient-to-t from-black/85 via-black/50 to-transparent">

          {/* Source + clip metadata */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-6 h-4 bg-white/10 backdrop-blur-sm rounded flex items-center justify-center">
              <span className="text-[8px] font-bold text-white/80">▶</span>
            </div>
            <span className="text-white/75 text-xs font-semibold">{reel.showName}</span>
            <span className="text-white/40 text-xs">{reel.episode}</span>
            <span className="text-white/25 text-xs">·</span>
            {/* VIDEO: videoId + clip range */}
            <div className="flex items-center gap-1 text-white/35 text-[10px] font-mono">
              <Clock className="w-2.5 h-2.5" />
              {reel.clipRange}
            </div>
            <span className="text-[9px] text-white/20 font-mono">{reel.videoId}</span>
          </div>

          {/* English transcript with CLIP_OCCURRENCE highlight */}
          <p className="text-white/95 text-lg font-light leading-snug mb-1 max-w-xl">
            {reel.transcript.map((seg, i) =>
              seg.active ? (
                <span key={i} className="font-bold px-1.5 py-0.5 rounded-md" style={{ background: reel.accent + '38', borderBottom: `2px solid ${reel.accent}`, color: 'white' }}>
                  {seg.text}
                </span>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </p>

          {/* Japanese translation of transcript line */}
          {showJa && (
            <div className="flex items-start gap-1.5 mb-4">
              <span className="text-[9px] font-bold text-white/30 mt-0.5 shrink-0 tracking-wide">JA</span>
              <p className="text-white/45 text-xs leading-relaxed">{reel.transcriptJa}</p>
            </div>
          )}

          {/* Word Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">

            {/* Header row */}
            <button
              onClick={() => setWordCardOpen(o => !o)}
              className="w-full flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-white/65" />
                <span className="text-white font-semibold text-sm">"{reel.targetWord}"</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-white/55">{reel.wordType}</span>
                {showJa && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-white/40">{reel.wordTypeJa}</span>
                )}
                {reel.studyCount > 0 && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {reel.studyCount}× studied
                  </span>
                )}
              </div>
              <ChevronUp className={`w-3.5 h-3.5 text-white/45 transition-transform ${wordCardOpen ? '' : 'rotate-180'}`} />
            </button>

            {wordCardOpen && (
              <div className="border-t border-white/10">

                {/* Definitions */}
                <div className="px-4 pt-3 pb-2 space-y-1.5">
                  <p className="text-white/75 text-sm leading-relaxed">{reel.definition}</p>
                  {showJa && (
                    <div className="flex items-start gap-1.5">
                      <span className="text-[9px] font-bold text-white/30 mt-0.5 shrink-0 tracking-wide">JA</span>
                      <p className="text-white/50 text-xs leading-relaxed">
                        {reel.phraseJa}
                        <span className="ml-2 text-white/30">—</span>
                        <span className="ml-2 text-white/45 text-xs">{reel.definitionJa}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Related words (Recommendations from STUDY_EVENT/SAVED_CLIP) */}
                <div className="px-4 py-2.5 border-t border-white/08">
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp className="w-3 h-3 text-white/35" />
                    <span className="text-[10px] font-bold text-white/35 uppercase tracking-wider">Related words</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {reel.relatedWords.map(w => (
                      <span key={w} className="text-[11px] px-2.5 py-1 rounded-full bg-white/08 border border-white/12 text-white/55 cursor-pointer hover:bg-white/15 hover:text-white/80 transition-colors">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Study Event CTA + Save */}
                <div className="px-4 pb-4 pt-2 flex gap-2">
                  <button
                    onClick={toggleMark}
                    className={`flex-1 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all border ${isMarked ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-white/08 text-white/60 border-white/15 hover:bg-white/15'}`}
                  >
                    {isMarked ? <><CheckCircle2 className="w-3.5 h-3.5" /> Got it!</> : <><Brain className="w-3.5 h-3.5" /> Mark as studied</>}
                  </button>
                  <button
                    onClick={toggleSave}
                    className="flex-[2] py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isSaved ? 'rgba(226,112,88,0.35)' : reel.accent, color: 'white', border: isSaved ? `1px solid ${reel.accent}55` : 'none' }}
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

        {/* Playback progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30">
          <div className="h-full bg-white/50 w-1/3 transition-all duration-300" />
        </div>

      </div>
    </AppShell>
  );
}
