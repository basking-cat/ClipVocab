import React from 'react';
import { AppShell } from './_shared/AppShell';
import { Settings, Flame, Bookmark, PlayCircle, Award, Sliders, Brain, TrendingUp } from 'lucide-react';
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
  { word: 'Cut to the chase',     type: 'Idiom', typeColor: 'bg-violet-300', added: '2 days ago' },
  { word: 'Reckon',               type: 'Verb',  typeColor: 'bg-emerald-300', added: '4 days ago' },
  { word: 'Throw under the bus',  type: 'Idiom', typeColor: 'bg-violet-300', added: '1 week ago' },
  { word: 'Nuance',               type: 'Noun',  typeColor: 'bg-sky-300', added: '1 week ago' },
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
  const [bg, text] = score >= 85 ? ['bg-emerald-300', 'text-[#1C1917]']
                   : score >= 65 ? ['bg-amber-300', 'text-[#1C1917]']
                   :               ['bg-rose-400', 'text-white'];
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border-2 border-[#1C1917] ${bg} ${text} shadow-[1.5px_1.5px_0_#1C1917] tabular-nums`}>
      {score}
    </span>
  );
}

function StickerTag({ children, color = 'bg-[#E8E5DF]' }: { children: React.ReactNode; color?: string }) {
  return (
    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border-2 border-[#1C1917] ${color} text-[#1C1917] shadow-[1px_1px_0_#1C1917]`}>
      {children}
    </span>
  );
}

export function Profile() {
  const avg = Math.round(recentStudyEvents.reduce((s, e) => s + e.aiScore, 0) / recentStudyEvents.length);

  const stats = [
    { label: 'Streak', value: '34', unit: 'days', icon: Flame, bg: 'bg-amber-100', border: 'border-amber-300', iconColor: 'text-orange-500', pill: 'bg-amber-300' },
    { label: 'Clips studied', value: '128', unit: '', icon: PlayCircle, bg: 'bg-sky-50', border: 'border-sky-300', iconColor: 'text-sky-500', pill: 'bg-sky-300' },
    { label: 'Words saved', value: '452', unit: '', icon: Bookmark, bg: 'bg-emerald-50', border: 'border-emerald-300', iconColor: 'text-emerald-500', pill: 'bg-emerald-300' },
    { label: 'Avg AI score', value: `${avg}`, unit: '/100', icon: Brain, bg: 'bg-violet-50', border: 'border-violet-300', iconColor: 'text-violet-500', pill: 'bg-violet-300' },
  ];

  return (
    <AppShell activePage="profile">
      <div className="max-w-5xl mx-auto px-8 py-9 space-y-7">

        {/* Profile header */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-[#1C1917] shadow-[3px_3px_0_#1C1917]">
                <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=F0EDE6" />
                <AvatarFallback className="bg-[#E8E5DF] text-[#52504B]">FL</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-amber-300 text-[#1C1917] text-[9px] font-bold px-1.5 py-0.5 rounded border-2 border-[#1C1917] shadow-[1.5px_1.5px_0_#1C1917] flex items-center gap-0.5">
                <Award className="w-2.5 h-2.5" /> Lvl 12
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1C1917] mb-0.5 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Felix L.</h1>
              <p className="text-xs text-[#A09890]">Joined March 2024 · Native: German</p>
              <span className="inline-flex items-center mt-2 text-[10px] font-bold px-2.5 py-1 rounded border-2 border-[#1C1917] bg-[#1C1917] text-white shadow-[1.5px_1.5px_0_#6B4226]">
                B2 Upper-Intermediate
              </span>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#1C1917] bg-white text-xs font-bold text-[#1C1917] shadow-[2px_2px_0_#1C1917] hover:shadow-[1px_1px_0_#1C1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
            <Settings className="w-3.5 h-3.5" /> Edit Profile
          </button>
        </div>

        {/* Stats — colorful cards */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className={`${s.bg} border-2 ${s.border} rounded-xl p-4 flex flex-col shadow-[3px_3px_0_#1C1917]`}>
                <div className={`w-8 h-8 rounded-lg border-2 border-[#1C1917] ${s.pill} flex items-center justify-center mb-3 shadow-[1.5px_1.5px_0_#1C1917]`}>
                  <Icon className={`w-4 h-4 ${s.iconColor}`} />
                </div>
                <div className="flex items-baseline gap-1 mb-0.5">
                  <span className="text-2xl font-bold text-[#1C1917] leading-none tabular-nums">{s.value}</span>
                  {s.unit && <span className="text-xs text-[#6B6660] font-medium">{s.unit}</span>}
                </div>
                <span className="text-[10px] text-[#6B6660] font-medium uppercase tracking-wide">{s.label}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-7">

          {/* Left 2 cols */}
          <div className="col-span-2 space-y-7">

            {/* Weekly activity */}
            <div className="bg-white border-2 border-[#1C1917] rounded-xl p-5 shadow-[3px_3px_0_#1C1917]">
              <div className="flex items-center justify-between mb-5">
                <span className="font-bold text-[#1C1917]">Weekly Activity</span>
                <div className="flex items-center gap-1 text-xs text-[#A09890]">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  2.5 hrs this week
                </div>
              </div>
              <div className="h-32 flex items-end justify-between gap-2 px-1">
                {weeklyActivity.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 w-full group h-full">
                    <div className="flex-1 w-full flex flex-col justify-end">
                      <div
                        className="w-full bg-[#C8623E] border-2 border-[#1C1917] rounded-t-sm group-hover:bg-amber-400 transition-colors"
                        style={{ height: `${d.pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#A09890] shrink-0">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent reviews */}
            <div className="bg-white border-2 border-[#1C1917] rounded-xl overflow-hidden shadow-[3px_3px_0_#1C1917]">
              <div className="px-5 py-4 border-b-2 border-[#E8E5DF] flex items-center justify-between">
                <span className="font-bold text-[#1C1917]">Recent Reviews</span>
                <span className="text-[9px] font-bold text-[#A09890] uppercase tracking-widest bg-[#F8F6F2] px-2 py-1 rounded border border-[#DDD9D2]">STUDY_EVENT log</span>
              </div>
              <div className="divide-y divide-[#F8F6F2]">
                {recentStudyEvents.map((ev, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between gap-4 hover:bg-[#F8F6F2] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1C1917] truncate">"{ev.word}"</p>
                      <p className="text-[11px] text-[#A09890] truncate">{ev.clip} · {ev.date}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StickerTag color={ev.reviewType === 'AI_EVAL' ? 'bg-violet-300' : 'bg-sky-300'}>
                        {ev.reviewType === 'AI_EVAL' ? 'AI Eval' : 'Recall'}
                      </StickerTag>
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
            <div className="bg-white border-2 border-[#1C1917] rounded-xl p-5 shadow-[3px_3px_0_#1C1917]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-[#1C1917] text-sm">Preferences</span>
                <button className="w-7 h-7 rounded-lg border-2 border-[#1C1917] bg-[#F8F6F2] flex items-center justify-center shadow-[1.5px_1.5px_0_#1C1917] hover:bg-amber-300 transition-colors">
                  <Sliders className="w-3.5 h-3.5 text-[#1C1917]" />
                </button>
              </div>
              <div className="space-y-3">
                {PREFERENCE_TOPICS.map((t, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#52504B] font-medium">{t.label}</span>
                      <span className="text-[10px] text-[#A09890] font-mono tabular-nums">{Math.round(t.weight * 100)}%</span>
                    </div>
                    <div className="h-2 bg-[#E8E5DF] rounded-full border border-[#DDD9D2] overflow-hidden">
                      <div className="h-full bg-[#C8623E] rounded-full" style={{ width: `${t.weight * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-[11px] font-bold text-[#C8623E] hover:text-[#A34E2E]">Edit preferences →</button>
            </div>

            {/* Saved words */}
            <div className="bg-white border-2 border-[#1C1917] rounded-xl p-5 shadow-[3px_3px_0_#1C1917]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-[#1C1917] text-sm">Saved Words</span>
                <button className="text-[11px] font-bold text-[#C8623E] hover:text-[#A34E2E]">View all →</button>
              </div>
              <div className="space-y-1.5">
                {savedWords.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#F8F6F2] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium text-[#1C1917] truncate group-hover:text-[#C8623E] transition-colors">{item.word}</span>
                      <StickerTag color={item.typeColor}>{item.type}</StickerTag>
                    </div>
                    <span className="text-[10px] text-[#A09890] shrink-0 ml-2">{item.added}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 rounded-xl bg-[#1C1917] text-white text-xs font-bold border-2 border-[#1C1917] shadow-[3px_3px_0_#6B4226] hover:shadow-[2px_2px_0_#6B4226] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                Start Review Deck
              </button>
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
