import React from "react";
import styles from "./index.module.css";

import { DefaultProps, FormProps } from "./types";

const Select: React.FC<FormProps> = ({ className, value, children, onChange }) => {
  // 필요한 속성만 추려서 명시적으로 추가
  return (
    <select
      className={`${styles.select} ${className ? className : ""}`}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default Select;
