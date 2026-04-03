import React from 'react';
import { AppShell } from './_shared/AppShell';
import { Settings, Flame, Bookmark, PlayCircle, Award, Sliders, Brain, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Pixel art crown — 7×5 grid, each cell is `sz` CSS pixels
function PixelCrown({ sz = 3 }: { sz?: number }) {
  const rows = [
    [1,0,0,1,0,0,1],
    [1,0,1,1,1,0,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [0,1,1,1,1,1,0],
  ];
  return (
    <svg width={7*sz} height={5*sz} viewBox={`0 0 ${7*sz} ${5*sz}`} shapeRendering="crispEdges" style={{ display: 'block' }}>
      {rows.map((row, y) => row.map((on, x) =>
        on ? <rect key={`${x}-${y}`} x={x*sz} y={y*sz} width={sz} height={sz} fill="#F59E0B" /> : null
      ))}
    </svg>
  );
}

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
  { word: 'Nuance',              reviewType: 'RECALL',  aiScore: 65, clip: 'Late Night 2024',   date: '3 days ago' },
];

const savedWords = [
  { word: 'Cut to the chase',    type: 'Idiom', typeBg: 'bg-violet-200', added: '2 days ago' },
  { word: 'Reckon',              type: 'Verb',  typeBg: 'bg-emerald-200', added: '4 days ago' },
  { word: 'Throw under the bus', type: 'Idiom', typeBg: 'bg-violet-200', added: '1 week ago' },
  { word: 'Nuance',              type: 'Noun',  typeBg: 'bg-sky-200',    added: '1 week ago' },
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

// Sticker tag — used as accent only
function StickerTag({ children, bg, textColor = 'text-[#1C1917]' }: {
  children: React.ReactNode; bg: string; textColor?: string;
}) {
  return (
    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#1C1917] ${bg} ${textColor} shadow-[1px_1px_0_#1C1917]`}>
      {children}
    </span>
  );
}

// Score chip — sticker accent
function ScoreChip({ score }: { score: number }) {
  const [bg, text] = score >= 85 ? ['bg-emerald-300', 'text-[#1C1917]']
                   : score >= 65 ? ['bg-amber-300', 'text-[#1C1917]']
                   :               ['bg-rose-400', 'text-white'];
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-[#1C1917] ${bg} ${text} shadow-[1px_1px_0_#1C1917] tabular-nums`}>
      {score}
    </span>
  );
}

export function Profile() {
  const avg = Math.round(recentStudyEvents.reduce((s, e) => s + e.aiScore, 0) / recentStudyEvents.length);

  // Stat cards — tinted bg, subtle borders (not sticker)
  const stats = [
    { label: 'Streak',        value: '34', unit: 'days', icon: Flame,      bg: 'bg-amber-50',  border: 'border-amber-200', iconBg: 'bg-amber-100',  iconColor: 'text-orange-500' },
    { label: 'Clips studied', value: '128', unit: '',    icon: PlayCircle,  bg: 'bg-sky-50',    border: 'border-sky-200',   iconBg: 'bg-sky-100',    iconColor: 'text-sky-500' },
    { label: 'Words saved',   value: '452', unit: '',    icon: Bookmark,    bg: 'bg-emerald-50', border: 'border-emerald-200', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
    { label: 'Avg AI score',  value: `${avg}`, unit: '/100', icon: Brain,  bg: 'bg-violet-50', border: 'border-violet-200', iconBg: 'bg-violet-100', iconColor: 'text-violet-600' },
  ];

  return (
    <AppShell activePage="profile">
      <div className="max-w-5xl mx-auto px-8 py-9 space-y-7">

        {/* Profile header */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border border-[#DDD9D2]">
                <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=F0EDE6" />
                <AvatarFallback className="bg-[#E8E5DF] text-[#52504B]">FL</AvatarFallback>
              </Avatar>
              {/* Level badge — sticker accent */}
              <div className="absolute -bottom-1.5 -right-1.5 bg-amber-300 text-[#1C1917] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#1C1917] shadow-[1.5px_1.5px_0_#1C1917] flex items-center gap-0.5">
                <Award className="w-2.5 h-2.5" /> Lvl 12
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1C1917] mb-0.5 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Felix L.</h1>
              <p className="text-xs text-[#A09890]">Joined March 2024 · Native: German</p>
              <span className="inline-flex items-center mt-2 text-[10px] font-bold px-2.5 py-1 rounded bg-[#1C1917] text-white">
                B2 Upper-Intermediate
              </span>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DDD9D2] bg-white text-xs font-medium text-[#6B6660] hover:border-[#A09890] transition-colors">
            <Settings className="w-3.5 h-3.5" /> Edit Profile
          </button>
        </div>

        {/* Stats — tinted background cards, not sticker */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className={`${s.bg} border ${s.border} rounded-xl p-4 flex flex-col`}>
                <div className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-4 h-4 ${s.iconColor}`} />
                </div>
                <div className="flex items-baseline gap-1 mb-0.5">
                  <span className="text-2xl font-bold text-[#1C1917] leading-none tabular-nums">{s.value}</span>
                  {s.unit && <span className="text-xs text-[#6B6660]">{s.unit}</span>}
                </div>
                <span className="text-[10px] text-[#6B6660] font-medium uppercase tracking-wide">{s.label}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-7">

          {/* Left 2 cols */}
          <div className="col-span-2 space-y-6">

            {/* Weekly activity — clean card */}
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 relative">
              {/* Pixel crown sticker — decorative corner accent */}
              <div className="absolute -top-3.5 -right-2 rotate-[6deg] inline-flex p-1.5 bg-white rounded-lg border-2 border-[#1C1917] shadow-[2px_2px_0_#1C1917]">
                <PixelCrown sz={4} />
              </div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-semibold text-[#1C1917]">Weekly Activity</span>
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
                        className="w-full bg-[#C8623E] rounded-t-sm group-hover:bg-amber-400 transition-colors"
                        style={{ height: `${d.pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-[#A09890] shrink-0">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent reviews — clean card, sticker accents on badges */}
            <div className="bg-white border border-[#DDD9D2] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8E5DF] flex items-center justify-between">
                <span className="font-semibold text-[#1C1917]">Recent Reviews</span>
                <span className="text-[9px] font-bold text-[#A09890] uppercase tracking-widest">STUDY_EVENT log</span>
              </div>
              <div className="divide-y divide-[#F8F6F2]">
                {recentStudyEvents.map((ev, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between gap-4 hover:bg-[#F8F6F2] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1C1917] truncate">"{ev.word}"</p>
                      <p className="text-[11px] text-[#A09890] truncate">{ev.clip} · {ev.date}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Review type — sticker accent */}
                      <StickerTag bg={ev.reviewType === 'AI_EVAL' ? 'bg-violet-200' : 'bg-sky-200'}>
                        {ev.reviewType === 'AI_EVAL' ? 'AI Eval' : 'Recall'}
                      </StickerTag>
                      {/* Score — sticker accent */}
                      <ScoreChip score={ev.aiScore} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className="space-y-5">

            {/* Preferences — clean card */}
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-[#1C1917] text-sm">Preferences</span>
                <button className="text-[#A09890] hover:text-[#C8623E] transition-colors">
                  <Sliders className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                {PREFERENCE_TOPICS.map((t, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#52504B] font-medium">{t.label}</span>
                      <span className="text-[10px] text-[#A09890] font-mono tabular-nums">{Math.round(t.weight * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-[#E8E5DF] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C8623E] rounded-full" style={{ width: `${t.weight * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-[11px] font-semibold text-[#C8623E] hover:text-[#A34E2E]">Edit preferences →</button>
            </div>

            {/* Saved words — clean card, sticker accent on type tags */}
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-[#1C1917] text-sm">Saved Words</span>
                <button className="text-[11px] font-semibold text-[#C8623E] hover:text-[#A34E2E]">View all →</button>
              </div>
              <div className="space-y-1">
                {savedWords.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#F8F6F2] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium text-[#1C1917] truncate group-hover:text-[#C8623E] transition-colors">{item.word}</span>
                      {/* Word type — sticker accent */}
                      <StickerTag bg={item.typeBg}>{item.type}</StickerTag>
                    </div>
                    <span className="text-[10px] text-[#A09890] shrink-0 ml-2">{item.added}</span>
                  </div>
                ))}
              </div>
              {/* Primary action — sticker shadow accent */}
              <button className="w-full mt-4 py-2.5 rounded-xl bg-[#1C1917] text-white text-xs font-bold border border-[#1C1917] shadow-[3px_3px_0_#6B4226] hover:shadow-[2px_2px_0_#6B4226] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                Start Review Deck
              </button>
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
