import React from 'react';
import { PlaySquare, User, RotateCcw, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AppShellProps {
  children: React.ReactNode;
  activePage: 'feed' | 'profile' | 'review';
}

export function AppShell({ children, activePage }: AppShellProps) {
  const navItems = [
    { id: 'feed', label: 'Daily Feed', icon: PlaySquare, href: '/__mockup/preview/cliplingo-dashboard/Feed' },
    { id: 'review', label: 'Review Queue', icon: RotateCcw, href: '/__mockup/preview/cliplingo-dashboard/Review' },
    { id: 'profile', label: 'My Profile', icon: User, href: '/__mockup/preview/cliplingo-dashboard/Profile' },
  ];

  return (
    <div className="flex h-screen bg-[#FDFBF7] text-[#2C2A29] font-['Inter'] selection:bg-[#E27058] selection:text-white overflow-hidden relative">
      {/* Subtle background grain */}
      <div 
        className="pointer-events-none fixed inset-0 opacity-[0.03] z-50" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Sidebar */}
      <aside className="w-64 bg-[#F2EFE9] border-r border-[#E8E4DB] flex flex-col relative z-10 shrink-0">
        
        {/* Logo Area */}
        <div className="p-6 pt-8 pb-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E27058] flex items-center justify-center text-white font-bold font-['Playfair_Display'] italic text-lg shadow-[0_2px_8px_rgba(226,112,88,0.4)]">C</div>
          <span className="font-['Playfair_Display'] font-bold text-xl tracking-tight text-[#1A1918]">ClipLingo</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          <div className="text-xs font-semibold text-[#827D79] uppercase tracking-wider mb-4 px-2">Learning</div>
          
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            return (
              <a 
                key={item.id}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-white shadow-sm border border-[#E8E4DB] text-[#2C2A29]' 
                    : 'text-[#5C5856] hover:bg-[#E8E4DB]/50 hover:text-[#2C2A29]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#E27058]' : 'text-[#827D79] group-hover:text-[#5C5856]'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.id === 'review' && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-[#FDE2CD] text-[#A6452B]' : 'bg-[#E8E4DB] text-[#5C5856]'}`}>
                    12
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-[#E8E4DB]/50">
          <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#E8E4DB]/50 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 border border-[#E8E4DB] shadow-sm">
                <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=F2EFE9" />
                <AvatarFallback>FL</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-[#2C2A29]">Felix L.</p>
                <p className="text-xs text-[#827D79]">B2 Upper-Int</p>
              </div>
            </div>
            <Settings className="w-4 h-4 text-[#827D79] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10">
        {children}
      </main>
    </div>
  );
}
