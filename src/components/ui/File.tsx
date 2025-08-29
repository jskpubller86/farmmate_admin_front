import React, { useRef } from "react";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { DefaultProps, FormProps } from "./types";

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

export default File;
