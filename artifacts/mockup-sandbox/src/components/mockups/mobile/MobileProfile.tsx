import React from 'react';
import { Flame, PlayCircle, BookMarked, Brain, Settings } from 'lucide-react';
import { MobileShell, StatusBar } from './_shared/MobileShell';
import { PixelCrown } from '../_shared/PixelArt';

const stats = [
  { label: 'Streak',        value: '34', unit: 'days',  Icon: Flame,       color: 'text-orange-500', bg: 'bg-orange-50',  border: 'border-orange-100' },
  { label: 'Clips Studied', value: '128',unit: 'total', Icon: PlayCircle,  color: 'text-blue-500',   bg: 'bg-blue-50',    border: 'border-blue-100' },
  { label: 'Words Saved',   value: '452',unit: 'total', Icon: BookMarked,  color: 'text-emerald-600',bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { label: 'Avg AI Score',  value: '84', unit: '/100',  Icon: Brain,       color: 'text-violet-600', bg: 'bg-violet-50',  border: 'border-violet-100' },
];

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const heights = [55, 75, 90, 40, 80, 65, 45];

const prefs = [
  { label: 'Comedy & TV Shows', pct: 98 },
  { label: 'Tech & Startups',   pct: 85 },
  { label: 'Podcasts',          pct: 75 },
  { label: 'Business',          pct: 60 },
];

export function MobileProfile() {
  return (
    <MobileShell activePage="profile">
      <StatusBar />
      <div className="flex-1 overflow-y-auto">

        {/* Profile header */}
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-[#E8E5DF] border-2 border-[#DDD9D2] overflow-hidden flex items-center justify-center">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=felix&backgroundColor=E8E5DF"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Level chip — sticker */}
              <div className="absolute -bottom-1 -right-1 bg-amber-300 text-[#1C1917] text-[8px] font-bold px-1.5 py-0.5 rounded border border-[#1C1917] shadow-[1px_1px_0_#1C1917]">
                Lv 12
              </div>
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-[#1C1917]">Felix L.</h2>
              <p className="text-[10px] text-[#A09890]">Joined Mar 2024 · Native: German</p>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#E8E5DF] text-[#52504B] border border-[#DDD9D2] mt-1 inline-block">
                B2 Upper-Intermediate
              </span>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full border border-[#DDD9D2] flex items-center justify-center bg-white">
            <Settings className="w-4 h-4 text-[#A09890]" />
          </button>
        </div>

        {/* Stat tiles 2×2 */}
        <div className="px-4 grid grid-cols-2 gap-3 mb-4">
          {stats.map(({ label, value, unit, Icon, color, bg, border }) => (
            <div key={label} className={`${bg} border ${border} rounded-2xl p-4`}>
              <Icon className={`w-5 h-5 ${color} mb-2`} />
              <p className="text-[22px] font-bold text-[#1C1917] leading-none">
                {value}
                <span className="text-[11px] font-medium text-[#A09890] ml-1">{unit}</span>
              </p>
              <p className="text-[10px] text-[#52504B] mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Weekly activity */}
        <div className="mx-4 mb-4 bg-white border border-[#DDD9D2] rounded-2xl p-4 relative overflow-visible">
          {/* Pixel crown accent */}
          <div className="absolute -top-3 right-4 rotate-[6deg] pointer-events-none">
            <PixelCrown sz={3} fill="#F59E0B" />
          </div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] font-bold text-[#1C1917]">Weekly Activity</p>
            <span className="text-[10px] text-emerald-600 font-semibold">↑ 2.5 hrs this week</span>
          </div>
          {/* Bars row — items-end aligns bars to baseline */}
          <div className="flex items-end gap-1.5" style={{ height: 48 }}>
            {days.map((d, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: Math.round(heights[i] * 0.48),
                  background: '#C8623E',
                  opacity: i === 6 ? 0.35 : 1,
                }}
              />
            ))}
          </div>
          {/* Labels row */}
          <div className="flex gap-1.5 mt-1">
            {days.map((d, i) => (
              <div key={i} className="flex-1 flex justify-center">
                <span className="text-[8px] text-[#A09890] font-semibold">{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="mx-4 mb-4 bg-white border border-[#DDD9D2] rounded-2xl p-4">
          <p className="text-[12px] font-bold text-[#1C1917] mb-3">Top Preferences</p>
          <div className="space-y-2.5">
            {prefs.map(({ label, pct }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[#52504B]">{label}</span>
                  <span className="text-[10px] font-bold text-[#52504B]">{pct}%</span>
                </div>
                <div className="h-1.5 bg-[#E8E5DF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C8623E] rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 text-[11px] font-bold text-[#C8623E]">Edit preferences →</button>
        </div>

      </div>
    </MobileShell>
  );
}
