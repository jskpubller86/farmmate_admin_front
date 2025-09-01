import React from "react";
import styles from "./index.module.css";

import { DefaultProps, FormProps } from "./types";

const Checkbox: React.FC<FormProps> = ({ className, checked, ...props }) => {
  return (
    <input
      type="checkbox"
      className={`${styles.checkbox} ${className ? className : ""}`}
      checked={checked}
      {...props}
    />
  );
};

export default Checkbox;
