import React, { useState } from 'react';
import { PlaySquare, User, RotateCcw, Settings, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function PlayFill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="currentColor" />
    </svg>
  );
}

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="rotate-[-4deg] w-8 h-8 rounded-lg bg-[#C8623E] border-2 border-[#1C1917] shadow-[2.5px_2.5px_0_#1C1917] flex items-center justify-center shrink-0">
        <PlayFill className="w-3.5 h-3.5 text-white translate-x-[1px]" />
      </div>
      <span className="leading-none flex items-baseline gap-[2px]">
        <span style={{ fontFamily: 'Outfit, sans-serif' }} className="text-[17px] font-bold tracking-tight text-[#1C1917]">Clip</span>
        <span style={{ fontFamily: 'Space Mono, monospace' }} className="text-[13px] font-bold tracking-tight text-[#C8623E]">Vocab</span>
      </span>
    </div>
  );
}

function LogoIcon() {
  return (
    <div className="rotate-[-4deg] w-8 h-8 rounded-lg bg-[#C8623E] border-2 border-[#1C1917] shadow-[2.5px_2.5px_0_#1C1917] flex items-center justify-center shrink-0">
      <PlayFill className="w-3.5 h-3.5 text-white translate-x-[1px]" />
    </div>
  );
}

interface AppShellProps {
  children: React.ReactNode;
  activePage: 'feed' | 'profile' | 'review';
}

function SidebarContent({
  activePage,
  onNavClick,
}: {
  activePage: string;
  collapsed?: boolean;
  onNavClick?: () => void;
}) {
  const navItems = [
    { id: 'feed',    label: 'Daily Feed',   icon: PlaySquare },
    { id: 'review',  label: 'Review Queue', icon: RotateCcw  },
    { id: 'profile', label: 'My Profile',   icon: User       },
  ];

  return (
    <>
      <nav className="flex-1 px-3 space-y-0.5">
        <p className="text-[9px] font-bold text-[#B5B0A9] uppercase tracking-widest mb-3 px-2 hidden lg:block">Learning</p>
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href="#"
              onClick={onNavClick}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                isActive
                  ? 'bg-white shadow-sm text-[#1C1917]'
                  : 'text-[#6B6660] hover:bg-[#E8E4DC] hover:text-[#1C1917]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C8623E]' : 'text-[#A09890] group-hover:text-[#6B6660]'}`} />
                <span className="text-sm font-medium lg:block hidden">{item.label}</span>
              </div>
              {item.id === 'review' && (
                <span className={`hidden lg:inline text-[10px] px-1.5 py-0.5 rounded font-bold tabular-nums border shadow-[1px_1px_0_#1C1917] ${
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

      <div className="p-3 border-t border-[#DDD9D2]/70">
        <button className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-[#E8E4DC] transition-colors text-left group">
          <div className="flex items-center gap-2.5">
            <Avatar className="w-8 h-8 border border-[#DDD9D2] shrink-0">
              <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=F0EDE6" />
              <AvatarFallback className="text-xs bg-[#E8E4DC] text-[#6B6660]">FL</AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <p className="text-xs font-semibold text-[#1C1917] leading-tight">Felix L.</p>
              <p className="text-[10px] text-[#A09890] leading-tight">B2 Upper-Int</p>
            </div>
          </div>
          <Settings className="w-3.5 h-3.5 text-[#A09890] opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block" />
        </button>
      </div>
    </>
  );
}

export function AppShell({ children, activePage }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F6F2] text-[#1C1917] overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Mobile top bar (< md) ── */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden flex items-center justify-between px-4 py-3 bg-[#F0EDE6] border-b border-[#DDD9D2] h-12">
        <LogoMark />
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-lg hover:bg-[#E8E4DC] transition-colors"
        >
          <Menu className="w-5 h-5 text-[#52504B]" />
        </button>
      </div>

      {/* ── Mobile overlay drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <aside
            className="absolute left-0 top-0 bottom-0 w-56 bg-[#F0EDE6] border-r border-[#DDD9D2] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-5 pt-5 pb-5 flex items-center justify-between">
              <LogoMark />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#E8E4DC] transition-colors"
              >
                <X className="w-4 h-4 text-[#52504B]" />
              </button>
            </div>
            <p className="text-[9px] font-bold text-[#B5B0A9] uppercase tracking-widest mb-3 px-5">Learning</p>
            <SidebarContent activePage={activePage} onNavClick={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Desktop sidebar (md+) ── */}
      <aside className="hidden md:flex flex-col w-14 lg:w-56 bg-[#F0EDE6] border-r border-[#DDD9D2] shrink-0 transition-all duration-200">

        {/* Logo */}
        <div className="px-3 lg:px-5 pt-7 pb-7 flex justify-center lg:justify-start">
          <div className="hidden lg:block">
            <LogoMark />
          </div>
          <div className="lg:hidden">
            <LogoIcon />
          </div>
        </div>

        <SidebarContent activePage={activePage} />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pt-12 md:pt-0">
        {children}
      </main>
    </div>
  );
}
