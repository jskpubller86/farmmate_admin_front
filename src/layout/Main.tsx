import React from "react";
import styles from "./layout.module.css";


interface Props {
  children?: React.ReactNode;
}

/**
 * Main
 * @author 김종수
 */
const Main: React.FC<Props> = ({ children }) => {

  return (
    <main className={styles.main_layout}>
      <div className={styles.container_full}>{children}</div>
    </main>
  );
};



  export default Main;
