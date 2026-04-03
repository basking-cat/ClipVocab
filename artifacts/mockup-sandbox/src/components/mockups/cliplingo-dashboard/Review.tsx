import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import { Check, X, RotateCcw, Volume2, Info, Brain, Mic, Send, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type ReviewType = 'RECALL' | 'AI_EVAL';
type Phase = 'question' | 'answered' | 'ai_feedback';

const currentCard = {
  phrase: 'Cut to the chase',
  context: 'She really ___ in that meeting and got everyone back on track.',
  meaning: 'To get directly to the point, leaving out unnecessary details.',
  example: 'We don\'t have much time, so let\'s cut to the chase: are we buying the company or not?',
  sourceClip: 'The Office (US) · S04E12',
  sourceThumbnail: 'bg-[#E8E4DB]',
  pronunciation: '/kʌt tə ðə tʃeɪs/',
  reviewType: 'AI_EVAL' as ReviewType,
};

const upcomingWords = ['Reckon', 'Throw under the bus', 'Nuance', 'Elephant in the room', 'Blow off'];

const REVIEW_TYPE_META: Record<ReviewType, { label: string; desc: string; color: string }> = {
  RECALL: { label: 'Recall', desc: 'Can you remember the meaning?', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  AI_EVAL: { label: 'AI Evaluation', desc: 'Write a sentence — AI will score your usage.', color: 'bg-violet-50 text-violet-700 border-violet-200' },
};

function AiFeedback({ score, feedback }: { score: number; feedback: string }) {
  const color = score >= 85 ? 'emerald' : score >= 65 ? 'amber' : 'rose';
  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    amber: 'text-amber-700 bg-amber-50 border-amber-200',
    rose: 'text-rose-700 bg-rose-50 border-rose-200',
  };
  return (
    <div className={`rounded-2xl border p-5 ${colorMap[color]}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4" />
          <span className="text-sm font-bold">AI Feedback</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-xs font-medium opacity-70">Score</span>
          <span className="text-2xl font-bold">{score}</span>
          <span className="text-xs opacity-60">/100</span>
        </div>
      </div>
      {/* Score bar */}
      <div className="h-1.5 bg-white/60 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full ${color === 'emerald' ? 'bg-emerald-500' : color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-sm leading-relaxed opacity-90">{feedback}</p>
    </div>
  );
}

export function Review() {
  const [phase, setPhase] = useState<Phase>('question');
  const [userAnswer, setUserAnswer] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  const meta = REVIEW_TYPE_META[currentCard.reviewType];

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;
    setPhase('ai_feedback');
  };

  const handleRevealRecall = () => {
    setIsRevealed(true);
    setPhase('answered');
  };

  const handleNext = () => {
    setPhase('question');
    setUserAnswer('');
    setIsRevealed(false);
  };

  // Mock AI response
  const aiScore = 88;
  const aiFeedback = `Good usage! Your sentence correctly places "${currentCard.phrase}" in a natural context. The word "meeting" gives it great situational grounding. Minor tip: idioms like this work best when the stakes feel slightly higher — e.g. "in the boardroom" vs. "in that meeting". Still, solid command of the phrase.`;

  return (
    <AppShell activePage="review">
      <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col min-h-[calc(100vh-0px)]">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#1A1918] mb-4">Daily Review</h1>
          <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
            <span className="text-sm font-mono font-semibold text-[#827D79]">12</span>
            <Progress value={(12 / 47) * 100} className="h-2 bg-[#E8E4DB] [&>div]:bg-[#E27058]" />
            <span className="text-sm font-mono font-semibold text-[#827D79]">47</span>
          </div>
          <p className="text-xs text-[#B5B0AA] mt-1.5">Words reviewed today</p>
        </div>

        {/* Review Type Badge */}
        <div className="flex justify-center mb-6">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${meta.color}`}>
            {currentCard.reviewType === 'AI_EVAL' ? <Brain className="w-3 h-3" /> : <RotateCcw className="w-3 h-3" />}
            {meta.label} Mode · {meta.desc}
          </span>
        </div>

        {/* Flash Card */}
        <div className="flex-1 flex flex-col gap-5">

          {/* Card */}
          <div className="bg-white rounded-3xl border border-[#E8E4DB] shadow-sm overflow-hidden relative">
            <div className="h-1.5 w-full bg-[#E27058]"></div>

            <div className="px-8 pt-8 pb-10">
              {/* Context */}
              <div className="text-center mb-7">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#827D79] mb-4 bg-[#F2EFE9] px-3 py-1 rounded-full">
                  <Info className="w-3 h-3" /> Context
                </span>
                <p className="text-2xl text-[#2C2A29] leading-relaxed font-light">
                  {currentCard.context.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="font-bold border-b-2 border-dashed border-[#E27058] pb-0.5 px-1 text-[#A6452B]">
                          {currentCard.phrase}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>

              {/* Source Clip */}
              <div className="flex items-center justify-center gap-2 text-xs text-[#827D79] mb-6">
                <div className={`w-7 h-5 rounded ${currentCard.sourceThumbnail} flex items-center justify-center`}>
                  <span className="text-[8px] font-bold text-[#827D79]">▶</span>
                </div>
                <span>From: <span className="font-semibold text-[#5C5856]">{currentCard.sourceClip}</span></span>
                <button className="ml-1 text-[#E27058] hover:text-[#D15F43]"><Volume2 className="w-3.5 h-3.5" /></button>
              </div>

              {/* AI_EVAL: text input */}
              {currentCard.reviewType === 'AI_EVAL' && phase === 'question' && (
                <div className="mt-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#827D79] block mb-2 text-center">
                    Write your own sentence using this phrase
                  </label>
                  <div className="relative">
                    <textarea
                      value={userAnswer}
                      onChange={e => setUserAnswer(e.target.value)}
                      placeholder="e.g. He cut to the chase and told us the budget was cut…"
                      rows={3}
                      className="w-full resize-none rounded-2xl border-2 border-[#E8E4DB] focus:border-[#E27058] bg-[#FDFBF7] text-[#2C2A29] text-sm px-4 py-3 outline-none placeholder:text-[#C5C0BB] transition-colors leading-relaxed pr-12"
                    />
                    <Mic className="absolute top-3 right-4 w-4 h-4 text-[#B5B0AA]" />
                  </div>
                </div>
              )}

              {/* After submit: show user answer */}
              {(phase === 'ai_feedback') && (
                <div className="mt-2 bg-[#F8F6F1] rounded-2xl p-4 border border-[#E8E4DB]">
                  <p className="text-xs font-bold text-[#827D79] uppercase tracking-wider mb-1.5">Your answer</p>
                  <p className="text-sm text-[#2C2A29] italic">"{userAnswer}"</p>
                </div>
              )}

              {/* RECALL: reveal section */}
              {currentCard.reviewType === 'RECALL' && isRevealed && (
                <div className="mt-6 pt-6 border-t border-[#E8E4DB] space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#827D79] mb-1">Meaning</p>
                    <p className="text-lg font-medium text-[#2C2A29]">{currentCard.meaning}</p>
                  </div>
                  <div className="bg-[#F8F6F1] p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#827D79] mb-1">Example</p>
                    <p className="text-sm text-[#5C5856] italic">"{currentCard.example}"</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#827D79]">
                    <span className="font-mono bg-[#F2EFE9] px-2 py-1 rounded">{currentCard.pronunciation}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Feedback block */}
          {phase === 'ai_feedback' && (
            <AiFeedback score={aiScore} feedback={aiFeedback} />
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            {currentCard.reviewType === 'AI_EVAL' && phase === 'question' && (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim()}
                className="flex-1 bg-[#2C2A29] hover:bg-[#1A1918] text-white rounded-2xl py-6 text-base font-medium disabled:opacity-40 gap-2"
              >
                <Send className="w-4 h-4" />
                Submit for AI Review
              </Button>
            )}

            {currentCard.reviewType === 'RECALL' && phase === 'question' && (
              <Button
                onClick={handleRevealRecall}
                className="flex-1 bg-[#2C2A29] hover:bg-[#1A1918] text-white rounded-2xl py-6 text-base font-medium"
              >
                Reveal Meaning
              </Button>
            )}

            {phase === 'answered' && (
              <>
                <Button
                  onClick={handleNext}
                  variant="outline"
                  className="flex-1 py-6 rounded-2xl border-2 border-[#E8E4DB] text-[#5C5856] hover:bg-[#F2EFE9] text-base font-medium group"
                >
                  <X className="w-4 h-4 mr-2 group-hover:text-rose-500 transition-colors" /> Hard
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 py-6 rounded-2xl bg-[#E27058] hover:bg-[#D15F43] text-white text-base font-medium"
                >
                  <Check className="w-4 h-4 mr-2" /> Got it
                </Button>
              </>
            )}

            {phase === 'ai_feedback' && (
              <Button
                onClick={handleNext}
                className="flex-1 bg-[#E27058] hover:bg-[#D15F43] text-white rounded-2xl py-6 text-base font-medium gap-2"
              >
                Next Word <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Upcoming Queue */}
          <div className="pb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B5B0AA] text-center mb-3">Coming up next</p>
            <div className="flex flex-wrap justify-center gap-2">
              {upcomingWords.map((word, i) => (
                <span key={i} className="px-3 py-1.5 bg-white border border-[#E8E4DB] rounded-full text-xs font-medium text-[#827D79] shadow-sm" style={{ opacity: 1 - i * 0.15 }}>
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
