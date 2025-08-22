import React from "react";
import styles from "./layout.module.css";

/**
 * Footer (팀 정보)
 * @author 김종수
 */
const Footer: React.FC = () => {
  return (
    <div className={styles.footer_layout}>
      <footer className={styles.footer}>
        <p>
          팀장: 김종수
          <br />
          팀원: 김영수, 권정주, 이재욱, 권은아, 이희진, 최윤석
          <br />© FARMMATE ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
};

export default Footer;
