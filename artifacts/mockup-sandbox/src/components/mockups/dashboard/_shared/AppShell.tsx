import React from 'react';
import { PlaySquare, User, RotateCcw, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Play icon path — inline so we can style fill independently
function PlayFill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="currentColor" />
    </svg>
  );
}

// Shared logo mark used in sidebar and nav
function LogoMark() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Badge — tilted sticker play mark */}
      <div className="rotate-[-4deg] w-8 h-8 rounded-lg bg-[#C8623E] border-2 border-[#1C1917] shadow-[2.5px_2.5px_0_#1C1917] flex items-center justify-center shrink-0">
        <PlayFill className="w-3.5 h-3.5 text-white translate-x-[1px]" />
      </div>
      {/* Wordmark — Outfit for pop energy + Space Mono for bit/digital accent */}
      <span className="leading-none flex items-baseline gap-[2px]">
        <span style={{ fontFamily: 'Outfit, sans-serif' }} className="text-[17px] font-bold tracking-tight text-[#1C1917]">Clip</span>
        <span style={{ fontFamily: 'Space Mono, monospace' }} className="text-[13px] font-bold tracking-tight text-[#C8623E]">Vocab</span>
      </span>
    </div>
  );
}

interface AppShellProps {
  children: React.ReactNode;
  activePage: 'feed' | 'profile' | 'review';
}

export function AppShell({ children, activePage }: AppShellProps) {
  const navItems = [
    { id: 'feed',    label: 'Daily Feed',   icon: PlaySquare, href: '/__mockup/preview/dashboard/Feed' },
    { id: 'review',  label: 'Review Queue', icon: RotateCcw,  href: '/__mockup/preview/dashboard/Review' },
    { id: 'profile', label: 'My Profile',   icon: User,       href: '/__mockup/preview/dashboard/Profile' },
  ];

  return (
    <div className="flex h-screen bg-[#F8F6F2] text-[#1C1917] overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Sidebar */}
      <aside className="w-56 bg-[#F0EDE6] border-r border-[#DDD9D2] flex flex-col shrink-0">

        {/* Logo */}
        <div className="px-5 pt-7 pb-7">
          <LogoMark />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5">
          <p className="text-[9px] font-bold text-[#B5B0A9] uppercase tracking-widest mb-3 px-2">Learning</p>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                  isActive
                    ? 'bg-white shadow-sm text-[#1C1917]'
                    : 'text-[#6B6660] hover:bg-[#E8E4DC] hover:text-[#1C1917]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8623E]' : 'text-[#A09890] group-hover:text-[#6B6660]'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {/* Review badge — sticker accent */}
                {item.id === 'review' && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold tabular-nums border shadow-[1px_1px_0_#1C1917] ${
                    isActive
                      ? 'bg-amber-300 text-[#1C1917] border-[#1C1917]'
                      : 'bg-amber-200 text-[#6B6660] border-[#A09890]'
                  }`}>
                    12
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* User row */}
        <div className="p-3 border-t border-[#DDD9D2]/70">
          <button className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-[#E8E4DC] transition-colors text-left group">
            <div className="flex items-center gap-2.5">
              <Avatar className="w-8 h-8 border border-[#DDD9D2]">
                <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=F0EDE6" />
                <AvatarFallback className="text-xs bg-[#E8E4DC] text-[#6B6660]">FL</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-semibold text-[#1C1917] leading-tight">Felix L.</p>
                <p className="text-[10px] text-[#A09890] leading-tight">B2 Upper-Int</p>
              </div>
            </div>
            <Settings className="w-3.5 h-3.5 text-[#A09890] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
