"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlaySquare,
  User,
  RotateCcw,
  Settings,
  Film,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 4.4C3.5 3.86 3.94 3.42 4.48 3.42H11.52C12.06 3.42 12.5 3.86 12.5 4.4V9.45C12.5 9.99 12.06 10.43 11.52 10.43H7.63L5.3 12.18V10.43H4.48C3.94 10.43 3.5 9.99 3.5 9.45V4.4Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M5.15 6.25H10.85"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M5.15 8H8.85"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="rotate-[-4deg] w-8 h-8 rounded-lg bg-white border-2 border-[#1C1917] shadow-[2.5px_2.5px_0_#1C1917] flex items-center justify-center shrink-0">
        <BrandGlyph className="w-3.5 h-3.5 text-[#1C1917]" />
      </div>
      <span className="leading-none flex items-baseline gap-[2px]">
        <span
          style={{ fontFamily: "Outfit, sans-serif" }}
          className="text-[17px] font-bold tracking-tight text-[#1C1917]"
        >
          Clip
        </span>
        <span
          style={{ fontFamily: "Space Mono, monospace" }}
          className="text-[13px] font-bold tracking-tight text-[#1C1917]"
        >
          Vocab
        </span>
      </span>
    </div>
  );
}

function LogoIcon() {
  return (
    <div className="rotate-[-4deg] w-8 h-8 rounded-lg bg-white border-2 border-[#1C1917] shadow-[2.5px_2.5px_0_#1C1917] flex items-center justify-center shrink-0">
      <BrandGlyph className="w-3.5 h-3.5 text-[#1C1917]" />
    </div>
  );
}

interface AppShellProps {
  children: React.ReactNode;
  activePage: "feed" | "reel" | "profile" | "review";
}

function SidebarContent({
  activePage,
}: {
  activePage: string;
  collapsed?: boolean;
}) {
  const navItems = [
    { id: "feed", label: "Daily Feed", icon: PlaySquare, href: "/feed" },
    { id: "reel", label: "Reel", icon: Film, href: "/reel" },
    { id: "review", label: "Review Queue", icon: RotateCcw, href: "/review" },
    { id: "profile", label: "My Profile", icon: User, href: "/profile" },
  ];

  return (
    <>
      <nav className="flex-1 px-3 space-y-0.5">
        <p className="text-[9px] font-bold text-[#B5B0A9] uppercase tracking-widest mb-3 px-2 hidden lg:block">
          Learning
        </p>
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                isActive
                  ? "bg-white shadow-sm text-[#1C1917]"
                  : "text-[#6B6660] hover:bg-[#E8E4DC] hover:text-[#1C1917]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 shrink-0 ${isActive ? "text-[#C8623E]" : "text-[#A09890] group-hover:text-[#6B6660]"}`}
                />
                <span className="text-sm font-medium lg:block hidden">
                  {item.label}
                </span>
              </div>
              {item.id === "review" && (
                <span
                  className={`hidden lg:inline text-[10px] px-1.5 py-0.5 rounded font-bold tabular-nums border shadow-[1px_1px_0_#1C1917] ${
                    isActive
                      ? "bg-amber-300 text-[#1C1917] border-[#1C1917]"
                      : "bg-amber-200 text-[#6B6660] border-[#A09890]"
                  }`}
                >
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
              <AvatarFallback className="text-xs bg-[#E8E4DC] text-[#6B6660]">
                FL
              </AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <p className="text-xs font-semibold text-[#1C1917] leading-tight">
                Felix L.
              </p>
              <p className="text-[10px] text-[#A09890] leading-tight">
                B2 Upper-Int
              </p>
            </div>
          </div>
          <Settings className="w-3.5 h-3.5 text-[#A09890] opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block" />
        </button>
      </div>
    </>
  );
}

export function AppShell({ children, activePage }: AppShellProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    {
      id: "feed",
      label: "Feed",
      mobileLabel: "Feed",
      icon: PlaySquare,
      href: "/feed",
    },
    {
      id: "reel",
      label: "Watch",
      mobileLabel: "Watch",
      icon: Film,
      href: "/reel",
    },
    {
      id: "review",
      label: "Review",
      mobileLabel: "Review",
      icon: RotateCcw,
      href: "/review",
    },
    {
      id: "profile",
      label: "Profile",
      mobileLabel: "Profile",
      icon: User,
      href: "/profile",
    },
  ];

  return (
    <div
      className="flex h-screen bg-[#F8F6F2] text-[#1C1917] overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* ── Mobile top bar (< md) ── */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden flex items-center justify-between px-4 py-3 bg-[#F8F6F2] border-b border-[#E8E5DF] h-14">
        <LogoIcon />
        <form
          onSubmit={handleSearch}
          className="flex-1 flex items-center gap-2 mx-2"
        >
          <div className="flex-1 flex items-center gap-2 bg-white border border-[#DDD9D2] rounded-lg px-2 h-9">
            <Search className="w-4 h-4 text-[#6B6660] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-xs outline-none min-w-0"
            />
          </div>
          <button
            type="submit"
            className="px-2 py-1.5 rounded-lg bg-[#C8623E] text-white text-xs font-medium hover:bg-[#B85436] transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* ── Mobile bottom navigation bar (< md) ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex items-center justify-around px-2 py-2 bg-[#F8F6F2] border-t border-[#DDD9D2] h-16">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? "text-[#C8623E]"
                  : "text-[#A09890] hover:text-[#6B6660]"
              }`}
              aria-label={item.mobileLabel}
              title={item.mobileLabel}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[11px] font-medium">
                {item.mobileLabel}
              </span>
            </a>
          );
        })}
      </nav>

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
      <main className="flex-1 overflow-y-auto pt-14 pb-16 md:pt-0 md:pb-0">
        {children}
      </main>
    </div>
  );
}
