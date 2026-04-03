import React from 'react';
import { AppShell } from './_shared/AppShell';
import { Settings, Flame, Trophy, Bookmark, PlayCircle, Award, Sliders, Brain, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const PREFERENCE_TOPICS = [
  { label: 'Comedy & TV Shows', weight: 0.90 },
  { label: 'Tech & Startups',   weight: 0.85 },
  { label: 'Podcasts',          weight: 0.75 },
  { label: 'Business',          weight: 0.60 },
  { label: 'News & Politics',   weight: 0.50 },
  { label: 'Sports',            weight: 0.30 },
];

const recentStudyEvents = [
  { word: 'Cut to the chase',    reviewType: 'AI_EVAL', aiScore: 92, clip: 'The Office S04E12', date: '2h ago' },
  { word: 'Throw under the bus', reviewType: 'RECALL',  aiScore: 78, clip: 'The Office S04E11', date: 'Yesterday' },
  { word: 'Reckon',              reviewType: 'AI_EVAL', aiScore: 100, clip: 'Lex Fridman #401', date: '2 days ago' },
  { word: 'Nuance',              reviewType: 'RECALL',  aiScore: 65, clip: 'Late Night 2024',  date: '3 days ago' },
];

const savedWords = [
  { word: 'Cut to the chase',       type: 'Idiom', added: '2 days ago' },
  { word: 'Reckon',                  type: 'Verb',  added: '4 days ago' },
  { word: 'Throw under the bus',    type: 'Idiom', added: '1 week ago' },
  { word: 'Nuance',                  type: 'Noun',  added: '1 week ago' },
  { word: 'Elephant in the room',   type: 'Idiom', added: '2 weeks ago' },
];

const weeklyActivity = [
  { day: 'Mon', clips: 4, pct: 50 },
  { day: 'Tue', clips: 7, pct: 85 },
  { day: 'Wed', clips: 8, pct: 100 },
  { day: 'Thu', clips: 3, pct: 38 },
  { day: 'Fri', clips: 7, pct: 88 },
  { day: 'Sat', clips: 5, pct: 63 },
  { day: 'Sun', clips: 4, pct: 50 },
];

function ScoreChip({ score }: { score: number }) {
  const cls = score >= 85 ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : score >= 65 ? 'bg-amber-50 text-amber-700 border-amber-200'
            :               'bg-rose-50 text-rose-700 border-rose-200';
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded border tabular-nums ${cls}`}>{score}</span>;
}

export function Profile() {
  const avg = Math.round(recentStudyEvents.reduce((s, e) => s + e.aiScore, 0) / recentStudyEvents.length);

  return (
    <AppShell activePage="profile">
      <div className="max-w-5xl mx-auto px-8 py-9 space-y-8">

        {/* Profile header */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border border-[#D8DBE4]">
                <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=EAECF1" />
                <AvatarFallback className="bg-[#DFE2EA] text-[#4B5063]">FL</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-[#C95030] text-white text-[9px] font-bold px-1.5 py-0.5 rounded border-2 border-white flex items-center gap-0.5">
                <Award className="w-2 h-2" /> Lvl 12
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#191C22] mb-0.5 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Felix L.</h1>
              <p className="text-xs text-[#9AA0B4]">Joined March 2024 · Native: German</p>
              <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded bg-[#191C22] text-white">B2 Upper-Intermediate</span>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#D8DBE4] bg-white text-xs font-medium text-[#4B5063] hover:border-[#B0B6C6] transition-colors">
            <Settings className="w-3.5 h-3.5" /> Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Streak',       value: '34 days', icon: Flame,      color: 'text-orange-500' },
            { label: 'Clips studied', value: '128',    icon: PlayCircle,  color: 'text-sky-500' },
            { label: 'Words saved',   value: '452',    icon: Bookmark,    color: 'text-emerald-500' },
            { label: 'Avg AI score',  value: `${avg}`, icon: Brain,       color: 'text-violet-500' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white border border-[#D8DBE4] rounded-lg p-4 flex flex-col">
                <Icon className={`w-4 h-4 ${s.color} mb-3`} />
                <span className="text-2xl font-bold text-[#191C22] leading-none mb-1">{s.value}</span>
                <span className="text-[10px] text-[#9AA0B4] font-medium uppercase tracking-wide">{s.label}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-7">

          {/* Left 2 cols */}
          <div className="col-span-2 space-y-7">

            {/* Weekly activity */}
            <div className="bg-white border border-[#D8DBE4] rounded-lg p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="font-semibold text-[#191C22]">Weekly Activity</span>
                <div className="flex items-center gap-1 text-xs text-[#9AA0B4]">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  2.5 hrs this week
                </div>
              </div>
              <div className="h-32 flex items-end justify-between gap-2 px-1">
                {weeklyActivity.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 w-full group h-full">
                    <div className="flex-1 w-full flex flex-col justify-end">
                      <div className="w-full bg-[#C95030] rounded-sm transition-all duration-500 group-hover:bg-[#A63E25]"
                        style={{ height: `${d.pct}%` }} />
                    </div>
                    <span className="text-[10px] font-medium text-[#9AA0B4] shrink-0">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent reviews / STUDY_EVENT log */}
            <div className="bg-white border border-[#D8DBE4] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E4E6EB] flex items-center justify-between">
                <span className="font-semibold text-[#191C22]">Recent Reviews</span>
                <span className="text-[9px] font-bold text-[#9AA0B4] uppercase tracking-widest">STUDY_EVENT log</span>
              </div>
              <div className="divide-y divide-[#F4F5F7]">
                {recentStudyEvents.map((ev, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between gap-4 hover:bg-[#F4F5F7] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#191C22] truncate">"{ev.word}"</p>
                      <p className="text-[11px] text-[#9AA0B4] truncate">{ev.clip} · {ev.date}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${ev.reviewType === 'AI_EVAL' ? 'bg-violet-50 text-violet-700 border-violet-200' : 'bg-sky-50 text-sky-700 border-sky-200'}`}>
                        {ev.reviewType === 'AI_EVAL' ? 'AI Eval' : 'Recall'}
                      </span>
                      <ScoreChip score={ev.aiScore} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className="space-y-5">

            {/* Preferences */}
            <div className="bg-white border border-[#D8DBE4] rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-[#191C22] text-sm">Preferences</span>
                <button className="text-[#9AA0B4] hover:text-[#C95030] transition-colors"><Sliders className="w-3.5 h-3.5" /></button>
              </div>
              <div className="space-y-3">
                {PREFERENCE_TOPICS.map((t, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#4B5063] font-medium">{t.label}</span>
                      <span className="text-[10px] text-[#9AA0B4] font-mono tabular-nums">{Math.round(t.weight * 100)}%</span>
                    </div>
                    <div className="h-1 bg-[#E4E6EB] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C95030] rounded-full" style={{ width: `${t.weight * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-[11px] font-semibold text-[#C95030] hover:text-[#A63E25]">Edit preferences</button>
            </div>

            {/* Saved words */}
            <div className="bg-white border border-[#D8DBE4] rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-[#191C22] text-sm">Saved Words</span>
                <button className="text-[11px] text-[#C95030] hover:text-[#A63E25]">View all</button>
              </div>
              <div className="space-y-1.5">
                {savedWords.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-2.5 rounded hover:bg-[#F4F5F7] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium text-[#191C22] truncate group-hover:text-[#C95030] transition-colors">{item.word}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#E4E6EB] text-[#4B5063] rounded shrink-0">{item.type}</span>
                    </div>
                    <span className="text-[10px] text-[#9AA0B4] shrink-0 ml-2">{item.added}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2.5 rounded-lg bg-[#191C22] text-white text-xs font-semibold hover:bg-[#2A2D38] transition-colors">
                Start Review Deck
              </button>
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
