import React from "react";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

import { DefaultProps } from "./types";

/* 매니저  */
interface ManagerProps extends DefaultProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Manager: React.FC<ManagerProps> = ({ className, onClick, size }) => {
  const getClssName = (
    className: ManagerProps["className"],
    size: ManagerProps["size"]
  ) => {
    let clss = styles.manager;
    if (size) {
      clss += " " + styles[`manager_${size}`];
    }
    if (className) {
      clss += " " + className;
    }
    return clss;
  };

  return (
    <>
      <div className={getClssName(className, size)} onClick={onClick}>
        <FontAwesomeIcon icon={faCommentDots} flip="horizontal" />
      </div>
    </>
  );
};

export default Manager;
