import React from 'react';
import { PlaySquare, User, RotateCcw, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AppShellProps {
  children: React.ReactNode;
  activePage: 'feed' | 'profile' | 'review';
}

export function AppShell({ children, activePage }: AppShellProps) {
  const navItems = [
    { id: 'feed',    label: 'Daily Feed',   icon: PlaySquare, href: '/__mockup/preview/cliplingo-dashboard/Feed' },
    { id: 'review',  label: 'Review Queue', icon: RotateCcw,  href: '/__mockup/preview/cliplingo-dashboard/Review' },
    { id: 'profile', label: 'My Profile',   icon: User,       href: '/__mockup/preview/cliplingo-dashboard/Profile' },
  ];

  return (
    <div className="flex h-screen bg-[#F8F6F2] text-[#1C1917] overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Sidebar */}
      <aside className="w-56 bg-[#F0EDE6] border-r border-[#DDD9D2] flex flex-col shrink-0">

        {/* Logo */}
        <div className="px-5 pt-7 pb-7 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#C8623E] flex items-center justify-center text-white font-bold text-[11px] tracking-wide shrink-0">
            CV
          </div>
          <span className="font-bold text-[15px] tracking-tight text-[#1C1917]"
            style={{ fontFamily: 'Playfair Display, serif' }}>ClipVocab</span>
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
                {item.id === 'review' && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold tabular-nums ${
                    isActive ? 'bg-[#F5E2D8] text-[#C8623E]' : 'bg-[#DDD9D2] text-[#6B6660]'
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
