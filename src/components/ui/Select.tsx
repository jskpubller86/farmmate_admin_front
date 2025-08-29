import React from "react";
import styles from "./index.module.css";

import { DefaultProps, FormProps } from "./types";

const Select: React.FC<FormProps> = ({
  className,
  value,
  type,
  children,
  ...props
}) => {
  return (
    <select
      className={`${styles.select} ${className ? className : ""}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
