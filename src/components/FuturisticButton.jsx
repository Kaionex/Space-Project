// components/FuturisticButton.jsx
import React from "react";
import { motion } from "framer-motion";

const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow:
      "0px 0px 8px rgb(34, 211, 238), 0px 0px 15px rgb(34, 211, 238), 0px 0px 20px rgb(34, 211, 238)",
  },
  tap: {
    scale: 0.9,
    boxShadow:
      "0px 0px 8px rgb(34, 211, 238), 0px 0px 15px rgb(34, 211, 238), 0px 0px 20px rgb(34, 211, 238)",
  },
};

const FuturisticButton = ({ onClick, children }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-cyan-500 transition duration-300 ease-out border-2 border-cyan-500 rounded-full shadow-md group"
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-cyan-500 group-hover:translate-x-0 ease">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </span>
      <span className="absolute flex items-center justify-center w-full h-full text-cyan-500 transition-all duration-300 transform group-hover:translate-x-full ease">
        {children}
      </span>
      <span className="relative invisible">{children}</span>
    </motion.button>
  );
};

export default FuturisticButton;
