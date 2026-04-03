import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import { Play, Clock, BookOpen, Volume2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Feed() {
  const [activeClipId, setActiveClipId] = useState<string | null>('clip-1');
  const [isPlaying, setIsPlaying] = useState(false);

  const clips = [
    {
      id: 'clip-1',
      showName: 'The Office (US)',
      title: 'Michael\'s Sensitivity Training',
      difficulty: 'Intermediate',
      difficultyColor: 'bg-amber-100 text-amber-800 border-amber-200',
      duration: '1:45',
      thumbnailColor: 'bg-[#E8E4DB]',
      isCompleted: false,
    },
    {
      id: 'clip-2',
      showName: 'Tech Podcast',
      title: 'Discussing the new AI features',
      difficulty: 'Advanced',
      difficultyColor: 'bg-rose-100 text-rose-800 border-rose-200',
      duration: '2:30',
      thumbnailColor: 'bg-[#D6D2C9]',
      isCompleted: true,
    },
    {
      id: 'clip-3',
      showName: 'Late Night Talk Show',
      title: 'Interview with a comedian',
      difficulty: 'Intermediate',
      difficultyColor: 'bg-amber-100 text-amber-800 border-amber-200',
      duration: '1:15',
      thumbnailColor: 'bg-[#C2BEB4]',
      isCompleted: false,
    }
  ];

  return (
    <AppShell activePage="feed">
      <div className="max-w-4xl mx-auto px-8 py-12">
        
        <header className="mb-10">
          <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#1A1918] mb-3 tracking-tight">Today's Curriculum</h1>
          <p className="text-[#5C5856] text-lg">We've selected 3 clips to help you master workplace humor and tech vocabulary.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Clip List */}
          <div className="lg:col-span-5 space-y-4">
            {clips.map(clip => {
              const isActive = activeClipId === clip.id;
              return (
                <button 
                  key={clip.id}
                  onClick={() => setActiveClipId(clip.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    isActive 
                      ? 'bg-white border-[#E27058] shadow-[0_8px_30px_-12px_rgba(226,112,88,0.2)] scale-[1.02]' 
                      : 'bg-white border-[#E8E4DB] hover:border-[#D6D2C9] hover:bg-[#FDFBF7] opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-24 h-16 rounded-lg shrink-0 ${clip.thumbnailColor} relative overflow-hidden flex items-center justify-center`}>
                      {clip.isCompleted ? (
                        <div className="absolute inset-0 bg-[#2C2A29]/60 flex items-center justify-center backdrop-blur-[2px]">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <Play className={`w-6 h-6 ${isActive ? 'text-[#E27058]' : 'text-[#827D79]'}`} />
                      )}
                      
                      {/* Fake CSS pattern for thumbnail */}
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '8px 8px' }}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0 py-0.5">
                      <p className="text-xs font-semibold text-[#827D79] uppercase tracking-wide truncate mb-1">{clip.showName}</p>
                      <h3 className={`font-semibold truncate mb-2 ${isActive ? 'text-[#2C2A29]' : 'text-[#5C5856]'}`}>{clip.title}</h3>
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <span className={`px-2 py-0.5 rounded border ${clip.difficultyColor}`}>{clip.difficulty}</span>
                        <span className="text-[#827D79] flex items-center gap-1"><Clock className="w-3 h-3" /> {clip.duration}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Clip Area */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#E8E4DB] shadow-sm overflow-hidden sticky top-8">
              
              {/* Fake Video Player */}
              <div className="aspect-video bg-[#1A1918] relative flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2C2A29] to-[#4A4744] opacity-50"></div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
                
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-transform hover:scale-105 z-10"
                >
                  {isPlaying ? <span className="w-5 h-5 bg-white rounded-sm"></span> : <Play className="w-7 h-7 ml-1 text-white fill-white" />}
                </button>

                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <span className="text-white/80 text-xs font-mono">0:24</span>
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                     <div className="h-full bg-[#E27058] w-1/3"></div>
                  </div>
                  <span className="text-white/80 text-xs font-mono">1:45</span>
                </div>
              </div>

              {/* Transcript & Study */}
              <div className="p-8">
                
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#2C2A29]">Interactive Transcript</h3>
                    <button className="text-[#827D79] hover:text-[#2C2A29]"><Volume2 className="w-5 h-5" /></button>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-[#827D79] text-lg font-light leading-relaxed">
                      <span className="font-semibold text-xs text-[#2C2A29] uppercase tracking-wide block mb-1">Speaker 1</span>
                      So I was talking to Jan about the new filing system, and she completely <span className="bg-[#FDE2CD] text-[#A6452B] px-1.5 py-0.5 rounded cursor-help font-medium border-b border-[#E27058]/30">blew me off</span>. 
                    </p>
                    <p className="text-[#1A1918] text-lg font-medium leading-relaxed">
                      <span className="font-semibold text-xs text-[#5C5856] uppercase tracking-wide block mb-1">Speaker 2</span>
                      Well, you kind of <span className="relative inline-block cursor-help group">
                        <span className="text-[#2C2A29] font-bold border-b-2 border-[#E27058]">threw her under the bus</span>
                      </span> in that meeting yesterday. What did you expect?
                    </p>
                  </div>
                </div>

                <div className="bg-[#F8F6F1] rounded-2xl p-6 border border-[#E8E4DB]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FDE2CD] flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-[#A6452B]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2C2A29] mb-1">Throw (someone) under the bus</h4>
                      <p className="text-[#5C5856] text-sm mb-4">To betray a colleague or friend for personal gain, usually to avoid blame.</p>
                      <Button className="w-full bg-[#2C2A29] hover:bg-[#1A1918] text-white rounded-xl py-6 font-medium shadow-md group">
                        Study this phrase
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
