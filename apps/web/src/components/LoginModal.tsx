"use client";

import React, { useEffect, useState } from "react";
import { ModalWindow } from "./ModalWindow";
import styles from "./LoginModal.module.scss";

type AuthMode = "login" | "signup";

type LoginModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  initialMode?: AuthMode;
};

const MODE_META: Record<
  AuthMode,
  { title: string; action: string; footer: string }
> = {
  login: {
    title: "Log In",
    action: "Log In",
    footer: "Don't have an account?",
  },
  signup: {
    title: "Create account",
    action: "Start free",
    footer: "Already have an account?",
  },
};

export const LoginModal = ({
  isOpen,
  closeModal,
  initialMode = "login",
}: LoginModalProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [initialMode, isOpen]);

  const isSignup = mode === "signup";

  return (
    <ModalWindow
      isOpen={isOpen}
      closeModal={closeModal}
      height={isSignup ? "660px" : "600px"}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{MODE_META[mode].title}</h1>
          <p className={styles.subtitle}>
            {isSignup
              ? "Start learning with short clips and clear context."
              : "Welcome back. Pick up where you left off."}
          </p>
        </div>

        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Authentication mode"
        >
          <button
            type="button"
            className={`${styles.tab} ${!isSignup ? styles.tabActive : ""}`}
            onClick={() => setMode("login")}
            aria-pressed={!isSignup}
          >
            Log In
          </button>
          <button
            type="button"
            className={`${styles.tab} ${isSignup ? styles.tabActive : ""}`}
            onClick={() => setMode("signup")}
            aria-pressed={isSignup}
          >
            Sign Up
          </button>
        </div>

        <form
          className={styles.form}
          onSubmit={(event) => event.preventDefault()}
        >
          {isSignup && (
            <label className={styles.field} htmlFor="name">
              <span className={styles.label}>name</span>
              <input
                id="name"
                type="text"
                className={styles.input}
                placeholder="Felix"
              />
            </label>
          )}

          <label className={styles.field} htmlFor="email">
            <span className={styles.label}>mail address</span>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="mail@example.com"
            />
          </label>

          <label className={styles.field} htmlFor="password">
            <span className={styles.label}>password</span>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
            />
          </label>

          {isSignup && (
            <label className={styles.field} htmlFor="confirm-password">
              <span className={styles.label}>confirm password</span>
              <input
                id="confirm-password"
                type="password"
                className={styles.input}
                placeholder="••••••••"
              />
            </label>
          )}

          <button type="submit" className={styles.primaryButton}>
            {MODE_META[mode].action}
          </button>

          <button type="button" className={styles.secondaryButton}>
            Continue with Google
          </button>
          <button type="button" className={styles.secondaryButton}>
            Continue with X
          </button>
        </form>

        <p className={styles.switchText}>
          {MODE_META[mode].footer}{" "}
          <button
            type="button"
            className={styles.switchLink}
            onClick={() => setMode(isSignup ? "login" : "signup")}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </ModalWindow>
  );
};
