import React from "react";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

import { DefaultProps } from "./types";

/* LikeIt */
interface LikeItProps extends DefaultProps {
  isLiked?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LikeIt: React.FC<LikeItProps> = ({ isLiked, onClick }) => {
  return (
    <button
      type="button"
      className={`${styles.likeit} ${isLiked ? styles.active : ""}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      {isLiked ? (
        <FontAwesomeIcon icon={faHeart} />
      ) : (
        <FontAwesomeIcon icon={faRegularHeart} />
      )}
    </button>
  );
};

export default LikeIt;
