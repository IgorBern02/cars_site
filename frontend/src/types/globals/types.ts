// Button
export type PropsButton = {
  text: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  btnColor?: string;
  btnHoverColor?: string;
  btnGlowColor?: string;
  shadowBox?: string;
  className?: string;
};
