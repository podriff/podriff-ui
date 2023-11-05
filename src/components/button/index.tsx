import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "default" | "alternate";
  children: React.ReactNode;
  borderRadius?: "curved" | "rounded";
}

const Button: React.FC<ButtonProps> = ({
  buttonType = "default",
  children,
  borderRadius = "rounded",
  ...props
}) => {
  return (
    <button
      className={`${styles["app-button"]} ${styles[borderRadius]} ${
        styles[buttonType]
      } ${props.className || ""}`}
      onClick={props.onClick}
      style={props.style}
      disabled={props.disabled}
      id={props.id}
    >
      {children}
    </button>
  );
};

export default Button;
