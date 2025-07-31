"use client";

import { useState } from "react";
import { ModalWindow } from "@/components/ModalWindow";
import styles from "./SignUpScreen.module.scss";
import Header from "@/components/Header";

function SignUpScreen() {
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalWindow isOpen={isOpen} closeModal={closeModal} size="large">
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Welcome to ClipVocab!</h1>
          <p>
            At ClipVocab, learning English feels more natural — and way more
            fun.
            <br />
            Discover real words and phrases straight from your favorite YouTube
            videos,
            <br />
            and see your English skills grow day by day!
          </p>
          <p>Let’s grow together with ClipVocab!</p>
        </div>

        <div className={styles.right}>
          <h2 className={styles.title}>Sign up for ClipVocab</h2>
          <div className={styles.buttonBox}>
            <button className={styles.authBtn}>
              <img src="/images/google.svg" alt="google icon" />
              Sign up with Google
            </button>
            <button className={styles.authBtn}>
              <img src="/images/twitter.svg" alt="X icon" />
              Sign up with X (Twitter)
            </button>
          </div>
          <hr className={styles.divider} />
          <p className={styles.loginText}>
            Already have an account? <a href="#">Log in</a>
          </p>
        </div>
      </div>
    </ModalWindow>
  );
}

export default SignUpScreen;
