import React from "react";
import styles from "./layout.module.css";


interface Props {
  children?: React.ReactNode;
}

/**
 * Main
 * @author 김종수
 */
const Contents: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.contents_layout}>
      {children}
    </div>
  );
};



  export default Contents;
