// components/CommunityFeatures.jsx
import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import ShimmerButton from "./ShimmerButton";


const projects = [
  {
    title: "Live Discussions",
    description:
      "Engage in real-time conversations with space enthusiasts from around the world.",
  },
  {
    title: "Event Notifications",
    description:
      "Get notified about upcoming space events, launches, and observatory schedules.",
  },
  {
    title: "Exclusive Content",
    description:
      "Access exclusive articles, videos, and resources curated by our team.",
  },
  {
    title: "Education",
    description:
      "Take quizzes, challenge yourself, and earn badges for your accomplishments.",
  },
  {
    title: "Community Projects",
    description:
      "Participate in collaborative projects and initiatives with other members.",
  },
  {
    title: "Watch Live",
    description:
      "Watch live broadcasts of space events and join live discussions.",
  },
];

const CommunityFeatures = () => {
  return (
    <div className="bg-black text-white py-20">
      <h2 className="text-center text-7xl md:text-8xl text-white relative mb-10">
        Join Today!
      </h2>
      <h3 className="text-center text-2xl md:text-4xl bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500 font-bold tracking-tight text-transparent relative mb-10">
        and seamlessly Enjoy.
      </h3>
      <div className="mt-10">
        <HoverEffect items={projects} />
      </div>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xl md:text-2xl mb-6">
          Connect with fellow space enthusiasts, participate in discussions, and
          stay updated with the latest in space exploration.
        </p>
        <ShimmerButton>Join Now</ShimmerButton>
      </div>
    </div>
  );
};

export default CommunityFeatures;
