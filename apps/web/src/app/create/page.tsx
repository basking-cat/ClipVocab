"use client";

import { ModalWindow } from "@/components/ModalWindow";
import styles from "./createAccount.module.scss";
import { useState } from "react";
import React from "react";

export default function CreateAccount() {
  const [isOpen, setIsOpen] = useState(true);
  const [showPw, setShowPw] = useState(false);

  return (
    <ModalWindow
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
      height="550px"
    >
      <h1 className={styles.title}>Create your account on ClipVocab</h1>

      <form className={styles.form}>
        <label htmlFor="email" className={styles.label}>
          mail address
        </label>
        <input
          id="email"
          type="email"
          placeholder="mail.example.com"
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          password
        </label>
        <div className={styles.passwordRow}>
          <input
            id="password"
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            className={styles.input}
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPw(!showPw)}
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                fill="#888888"
              />
              {showPw ? (
                <line
                  x1="4"
                  y1="20"
                  x2="20"
                  y2="4"
                  stroke="#888888"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : null}
            </svg>
          </button>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Log In
        </button>
      </form>

      <hr className={styles.divider} />

      <p className={styles.switch}>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </ModalWindow>
  );
}
