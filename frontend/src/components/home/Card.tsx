import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { CardProps } from "../../types/home/types";

export const Card = ({
  text,
  textLink,
  link,
  img,
  btnColor,
  btnHoverColor,
  btnGlowColor,
  widthCard: w,
  heightCard: h,
}: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-full w-full"
    >
      <div
        className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-2xl 
                     bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105"
      >
        <div
          className={`${w} ${h} md:w-60 md:h-60 flex items-center justify-center`}
        >
          <img
            src={`/images/${img}`}
            alt="logo"
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-white mt-4">{text}</h2>
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: `0px 0px 20px ${btnGlowColor}`, // vermelho glow
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`${btnColor} ${btnHoverColor} text-white font-semibold 
                     px-7 py-3 text-lg rounded-2xl mt-5 cursor-pointer shadow-lg`}
        >
          <Link to={link}>{textLink}</Link>
        </motion.button>
      </div>
    </motion.div>
  );
};
