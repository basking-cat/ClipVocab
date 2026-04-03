import React, { useState } from 'react';
import { AppShell } from './_shared/AppShell';
import { Play, Clock, BookOpen, Volume2, ChevronRight, CheckCircle2, Search, SlidersHorizontal, X } from 'lucide-react';

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
    duration: '0:21',
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
    videoId: 'YT_def456',
    start: '4:02', end: '4:22',
    showName: 'Lex Fridman Podcast',
    title: 'The future of AI and language',
    difficulty: 'Advanced',
    duration: '0:20',
    isCompleted: true,
    targetWord: 'nuance',
    wordType: 'Noun',
    transcript: [],
  },
  {
    id: 'clip-3',
    videoId: 'YT_ghi789',
    start: '8:55', end: '9:15',
    showName: 'Late Night Talk Show',
    title: 'Interview with a stand-up comedian',
    difficulty: 'Intermediate',
    duration: '0:20',
    isCompleted: false,
    targetWord: 'reckon',
    wordType: 'Verb',
    transcript: [],
  },
];

const difficultyStyle: Record<string, string> = {
  Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
  Advanced: 'bg-rose-50 text-rose-700 border-rose-200',
  Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

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
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-[#191C22] mb-1 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Daily Feed</h1>
          <p className="text-sm text-[#4B5063]">
            {isSearchMode ? 'Results for your search.' : `Curated from: ${activeTopics.slice(0,2).join(', ')}${activeTopics.length > 2 ? ` +${activeTopics.length - 2}` : ''}`}
          </p>
        </div>

        {/* Search + Prefs */}
        <div className="flex gap-2.5 mb-4">
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 bg-white border border-[#D8DBE4] rounded-lg px-3.5 py-2 focus-within:border-[#C95030] focus-within:ring-2 focus-within:ring-[#C95030]/10 transition-all">
            <Search className="w-3.5 h-3.5 text-[#9AA0B4] shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Search a word or phrase…"
              className="flex-1 bg-transparent text-[#191C22] placeholder:text-[#9AA0B4] text-sm outline-none"
            />
            {inputValue && (
              <button type="button" onClick={clearSearch} className="text-[#9AA0B4] hover:text-[#4B5063]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
          <button
            onClick={() => setShowPrefs(v => !v)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition-all ${showPrefs ? 'border-[#C95030] bg-[#FDF0ED] text-[#C95030]' : 'border-[#D8DBE4] bg-white text-[#4B5063] hover:border-[#B0B6C6]'}`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Preferences
          </button>
        </div>

        {/* Prefs panel */}
        {showPrefs && (
          <div className="mb-4 bg-white border border-[#D8DBE4] rounded-lg p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9AA0B4] mb-3">Filter by interest</p>
            <div className="flex flex-wrap gap-2">
              {PREFERENCE_TOPICS.map(t => {
                const active = activeTopics.includes(t.label);
                return (
                  <button
                    key={t.label}
                    onClick={() => toggleTopic(t.label)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded border transition-all ${active ? 'bg-[#191C22] text-white border-[#191C22]' : 'bg-white border-[#D8DBE4] text-[#4B5063] hover:border-[#B0B6C6]'}`}
                  >
                    {t.label}
                    <span className={`ml-1.5 font-normal ${active ? 'text-white/60' : 'text-[#9AA0B4]'}`}>{Math.round(t.weight * 100)}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Mode tag */}
        <div className="flex items-center gap-2 mb-5 text-xs text-[#4B5063]">
          {isSearchMode ? (
            <>
              <span className="font-semibold">{clips.length} clips for</span>
              <span className="bg-[#F5DEDA] text-[#C95030] font-bold px-2.5 py-0.5 rounded">"{query}"</span>
              <button onClick={clearSearch} className="text-[#9AA0B4] hover:text-[#4B5063] underline underline-offset-2">clear</button>
            </>
          ) : (
            <span className="text-[#9AA0B4]">{clips.length} clips today</span>
          )}
        </div>

        <div className="grid grid-cols-12 gap-7">

          {/* Clip list */}
          <div className="col-span-5 space-y-2">
            {clips.map(clip => {
              const isActive = activeClipId === clip.id;
              return (
                <button
                  key={clip.id}
                  onClick={() => { setActiveClipId(clip.id); setWordSaved(false); }}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all ${isActive
                    ? 'bg-white border-[#C95030] shadow-sm'
                    : 'bg-white border-[#D8DBE4] hover:border-[#B0B6C6] opacity-70 hover:opacity-100'}`}
                >
                  <div className="flex gap-3">
                    <div className={`w-16 h-12 rounded shrink-0 bg-[#E4E6EB] relative flex items-center justify-center`}>
                      {clip.isCompleted ? (
                        <div className="absolute inset-0 bg-[#191C22]/50 rounded flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <Play className={`w-4 h-4 ${isActive ? 'text-[#C95030]' : 'text-[#9AA0B4]'}`} />
                      )}
                      <span className="absolute bottom-1 right-1 bg-black/50 rounded text-white text-[9px] px-0.5 font-mono">{clip.duration}</span>
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                      <p className="text-[9px] font-bold text-[#9AA0B4] uppercase tracking-wider truncate mb-0.5">{clip.showName}</p>
                      <h3 className={`text-xs font-semibold truncate mb-1.5 ${isActive ? 'text-[#191C22]' : 'text-[#4B5063]'}`}>{clip.title}</h3>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded border font-semibold ${difficultyStyle[clip.difficulty]}`}>{clip.difficulty}</span>
                        <span className="text-[9px] text-[#9AA0B4] font-mono flex items-center gap-0.5"><Clock className="w-2 h-2" />{clip.start}–{clip.end}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`mt-2.5 flex items-center gap-1.5 text-[11px] ${isActive ? 'text-[#C95030]' : 'text-[#9AA0B4]'}`}>
                    <BookOpen className="w-3 h-3" />
                    <span>Learn: <span className="font-semibold">"{clip.targetWord}"</span></span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${isActive ? 'bg-[#F5DEDA]' : 'bg-[#E4E6EB]'} ml-auto`}>{clip.wordType}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Player panel */}
          <div className="col-span-7">
            <div className="bg-white rounded-lg border border-[#D8DBE4] overflow-hidden sticky top-8">

              {/* Video */}
              <div className="aspect-video bg-[#191C22] relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2A2D38] to-[#191C22]" />
                <div className="absolute top-2.5 left-3 bg-black/40 rounded px-2 py-0.5 flex items-center gap-1.5 text-white/60 text-[10px] font-mono z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C95030] animate-pulse" />
                  {activeClip.videoId}
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                >
                  {isPlaying
                    ? <span className="flex gap-1"><span className="w-1 h-4 bg-white rounded-sm" /><span className="w-1 h-4 bg-white rounded-sm" /></span>
                    : <Play className="w-5 h-5 ml-0.5 text-white fill-white" />}
                </button>
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6 bg-gradient-to-t from-black/50">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-[10px] font-mono">{activeClip.start}</span>
                    <div className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C95030] w-1/3 rounded-full" />
                    </div>
                    <span className="text-white/60 text-[10px] font-mono">{activeClip.end}</span>
                    <button className="text-white/60 hover:text-white"><Volume2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>

              {/* Transcript */}
              <div className="px-5 py-4 border-b border-[#E4E6EB]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#9AA0B4]">Transcript</span>
                  <span className="text-[10px] text-[#9AA0B4] font-mono">{activeClip.start} – {activeClip.end}</span>
                </div>
                {activeClip.transcript.length > 0 ? (
                  <div className="space-y-3">
                    {activeClip.transcript.map((line, i) => (
                      <div key={i}>
                        <span className="text-[9px] font-bold text-[#9AA0B4] uppercase tracking-widest block mb-0.5">{line.speaker}</span>
                        <p className="text-sm text-[#4B5063] leading-relaxed">
                          {line.highlight ? (
                            <>
                              {line.text.split(line.highlight).map((part, j, arr) => (
                                <React.Fragment key={j}>
                                  {part}
                                  {j < arr.length - 1 && (
                                    <mark className="not-italic bg-[#F5DEDA] text-[#C95030] font-semibold px-1 py-0.5 rounded border-b-2 border-[#C95030]">
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
                  <p className="text-sm text-[#9AA0B4] text-center py-3">No transcript for this clip</p>
                )}
              </div>

              {/* Word card */}
              <div className="px-5 py-4">
                <div className="border border-[#D8DBE4] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#F5DEDA] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-[#C95030]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#191C22] text-sm">"{activeClip.targetWord}"</span>
                        <span className="text-[9px] font-bold bg-[#E4E6EB] text-[#4B5063] px-1.5 py-0.5 rounded">{activeClip.wordType}</span>
                      </div>
                      <p className="text-xs text-[#4B5063] leading-relaxed mb-3">To betray a colleague or friend for personal gain, usually to avoid blame.</p>
                      <button
                        onClick={() => setWordSaved(s => !s)}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${wordSaved ? 'bg-[#F5DEDA] text-[#C95030] border border-[#C95030]/30' : 'bg-[#191C22] text-white hover:bg-[#2A2D38]'}`}
                      >
                        {wordSaved ? <><CheckCircle2 className="w-4 h-4" /> Saved to deck</> : <>Save & Study this phrase <ChevronRight className="w-3.5 h-3.5" /></>}
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
