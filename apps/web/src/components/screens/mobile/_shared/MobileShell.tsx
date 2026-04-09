import React from "react";
import { Home, Film, RotateCcw, User } from "lucide-react";

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

export function LogoMark({ size = "md" }: { size?: "sm" | "md" }) {
  const box =
    size === "sm"
      ? "w-6 h-6 rounded-md border border-[#1C1917] shadow-[1.5px_1.5px_0_#1C1917]"
      : "w-8 h-8 rounded-lg border-2 border-[#1C1917] shadow-[2px_2px_0_#1C1917]";
  const icon = size === "sm" ? "w-2.5 h-2.5" : "w-3.5 h-3.5";
  const clip = size === "sm" ? "text-[14px]" : "text-[17px]";
  const vocab = size === "sm" ? "text-[11px]" : "text-[13px]";
  return (
    <div className="flex items-center gap-2 select-none">
      <div
        className={`rotate-[-4deg] bg-[#2F6BFF] ${box} flex items-center justify-center shrink-0`}
      >
        <BrandGlyph className={`${icon} text-white`} />
      </div>
      <span className="leading-none flex items-baseline gap-[2px]">
        <span
          style={{ fontFamily: "Outfit, sans-serif" }}
          className={`${clip} font-bold tracking-tight text-[#1C1917]`}
        >
          Clip
        </span>
        <span
          style={{ fontFamily: "Space Mono, monospace" }}
          className={`${vocab} font-bold tracking-tight text-[#2F6BFF]`}
        >
          Vocab
        </span>
      </span>
    </div>
  );
}

function StatusBarInner({ dark }: { dark: boolean }) {
  const txt = dark ? "text-white/80" : "text-[#1C1917]";
  return (
    <div
      className={`flex items-center justify-between px-5 pt-3 pb-1 text-[11px] font-semibold ${txt} shrink-0`}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <rect
            x="0"
            y="4"
            width="3"
            height="7"
            rx="0.5"
            fill="currentColor"
            opacity="0.35"
          />
          <rect
            x="4"
            y="3"
            width="3"
            height="8"
            rx="0.5"
            fill="currentColor"
            opacity="0.5"
          />
          <rect
            x="8"
            y="1.5"
            width="3"
            height="9.5"
            rx="0.5"
            fill="currentColor"
            opacity="0.75"
          />
          <rect
            x="12"
            y="0"
            width="3"
            height="11"
            rx="0.5"
            fill="currentColor"
          />
        </svg>
        {/* Wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path
            d="M7.5 2C9.5 2 11.3 2.9 12.5 4.3L14 2.7C12.3 0.9 10 0 7.5 0C5 0 2.7 0.9 1 2.7L2.5 4.3C3.7 2.9 5.5 2 7.5 2Z"
            fill="currentColor"
          />
          <path
            d="M7.5 5C8.8 5 9.9 5.5 10.7 6.4L12.2 4.8C11 3.7 9.3 3 7.5 3C5.7 3 4 3.7 2.8 4.8L4.3 6.4C5.1 5.5 6.2 5 7.5 5Z"
            fill="currentColor"
          />
          <circle cx="7.5" cy="9" r="1.5" fill="currentColor" />
        </svg>
        {/* Battery */}
        <svg width="25" height="11" viewBox="0 0 25 11" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeOpacity="0.35"
          />
          <rect x="2" y="2" width="17" height="7" rx="1" fill="currentColor" />
          <path
            d="M23 3.5V7.5C23.8 7.2 24.5 6.4 24.5 5.5C24.5 4.6 23.8 3.8 23 3.5Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

interface MobileShellProps {
  children: React.ReactNode;
  activePage: "feed" | "watch" | "review" | "profile";
  /** When true, the status bar renders with light text and the shell header bg matches the screen's dark top area. */
  dark?: boolean;
}

const NAV_ITEMS = [
  {
    id: "feed",
    label: "Feed",
    Icon: Home,
    href: "/mobile/feed",
  },
  {
    id: "watch",
    label: "Watch",
    Icon: Film,
    href: "/mobile/reel",
  },
  {
    id: "review",
    label: "Review",
    Icon: RotateCcw,
    href: "/mobile/review",
  },
  {
    id: "profile",
    label: "Profile",
    Icon: User,
    href: "/mobile/profile",
  },
] as const;

export function MobileShell({
  children,
  activePage,
  dark = false,
}: MobileShellProps) {
  return (
    <div
      className="flex flex-col text-[#1C1917] overflow-hidden"
      style={{
        width: 390,
        height: 844,
        fontFamily: "Inter, sans-serif",
        position: "relative",
        background: dark ? "#2C3245" : "#F8F6F2",
      }}
    >
      {/* Status bar — rendered by shell so all screens share the same chrome */}
      <StatusBarInner dark={dark} />

      {/* Screen content */}
      {children}

      {/* Bottom tab bar with CSS safe-area inset */}
      <nav
        className="shrink-0 border-t border-[#DDD9D2] bg-[#F8F6F2] px-2 pt-2"
        style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom, 8px))" }}
      >
        <div className="flex items-start justify-around">
          {NAV_ITEMS.map(({ id, label, Icon, href }) => {
            const isActive = activePage === id;
            return (
              <a
                key={id}
                href={href}
                className="flex flex-col items-center gap-1 min-w-[56px]"
                style={{ textDecoration: "none" }}
              >
                <div
                  className={`w-10 h-8 flex items-center justify-center rounded-xl transition-colors ${isActive ? "bg-[#C8623E]/10" : ""}`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${isActive ? "text-[#C8623E]" : "text-[#A09890]"}`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                </div>
                <span
                  className={`text-[10px] font-semibold tracking-tight ${isActive ? "text-[#C8623E]" : "text-[#A09890]"}`}
                >
                  {label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
