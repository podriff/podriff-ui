import { AnchorHTMLAttributes } from "react";
import styles from "./typography.module.scss";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "a";

interface TypographyProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: React.ReactNode;
  color?: "black" | "white" | "black-light" | "gray";
}

const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  children,
  color = "black",
  ...props
}) => {
  const Tag = variant as keyof JSX.IntrinsicElements;
  
  if (variant === "a")
    return (
      <Tag
        href={props.href}
        className={`${styles[`variant-${variant}`]} ${styles[`typo-color-${color}`]} ${props.className || ""}`}
        style={props.style}
        rel={props.rel}
        id={props.id}
      >
        {children}
      </Tag>
    );

  return (
    <Tag
      className={`${styles[`variant-${variant}`]} ${styles[`typo-color-${color}`]} ${props.className || ""}`}
      style={props.style}
      id={props.id}
    >
      {children}
    </Tag>
  );
};

export default Typography;
