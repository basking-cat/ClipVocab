import React from 'react';
import { PlaySquare, User, RotateCcw, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AppShellProps {
  children: React.ReactNode;
  activePage: 'feed' | 'profile' | 'review';
}

export function AppShell({ children, activePage }: AppShellProps) {
  const navItems = [
    { id: 'feed',    label: 'Daily Feed',    icon: PlaySquare, href: '/__mockup/preview/cliplingo-dashboard/Feed' },
    { id: 'review',  label: 'Review Queue',  icon: RotateCcw,  href: '/__mockup/preview/cliplingo-dashboard/Review' },
    { id: 'profile', label: 'My Profile',    icon: User,       href: '/__mockup/preview/cliplingo-dashboard/Profile' },
  ];

  return (
    <div className="flex h-screen bg-[#F4F5F7] text-[#191C22] overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Sidebar */}
      <aside className="w-56 bg-[#EAECF1] border-r border-[#D8DBE4] flex flex-col shrink-0">

        {/* Logo */}
        <div className="px-5 pt-7 pb-8 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#C95030] flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            CV
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-[#191C22]" style={{ fontFamily: 'Inter, sans-serif' }}>ClipVocab</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5">
          <p className="text-[10px] font-bold text-[#9AA0B4] uppercase tracking-widest mb-3 px-2">Learning</p>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center justify-between px-2.5 py-2 rounded transition-all group ${
                  isActive
                    ? 'bg-white text-[#191C22] shadow-sm border border-[#D8DBE4]'
                    : 'text-[#4B5063] hover:bg-[#DFE2EA] hover:text-[#191C22]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C95030]' : 'text-[#9AA0B4] group-hover:text-[#4B5063]'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.id === 'review' && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold tabular-nums ${isActive ? 'bg-[#F5DEDA] text-[#C95030]' : 'bg-[#D8DBE4] text-[#4B5063]'}`}>
                    12
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* User row */}
        <div className="p-3 border-t border-[#D8DBE4]">
          <button className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-[#DFE2EA] transition-colors text-left group">
            <div className="flex items-center gap-2.5">
              <Avatar className="w-8 h-8 border border-[#D8DBE4]">
                <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=EAECF1" />
                <AvatarFallback className="text-xs bg-[#DFE2EA] text-[#4B5063]">FL</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-semibold text-[#191C22] leading-tight">Felix L.</p>
                <p className="text-[10px] text-[#9AA0B4] leading-tight">B2 Upper-Int</p>
              </div>
            </div>
            <Settings className="w-3.5 h-3.5 text-[#9AA0B4] opacity-0 group-hover:opacity-100 transition-opacity" />
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
