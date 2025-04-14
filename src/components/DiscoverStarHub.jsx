import React from "react";
import Navigation from "@/components/Nav/Navigation";
import SparklesCore from "../components/ui/SparklesCore";
import FooterContent from "@/components/Nav/FooterContent";
import SparklesPreview from "@/components/ui/SparklesPreview";

export default function DiscoverStarhub() {
  return (
    <>
      <Navigation />

      <div className="bg-black pt-40">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="absolute inset-0 w-full h-full z-10"
          particleColor="#FFFFFF"
        />

        <div className="relative z-20 flex flex-col items-center justify-center h-screen">
          <h2 className="mt-0 pt-20 bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-500 text-center text-6xl font-bold tracking-tight text-transparent md:text-9xl">
            Discover StarHub
          </h2>
          <h3 className="text-center bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 text-transparent text-base md:text-6xl font-normal max-w-5xl mt-2 pb-2 mx-auto">
            Your Ultimate Space Connection.
          </h3>
        </div>

        <SparklesPreview />

        <FooterContent />
      </div>
    </>
  );
}
