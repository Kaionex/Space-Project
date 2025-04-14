import React from "react";
import { motion } from "framer-motion";
import LampContainer from "../components/ui/LampContainer";
import SparklesPreview from "./ui/SparklesPreview";


const LampEffect = () => {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-0 bg-gradient-to-br x-index-10 from-slate-300 to-slate-500 pb-44 bg-clip-text text-center text-6xl font-medium tracking-tight text-transparent md:text-9xl"
      ></motion.h1>
      <span className="mt-60 bg-gradient-to-br from-slate-300 to-slate-500 pb-44 bg-clip-text text-center text-6xl font-medium tracking-tight text-transparent md:text-9xl">
        {/* Enjoy Outer Space <br /> the right way. */}
        So enjoy it <br /> the right way.
      </span>
      <SparklesPreview />
    </LampContainer>
  );
};

export default LampEffect;
