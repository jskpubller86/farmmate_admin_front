import React from "react";
import styles from "./index.module.css";

import { DefaultProps, FormProps } from "./types";

const Input: React.FC<FormProps> = ({ className, value, type, ...props }) => {
  return (
    <input
      className={`${styles.input} ${className ? className : ""}`}
      type={type ? type : "text"}
      {...props}
      value={value}
    />
  );
};

export default Input;
