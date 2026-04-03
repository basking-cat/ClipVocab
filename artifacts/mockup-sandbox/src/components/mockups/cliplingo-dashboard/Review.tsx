import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import { Eye, Check, X, RotateCcw, Volume2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function Review() {
  const [isRevealed, setIsRevealed] = useState(false);

  // Mock data for the current card
  const currentCard = {
    phrase: "Cut to the chase",
    context: "She really ____ in that meeting and got everyone back on track.",
    meaning: "To get directly to the point, leaving out unnecessary details.",
    example: "We don't have much time, so let's cut to the chase: are we buying the company or not?",
    sourceClip: "The Office (US) - S04E12",
    pronunciation: "/kʌt tə ðə tʃeɪs/"
  };

  const handleReveal = () => setIsRevealed(true);
  const handleNext = () => setIsRevealed(false);

  return (
    <AppShell activePage="review">
      <div className="max-w-3xl mx-auto px-6 py-12 h-full flex flex-col">
        
        {/* Header / Progress */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#1A1918] mb-4">Daily Review</h1>
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
            <span className="text-sm font-medium text-[#827D79]">12</span>
            <Progress value={(12/47)*100} className="h-2 bg-[#E8E4DB] [&>div]:bg-[#E27058]" />
            <span className="text-sm font-medium text-[#827D79]">47</span>
          </div>
          <p className="text-xs text-[#827D79] mt-2">Words reviewed today</p>
        </div>

        {/* Flashcard Area */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
          
          {/* The Card */}
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#E8E4DB] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 relative">
            
            {/* Decorative Top Accent */}
            <div className="h-2 bg-[#E27058] w-full absolute top-0 left-0"></div>

            <div className="p-10 md:p-14">
              
              {/* Front Context */}
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#827D79] mb-4 bg-[#F2EFE9] px-3 py-1 rounded-full">
                  <Info className="w-3 h-3" /> Context
                </span>
                <p className="text-2xl md:text-3xl text-[#2C2A29] leading-relaxed font-light">
                  "She really <span className="font-bold border-b-2 border-dashed border-[#E27058] pb-1 px-2">{currentCard.phrase}</span> in that meeting and got everyone back on track."
                </p>
              </div>

              {/* Reveal Area */}
              <div className={`transition-all duration-500 overflow-hidden ${isRevealed ? 'max-h-[500px] opacity-100 mt-10 pt-8 border-t border-[#E8E4DB]' : 'max-h-0 opacity-0'}`}>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-[#827D79] uppercase tracking-wider mb-2 flex items-center gap-2">
                      Meaning
                      <button className="text-[#E27058] hover:text-[#D15F43] bg-[#FDE2CD] p-1 rounded-full"><Volume2 className="w-3 h-3" /></button>
                    </h3>
                    <p className="text-xl font-medium text-[#2C2A29]">{currentCard.meaning}</p>
                  </div>

                  <div className="bg-[#F8F6F1] p-5 rounded-2xl">
                    <h3 className="text-sm font-semibold text-[#827D79] uppercase tracking-wider mb-2">Example</h3>
                    <p className="text-[#5C5856] italic">"{currentCard.example}"</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-[#827D79] pt-2">
                    <span className="font-mono bg-[#F2EFE9] px-2 py-1 rounded">{currentCard.pronunciation}</span>
                    <span className="flex items-center gap-1"><RotateCcw className="w-4 h-4" /> From: {currentCard.sourceClip}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 w-full max-w-2xl h-16 flex items-center justify-center">
            {!isRevealed ? (
              <Button 
                onClick={handleReveal}
                className="bg-[#2C2A29] hover:bg-[#1A1918] text-white rounded-full px-12 py-7 text-lg font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 w-full max-w-md"
              >
                Reveal Meaning
              </Button>
            ) : (
              <div className="flex gap-4 w-full justify-center">
                <Button 
                  onClick={handleNext}
                  variant="outline"
                  className="flex-1 max-w-[200px] py-7 rounded-2xl border-2 border-[#E8E4DB] text-[#5C5856] hover:bg-[#F2EFE9] hover:text-[#2C2A29] text-lg font-medium group"
                >
                  <X className="w-5 h-5 mr-2 group-hover:text-rose-500 transition-colors" />
                  Hard
                </Button>
                <Button 
                  onClick={handleNext}
                  className="flex-1 max-w-[200px] py-7 rounded-2xl bg-[#E27058] hover:bg-[#D15F43] text-white text-lg font-medium shadow-[0_4px_14px_0_rgba(226,112,88,0.39)]"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Got it
                </Button>
              </div>
            )}
          </div>

        </div>

        {/* Upcoming Queue */}
        <div className="mt-12 mb-8">
          <h4 className="text-sm font-semibold text-[#827D79] uppercase tracking-wider mb-4 text-center">Coming up next</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {['Reckon', 'Throw under the bus', 'Nuance', 'Elephant in the room'].map((word, i) => (
              <span key={i} className="px-4 py-2 bg-white border border-[#E8E4DB] rounded-full text-sm font-medium text-[#5C5856] shadow-sm opacity-60">
                {word}
              </span>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
