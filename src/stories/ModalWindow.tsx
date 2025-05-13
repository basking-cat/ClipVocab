"use client";
import { ReactNode } from "react";
import { CloseIcon } from "./CloseIcon";
import styles from "./ModalWindow.module.scss";
import Modal from "react-modal";

type ModalWindowProps = {
  isOpen: boolean;
  closeModal: () => void;
  size?: "small" | "medium" | "large";
  children?: ReactNode;
};

export const ModalWindow = ({
  isOpen = false,
  closeModal,
  size = "medium",
  children,
}: ModalWindowProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={`${styles.modal} ${styles[size]}`}
      overlayClassName={styles.overlay}
    >
      <button
        onClick={closeModal}
        className={styles["modal-close"]}
        type="button"
      >
        <CloseIcon></CloseIcon>
      </button>
      <div className={styles["modal-content"]}>{children}</div>
    </Modal>
  );
};
