import React from "react";
import styles from "./index.module.css";

import { DefaultProps } from "./types";

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

export default Avatar;
