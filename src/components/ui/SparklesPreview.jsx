import React from "react";
import SparklesCore from "./SparklesCore";

const SparklesPreview = () => {
  return (
    <div className="h-[5rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="relative">
        {/* <h1 className="md:text-7xl text-3xl lg:text-9xl text-center text-black font-extrabold relative z-20">
          Contact Us
        </h1> */}
        {/* Gradients on the title */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"></div>
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
          <div className="absolute w-3/4 h-full bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm"></div>
          <div className="absolute w-3/4 h-full bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
        </div>
      </div>
      <div className="w-[40rem] h-40 relative">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          particleColor="#FFFFFF"
          className="w-full h-full"
        />
        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
};

export default SparklesPreview;
