import React from 'react';
import { AppShell } from './_shared/AppShell';
import { Settings, Flame, Trophy, Bookmark, PlayCircle, Award, Sliders, Brain, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const PREFERENCE_TOPICS = [
  { label: 'Comedy & TV Shows', weight: 0.9 },
  { label: 'Tech & Startups', weight: 0.85 },
  { label: 'Podcasts', weight: 0.75 },
  { label: 'Business', weight: 0.6 },
  { label: 'News & Politics', weight: 0.5 },
  { label: 'Sports', weight: 0.3 },
];

const recentStudyEvents = [
  { word: 'Cut to the chase', reviewType: 'AI_EVAL', aiScore: 92, clip: 'The Office S04E12', date: '2h ago' },
  { word: 'Throw under the bus', reviewType: 'RECALL', aiScore: 78, clip: 'The Office S04E11', date: 'Yesterday' },
  { word: 'Reckon', reviewType: 'AI_EVAL', aiScore: 100, clip: 'Lex Fridman #401', date: '2 days ago' },
  { word: 'Nuance', reviewType: 'RECALL', aiScore: 65, clip: 'Late Night 2024', date: '3 days ago' },
];

const savedWords = [
  { word: 'Cut to the chase', type: 'Idiom', added: '2 days ago' },
  { word: 'Reckon', type: 'Verb', added: '4 days ago' },
  { word: 'Throw under the bus', type: 'Idiom', added: '1 week ago' },
  { word: 'Nuance', type: 'Noun', added: '1 week ago' },
  { word: 'Elephant in the room', type: 'Idiom', added: '2 weeks ago' },
];

const weeklyActivity = [
  { day: 'Mon', clips: 4, height: '50%' },
  { day: 'Tue', clips: 7, height: '85%' },
  { day: 'Wed', clips: 8, height: '100%' },
  { day: 'Thu', clips: 3, height: '38%' },
  { day: 'Fri', clips: 7, height: '88%' },
  { day: 'Sat', clips: 5, height: '63%' },
  { day: 'Sun', clips: 4, height: '50%' },
];

function ScoreChip({ score }: { score: number }) {
  const color = score >= 85 ? 'bg-emerald-100 text-emerald-700' : score >= 65 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700';
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>{score}</span>;
}

export function Profile() {
  const avgAiScore = Math.round(recentStudyEvents.reduce((s, e) => s + e.aiScore, 0) / recentStudyEvents.length);

  return (
    <AppShell activePage="profile">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-10">

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=F2EFE9" />
                <AvatarFallback>FL</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-[#E27058] text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border-2 border-white flex items-center gap-1 shadow-sm">
                <Award className="w-2.5 h-2.5" /> Lvl 12
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#1A1918] mb-0.5">Felix L.</h1>
              <p className="text-sm text-[#5C5856]">Joined March 2024 · Native Language: German</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2C2A29] text-white">B2 Upper-Intermediate</span>
                <span className="text-xs text-[#827D79]">≈ CEFR Level</span>
              </div>
            </div>
          </div>
          <Button variant="outline" className="rounded-full border-[#E8E4DB] text-[#2C2A29] hover:bg-[#F2EFE9] gap-2 text-sm">
            <Settings className="w-3.5 h-3.5" /> Edit Profile
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Learning Streak', value: '34 Days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100' },
            { label: 'Clips Studied', value: '128', icon: PlayCircle, color: 'text-sky-500', bg: 'bg-sky-100' },
            { label: 'Words Saved', value: '452', icon: Bookmark, color: 'text-emerald-500', bg: 'bg-emerald-100' },
            { label: 'Avg AI Score', value: `${avgAiScore}%`, icon: Brain, color: 'text-violet-500', bg: 'bg-violet-100' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white p-5 rounded-2xl border border-[#E8E4DB] shadow-sm flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-2xl font-bold text-[#2C2A29] mb-1">{stat.value}</span>
                <span className="text-xs font-medium text-[#827D79] uppercase tracking-wider">{stat.label}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Activity + Study Events */}
          <div className="lg:col-span-2 space-y-8">

            {/* Weekly Activity Chart */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4DB] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#2C2A29]">Weekly Activity</h3>
                <div className="flex items-center gap-1.5 text-sm text-[#827D79]">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  2.5 hrs this week
                </div>
              </div>
              <div className="h-40 flex items-end justify-between gap-2 px-1">
                {weeklyActivity.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-full group">
                    <span className="text-[10px] text-[#E27058] font-bold opacity-0 group-hover:opacity-100 transition-opacity">{day.clips}</span>
                    <div className="w-full bg-[#F2EFE9] rounded-t-md h-full relative flex items-end">
                      <div
                        className="w-full bg-[#E27058] rounded-t-md transition-all duration-500 group-hover:bg-[#D15F43]"
                        style={{ height: day.height }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-[#827D79]">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Study Events */}
            <div className="bg-white rounded-2xl border border-[#E8E4DB] shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#E8E4DB] flex items-center justify-between">
                <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#2C2A29]">Recent Reviews</h3>
                <span className="text-xs text-[#827D79] font-medium">STUDY_EVENT log</span>
              </div>
              <div className="divide-y divide-[#F2EFE9]">
                {recentStudyEvents.map((ev, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#FDFBF7] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#2C2A29] truncate">"{ev.word}"</p>
                      <p className="text-xs text-[#827D79] truncate">{ev.clip} · {ev.date}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ev.reviewType === 'AI_EVAL' ? 'bg-violet-50 text-violet-700 border-violet-200' : 'bg-sky-50 text-sky-700 border-sky-200'}`}>
                        {ev.reviewType === 'AI_EVAL' ? '🤖 AI Eval' : '🔁 Recall'}
                      </span>
                      <ScoreChip score={ev.aiScore} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Preferences + Saved Words */}
          <div className="space-y-6">

            {/* Preference Topics */}
            <div className="bg-[#F8F6F1] rounded-2xl border border-[#E8E4DB] p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-['Playfair_Display'] font-bold text-lg text-[#2C2A29]">My Preferences</h3>
                <button className="text-[#E27058] hover:text-[#D15F43]">
                  <Sliders className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {PREFERENCE_TOPICS.map((t, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#2C2A29]">{t.label}</span>
                      <span className="text-xs text-[#827D79] font-mono">{Math.round(t.weight * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-[#E8E4DB] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E27058] rounded-full transition-all duration-700"
                        style={{ width: `${t.weight * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-5 w-full text-xs font-semibold text-[#E27058] hover:text-[#D15F43] text-center">
                Edit preferences
              </button>
            </div>

            {/* Saved Words */}
            <div className="bg-white rounded-2xl border border-[#E8E4DB] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Playfair_Display'] font-bold text-lg text-[#2C2A29]">Saved Words</h3>
                <button className="text-xs font-medium text-[#E27058] hover:text-[#D15F43]">View all</button>
              </div>
              <div className="space-y-2">
                {savedWords.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#F8F6F1] rounded-xl hover:bg-[#F2EFE9] transition-colors cursor-pointer group">
                    <div>
                      <span className="text-sm font-semibold text-[#2C2A29] group-hover:text-[#E27058] transition-colors">{item.word}</span>
                      <span className="text-[10px] font-bold ml-2 px-1.5 py-0.5 bg-[#E8E4DB] text-[#5C5856] rounded">{item.type}</span>
                    </div>
                    <span className="text-[10px] text-[#B5B0AA]">{item.added}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-[#2C2A29] hover:bg-[#1A1918] text-white rounded-xl py-5 text-sm">
                Start Review Deck
              </Button>
            </div>

          </div>
        </div>

      </div>
    </AppShell>
  );
}
