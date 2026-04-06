import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import {
  Play, ChevronUp, ChevronDown, Bookmark, BookOpen,
  Volume2, Search, X, Sparkles, CheckCircle2, Languages,
  Clock, Brain, TrendingUp, Zap, Pause
} from 'lucide-react';
import { PixelPlay } from '../_shared/PixelArt';

const reels = [
  {
    id: 'r1',
    videoId: 'YT_abc123',
    showName: 'The Office (US)',
    episode: 'S04 · E12',
    clipRange: '1:22 → 1:43',
    bg: 'from-[#3A3F52] via-[#2C3245] to-[#1E2235]',
    accent: '#C8623E',
    targetWord: 'throw under the bus',
    wordType: 'Idiom',
    wordTypeJa: '慣用句',
    ipa: '/θroʊ ˈʌndər ðə bʌs/',
    definition: 'To betray a colleague to avoid blame for yourself.',
    definitionJa: '自分の責任を逃れるために同僚を裏切ること。',
    nativeUsage: `"I can't believe she threw me under the bus in front of the whole team."`,
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
    progressFraction: 0.6,
    progressCategory: 'Idioms & Expressions',
    progressGoal: 5,
    progressDone: 3,
  },
  {
    id: 'r2',
    videoId: 'YT_def456',
    showName: 'Lex Fridman Podcast',
    episode: 'Ep. 401',
    clipRange: '4:51 → 5:14',
    bg: 'from-[#2A3A50] via-[#1E2C40] to-[#141C2C]',
    accent: '#5B8DEF',
    targetWord: 'nuance',
    wordType: 'Noun',
    wordTypeJa: '名詞',
    ipa: '/ˈnjuːɑːns/',
    definition: 'A subtle difference in meaning, expression, or sound.',
    definitionJa: '意味・表現・響きにおける微妙な差異や濃淡のこと。',
    nativeUsage: `"You really need to appreciate the nuance here — it's not black and white."`,
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
    progressFraction: 0.4,
    progressCategory: 'Academic Vocabulary',
    progressGoal: 5,
    progressDone: 2,
  },
];

export function FeedDefault() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [searchValue, setSearchValue] = useState('');
  const [showJa, setShowJa] = useState(true);
  const [marked, setMarked] = useState<Record<string, boolean>>({});

  const reel = reels[currentIdx];
  const isSaved = saved[reel.id];
  const isMarked = marked[reel.id];

  const prev = () => { setCurrentIdx(i => Math.max(0, i - 1)); };
  const next = () => { setCurrentIdx(i => Math.min(reels.length - 1, i + 1)); };
  const toggleSave = () => setSaved(s => ({ ...s, [reel.id]: !s[reel.id] }));
  const toggleMark = () => setMarked(m => ({ ...m, [reel.id]: !m[reel.id] }));

  const circumference = 2 * Math.PI * 15.9155;
  const dashArray = `${reel.progressFraction * circumference} ${circumference}`;

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

            <button onClick={toggleSave}
              className={`w-10 h-10 rounded-full backdrop-blur-md border flex flex-col items-center justify-center gap-0.5 transition-all ${isSaved ? 'bg-white/30 border-white/50' : 'bg-white/15 border-white/30 hover:bg-white/25'}`}>
              <Bookmark className={`w-4 h-4 ${isSaved ? 'text-white fill-white' : 'text-white'}`} />
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

            {/* Reel counter dots */}
            <div className="flex flex-col gap-1.5 mt-1">
              {reels.map((_, i) => (
                <div key={i} className={`rounded-full transition-all ${i === currentIdx ? 'w-1.5 h-4 bg-white' : 'w-1.5 h-1.5 bg-white/35'}`} />
              ))}
            </div>
          </div>

          {/* Pixel play — bare accent in bottom-right of dark video */}
          <div className="absolute bottom-5 right-16 z-10 rotate-[-4deg] opacity-45 pointer-events-none">
            <PixelPlay sz={4} fill="white" />
          </div>

          {/* Playback progress bar — orange accent */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/15">
            <div className="h-full w-1/3 transition-all duration-300" style={{ background: '#C8623E' }} />
          </div>
        </div>

        {/* ════════════════════════════════
            SECTION 2 — TRANSCRIPT + LEARNING PANEL
        ════════════════════════════════ */}
        <div className="flex-[6] min-h-0 flex flex-col bg-[#F8F6F2] border-t-2 border-[#DDD9D2] overflow-y-auto">

          {/* Section header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#DDD9D2] bg-[#EDEBE5] shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#958F87] uppercase tracking-widest">Transcript</span>
              <span className="text-[#D6D2C9]">·</span>
              <span className="text-[11px] text-[#958F87]">{reel.clipRange}</span>
            </div>
            <div className="flex items-center gap-2">
              {reel.studyCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {reel.studyCount}× studied
                </span>
              )}
              <button
                onClick={() => setShowJa(v => !v)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${showJa ? 'bg-[#2C2A29] text-white border-[#2C2A29]' : 'bg-white text-[#958F87] border-[#DDD9D2] hover:border-[#C5C0BB]'}`}
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
                  <div key={i} className="rounded-xl bg-[#E8E5DF] border border-[#DDD9D2] px-4 py-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E8E5DF] border border-[#DDD9D2] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[9px] font-bold text-[#52504B]">{line.speaker[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#958F87] mr-2">{line.speaker}</span>
                        <p className="text-[#1C1917] text-[15px] font-medium leading-snug mt-0.5">
                          {parts.map((seg, j) =>
                            seg.highlight ? (
                              <mark key={j} className="not-italic font-bold px-1 py-0.5 rounded bg-amber-300 text-[#1C1917] border border-[#1C1917] shadow-[1px_1px_0_#1C1917]" style={{ textDecoration: 'none' }}>
                                {seg.text}
                              </mark>
                            ) : (
                              <span key={j}>{seg.text}</span>
                            )
                          )}
                        </p>
                        {showJa && (
                          <div className="flex items-start gap-1.5 mt-1.5">
                            <span className="text-[8px] font-bold text-[#958F87] shrink-0 mt-0.5 tracking-wide">JA</span>
                            <p className="text-[#958F87] text-xs leading-relaxed">{line.ja}</p>
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
                    <span className="text-[10px] font-bold text-[#958F87] mr-2">{line.speaker}</span>
                    <p className="text-[#958F87] text-sm leading-snug mt-0.5">{line.en as string}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-6 border-t border-[#DDD9D2]" />

          {/* ── Learning Panel ── */}
          <div className="px-6 py-4 grid grid-cols-2 gap-4">

            {/* ── Key Phrase Card (dark) ── */}
            <div className="bg-[#1C1917] rounded-2xl p-5 text-white flex flex-col gap-3">
              {/* Label + word type badge */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[#C8623E] text-[10px] font-bold uppercase tracking-widest"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Key phrase
                </span>
                {/* Word type — sticker shadow tag */}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-200 text-[#1C1917] border border-[#1C1917] shadow-[1px_1px_0_#1C1917]">
                  {reel.wordType}
                </span>
              </div>

              {/* Word heading */}
              <h3
                className="text-lg font-bold italic leading-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {reel.targetWord}
              </h3>

              {/* IPA + listen */}
              <div className="flex items-center gap-3">
                <button className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shrink-0">
                  <Volume2 className="w-3.5 h-3.5 text-[#DDD9D2]" />
                </button>
                <span className="text-xs text-white/55 font-mono">{reel.ipa}</span>
                {showJa && (
                  <span className="text-[10px] text-white/40 ml-auto shrink-0">{reel.wordTypeJa}</span>
                )}
              </div>

              {/* Definition — orange left border */}
              <p className="text-white/70 text-sm leading-relaxed border-l-2 border-[#C8623E] pl-3">
                {reel.definition}
                {showJa && (
                  <span className="block text-white/38 text-xs mt-1 leading-relaxed">{reel.definitionJa}</span>
                )}
              </p>

              {/* Native usage */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <strong className="text-white block mb-1 text-[10px] uppercase tracking-wider">A native might say:</strong>
                <span className="text-white/55 italic text-xs leading-relaxed">{reel.nativeUsage}</span>
              </div>

              {/* Save button — sticker shadow */}
              <button
                onClick={toggleSave}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                  isSaved
                    ? 'bg-emerald-400 border-emerald-500 text-[#1C1917]'
                    : 'bg-[#C8623E] border-[#A34E2E] text-white shadow-[3px_3px_0_#6B4226] hover:shadow-[2px_2px_0_#6B4226] hover:translate-x-[0.5px] hover:translate-y-[0.5px]'
                }`}
              >
                {isSaved
                  ? <><CheckCircle2 className="w-4 h-4" /> Saved to deck</>
                  : <><Bookmark className="w-4 h-4" /> Save &amp; study this phrase</>
                }
              </button>
            </div>

            {/* ── Right column: Progress + Related words + Mark studied ── */}
            <div className="flex flex-col gap-4">

              {/* Today's Progress card */}
              <div className="bg-white border border-[#DDD9D2] rounded-2xl p-5">
                <h4 className="font-semibold text-[#1C1917] mb-4 text-sm">Today's Progress</h4>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-[#E8E5DF]" strokeWidth="3" stroke="currentColor" fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-[#C8623E]" strokeWidth="3"
                        strokeDasharray={dashArray}
                        stroke="currentColor" fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-xs font-bold text-[#1C1917]">{reel.progressDone}/{reel.progressGoal}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1C1917]">{reel.progressCategory}</p>
                    <p className="text-xs text-[#A09890] mt-0.5">
                      {reel.progressGoal - reel.progressDone} more to reach your daily goal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related words */}
              <div className="bg-white border border-[#DDD9D2] rounded-2xl p-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <TrendingUp className="w-3 h-3 text-[#958F87]" />
                  <span className="text-[10px] font-bold text-[#958F87] uppercase tracking-wider">Related words</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {reel.relatedWords.map(w => (
                    <span key={w} className="text-xs px-2.5 py-1 rounded-full bg-[#F8F6F2] border border-[#DDD9D2] text-[#52504B] cursor-pointer hover:border-[#C5C0BB] hover:bg-[#EDEBE5] transition-colors">
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mark as studied */}
              <button
                onClick={toggleMark}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 border transition-all ${
                  isMarked
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-white text-[#52504B] border-[#DDD9D2] hover:border-[#C5C0BB] hover:bg-[#EDEBE5]'
                }`}
              >
                {isMarked
                  ? <><CheckCircle2 className="w-3.5 h-3.5" /> Got it!</>
                  : <><Brain className="w-3.5 h-3.5" /> Mark as studied</>
                }
              </button>

            </div>
          </div>

          {/* BookOpen word header (compact, below the two-col grid) — for Related quick context */}
          <div className="px-6 pb-6">
            {showJa && (
              <div className="flex items-start gap-1.5 px-4 py-3 rounded-xl bg-[#EDEBE5] border border-[#DDD9D2]">
                <BookOpen className="w-3.5 h-3.5 text-[#958F87] mt-0.5 shrink-0" />
                <div>
                  <span
                    className="font-bold text-sm italic text-[#1C1917]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    "{reel.targetWord}"
                  </span>
                  <span className="text-[#C5C0BB] mx-2">—</span>
                  <span className="text-[#52504B] text-xs font-semibold">{reel.phraseJa}</span>
                  <p className="text-[#958F87] text-xs mt-0.5 leading-relaxed">{reel.definitionJa}</p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </AppShell>
  );
}
