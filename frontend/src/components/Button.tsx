import type { PropsButton } from "../types/types";

export const Button = ({ text, type }: PropsButton) => {
  return <button type={type}>{text}</button>;
};
