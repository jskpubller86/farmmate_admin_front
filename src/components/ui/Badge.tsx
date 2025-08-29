import React from "react";
import styles from "./index.module.css";
import { Check, X } from "lucide-react";

import { DefaultProps } from "./types";

/* Badge */
interface BadgeProps extends DefaultProps {
  isSelected?: boolean;
  type?: "button";
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  size,
  color,
  isSelected,
  onClick,
}) => {
  const getClssName = (
    className: BadgeProps["className"],
    size: BadgeProps["size"]
  ) => {
    let clss = styles.badge;
    if (size) {
      clss += " " + styles[`badge_${size}`];
    }
    if (color) {
      clss += " " + styles[`badge_${color}`];
    }
    if (className) {
      clss += " " + className;
    }

    return clss;
  };
  
  return (
    <div
      className={getClssName(className, size)}
      onClick={onClick}
    >
      {children}
      {isSelected === true && <Check size={16} style={{ marginLeft: 4 }} />}
      {isSelected === false && <X size={16} style={{ marginLeft: 4 }} />}
    </div>
  );
};

export default Badge;
