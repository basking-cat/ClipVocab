import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import { Check, X, RotateCcw, Volume2, Brain, Mic, Send, ChevronRight, Zap } from 'lucide-react';

// Pixel art heart — 7×6 grid, each "pixel" is `sz` CSS pixels
function PixelHeart({ filled = true, sz = 4 }: { filled?: boolean; sz?: number }) {
  const rows = [
    [0,1,1,0,1,1,0],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,0,0,1,0,0,0],
  ];
  const fill = filled ? '#C8623E' : '#DDD9D2';
  return (
    <svg width={7*sz} height={6*sz} viewBox={`0 0 ${7*sz} ${6*sz}`} shapeRendering="crispEdges" style={{ display: 'block' }}>
      {rows.map((row, y) => row.map((on, x) =>
        on ? <rect key={`${x}-${y}`} x={x*sz} y={y*sz} width={sz} height={sz} fill={fill} /> : null
      ))}
    </svg>
  );
}

type ReviewType = 'RECALL' | 'AI_EVAL';
type Phase = 'question' | 'answered' | 'ai_feedback';

const currentCard = {
  phrase: 'Cut to the chase',
  context: 'She really ___ in that meeting and got everyone back on track.',
  meaning: 'To get directly to the point, leaving out unnecessary details.',
  example: "We don't have much time, so let's cut to the chase: are we buying the company or not?",
  sourceClip: 'The Office (US) · S04E12',
  pronunciation: '/kʌt tə ðə tʃeɪs/',
  reviewType: 'AI_EVAL' as ReviewType,
};

const upcomingWords = ['Reckon', 'Throw under the bus', 'Nuance', 'Elephant in the room', 'Blow off'];
const upcomingColors = ['bg-amber-200', 'bg-violet-200', 'bg-sky-200', 'bg-rose-200', 'bg-emerald-200'];

const aiScore = 88;
const aiFeedback = `Good usage! Your sentence correctly places "${currentCard.phrase}" in a natural context. The word "meeting" gives it situational grounding. Minor tip: idioms like this land better when the stakes feel slightly higher — e.g. "in the boardroom" vs "in that meeting". Still, solid command of the phrase.`;

export function Review() {
  const [phase, setPhase] = useState<Phase>('question');
  const [userAnswer, setUserAnswer] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSubmit = () => { if (userAnswer.trim()) setPhase('ai_feedback'); };
  const handleReveal = () => { setIsRevealed(true); setPhase('answered'); };
  const handleNext = () => { setPhase('question'); setUserAnswer(''); setIsRevealed(false); };

  const [scoreBg, scoreText, scoreBorder, barBg] =
    aiScore >= 85 ? ['bg-emerald-300', 'text-[#1C1917]', 'border-emerald-500', 'bg-emerald-500']
  : aiScore >= 65 ? ['bg-amber-300',   'text-[#1C1917]', 'border-amber-500',   'bg-amber-500']
  :                 ['bg-rose-400',    'text-white',      'border-rose-500',    'bg-rose-500'];

  const reviewedCount = 12;
  const totalCount = 47;
  const pct = Math.round((reviewedCount / totalCount) * 100);

  return (
    <AppShell activePage="review">
      <div className="max-w-xl mx-auto px-6 py-9">

        {/* Header */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-[#1C1917] mb-5 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Daily Review</h1>

          {/* Progress — digital scoreboard feel */}
          <div className="inline-flex items-center gap-3 bg-[#1C1917] text-white px-4 py-2.5 rounded-xl border-2 border-[#1C1917] shadow-[3px_3px_0_#6B4226] mb-3">
            <span className="text-lg font-bold tabular-nums font-mono">{reviewedCount}</span>
            <div className="w-32 h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-amber-300 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-lg font-bold tabular-nums font-mono text-white/60">{totalCount}</span>
            {/* Pixel art heart divider */}
            <span className="w-px h-4 bg-white/20 mx-1" />
            <span className="flex items-center gap-1.5">
              <PixelHeart filled={true}  sz={4} />
              <PixelHeart filled={true}  sz={4} />
              <PixelHeart filled={false} sz={4} />
            </span>
          </div>
          <p className="text-[10px] text-[#A09890] uppercase tracking-wider font-bold">Words reviewed today</p>
        </div>

        {/* Review type badge */}
        <div className="flex justify-center mb-5">
          {currentCard.reviewType === 'AI_EVAL' ? (
            <span className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-lg border-2 border-[#1C1917] bg-violet-300 text-[#1C1917] shadow-[2.5px_2.5px_0_#1C1917]">
              <Brain className="w-3.5 h-3.5" /> AI Evaluation — write a sentence, get scored
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-lg border-2 border-[#1C1917] bg-sky-300 text-[#1C1917] shadow-[2.5px_2.5px_0_#1C1917]">
              <RotateCcw className="w-3.5 h-3.5" /> Recall Mode — can you remember?
            </span>
          )}
        </div>

        <div className="space-y-4">

          {/* Flash card — dot grid background */}
          <div
            className="bg-white border-2 border-[#1C1917] rounded-2xl overflow-hidden shadow-[4px_4px_0_#1C1917]"
            style={{
              backgroundImage: 'radial-gradient(circle, #DDD9D2 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          >
            {/* Top accent strip */}
            <div className="h-2 w-full bg-[#C8623E]" />

            <div className="px-7 pt-7 pb-8 bg-white/90 backdrop-blur-none">

              {/* Context sentence */}
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#A09890] mb-3 bg-[#F8F6F2] border border-[#DDD9D2] px-2.5 py-1 rounded-full">
                  <Zap className="w-2.5 h-2.5 text-amber-500" /> Context
                </span>
                <p className="text-xl text-[#1C1917] leading-relaxed font-light">
                  {currentCard.context.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <mark className="not-italic bg-amber-300 text-[#1C1917] font-bold px-2 py-0.5 rounded-lg border-2 border-[#1C1917] shadow-[1.5px_1.5px_0_#1C1917]">
                          {currentCard.phrase}
                        </mark>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>

              {/* Source */}
              <div className="flex items-center justify-center gap-2 text-xs text-[#A09890] mb-5">
                <div className="w-7 h-5 rounded border border-[#DDD9D2] bg-[#E8E5DF] flex items-center justify-center">
                  <span className="text-[7px] font-bold text-[#6B6660]">▶</span>
                </div>
                <span>From: <span className="font-bold text-[#52504B]">{currentCard.sourceClip}</span></span>
                <button className="text-[#A09890] hover:text-[#C8623E] transition-colors ml-1"><Volume2 className="w-3.5 h-3.5" /></button>
              </div>

              {/* AI_EVAL input */}
              {currentCard.reviewType === 'AI_EVAL' && phase === 'question' && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#A09890] text-center mb-2">
                    Write your own sentence using this phrase
                  </p>
                  <div className="relative">
                    <textarea
                      value={userAnswer}
                      onChange={e => setUserAnswer(e.target.value)}
                      placeholder="e.g. He cut to the chase and told us the budget was cut…"
                      rows={3}
                      className="w-full resize-none rounded-xl border-2 border-[#DDD9D2] focus:border-[#1C1917] bg-[#F8F6F2] text-[#1C1917] text-sm px-4 py-3 outline-none placeholder:text-[#A09890] transition-all leading-relaxed pr-11"
                    />
                    <Mic className="absolute top-3 right-3.5 w-4 h-4 text-[#A09890]" />
                  </div>
                </div>
              )}

              {/* User answer display */}
              {phase === 'ai_feedback' && (
                <div className="bg-[#F8F6F2] rounded-xl p-4 border-2 border-[#DDD9D2]">
                  <p className="text-[9px] font-bold text-[#A09890] uppercase tracking-wider mb-1.5">Your answer</p>
                  <p className="text-sm text-[#1C1917] italic">"{userAnswer}"</p>
                </div>
              )}

              {/* RECALL reveal */}
              {currentCard.reviewType === 'RECALL' && isRevealed && (
                <div className="mt-5 pt-5 border-t-2 border-dashed border-[#DDD9D2] space-y-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#A09890] mb-1">Meaning</p>
                    <p className="text-base font-medium text-[#1C1917]">{currentCard.meaning}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-amber-600 mb-1">Example</p>
                    <p className="text-sm text-[#52504B] italic">"{currentCard.example}"</p>
                  </div>
                  <span className="inline-block font-mono text-xs bg-[#E8E5DF] text-[#52504B] px-2 py-1 rounded border border-[#DDD9D2]">{currentCard.pronunciation}</span>
                </div>
              )}
            </div>
          </div>

          {/* AI Feedback */}
          {phase === 'ai_feedback' && (
            <div className={`rounded-2xl border-2 border-[#1C1917] p-5 ${scoreBg} ${scoreText} shadow-[4px_4px_0_#1C1917]`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg border-2 border-[#1C1917] bg-white/40 flex items-center justify-center shadow-[1.5px_1.5px_0_#1C1917]">
                    <Brain className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">AI Feedback</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tabular-nums font-mono">{aiScore}</span>
                  <span className="text-xs opacity-60">/100</span>
                </div>
              </div>
              <div className="h-2.5 bg-black/10 rounded-full overflow-hidden mb-3 border border-black/10">
                <div className={`h-full rounded-full ${barBg}`} style={{ width: `${aiScore}%` }} />
              </div>
              <p className="text-sm leading-relaxed opacity-90">{aiFeedback}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            {currentCard.reviewType === 'AI_EVAL' && phase === 'question' && (
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1C1917] text-white text-sm font-bold border-2 border-[#1C1917] disabled:opacity-30 shadow-[3px_3px_0_#6B4226] hover:shadow-[2px_2px_0_#6B4226] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                <Send className="w-4 h-4" /> Submit for AI Review
              </button>
            )}
            {currentCard.reviewType === 'RECALL' && phase === 'question' && (
              <button
                onClick={handleReveal}
                className="flex-1 py-3.5 rounded-xl bg-[#1C1917] text-white text-sm font-bold border-2 border-[#1C1917] shadow-[3px_3px_0_#6B4226] hover:shadow-[2px_2px_0_#6B4226] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                Reveal Meaning
              </button>
            )}
            {phase === 'answered' && (
              <>
                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl border-2 border-[#1C1917] bg-white text-[#1C1917] text-sm font-bold shadow-[3px_3px_0_#1C1917] hover:bg-rose-100 transition-colors"
                >
                  <X className="w-4 h-4" /> Hard
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl border-2 border-[#1C1917] bg-emerald-300 text-[#1C1917] text-sm font-bold shadow-[3px_3px_0_#1C1917] hover:bg-emerald-400 transition-colors"
                >
                  <Check className="w-4 h-4" /> Got it!
                </button>
              </>
            )}
            {phase === 'ai_feedback' && (
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl border-2 border-[#1C1917] bg-amber-300 text-[#1C1917] text-sm font-bold shadow-[3px_3px_0_#1C1917] hover:bg-amber-400 transition-colors"
              >
                Next Word <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Coming up queue */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#A09890] text-center mb-3">Coming up</p>
            <div className="flex flex-wrap justify-center gap-2">
              {upcomingWords.map((word, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 ${upcomingColors[i]} border-2 border-[#1C1917] rounded text-[11px] font-bold text-[#1C1917] shadow-[1.5px_1.5px_0_#1C1917]`}
                  style={{ opacity: 1 - i * 0.12 }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
