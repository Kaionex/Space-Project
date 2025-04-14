import React from "react";
import SparklesCore from "./SparklesCore";

const SparklesH1 = () => {
  return (
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
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
        className="absolute inset-0 w-full h-full z-1"
        particleColor="#FFFFFF"
      />
      <h1 className="bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 text-center text-6xl font-bold tracking-tight text-transparent relative z-20">
        Space is so Incredible.
      </h1>
    </div>
  );
};

export default SparklesH1;
