import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import { Play, Clock, BookOpen, Volume2, ChevronRight, CheckCircle2, Search, SlidersHorizontal, X, Zap } from 'lucide-react';

const PREFERENCE_TOPICS = [
  { label: 'Tech & Startups',   weight: 0.85 },
  { label: 'Comedy & TV Shows', weight: 0.90 },
  { label: 'News & Politics',   weight: 0.50 },
  { label: 'Podcasts',          weight: 0.75 },
  { label: 'Business',          weight: 0.60 },
];

const clips = [
  {
    id: 'clip-1',
    videoId: 'YT_abc123',
    start: '1:24', end: '1:45',
    showName: 'The Office (US)',
    title: "Michael's Sensitivity Training",
    difficulty: 'Intermediate',
    difficultyColor: 'bg-amber-300 text-[#1C1917]',
    duration: '0:21',
    isCompleted: false,
    targetWord: 'throw under the bus',
    wordType: 'Idiom',
    wordTypeColor: 'bg-violet-300',
    transcript: [
      { speaker: 'Michael', text: 'I was talking to Jan about the new filing system, and she completely blew me off.' },
      { speaker: 'Jim', text: 'Well, you kind of threw her under the bus in that meeting yesterday. What did you expect?', highlight: 'threw her under the bus' },
    ],
  },
  {
    id: 'clip-2',
    videoId: 'YT_def456',
    start: '4:02', end: '4:22',
    showName: 'Lex Fridman Podcast',
    title: 'The future of AI and language',
    difficulty: 'Advanced',
    difficultyColor: 'bg-rose-400 text-white',
    duration: '0:20',
    isCompleted: true,
    targetWord: 'nuance',
    wordType: 'Noun',
    wordTypeColor: 'bg-sky-300',
    transcript: [],
  },
  {
    id: 'clip-3',
    videoId: 'YT_ghi789',
    start: '8:55', end: '9:15',
    showName: 'Late Night Talk Show',
    title: 'Interview with a stand-up comedian',
    difficulty: 'Intermediate',
    difficultyColor: 'bg-amber-300 text-[#1C1917]',
    duration: '0:20',
    isCompleted: false,
    targetWord: 'reckon',
    wordType: 'Verb',
    wordTypeColor: 'bg-emerald-300',
    transcript: [],
  },
];

// Sticker tag component
function StickerTag({ children, color = 'bg-[#E8E5DF]', textColor = 'text-[#1C1917]', size = 'sm' }: {
  children: React.ReactNode; color?: string; textColor?: string; size?: 'xs' | 'sm';
}) {
  const sz = size === 'xs' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5';
  return (
    <span className={`inline-flex items-center gap-1 font-bold rounded border-2 border-[#1C1917] ${color} ${textColor} ${sz} shadow-[1.5px_1.5px_0_#1C1917]`}>
      {children}
    </span>
  );
}

export function Feed() {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [activeClipId, setActiveClipId] = useState('clip-1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTopics, setActiveTopics] = useState<string[]>(['Tech & Startups', 'Comedy & TV Shows', 'Podcasts']);
  const [showPrefs, setShowPrefs] = useState(false);
  const [wordSaved, setWordSaved] = useState(false);

  const activeClip = clips.find(c => c.id === activeClipId)!;
  const isSearchMode = query.trim().length > 0;

  const toggleTopic = (label: string) =>
    setActiveTopics(p => p.includes(label) ? p.filter(t => t !== label) : [...p, label]);
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setQuery(inputValue.trim()); };
  const clearSearch = () => { setInputValue(''); setQuery(''); };

  return (
    <AppShell activePage="feed">
      <div className="max-w-5xl mx-auto px-8 py-9">

        {/* Header */}
        <div className="mb-7 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1C1917] mb-1 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Daily Feed</h1>
            <p className="text-sm text-[#6B6660]">
              {isSearchMode ? 'Results for your search.' : `Curated from: ${activeTopics.slice(0,2).join(', ')}${activeTopics.length > 2 ? ` +${activeTopics.length - 2}` : ''}`}
            </p>
          </div>
          <StickerTag color="bg-amber-300" size="sm">
            <Zap className="w-3 h-3" /> {clips.length} clips today
          </StickerTag>
        </div>

        {/* Search + Prefs */}
        <div className="flex gap-2.5 mb-4">
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 bg-white border-2 border-[#DDD9D2] rounded-lg px-3.5 py-2 focus-within:border-[#C8623E] transition-all">
            <Search className="w-3.5 h-3.5 text-[#A09890] shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Search a word or phrase…"
              className="flex-1 bg-transparent text-[#1C1917] placeholder:text-[#A09890] text-sm outline-none"
            />
            {inputValue && (
              <button type="button" onClick={clearSearch} className="text-[#A09890] hover:text-[#52504B]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
          <button
            onClick={() => setShowPrefs(v => !v)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border-2 text-sm font-bold transition-all shadow-[2px_2px_0_#1C1917] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
              showPrefs
                ? 'border-[#1C1917] bg-amber-300 text-[#1C1917]'
                : 'border-[#1C1917] bg-white text-[#1C1917] hover:bg-[#F8F6F2]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Prefs
          </button>
        </div>

        {/* Prefs panel */}
        {showPrefs && (
          <div className="mb-4 bg-white border-2 border-[#DDD9D2] rounded-lg p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#A09890] mb-3">Filter by interest</p>
            <div className="flex flex-wrap gap-2">
              {PREFERENCE_TOPICS.map(t => {
                const active = activeTopics.includes(t.label);
                return (
                  <button
                    key={t.label}
                    onClick={() => toggleTopic(t.label)}
                    className={`text-xs font-bold px-3 py-1.5 rounded border-2 border-[#1C1917] transition-all shadow-[1.5px_1.5px_0_#1C1917] active:shadow-none active:translate-x-[1.5px] active:translate-y-[1.5px] ${
                      active ? 'bg-[#1C1917] text-white' : 'bg-white text-[#1C1917] hover:bg-[#F8F6F2]'
                    }`}
                  >
                    {t.label} <span className={`ml-1 font-normal text-[10px] ${active ? 'text-white/60' : 'text-[#A09890]'}`}>{Math.round(t.weight * 100)}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-7">

          {/* Clip list */}
          <div className="col-span-5 space-y-2.5">
            {clips.map(clip => {
              const isActive = activeClipId === clip.id;
              return (
                <button
                  key={clip.id}
                  onClick={() => { setActiveClipId(clip.id); setWordSaved(false); }}
                  className={`w-full text-left p-3.5 rounded-xl border-2 transition-all ${
                    isActive
                      ? 'bg-white border-[#1C1917] shadow-[3px_3px_0_#1C1917]'
                      : 'bg-white border-[#DDD9D2] hover:border-[#A09890] opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Thumbnail */}
                    <div className="w-16 h-12 rounded-lg shrink-0 bg-[#E8E5DF] border-2 border-[#1C1917] relative flex items-center justify-center overflow-hidden">
                      {clip.isCompleted ? (
                        <div className="absolute inset-0 bg-[#1C1917]/70 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <Play className={`w-4 h-4 ${isActive ? 'text-[#C8623E]' : 'text-[#A09890]'}`} />
                      )}
                      <span className="absolute bottom-0.5 right-1 text-[8px] font-mono font-bold text-[#6B6660]">{clip.duration}</span>
                    </div>

                    <div className="flex-1 min-w-0 py-0.5">
                      <p className="text-[9px] font-bold text-[#A09890] uppercase tracking-wider truncate mb-0.5">{clip.showName}</p>
                      <h3 className={`text-xs font-semibold truncate mb-1.5 ${isActive ? 'text-[#1C1917]' : 'text-[#52504B]'}`}>{clip.title}</h3>
                      <div className="flex items-center gap-1.5">
                        <StickerTag color={clip.difficultyColor} textColor={clip.difficultyColor.includes('text-white') ? 'text-white' : 'text-[#1C1917]'} size="xs">
                          {clip.difficulty}
                        </StickerTag>
                        <span className="text-[9px] text-[#A09890] font-mono flex items-center gap-0.5">
                          <Clock className="w-2 h-2" />{clip.start}–{clip.end}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Learn row */}
                  <div className="mt-2.5 pt-2.5 border-t border-dashed border-[#DDD9D2] flex items-center gap-2">
                    <BookOpen className={`w-3 h-3 shrink-0 ${isActive ? 'text-[#C8623E]' : 'text-[#A09890]'}`} />
                    <span className={`text-[11px] font-semibold flex-1 truncate ${isActive ? 'text-[#1C1917]' : 'text-[#6B6660]'}`}>
                      "{clip.targetWord}"
                    </span>
                    <StickerTag color={clip.wordTypeColor} size="xs">{clip.wordType}</StickerTag>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Player panel */}
          <div className="col-span-7">
            <div className="bg-white rounded-xl border-2 border-[#1C1917] shadow-[4px_4px_0_#1C1917] overflow-hidden sticky top-8">

              {/* Video */}
              <div className="aspect-video bg-[#1C1917] relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#282622] to-[#1C1917]" />
                <div className="absolute top-2.5 left-3 bg-black/50 rounded px-2 py-0.5 flex items-center gap-1.5 text-white/60 text-[10px] font-mono z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8623E] animate-pulse" />
                  {activeClip.videoId}
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center hover:bg-white/25 transition-colors z-10 shadow-[0_0_0_4px_rgba(255,255,255,0.05)]"
                >
                  {isPlaying
                    ? <span className="flex gap-1.5"><span className="w-1.5 h-5 bg-white rounded-sm" /><span className="w-1.5 h-5 bg-white rounded-sm" /></span>
                    : <Play className="w-6 h-6 ml-1 text-white fill-white" />}
                </button>
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 bg-gradient-to-t from-black/60">
                  <div className="flex items-center gap-2.5">
                    <span className="text-white/60 text-[10px] font-mono">{activeClip.start}</span>
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C8623E] w-1/3 rounded-full" />
                    </div>
                    <span className="text-white/60 text-[10px] font-mono">{activeClip.end}</span>
                    <button className="text-white/60 hover:text-white ml-1"><Volume2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>

              {/* Transcript */}
              <div className="px-5 py-4 border-b-2 border-[#E8E5DF]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A09890]">Transcript</span>
                  <span className="text-[10px] text-[#A09890] font-mono">{activeClip.start} – {activeClip.end}</span>
                </div>
                {activeClip.transcript.length > 0 ? (
                  <div className="space-y-3.5">
                    {activeClip.transcript.map((line, i) => (
                      <div key={i}>
                        <span className="text-[9px] font-bold text-[#A09890] uppercase tracking-widest block mb-0.5">{line.speaker}</span>
                        <p className="text-sm text-[#52504B] leading-relaxed">
                          {line.highlight ? (
                            <>
                              {line.text.split(line.highlight).map((part, j, arr) => (
                                <React.Fragment key={j}>
                                  {part}
                                  {j < arr.length - 1 && (
                                    <mark className="not-italic bg-amber-300 text-[#1C1917] font-bold px-1.5 py-0.5 rounded border-2 border-[#1C1917] shadow-[1px_1px_0_#1C1917]">
                                      {line.highlight}
                                    </mark>
                                  )}
                                </React.Fragment>
                              ))}
                            </>
                          ) : line.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#A09890] text-center py-4">No transcript for this clip</p>
                )}
              </div>

              {/* Word card */}
              <div className="px-5 py-4">
                <div className="border-2 border-[#1C1917] rounded-xl p-4 bg-[#FDFCFA]">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-300 border-2 border-[#1C1917] flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0_#1C1917]">
                      <BookOpen className="w-4 h-4 text-[#1C1917]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[#1C1917] text-sm">"{activeClip.targetWord}"</span>
                        <StickerTag color={activeClip.wordTypeColor} size="xs">{activeClip.wordType}</StickerTag>
                      </div>
                      <p className="text-xs text-[#6B6660] leading-relaxed mb-3">To betray a colleague or friend for personal gain, usually to avoid blame.</p>
                      <button
                        onClick={() => setWordSaved(s => !s)}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold border-2 transition-all ${
                          wordSaved
                            ? 'bg-emerald-300 text-[#1C1917] border-[#1C1917] shadow-[2px_2px_0_#1C1917]'
                            : 'bg-[#1C1917] text-white border-[#1C1917] shadow-[3px_3px_0_#6B4226] hover:shadow-[2px_2px_0_#6B4226] hover:translate-x-[1px] hover:translate-y-[1px]'
                        } transition-all`}
                      >
                        {wordSaved
                          ? <><CheckCircle2 className="w-4 h-4" /> Saved to deck!</>
                          : <>Save & Study this phrase <ChevronRight className="w-3.5 h-3.5" /></>}
                      </button>
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
