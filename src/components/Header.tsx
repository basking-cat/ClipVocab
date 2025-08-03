import styles from "./Header.module.scss";
import { SlidersHorizontal, Search } from "lucide-react";
import { useState } from "react";
import { FilterModal } from "@/components/FilterModal";
import { LoginModal } from "@/components/LoginModal";
import { SignupModal } from "./SignupModal";

type HeaderProps = {
  showSearch?: boolean;
};

type Option = {
  id: string;
  label: string;
  checked: boolean;
};

export default function Header({ showSearch }: HeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

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
        <button
          className={styles.signup}
          type="button"
          onClick={() => setIsSignupOpen(true)}
        >
          Sign Up
        </button>
        <button
          className={styles.login}
          type="button"
          onClick={() => setIsLoginOpen(true)}
        >
          Log In
        </button>
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
        isOpen={isLoginOpen}
        closeModal={() => setIsLoginOpen(false)}
      />
      <SignupModal
        isOpen={isSignupOpen}
        closeModal={() => setIsSignupOpen(false)}
      />
    </header>
  );
}
