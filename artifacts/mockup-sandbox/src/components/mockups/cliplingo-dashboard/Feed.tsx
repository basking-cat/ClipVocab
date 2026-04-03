import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import { Play, Clock, BookOpen, Volume2, ChevronRight, CheckCircle2, Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PREFERENCE_TOPICS = [
  { label: 'Tech & Startups', weight: 0.85, color: 'bg-sky-100 text-sky-800 border-sky-200' },
  { label: 'Comedy & TV Shows', weight: 0.9, color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { label: 'News & Politics', weight: 0.5, color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { label: 'Podcasts', weight: 0.75, color: 'bg-violet-100 text-violet-800 border-violet-200' },
  { label: 'Business', weight: 0.6, color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
];

const clips = [
  {
    id: 'clip-1',
    videoId: 'dQw4w9WgXcQ',
    start: '1:24',
    end: '1:45',
    showName: 'The Office (US)',
    title: "Michael's Sensitivity Training",
    difficulty: 'Intermediate',
    difficultyColor: 'bg-amber-100 text-amber-800 border-amber-200',
    duration: '0:21',
    thumbnailBg: 'bg-[#E8E4DB]',
    isCompleted: false,
    targetWord: 'throw under the bus',
    wordType: 'Idiom',
    transcript: [
      { speaker: 'Michael', text: 'I was talking to Jan about the new filing system, and she completely blew me off.' },
      { speaker: 'Jim', text: 'Well, you kind of threw her under the bus in that meeting yesterday. What did you expect?', highlight: 'threw her under the bus' },
    ],
  },
  {
    id: 'clip-2',
    videoId: 'abc123xyz',
    start: '4:02',
    end: '4:22',
    showName: 'Lex Fridman Podcast',
    title: 'The future of AI and language',
    difficulty: 'Advanced',
    difficultyColor: 'bg-rose-100 text-rose-800 border-rose-200',
    duration: '0:20',
    thumbnailBg: 'bg-[#D4D0C8]',
    isCompleted: true,
    targetWord: 'throw under the bus',
    wordType: 'Idiom',
    transcript: [],
  },
  {
    id: 'clip-3',
    videoId: 'latenight01',
    start: '8:55',
    end: '9:15',
    showName: 'Late Night Talk Show',
    title: 'Interview with a stand-up comedian',
    difficulty: 'Intermediate',
    difficultyColor: 'bg-amber-100 text-amber-800 border-amber-200',
    duration: '0:20',
    thumbnailBg: 'bg-[#C2BEB4]',
    isCompleted: false,
    targetWord: 'throw under the bus',
    wordType: 'Idiom',
    transcript: [],
  },
];

export function Feed() {
  const [query, setQuery] = useState('throw under the bus');
  const [inputValue, setInputValue] = useState('throw under the bus');
  const [activeClipId, setActiveClipId] = useState<string>('clip-1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTopics, setActiveTopics] = useState<string[]>(['Tech & Startups', 'Comedy & TV Shows', 'Podcasts']);
  const [showPrefs, setShowPrefs] = useState(false);

  const activeClip = clips.find(c => c.id === activeClipId)!;

  const toggleTopic = (label: string) => {
    setActiveTopics(prev =>
      prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputValue.trim() || query);
  };

  return (
    <AppShell activePage="feed">
      <div className="max-w-5xl mx-auto px-8 py-10">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#1A1918] mb-2 tracking-tight">Daily Feed</h1>
          <p className="text-[#5C5856]">Clips selected from your preferences for your chosen word.</p>
        </header>

        {/* Search Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 bg-white border-2 border-[#E8E4DB] rounded-2xl px-4 py-2.5 focus-within:border-[#E27058] transition-colors shadow-sm">
            <Search className="w-4 h-4 text-[#827D79] shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Enter a word or phrase to learn…"
              className="flex-1 bg-transparent text-[#2C2A29] placeholder:text-[#B5B0AA] text-sm outline-none font-medium"
            />
            {inputValue && (
              <button type="button" onClick={() => setInputValue('')} className="text-[#B5B0AA] hover:text-[#827D79]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
          <Button
            type="button"
            onClick={() => setShowPrefs(v => !v)}
            variant="outline"
            className={`rounded-2xl border-2 px-4 gap-2 text-sm font-medium transition-colors ${showPrefs ? 'border-[#E27058] bg-[#FDE2CD] text-[#A6452B]' : 'border-[#E8E4DB] text-[#5C5856] hover:border-[#D6D2C9]'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Preferences
          </Button>
        </div>

        {/* Preference Filter Panel */}
        {showPrefs && (
          <div className="mb-5 bg-[#F8F6F1] border border-[#E8E4DB] rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#827D79] mb-4">Filter by your interests</p>
            <div className="flex flex-wrap gap-2">
              {PREFERENCE_TOPICS.map(t => {
                const active = activeTopics.includes(t.label);
                return (
                  <button
                    key={t.label}
                    onClick={() => toggleTopic(t.label)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${active ? t.color + ' ring-2 ring-offset-1 ring-[#E27058]/30' : 'bg-white border-[#E8E4DB] text-[#827D79] opacity-60 hover:opacity-100'}`}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>}
                    {t.label}
                    <span className="font-normal opacity-70">{Math.round(t.weight * 100)}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Search Tag */}
        {query && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-[#827D79] uppercase tracking-wider font-semibold">Showing clips for:</span>
            <span className="inline-flex items-center gap-1.5 bg-[#FDE2CD] text-[#A6452B] text-sm font-bold px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              "{query}"
            </span>
            <span className="text-xs text-[#827D79]">{clips.length} clips found</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Clip List */}
          <div className="lg:col-span-5 space-y-3">
            {clips.map(clip => {
              const isActive = activeClipId === clip.id;
              return (
                <button
                  key={clip.id}
                  onClick={() => setActiveClipId(clip.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${isActive
                    ? 'bg-white border-[#E27058] shadow-[0_8px_30px_-12px_rgba(226,112,88,0.25)] scale-[1.01]'
                    : 'bg-white border-[#E8E4DB] hover:border-[#D6D2C9] opacity-80 hover:opacity-100'}`}
                >
                  <div className="flex gap-3">
                    {/* Thumbnail */}
                    <div className={`w-20 h-14 rounded-xl shrink-0 ${clip.thumbnailBg} relative overflow-hidden flex items-center justify-center`}>
                      {clip.isCompleted ? (
                        <div className="absolute inset-0 bg-[#2C2A29]/60 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <Play className={`w-5 h-5 ${isActive ? 'text-[#E27058]' : 'text-[#827D79]'}`} />
                      )}
                      <div className="absolute bottom-1 right-1 bg-black/50 rounded text-white text-[10px] px-1 font-mono">{clip.duration}</div>
                    </div>

                    <div className="flex-1 min-w-0 py-0.5">
                      <p className="text-[10px] font-bold text-[#827D79] uppercase tracking-wider truncate mb-0.5">{clip.showName}</p>
                      <h3 className={`text-sm font-semibold truncate mb-1.5 ${isActive ? 'text-[#2C2A29]' : 'text-[#5C5856]'}`}>{clip.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${clip.difficultyColor}`}>{clip.difficulty}</span>
                        <span className="text-[10px] text-[#827D79] flex items-center gap-0.5 font-mono"><Clock className="w-2.5 h-2.5" />{clip.start}–{clip.end}</span>
                      </div>
                    </div>
                  </div>

                  {/* Target word tag */}
                  <div className={`mt-3 flex items-center gap-1.5 text-xs ${isActive ? 'text-[#A6452B]' : 'text-[#827D79]'}`}>
                    <BookOpen className="w-3 h-3" />
                    <span className="font-medium">Learn: </span>
                    <span className={`font-semibold ${isActive ? '' : 'text-[#5C5856]'}`}>"{clip.targetWord}"</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-[#FDE2CD]' : 'bg-[#F2EFE9]'}`}>{clip.wordType}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Clip Player */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#E8E4DB] shadow-sm overflow-hidden sticky top-8">

              {/* Video Player */}
              <div className="aspect-video bg-[#1A1918] relative flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2C2A29] via-[#3A3733] to-[#1A1918]"></div>
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1.5 text-white/70 text-xs font-mono z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E27058] animate-pulse"></span>
                  YouTube · {activeClip.videoId}
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-105 z-10 shadow-2xl"
                >
                  {isPlaying
                    ? <span className="flex gap-1"><span className="w-1.5 h-5 bg-white rounded-sm"></span><span className="w-1.5 h-5 bg-white rounded-sm"></span></span>
                    : <Play className="w-6 h-6 ml-1 text-white fill-white" />}
                </button>

                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6 bg-gradient-to-t from-black/60">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-white/70 text-xs font-mono">{activeClip.start}</span>
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#E27058] w-1/3 rounded-full"></div>
                    </div>
                    <span className="text-white/70 text-xs font-mono">{activeClip.end}</span>
                    <button className="text-white/70 hover:text-white"><Volume2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              {/* Transcript */}
              <div className="p-6 border-b border-[#E8E4DB]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-['Playfair_Display'] font-bold text-lg text-[#2C2A29]">Interactive Transcript</h3>
                  <span className="text-xs text-[#827D79] font-mono">{activeClip.start} – {activeClip.end}</span>
                </div>

                {activeClip.transcript.length > 0 ? (
                  <div className="space-y-4">
                    {activeClip.transcript.map((line, i) => (
                      <div key={i}>
                        <span className="text-[10px] font-bold text-[#827D79] uppercase tracking-widest block mb-1">{line.speaker}</span>
                        <p className="text-[#5C5856] leading-relaxed">
                          {line.highlight ? (
                            <>
                              {line.text.split(line.highlight).map((part, j, arr) => (
                                <React.Fragment key={j}>
                                  {part}
                                  {j < arr.length - 1 && (
                                    <span className="relative inline-block cursor-help group/word">
                                      <span className="bg-[#FDE2CD] text-[#A6452B] font-semibold px-1.5 py-0.5 rounded border-b-2 border-[#E27058]">
                                        {line.highlight}
                                      </span>
                                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-[#1A1918] text-white text-xs rounded-xl px-3 py-2 opacity-0 group-hover/word:opacity-100 transition-opacity pointer-events-none shadow-xl z-20">
                                        To betray sb to avoid blame
                                      </span>
                                    </span>
                                  )}
                                </React.Fragment>
                              ))}
                            </>
                          ) : (
                            line.text
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-16 flex items-center justify-center text-sm text-[#B5B0AA]">Select a clip to see its transcript</div>
                )}
              </div>

              {/* Word Card */}
              <div className="p-6">
                <div className="bg-[#F8F6F1] rounded-2xl p-5 border border-[#E8E4DB] flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-[#FDE2CD] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-[#A6452B]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-[#2C2A29]">"{activeClip.targetWord}"</h4>
                      <span className="text-[10px] font-bold bg-[#E8E4DB] text-[#5C5856] px-2 py-0.5 rounded-full">{activeClip.wordType}</span>
                    </div>
                    <p className="text-sm text-[#5C5856] mb-4">To betray a colleague or friend for personal gain, usually to avoid blame or criticism.</p>
                    <Button className="w-full bg-[#2C2A29] hover:bg-[#1A1918] text-[#F8F6F1] rounded-xl py-5 font-medium text-sm group">
                      Save & Study this phrase
                      <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
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
