import React from "react";
import SparklesCore from "../components/ui/SparklesCore";

const SpaceSeperatorBlank = () => {
  return (
    <div className="h-[80rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1200}
        className="absolute inset-0 w-full h-full z-50"
        particleColor="#FFFFFF"
      />

      <div className="relative z-20 flex flex-col items-center justify-center h-screen">
        <h2 className="mt-0 pt-20 bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-center text-6xl font-bold tracking-tight text-transparent md:text-9xl">
          StarHub
        </h2>
        <h3 className="text-center bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 text-transparent text-base md:text-6xl font-normal max-w-5xl mt-2 pb-2 mx-auto">
          Your Ultimate Space Connection.
        </h3>
      </div>
    </div>
  );
};

export default SpaceSeperatorBlank;
