import React from "react";
import { Parallax } from "react-parallax";
import Footer from "@/components/Nav/Footer";
import Navigation from "@/components/Nav/Navigation";
import { FaMapMarkerAlt, FaPhone, FaClock, FaUsers } from "react-icons/fa";

import { DiAtom } from "react-icons/di";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdOutlineAllInclusive } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";

import nasaImage from "../../src/assets/parallax/nasa.jpg";
import satelliteImage from "../../src/assets/parallax/satellite.jpeg";
import spaceStationImage from "../../src/assets/parallax/spaceStation.jpeg";
import spacexImage from "../../src/assets/bkg/spacex--p-KCm6xB9I-unsplash.jpg";
import logoImage from "../../src/assets/logo/pascal-logo.png";

const About = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen flex flex-col items-center bg-black text-white">
        {/* Parallax Section 1 */}
        <Parallax
          bgImage={nasaImage}
          strength={500}
          className="w-full h-screen flex items-center justify-center"
        >
          <header className="px-4 text-center max-w-6xl mx-auto uppercase">
            <h1 className="text-9xl md:text-8xl font-extrabold">The Vision</h1>
            <p className="text-4xl md:text-2xl mt-7 leading-8 bg-black bg-opacity-70 rounded-3xl py-7 px-6 md:px-10">
              We believe that the wonders of space should be accessible to
              everyone. That's why we created Starhub — a place where people
              from anywhere in the world can meet, chat, interact, and
              seamlessly integrate space-related updates into their everyday
              lives. Starhub fosters a global community of space enthusiasts,
              regardless of profession or background.
            </p>
          </header>
        </Parallax>

        {/* Parallax Section 2 */}
        <Parallax
          bgImage={satelliteImage}
          strength={500}
          className="w-full h-screen flex items-center justify-center"
        >
          <section className="px-4 text-center max-w-6xl mx-auto uppercase">
            <h2 className="text-9xl md:text-7xl font-extrabold">The Mission</h2>
            <p className="text-4xl md:text-xl mt-7 leading-8 bg-black bg-opacity-70 rounded-3xl py-7 px-6 md:px-10 ">
              Our mission is to provide a user-friendly platform that keeps
              individuals connected to the latest celestial events and launches,
              while facilitating meaningful interactions within the space
              community. We aim to inspire curiosity, spark exploration, and
              promote collaboration in the field of space science and
              exploration.
            </p>
          </section>
        </Parallax>

        {/* Parallax Section 3 */}
        <Parallax
          bgImage={spaceStationImage}
          strength={500}
          className="w-full h-screen flex items-center justify-center uppercase"
        >
          <section className="px-4 text-left max-w-6xl mx-auto">
            <h2 className="text-9xl md:text-7xl font-extrabold text-white text-center mb-14">
              Key Values
            </h2>
            <ul className="text-lg md:text-xl mt-7 leading-8 bg-black bg-opacity-70 rounded-3xl md:px-10 pb-7">
              <li className="flex items-center mb-4 pt-10">
                <MdOutlineAllInclusive className="text-cyan-500 mr-3 w-28 h-16 pr-6" />
                <span>
                  <strong className="text-cyan-500">Inclusivity:</strong> We
                  welcome space enthusiasts of all backgrounds and levels of
                  expertise, fostering an environment of diversity and
                  inclusion.
                </span>
              </li>
              <li className="flex items-center mb-4">
                <DiAtom className="text-cyan-500 mr-0 w-36 h-24 pr-6" />
                <span>
                  <strong className="text-cyan-500">Innovation:</strong> We
                  continuously strive to push the boundaries of technological
                  innovation, enhancing the user experience and advancing space
                  exploration.
                </span>
              </li>
              <li className="flex items-center mb-9">
                <FaHandshakeSimple className="text-cyan-500 mr-3 w-36 h-20 pr-6" />
                <span>
                  <strong className="text-cyan-500">Collaboration:</strong> We
                  believe in working together with collaboration and partnership
                  being the power of individuals and organizations to achieve
                  common goals in the realm of space science and exploration.
                </span>
              </li>
              <li className="flex items-center mb-9">
                <BsPersonWorkspace className="text-cyan-500 mr-3 w-28 h-20 pr-6" />
                <span>
                  <strong className="text-cyan-500">Education:</strong> We are
                  committed to educating and inspiring the next generation of
                  space explorers, providing resources and opportunities for
                  learning and growth.
                </span>
              </li>
              <li className="flex items-center mb-4">
                <FaUsers className="text-cyan-500 mr-3 w-32 h-20 pr-6" />
                <span>
                  <strong className="text-cyan-500">Community:</strong> We value
                  the sense of community and camaraderie among space
                  enthusiasts, fostering connections and relationships that
                  extend beyond geographical boundaries.
                </span>
              </li>
            </ul>
          </section>
        </Parallax>

        {/* Contact Section */}
        <Parallax
          bgImage={spacexImage}
          strength={300}
          className="w-full flex items-center justify-center py-28"
        >
          <div className="w-full h-screen flex flex-col items-center justify-center text-center">
            <h1 className="font-extrabold text-6xl md:text-7xl mb-6">
              Have Questions or Suggestions?
            </h1>
            <p className="text-2xl font-light md:text-4xl mb-12 max-w-2xl">
              Feel free to reach out to us. We'd love to hear from you and
              explore the cosmos together!
            </p>
            <a href="/contact">
              <button className="relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-semibold text-lg transition duration-300 ease-out hover:bg-black hover:bg-opacity-10 hover:border-cyan-500 hover:border-2 rounded-3xl shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-cyan-500 duration-300 -translate-x-full bg-transparent group-hover:translate-x-0 ease">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Contact
                </span>
                <span className="relative invisible">Contact</span>
              </button>
            </a>
          </div>
        </Parallax>
      </div>
      <Footer />
    </>
  );
};

export default About;
