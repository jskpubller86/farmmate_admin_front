import React from "react";
import styles from "./index.module.css";

import { DefaultProps } from "./types";

/* 에러 */
interface ErrorProps extends DefaultProps {
  isError: boolean;
}

const Error: React.FC<ErrorProps> = ({ children, isError = false }) => {
  return isError ? <p className={styles.err}> {children} </p> : null;
};

export default Error;
