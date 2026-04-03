import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import {
  Play, ChevronUp, ChevronDown, Bookmark, BookOpen,
  Volume2, Search, X, Sparkles, CheckCircle2, Languages,
  Clock, Brain, TrendingUp, Zap, Pause
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
      { speaker: 'Jim',     active: false, en: 'Really? Because Pam looked pretty upset when she left.', ja: null },
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
      { speaker: 'Lex',   active: false, en: "Yeah, but that framing misses a lot.", ja: null },
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
      { speaker: 'Lex',   active: false, en: "The more I study it, the more I appreciate the depth.", ja: null },
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

  return (
    <AppShell activePage="feed">
      <div className="h-screen flex flex-col overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>

        {/* ════════════════════════════════
            SECTION 1 — VIDEO
        ════════════════════════════════ */}
        <div className={`relative flex-[5] min-h-0 bg-gradient-to-br ${reel.bg} transition-colors duration-700`}>

          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
          />

          {/* Top bar: search + preferences + JP toggle */}
          <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-4 pb-3 bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-3 py-2">
                <Search className="w-3.5 h-3.5 text-white/55 shrink-0" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Search a word or phrase…"
                  className="flex-1 bg-transparent text-white placeholder:text-white/38 text-sm outline-none"
                />
                {searchValue && (
                  <button onClick={() => setSearchValue('')} className="text-white/40 hover:text-white/80">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-3 py-2">
                <Sparkles className="w-3 h-3 text-white/55" />
                <span className="text-[11px] text-white/55 font-medium">{reel.preferences.join(', ')}</span>
              </div>
              <button
                onClick={() => setShowJa(v => !v)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl border backdrop-blur-md text-[11px] font-semibold transition-all ${showJa ? 'bg-white/25 border-white/50 text-white' : 'bg-white/10 border-white/20 text-white/45'}`}
              >
                <Languages className="w-3 h-3" />
                日本語
              </button>
            </div>
          </div>

          {/* Source info — bottom-left of video */}
          <div className="absolute bottom-4 left-5 z-10 flex items-center gap-2">
            <div className="w-5 h-4 bg-white/15 rounded flex items-center justify-center">
              <span className="text-[7px] font-bold text-white">▶</span>
            </div>
            <span className="text-white/85 text-xs font-semibold">{reel.showName}</span>
            <span className="text-white/45 text-xs">{reel.episode}</span>
            <span className="text-white/25 text-xs">·</span>
            <div className="flex items-center gap-1 text-white/40 text-[10px] font-mono">
              <Clock className="w-2.5 h-2.5" />
              {reel.clipRange}
            </div>
            <span className="text-[9px] text-white/20 font-mono">{reel.videoId}</span>
          </div>

          {/* Play / Pause — center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(p => !p)}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/35 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {isPlaying
                ? <Pause className="w-6 h-6 text-white fill-white" />
                : <Play className="w-6 h-6 text-white fill-white ml-1" />
              }
            </button>
          </div>

          {/* Right rail — navigation + actions */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3">
            <button onClick={prev} disabled={currentIdx === 0}
              className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white disabled:opacity-25 hover:bg-white/25 transition-colors">
              <ChevronUp className="w-4 h-4" />
            </button>

            {/* Save = SAVED_CLIP (clip + word) */}
            <button onClick={toggleSave}
              className={`w-10 h-10 rounded-full backdrop-blur-md border flex flex-col items-center justify-center gap-0.5 transition-all ${isSaved ? 'bg-[#E27058]/90 border-[#E27058]' : 'bg-white/15 border-white/30 hover:bg-white/25'}`}>
              <Bookmark className={`w-4 h-4 ${isSaved ? 'text-white fill-white' : 'text-white'}`} />
            </button>

            {/* Mark studied = STUDY_EVENT */}
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

            {/* Reel counter dots */}
            <div className="flex flex-col gap-1.5 mt-1">
              {reels.map((_, i) => (
                <div key={i} className={`rounded-full transition-all ${i === currentIdx ? 'w-1.5 h-4 bg-white' : 'w-1.5 h-1.5 bg-white/35'}`} />
              ))}
            </div>
          </div>

          {/* Playback progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/15">
            <div className="h-full bg-white/55 w-1/3 transition-all duration-300" />
          </div>
        </div>

        {/* ════════════════════════════════
            SECTION 2 — SUBTITLE & TRANSCRIPT
        ════════════════════════════════ */}
        <div className="flex-[6] min-h-0 flex flex-col bg-[#FDFBF7] border-t-2 border-[#E8E4DB] overflow-y-auto">

          {/* Section header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#EBE7E0] bg-[#F7F4EE] shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#827D79] uppercase tracking-widest">Transcript</span>
              <span className="text-[#D6D2C9]">·</span>
              <span className="text-[11px] text-[#B5B0AA]">{reel.clipRange}</span>
            </div>
            <div className="flex items-center gap-2">
              {reel.studyCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {reel.studyCount}× studied
                </span>
              )}
              <button
                onClick={() => setShowJa(v => !v)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${showJa ? 'bg-[#2C2A29] text-white border-[#2C2A29]' : 'bg-white text-[#827D79] border-[#E0DCD4] hover:border-[#C5C0BB]'}`}
              >
                <Languages className="w-3 h-3" />
                日本語
              </button>
            </div>
          </div>

          {/* Conversation lines */}
          <div className="px-6 py-4 space-y-2 shrink-0">
            {reel.lines.map((line, i) => {
              if (line.active) {
                const parts = line.en as { text: string; highlight: boolean }[];
                return (
                  <div key={i} className="rounded-xl bg-[#F2EFE9] border border-[#E0DCD4] px-4 py-3">
                    <div className="flex items-start gap-3">
                      {/* Speaker avatar placeholder */}
                      <div className="w-6 h-6 rounded-full bg-[#E27058]/20 border border-[#E27058]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[9px] font-bold text-[#E27058]">{line.speaker[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#827D79] mr-2">{line.speaker}</span>
                        <p className="text-[#1A1918] text-[15px] font-medium leading-snug mt-0.5">
                          {parts.map((seg, j) =>
                            seg.highlight ? (
                              <mark key={j} className="not-italic font-bold px-1 py-0.5 rounded" style={{ background: reel.accent + '28', color: reel.accent, borderBottom: `2px solid ${reel.accent}`, textDecoration: 'none' }}>
                                {seg.text}
                              </mark>
                            ) : (
                              <span key={j}>{seg.text}</span>
                            )
                          )}
                        </p>
                        {showJa && (
                          <div className="flex items-start gap-1.5 mt-1.5">
                            <span className="text-[8px] font-bold text-[#B5B0AA] shrink-0 mt-0.5 tracking-wide">JA</span>
                            <p className="text-[#827D79] text-xs leading-relaxed">{line.ja}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={i} className="flex items-start gap-3 px-2 py-1">
                  <div className="w-6 h-6 rounded-full bg-[#E8E4DB] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[9px] font-bold text-[#9C9791]">{line.speaker[0]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#B5B0AA] mr-2">{line.speaker}</span>
                    <p className="text-[#827D79] text-sm leading-snug mt-0.5">{line.en as string}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-6 border-t border-[#EBE7E0]" />

          {/* Word card */}
          <div className="px-6 py-4 space-y-3">
            {/* Word header */}
            <div className="flex items-center gap-2 flex-wrap">
              <BookOpen className="w-4 h-4 text-[#827D79] shrink-0" />
              <span className="font-['Playfair_Display'] text-[#2C2A29] font-bold text-base italic">
                "{reel.targetWord}"
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F2EFE9] text-[#827D79] border border-[#E0DCD4]">{reel.wordType}</span>
              {showJa && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F2EFE9] text-[#9C9791] border border-[#E0DCD4]">{reel.wordTypeJa}</span>
              )}
            </div>

            {/* Definition */}
            <div className="space-y-1.5">
              <p className="text-[#3C3A38] text-sm leading-relaxed">{reel.definition}</p>
              {showJa && (
                <div className="flex items-start gap-1.5">
                  <span className="text-[8px] font-bold text-[#B5B0AA] mt-0.5 shrink-0 tracking-wide">JA</span>
                  <p className="text-[#827D79] text-xs leading-relaxed">
                    <span className="font-semibold text-[#5C5856]">{reel.phraseJa}</span>
                    <span className="text-[#C5C0BB] mx-1.5">—</span>
                    {reel.definitionJa}
                  </p>
                </div>
              )}
            </div>

            {/* Related words */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <TrendingUp className="w-3 h-3 text-[#B5B0AA]" />
                <span className="text-[10px] font-bold text-[#B5B0AA] uppercase tracking-wider">Related words</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {reel.relatedWords.map(w => (
                  <span key={w} className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#E0DCD4] text-[#5C5856] cursor-pointer hover:border-[#C5C0BB] hover:bg-[#F7F4EE] transition-colors">
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={toggleMark}
                className={`flex-1 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 border transition-all ${isMarked ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-[#5C5856] border-[#E0DCD4] hover:border-[#C5C0BB] hover:bg-[#F7F4EE]'}`}
              >
                {isMarked ? <><CheckCircle2 className="w-3.5 h-3.5" /> Got it!</> : <><Brain className="w-3.5 h-3.5" /> Mark as studied</>}
              </button>
              <button
                onClick={toggleSave}
                className="flex-[2] py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: isSaved ? '#F2EFE9' : reel.accent, color: isSaved ? reel.accent : 'white', border: isSaved ? `1.5px solid ${reel.accent}50` : 'none' }}
              >
                {isSaved
                  ? <span className="flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> Saved to deck</span>
                  : 'Save & study this phrase'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </AppShell>
  );
}
