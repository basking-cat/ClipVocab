import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import { Check, X, RotateCcw, Volume2, Brain, Mic, Send, ChevronRight } from 'lucide-react';

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

const aiScore = 88;
const aiFeedback = `Good usage! Your sentence correctly places "${currentCard.phrase}" in a natural context. The word "meeting" gives it situational grounding. Minor tip: idioms like this land better when the stakes feel slightly higher — e.g. "in the boardroom" vs "in that meeting". Still, solid command of the phrase.`;

export function Review() {
  const [phase, setPhase] = useState<Phase>('question');
  const [userAnswer, setUserAnswer] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSubmit = () => { if (userAnswer.trim()) setPhase('ai_feedback'); };
  const handleReveal = () => { setIsRevealed(true); setPhase('answered'); };
  const handleNext = () => { setPhase('question'); setUserAnswer(''); setIsRevealed(false); };

  const scoreColor = aiScore >= 85 ? 'emerald' : aiScore >= 65 ? 'amber' : 'rose';
  const scoreStyles: Record<string, string> = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    amber:   'bg-amber-50 border-amber-200 text-amber-800',
    rose:    'bg-rose-50 border-rose-200 text-rose-800',
  };
  const barColor: Record<string, string> = {
    emerald: 'bg-emerald-500',
    amber:   'bg-amber-500',
    rose:    'bg-rose-500',
  };

  const reviewedCount = 12;
  const totalCount = 47;
  const pct = Math.round((reviewedCount / totalCount) * 100);

  return (
    <AppShell activePage="review">
      <div className="max-w-xl mx-auto px-6 py-9">

        {/* Header */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-[#191C22] mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Daily Review</h1>
          <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
            <span className="text-xs font-mono font-semibold text-[#4B5063] tabular-nums">{reviewedCount}</span>
            <div className="flex-1 h-1.5 bg-[#E4E6EB] rounded-full overflow-hidden">
              <div className="h-full bg-[#C95030] rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-mono font-semibold text-[#4B5063] tabular-nums">{totalCount}</span>
          </div>
          <p className="text-[10px] text-[#9AA0B4] mt-1.5">Words reviewed today</p>
        </div>

        {/* Review type badge */}
        <div className="flex justify-center mb-5">
          {currentCard.reviewType === 'AI_EVAL' ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded border bg-violet-50 text-violet-700 border-violet-200">
              <Brain className="w-3 h-3" /> AI Evaluation · Write a sentence, get scored
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded border bg-sky-50 text-sky-700 border-sky-200">
              <RotateCcw className="w-3 h-3" /> Recall Mode · Can you remember?
            </span>
          )}
        </div>

        <div className="space-y-4">

          {/* Flash card */}
          <div className="bg-white border border-[#D8DBE4] rounded-lg overflow-hidden">
            <div className="h-0.5 w-full bg-[#C95030]" />
            <div className="px-7 pt-7 pb-8">

              {/* Context sentence */}
              <div className="text-center mb-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9AA0B4] mb-3">Context</p>
                <p className="text-xl text-[#191C22] leading-relaxed font-light">
                  {currentCard.context.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="font-semibold border-b-2 border-dashed border-[#C95030] pb-0.5 px-1 text-[#C95030]">
                          {currentCard.phrase}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>

              {/* Source */}
              <div className="flex items-center justify-center gap-2 text-xs text-[#9AA0B4] mb-5">
                <div className="w-6 h-4 rounded bg-[#E4E6EB] flex items-center justify-center">
                  <span className="text-[7px] font-bold">▶</span>
                </div>
                <span>From: <span className="font-semibold text-[#4B5063]">{currentCard.sourceClip}</span></span>
                <button className="text-[#9AA0B4] hover:text-[#C95030] transition-colors"><Volume2 className="w-3.5 h-3.5" /></button>
              </div>

              {/* AI_EVAL input */}
              {currentCard.reviewType === 'AI_EVAL' && phase === 'question' && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#9AA0B4] text-center mb-2">
                    Write your own sentence using this phrase
                  </p>
                  <div className="relative">
                    <textarea
                      value={userAnswer}
                      onChange={e => setUserAnswer(e.target.value)}
                      placeholder="e.g. He cut to the chase and told us the budget was cut…"
                      rows={3}
                      className="w-full resize-none rounded-lg border border-[#D8DBE4] focus:border-[#C95030] focus:ring-2 focus:ring-[#C95030]/10 bg-[#F4F5F7] text-[#191C22] text-sm px-4 py-3 outline-none placeholder:text-[#9AA0B4] transition-all leading-relaxed pr-11"
                    />
                    <Mic className="absolute top-3 right-3.5 w-4 h-4 text-[#9AA0B4]" />
                  </div>
                </div>
              )}

              {/* User answer display */}
              {phase === 'ai_feedback' && (
                <div className="bg-[#F4F5F7] rounded-lg p-3.5 border border-[#E4E6EB]">
                  <p className="text-[9px] font-bold text-[#9AA0B4] uppercase tracking-wider mb-1">Your answer</p>
                  <p className="text-sm text-[#191C22] italic">"{userAnswer}"</p>
                </div>
              )}

              {/* RECALL reveal */}
              {currentCard.reviewType === 'RECALL' && isRevealed && (
                <div className="mt-5 pt-5 border-t border-[#E4E6EB] space-y-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#9AA0B4] mb-1">Meaning</p>
                    <p className="text-base font-medium text-[#191C22]">{currentCard.meaning}</p>
                  </div>
                  <div className="bg-[#F4F5F7] p-3.5 rounded-lg border border-[#E4E6EB]">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#9AA0B4] mb-1">Example</p>
                    <p className="text-sm text-[#4B5063] italic">"{currentCard.example}"</p>
                  </div>
                  <span className="inline-block font-mono text-xs bg-[#E4E6EB] text-[#4B5063] px-2 py-1 rounded">{currentCard.pronunciation}</span>
                </div>
              )}
            </div>
          </div>

          {/* AI Feedback */}
          {phase === 'ai_feedback' && (
            <div className={`rounded-lg border p-5 ${scoreStyles[scoreColor]}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span className="text-sm font-bold">AI Feedback</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold tabular-nums">{aiScore}</span>
                  <span className="text-xs opacity-60">/100</span>
                </div>
              </div>
              <div className="h-1 bg-white/60 rounded-full overflow-hidden mb-3">
                <div className={`h-full rounded-full ${barColor[scoreColor]}`} style={{ width: `${aiScore}%` }} />
              </div>
              <p className="text-sm leading-relaxed opacity-90">{aiFeedback}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2.5">
            {currentCard.reviewType === 'AI_EVAL' && phase === 'question' && (
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#191C22] text-white text-sm font-semibold disabled:opacity-30 hover:bg-[#2A2D38] transition-colors"
              >
                <Send className="w-4 h-4" /> Submit for AI Review
              </button>
            )}
            {currentCard.reviewType === 'RECALL' && phase === 'question' && (
              <button onClick={handleReveal} className="flex-1 py-3 rounded-lg bg-[#191C22] text-white text-sm font-semibold hover:bg-[#2A2D38] transition-colors">
                Reveal Meaning
              </button>
            )}
            {phase === 'answered' && (
              <>
                <button onClick={handleNext} className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg border border-[#D8DBE4] text-[#4B5063] text-sm font-semibold hover:bg-[#E4E6EB] transition-colors">
                  <X className="w-4 h-4" /> Hard
                </button>
                <button onClick={handleNext} className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg bg-[#C95030] text-white text-sm font-semibold hover:bg-[#A63E25] transition-colors">
                  <Check className="w-4 h-4" /> Got it
                </button>
              </>
            )}
            {phase === 'ai_feedback' && (
              <button onClick={handleNext} className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg bg-[#C95030] text-white text-sm font-semibold hover:bg-[#A63E25] transition-colors">
                Next Word <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Queue */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9AA0B4] text-center mb-2.5">Coming up</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {upcomingWords.map((word, i) => (
                <span key={i} className="px-2.5 py-1 bg-white border border-[#D8DBE4] rounded text-[11px] font-medium text-[#4B5063]" style={{ opacity: 1 - i * 0.15 }}>
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
