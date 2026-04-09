import React, { useState } from "react";
import {
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Bookmark,
  Volume2,
  Zap,
  Languages,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { MobileShell } from "./_shared/MobileShell";

const reels = [
  {
    id: "r1",
    videoId: "YT_abc123",
    showName: "The Office (US)",
    episode: "S04 · E12",
    clipRange: "1:22 → 1:43",
    bg: "from-[#3A3F52] via-[#2C3245] to-[#1E2235]",
    accent: "#C8623E",
    targetWord: "throw under the bus",
    wordType: "Idiom",
    wordTypeJa: "慣用句",
    ipa: "/θroʊ ˈʌndər ðə bʌs/",
    definition: "To betray a colleague to avoid blame for yourself.",
    definitionJa: "自分の責任を逃れるために同僚を裏切ること。",
    nativeUsage: `"I can't believe she threw me under the bus in front of the whole team."`,
    phraseJa: "（誰かを）見捨てる・スケープゴートにする",
    relatedWords: ["scapegoat", "blame-shifting", "backstab"],
    preferences: ["Comedy", "Business English"],
    studyCount: 2,
    progressFraction: 0.6,
    progressCategory: "Idioms & Expressions",
    progressGoal: 5,
    progressDone: 3,
    lines: [
      {
        speaker: "Michael",
        active: false,
        en: "So the presentation went fine. I handled it.",
        ja: null,
      },
      {
        speaker: "Jim",
        active: false,
        en: "Yeah, but that framing misses a lot.",
        ja: null,
      },
      {
        speaker: "Michael",
        active: false,
        en: "I just… clarified a few things. That's all.",
        ja: null,
      },
      {
        speaker: "Jim",
        active: true,
        en: [
          { text: "You kind of ", highlight: false },
          { text: "threw her under the bus", highlight: true },
          { text: " in there, man.", highlight: false },
        ],
        ja: "君は彼女をスケープゴートにしたようなものだよ。",
      },
      {
        speaker: "Michael",
        active: false,
        en: "I was protecting the branch! There's a difference.",
        ja: null,
      },
    ],
  },
  {
    id: "r2",
    videoId: "YT_def456",
    showName: "Lex Fridman Podcast",
    episode: "Ep. 401",
    clipRange: "4:51 → 5:14",
    bg: "from-[#2A3A50] via-[#1E2C40] to-[#141C2C]",
    accent: "#5B8DEF",
    targetWord: "nuance",
    wordType: "Noun",
    wordTypeJa: "名詞",
    ipa: "/ˈnjuːɑːns/",
    definition: "A subtle difference in meaning, expression, or sound.",
    definitionJa: "意味・表現・響きにおける微妙な差異や濃淡のこと。",
    nativeUsage: `"You really need to appreciate the nuance here — it's not black and white."`,
    phraseJa: "ニュアンス・微妙な差異",
    relatedWords: ["subtlety", "connotation", "implication"],
    preferences: ["Tech", "Science"],
    studyCount: 0,
    progressFraction: 0.4,
    progressCategory: "Academic Vocabulary",
    progressGoal: 5,
    progressDone: 2,
    lines: [
      {
        speaker: "Guest",
        active: false,
        en: "People assume these models just pattern-match.",
        ja: null,
      },
      {
        speaker: "Lex",
        active: false,
        en: "Yeah, but that framing misses a lot.",
        ja: null,
      },
      {
        speaker: "Lex",
        active: true,
        en: [
          { text: "There's a lot of ", highlight: false },
          { text: "nuance", highlight: true },
          {
            text: " to how language models actually understand context.",
            highlight: false,
          },
        ],
        ja: "言語モデルが文脈を理解するうえには多くのニュアンスがある。",
      },
      {
        speaker: "Guest",
        active: false,
        en: "Exactly. And that's what makes alignment so hard.",
        ja: null,
      },
      {
        speaker: "Lex",
        active: false,
        en: "The more I study it, the more I appreciate the depth.",
        ja: null,
      },
    ],
  },
];

export function MobileReel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [saved, setSaved] = useState(false);
  const [marked, setMarked] = useState(false);
  const [showJa, setShowJa] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  const reel = reels[currentIdx];

  const prev = () => {
    setCurrentIdx((i) => Math.max(0, i - 1));
  };
  const next = () => {
    setCurrentIdx((i) => Math.min(reels.length - 1, i + 1));
  };

  return (
    <MobileShell activePage="watch" dark>
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {/* ── Video section (~55% height) ── */}
        <div
          className={`relative flex-[55] min-h-0 bg-gradient-to-br ${reel.bg}`}
        >
          {/* Source info — bottom left */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5">
            <div className="w-4 h-3.5 bg-white/15 rounded flex items-center justify-center">
              <span className="text-[6px] font-bold text-white">▶</span>
            </div>
            <span className="text-white/85 text-[11px] font-semibold">
              {reel.showName}
            </span>
            <span className="text-white/40 text-[10px]">{reel.episode}</span>
            <div className="flex items-center gap-0.5 text-white/35 text-[9px] font-mono ml-1">
              <Clock className="w-2.5 h-2.5" />
              {reel.clipRange}
            </div>
          </div>

          {/* Play/pause center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/35 flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white fill-white" />
              ) : (
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              )}
            </button>
          </div>

          {/* Right rail */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3">
            <button
              onClick={prev}
              disabled={currentIdx === 0}
              className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white disabled:opacity-25 hover:bg-white/25 transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSaved((s) => !s)}
              className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center"
            >
              <Bookmark
                className={`w-4 h-4 ${saved ? "text-white fill-white" : "text-white"}`}
              />
            </button>
            <button
              onClick={() => setMarked((m) => !m)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center ${marked ? "bg-emerald-500/80 border-emerald-400" : "bg-white/15 border-white/30"}`}
            >
              <Zap
                className={`w-4 h-4 ${marked ? "text-white fill-white" : "text-white/80"}`}
              />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white/75">
              <Volume2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={next}
              disabled={currentIdx === reels.length - 1}
              className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white disabled:opacity-25 hover:bg-white/25 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Nav dots */}
            <div className="flex flex-col gap-1.5 mt-1">
              {reels.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all ${i === currentIdx ? "w-1.5 h-4 bg-white" : "w-1.5 h-1.5 bg-white/35"}`}
                />
              ))}
            </div>
          </div>

          {/* JP toggle */}
          <button
            onClick={() => setShowJa((v) => !v)}
            className={`absolute top-11 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-xl border backdrop-blur-md text-[10px] font-semibold transition-all ${showJa ? "bg-white/25 border-white/50 text-white" : "bg-white/10 border-white/20 text-white/45"}`}
          >
            <Languages className="w-3 h-3" />
            日本語
          </button>

          {/* Orange progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/15">
            <div className="h-full w-1/3" style={{ background: "#C8623E" }} />
          </div>
        </div>

        {/* ── Learning panel (~45% height) ── */}
        <div className="flex-[45] min-h-0 bg-[#F8F6F2] flex flex-col overflow-y-auto">
          {/* Highlighted transcript line */}
          <div className="px-4 pt-3 pb-2 border-b border-[#DDD9D2] shrink-0">
            {(() => {
              const activeLine = reel.lines.find((line) => line.active);
              return (
                <>
                  <p className="text-[13px] font-medium text-[#1C1917] leading-snug">
                    {Array.isArray(activeLine?.en)
                      ? (
                          activeLine.en as Array<{
                            text: string;
                            highlight: boolean;
                          }>
                        ).map((seg, i) =>
                          seg.highlight ? (
                            <mark
                              key={i}
                              className="not-italic font-bold px-1 py-0.5 rounded bg-amber-300 text-[#1C1917] border border-[#1C1917] shadow-[1px_1px_0_#1C1917]"
                              style={{ textDecoration: "none" }}
                            >
                              {seg.text}
                            </mark>
                          ) : (
                            <span key={i}>{seg.text}</span>
                          ),
                        )
                      : activeLine?.en}
                  </p>
                  {showJa && (
                    <p className="text-[10px] text-[#958F87] mt-1 leading-relaxed">
                      {activeLine?.ja}
                    </p>
                  )}
                </>
              );
            })()}
          </div>

          {/* Two-column: Key phrase + Progress */}
          <div className="flex gap-3 px-4 pt-3 pb-3 shrink-0">
            {/* Dark key phrase card */}
            <div className="flex-[6] bg-[#1C1917] rounded-2xl p-3.5 text-white flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span
                  className="text-[#C8623E] text-[9px] font-bold uppercase tracking-widest"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Key phrase
                </span>
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-violet-200 text-[#1C1917] border border-[#1C1917] shadow-[1px_1px_0_#1C1917]">
                  {reel.wordType}
                </span>
              </div>
              <h3
                className="text-[14px] font-bold italic leading-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {reel.targetWord}
              </h3>
              <p className="text-white/35 text-[9px] font-mono tracking-wide">
                {reel.ipa}
              </p>
              <p className="text-white/65 text-[11px] leading-relaxed border-l-2 border-[#C8623E] pl-2">
                {reel.definition}
                {showJa && (
                  <span className="block text-white/38 text-[9px] mt-0.5">
                    {reel.definitionJa}
                  </span>
                )}
              </p>
              <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                <p className="text-white/50 italic text-[9px] leading-relaxed">
                  {reel.nativeUsage}
                </p>
              </div>
              <button
                onClick={() => setSaved((s) => !s)}
                className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold border transition-all ${
                  saved
                    ? "bg-emerald-400 border-emerald-500 text-[#1C1917]"
                    : "bg-[#C8623E] border-[#A34E2E] text-white shadow-[2px_2px_0_#6B4226]"
                }`}
              >
                {saved ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" /> Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3 h-3" /> Save &amp; study
                  </>
                )}
              </button>
            </div>

            {/* Right: Progress + mark */}
            <div className="flex-[4] flex flex-col gap-2.5">
              {/* Progress ring */}
              <div className="bg-white border border-[#DDD9D2] rounded-2xl p-3">
                <p className="text-[9px] font-bold text-[#52504B] mb-2">
                  Today's Progress
                </p>
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10 shrink-0">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        strokeWidth="3.5"
                        stroke="#E8E5DF"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        strokeWidth="3.5"
                        stroke="#C8623E"
                        strokeDasharray={`${reel.progressFraction * 100},100`}
                        fill="none"
                        strokeLinecap="round"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-[#1C1917]">
                      {reel.progressDone}/{reel.progressGoal}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[#1C1917] leading-tight">
                      {reel.progressCategory}
                    </p>
                    <p className="text-[9px] text-[#A09890] mt-0.5">
                      {reel.progressGoal - reel.progressDone} more to goal
                    </p>
                  </div>
                </div>
              </div>
              {/* Mark studied */}
              <button
                onClick={() => setMarked((m) => !m)}
                className={`w-full py-2 rounded-xl text-[10px] font-semibold border flex items-center justify-center gap-1 transition-all ${
                  marked
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-white text-[#52504B] border-[#DDD9D2]"
                }`}
              >
                {marked ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" /> Got it!
                  </>
                ) : (
                  <>🧠 Mark as studied</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
