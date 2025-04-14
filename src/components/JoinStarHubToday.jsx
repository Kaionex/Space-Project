
import React from "react";
import { BackgroundBeams } from "../components/ui/BackgroundBeams";

const JoinStarHubToday = () => {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join StarHub Today
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to StarHub, the biggest and fastest growing space community on
          the web. We provide reliable, up to date resources that you can easily
          add to your own Google Calendar so that as far as anything space
          related... you never miss out on anything agaim. Enjoy real time chat
          with like minded space enthusiast and join in on the live video feeds
          where you can watch rocket launches, observatories and much more while
          yuo chat and interact with people in real time from all around the
          globe. Whether you&apos;re looking for Futre Space Events, Space
          related News, Or are just looking for a place that connects all things
          Space, StarHub has got you covered.
        </p>
        <input
          type="text"
          placeholder="hi@mom.com"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default JoinStarHubToday;