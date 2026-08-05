"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ModalWindow } from "./ModalWindow";
import styles from "./LoginModal.module.scss";
import {
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from "@/lib/auth";

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
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
    }
  }, [initialMode, isOpen]);

  const isSignup = mode === "signup";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        await signUpWithEmail(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }

      closeModal();
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Authentication failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setOauthLoading(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Google sign-in failed.";
      setError(message);
      setOauthLoading(false);
    }
  };

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

        <form className={styles.form} onSubmit={handleSubmit}>
          {isSignup && (
            <label className={styles.field} htmlFor="name">
              <span className={styles.label}>name</span>
              <input
                id="name"
                type="text"
                className={styles.input}
                placeholder="Felix"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className={styles.field} htmlFor="password">
            <span className={styles.label}>password</span>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              minLength={6}
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
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                required
                minLength={6}
              />
            </label>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={loading || oauthLoading}
          >
            {loading ? "Please wait..." : MODE_META[mode].action}
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleGoogleSignIn}
            disabled={loading || oauthLoading}
          >
            {oauthLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          <button type="button" className={styles.secondaryButton} disabled>
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
