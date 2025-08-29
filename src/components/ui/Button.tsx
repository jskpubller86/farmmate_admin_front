import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

import { DefaultProps } from "./types";

/* 버튼 */
interface ButtonProps extends DefaultProps {
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: any;
  disabled?: boolean;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  color,
  onClick,
  className,
  size,
  disabled,
  to,
}) => {
  const getClssName = (
    size: ButtonProps["size"],
    color: ButtonProps["color"],
    className: ButtonProps["className"]
  ) => {
    let clss = styles.button;
    if (size) {
      clss += " " + styles[`button_${size}`];
    }
    if (color) {
      clss += " " + styles[`button_${color}`];
    }
    if (className) {
      clss += " " + className;
    }
    return clss;
  };

  return (
    <>
      {to ? (
        <Link to={to} className={getClssName(size, color, className)}>
          {children}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={getClssName(size, color, className)}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
