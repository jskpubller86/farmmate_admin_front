import React from "react";
import styles from "./index.module.css";

import { DefaultProps, FormProps } from "./types";

const Radio: React.FC<FormProps> = ({
  className,
  value,
  readOnly = false,
  ...props
}) => {
  return (
    <input
      type="radio"
      {...props}
      className={`${styles.radio} ${className ? className : ""}`}
      value={value}
      readOnly={readOnly}
    />
  );
};

export default Radio;
