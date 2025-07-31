import styles from "./Header.module.scss";
import { SlidersHorizontal, Search } from "lucide-react";

type HeaderProps = {
  showSearch?: boolean;
};

export default function Header({ showSearch }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <h1 className={styles.logo}>ClipVocab</h1>

        {showSearch && (
          <div className={styles.search}>
            <input type="text" placeholder="Search..." />
            <div className={styles.searchButtons}>
              <button className={styles.iconButton}>
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
        <button className={styles.signup}>Sign Up</button>
        <button className={styles.login}>Log In</button>
      </div>
    </header>
  );
}
