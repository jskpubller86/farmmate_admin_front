import React from "react";
import styles from "./index.module.css";

import { DefaultProps, FormProps } from "./types";

interface TextAreaProps extends FormProps {
  defaultValue?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <TextArea
      className={`${styles.textarea} ${className ? className : ""}`}
      {...props}
    ></TextArea>
  );
};

export default TextArea;
