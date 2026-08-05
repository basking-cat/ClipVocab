"use client";

import styles from "./Header.module.scss";
import { SlidersHorizontal, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { FilterModal } from "@/components/FilterModal";
import { LoginModal } from "@/components/LoginModal";
import { signOut } from "@/lib/auth";

type HeaderProps = {
  showSearch?: boolean;
  user: User | null;
};

type Option = {
  id: string;
  label: string;
  checked: boolean;
};

export default function Header({ showSearch, user }: HeaderProps) {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [loggingOut, setLoggingOut] = useState(false);

  const [categories, setCategories] = useState<Option[]>([
    { id: "news", label: "NEWS", checked: false },
    { id: "interview", label: "Interview / TED", checked: false },
    { id: "music", label: "Music", checked: false },
    { id: "vlogs", label: "Vlogs", checked: false },
    { id: "game", label: "Game Commentary", checked: false },
  ]);

  const [stylesOpt, setStylesOpt] = useState<Option[]>([
    { id: "casual", label: "Casual", checked: true },
    { id: "formal", label: "Formal", checked: false },
    { id: "business", label: "Business", checked: false },
    { id: "native", label: "Native-like", checked: false },
    { id: "slang", label: "Slang / Youth", checked: false },
  ]);

  const [levels, setLevels] = useState<Option[]>([
    { id: "beginner", label: "Beginner", checked: true },
    { id: "intermediate", label: "Intermediate", checked: false },
    { id: "advanced", label: "Advanced", checked: false },
  ]);

  const [range, setRange] = useState<[number, number]>([0, 80]);

  const applyFilters = () => {
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setCategories(categories.map((c) => ({ ...c, checked: false })));
    setStylesOpt(stylesOpt.map((s) => ({ ...s, checked: false })));
    setLevels(levels.map((l) => ({ ...l, checked: false })));
    setRange([0, 80]);
  };

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await signOut();
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  const displayName =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email ||
    "Account";

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <h1 className={styles.logo}>ClipVocab</h1>

        {showSearch && (
          <div className={styles.search}>
            <input type="text" placeholder="Search..." />
            <div className={styles.searchButtons}>
              <button
                className={styles.iconButton}
                type="button"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal />
              </button>
              <button className={styles.iconButton}>
                <Search />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.authButtons}>
        {user ? (
          <>
            <span className={styles.userLabel}>{displayName}</span>
            <button
              className={styles.login}
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? "Logging out..." : "Log Out"}
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.signup}
              type="button"
              onClick={() => openAuth("signup")}
            >
              Sign Up
            </button>
            <button
              className={styles.login}
              type="button"
              onClick={() => openAuth("login")}
            >
              Log In
            </button>
          </>
        )}
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        closeModal={() => setIsFilterOpen(false)}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
        categories={categories}
        setCategories={setCategories}
        stylesOpt={stylesOpt}
        setStylesOpt={setStylesOpt}
        levels={levels}
        setLevels={setLevels}
        range={range}
        setRange={setRange}
      />

      <LoginModal
        isOpen={isAuthOpen}
        closeModal={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />
    </header>
  );
}
