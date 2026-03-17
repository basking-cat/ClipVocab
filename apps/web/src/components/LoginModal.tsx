"use client";

import { ModalWindow } from "./ModalWindow";
import styles from "./LoginModal.module.scss";

import React from "react";

type LoginModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const LoginModal = ({ isOpen, closeModal }: LoginModalProps) => {
  return (
    <ModalWindow isOpen={isOpen} closeModal={closeModal} height="600px">
      <h1 className={styles.title}>Log In</h1>

      <div className={styles.logoRow}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoCircle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              viewBox="0 0 46 46"
              className={styles.logo}
            >
              <defs>
                <path
                  id="a"
                  d="M44.5 20H24v8.5h11.9C34.4 33.7 30 36.5 24 36.5c-7 0-12.8-5.8-12.8-12.8S17 11 24 11c3.1 0 5.9 1.1 8 2.9l6-6C34.1 4.3 29.3 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                />
              </defs>
              <clipPath id="b">
                <use href="#a" overflow="visible" />
              </clipPath>
              <g clipPath="url(#b)">
                <path fill="#FBBC05" d="M0 37V11l17 13z" />
                <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
              </g>
            </svg>
          </div>
          <p className={styles.logoName}>Google</p>
        </div>

        <div className={styles.logoWrapper}>
          <div className={styles.logoCircle}>
            <svg
              width={20}
              height={20}
              viewBox="0 0 1200 1227"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.logo}
            >
              <path
                d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                fill="black"
              />
            </svg>
          </div>
          <p className={styles.logoName}>X (Twitter)</p>
        </div>
      </div>

      <hr className={styles.divider} />

      <form className={styles.form}>
        <label className={styles.label} htmlFor="email">
          mail address
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          placeholder="mail@example.com"
        />

        <label className={styles.label} htmlFor="password">
          password
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder="••••••••"
        />

        <a href="#" className={styles.forgot}>
          forgot your password?
        </a>
        <button type="submit" className={styles.loginBtn}>
          Log In
        </button>
      </form>

      <hr className={styles.divider} />

      <p className={styles.signup}>
        Not a Member? <a href="#">Sign Up</a>
      </p>
    </ModalWindow>
  );
};
