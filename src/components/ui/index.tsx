import React, { useRef } from "react";
import styles from "./index.module.css";
import { UseFormRegisterReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faHeart,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

/* 공통 type 유형 선언 */
type Size = "xs" | "sm" | "lg" | "xl" | "xxl";
type Color = "secondary" | "point" | "point2" | "point3" | "danger";
interface DefaultProps {
  size?: Size;
  className?: string;
  children?: React.ReactNode;
  color?: Color;
}
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

/* 에러 */
interface ErrorProps extends DefaultProps {
  isError: boolean;
}

const Error: React.FC<ErrorProps> = ({ children, isError = false }) => {
  return isError ? <p className={styles.err}> {children} </p> : null;
};

/* form */
interface FormProps
  extends Partial<UseFormRegisterReturn>,
    Omit<DefaultProps, "color" | "size"> {
  type?: string;
  value?: string | number;
  ref?: any;
  onChange?: any;
  onClick?: any;
  onBlure?: any;
  onKeyDown?: any;
  readOnly?: boolean;
  placeholder?: any;
  checked?: boolean;
}

const Select: React.FC<FormProps> = ({
  className,
  value,
  type,
  children,
  ...props
}) => {
  return (
    <select
      className={`${styles.select} ${className ? className : ""}`}
      {...props}
    >
      {children}
    </select>
  );
};

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

const Input: React.FC<FormProps> = ({ className, value, type, ...props }) => {
  return (
    <input
      className={`${styles.input} ${className ? className : ""}`}
      type={type ? type : "text"}
      {...props}
      value={value}
    />
  );
};

const Checkbox: React.FC<FormProps> = ({ className, checked, ...props }) => {
  return (
    <input
      type="checkbox"
      className={`${styles.checkbox} ${className ? className : ""}`}
      checked={checked}
      {...props}
    />
  );
};

interface TextAreaProps extends FormProps {
  defaultValue?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={`${styles.textarea} ${className ? className : ""}`}
      {...props}
    ></textarea>
  );
};

const File: React.FC<FormProps> = ({
  className,
  onClick,
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (inputRef) {
      inputRef.current?.click();
    }
  };
  const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    onChange();
  };

  return (
    <>
      <div
        className={`${styles.file} ${className ? className : ""}`}
        onClick={handleClick}
      >
        <div></div>
        <FontAwesomeIcon icon={faLink} />
        <input
          type="file"
          {...props}
          onChange={onChange}
          ref={inputRef}
          multiple
        />
      </div>
    </>
  );
};

/* Avatar */
interface AvatarProps extends DefaultProps {
  src?: string;
}
const Avatar: React.FC<AvatarProps> = ({
  className,
  size,
  src = "/images/img_profile.svg",
}) => {
  const getClssName = (
    className: AvatarProps["className"],
    size: AvatarProps["size"]
  ) => {
    let clss = styles.avatar;
    if (size) {
      clss += " " + styles[`avatar_${size}`];
    }
    if (className) {
      clss += " " + className;
    }
    return clss;
  };
  return (
    <img
      src={src ? src : "/images/img_profile.svg"}
      alt=""
      className={getClssName(className, size)}
    />
  );
};

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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      {children}
      {isSelected === true && <Check size={16} style={{ marginLeft: 4 }} />}
      {isSelected === false && <X size={16} style={{ marginLeft: 4 }} />}
    </div>
  );
};

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

export {
  Button,
  Error,
  Radio,
  Select,
  Checkbox,
  Input,
  Avatar,
  File,
  TextArea,
  LikeIt,
  Badge,
  Manager,
};
