import type { PropsInput } from "../types/types";

// Input
export const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}: PropsInput) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
