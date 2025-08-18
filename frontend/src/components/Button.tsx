import type { PropsButton } from "../types/types";

export const Button = ({ text, type }: PropsButton) => {
  return (
    <button
      type={type}
      className="w-full px-5 py-2 rounded bg-red-500 text-white text-lg hover:bg-red-600 transition-all duration-300 ease-in-out hover:scale-105"
    >
      {text}
    </button>
  );
};
