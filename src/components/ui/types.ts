/* 공통 type 유형 선언 */
export type Size = "xs" | "sm" | "lg" | "xl" | "xxl";
export type Color = "secondary" | "point" | "point2" | "point3" | "danger";

export interface DefaultProps {
  size?: Size;
  className?: string;
  children?: React.ReactNode;
  color?: Color;
}

export interface FormProps
  extends Partial<React.ComponentProps<"input">>,
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
