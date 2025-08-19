import type { PropsButton } from "../../types/globals/types";
import { motion } from "framer-motion";

export const Button = ({
  text,
  type,
  onClick,
  btnColor,
  btnHoverColor,
  btnGlowColor,
}: PropsButton) => {
  return (
    // <button
    //   type={type}
    //   onClick={onClick}
    //   className={`${btnColor} ${btnHoverColor} w-full px-5 py-2 rounded bg-car-red text-white text-lg shadow-${shadowBox} hover:bg-car-blue transition-all duration-300 ease-in-out hover:scale-105`}
    // >
    //   {text}
    // </button>
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{
        boxShadow: `0px 0px 20px ${btnGlowColor}`,
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`${btnColor} ${btnHoverColor} w-full px-5 py-2 rounded bg-car-red text-white text-lg shadow-lg cursor-pointer hover:bg-car-blue transition-all duration-300 ease-in-out `}
    >
      {text}
    </motion.button>
  );
};
