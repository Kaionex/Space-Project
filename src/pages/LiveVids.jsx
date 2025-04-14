import React, { useState } from "react";
import HeroVids from "@/components/LiveVids/HeroLiveVids";
import Footer from "@/components/Nav/Footer";
import Navigation from "@/components/Nav/Navigation";
import ChatWindow from "@/components/LiveVids/ChatWindow";
import LiveVidsPaths from "@/components/LiveVids/LiveVidsPaths";
import VideoPlayer from "@/components/LiveVids/Videos";

const LiveVids = () => {
  const [visibleVideo, setVisibleVideo] = useState(null);

  const handleVideoVisibility = (id) => {
    setVisibleVideo(id);
  };

  return (
    <>
      <Navigation />
      <HeroVids />
      <LiveVidsPaths onVideoClick={handleVideoVisibility} />
      {visibleVideo === "video1" && (
        <div className="flex flex-col md:flex-row -my-24 bg-black justify-center items-center h-screen">
          <VideoPlayer url="https://www.youtube.com/watch?v=jPTD2gnZFUw" id="video1" />
          <div className="flex flex-col justify-center w-full md:w-1/4 mr-2">
            <ChatWindow />
          </div>
        </div>
      )}
      {visibleVideo === "video2" && (
        <div className="flex flex-col md:flex-row -my-24 bg-black justify-center items-center h-screen">
          <VideoPlayer url="https://youtu.be/5qVHjf7hKZU" id="video2" />
          <div className="flex flex-col justify-center w-full md:w-1/4 mr-2">
            <ChatWindow />
          </div>
        </div>
      )}
      {visibleVideo === "video3" && (
        <div className="flex flex-col md:flex-row -my-24 bg-black justify-center items-center h-screen">
          <VideoPlayer url="https://youtu.be/7dyUXAje43g" id="video3" />
          <div className="flex flex-col justify-center w-full md:w-1/4 mr-2">
            <ChatWindow />
          </div>
        </div>
      )}
      {visibleVideo === "video4" && (
        <div className="flex flex-col md:flex-row -my-24 bg-black justify-center items-center h-screen">
          <VideoPlayer url="https://youtu.be/mhJRzQsLZGg" id="video4" />
          <div className="flex flex-col justify-center w-full md:w-1/4 mr-2">
            <ChatWindow />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default LiveVids;
