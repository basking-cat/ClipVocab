"use client";
import React, { useState } from "react";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  label: string;
  checked: boolean;
}

export const Checkbox = ({ label, checked }: CheckboxProps) => {
  const [ischecked, SetisChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetisChecked(event.target.checked);
  };
  return (
    <label>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={ischecked}
        onChange={handleCheckboxChange}
      />
      {label}
    </label>
  );
};
