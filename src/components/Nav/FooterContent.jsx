import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const FooterContent = () => {
  return (
    <div className="pb-0 mb-0">
      <div className="container mx-auto p-0 md:p-8 xl:px-0">
        <div className="mx-auto px-6 pb-10 pt-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-4">
              <div className="mr-10">
                <a href="/">
                  <div className="flex items-center space-x-2 text-2xl font-medium">
                    <span className="text-4l text-transparent bg-clip-text bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]">
                      THE WEBS #1 HUB FOR ALL THINGS SPACE
                    </span>
                  </div>
                </a>
              </div>
              <div className="max-w-md pr-16 text-2xl text-gray-200 py-12">
                The world's largest and most exciting space community! Stay up
                to date with the latest space news, updates, and resources!
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="mt-10 md:mt-0">
                  <h3 className="text-2xl font-semibold text-cyan-500 leading-6">
                    Upcoming
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="/upcoming-eventst"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Space Events
                      </a>
                    </li>
                    <li>
                      <a
                        href="/rocket-launches"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Rocket Launches
                      </a>
                    </li>

                    <li>
                      <a
                        href="/starlink"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Starlink
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-cyan-500 leading-6">
                    Pages
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="/"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/SolarSystem"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Solar System
                      </a>
                    </li>
                    <li>
                      <a
                        href="/live-chat"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Live Chat
                      </a>
                    </li>
                    <li>
                      <a
                        href="/LiveVids"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Live Stream
                      </a>
                    </li>
                    <li>
                      <a
                        href="/comingsoon"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Coming Soon
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-cyan-500 leading-6">
                    Company
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="/about"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        About Us
                      </a>
                    </li>

                    <li>
                      <a
                        href="/careers"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Careers
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Contact Us
                      </a>
                    </li>
                    <div className="flex py-5 m-auto text-gray-100 text-sm items-center border-t border-cyan-500/30 max-w-screen-xl">
                      <div className="flex justify-center py-5"></div>
                      <a href="#" className="w-3 ml-0 mr-8">
                        <BsTwitterX className="h-11 w-11 transform rounded-full border-2 border-gray-700 transparent text-2xl text-gray-300 duration-500 hover:-translate-y-3 hover:text-pink-500 hover:bg-black  hover:border-2 hover:border-pink-500" />
                      </a>
                      <a href="#" className="w-3 mx-8">
                        <FaFacebook className="h-11 w-11 transform rounded-full border-2 border-gray-700 transparent text-2xl text-gray-300 duration-500 hover:-translate-y-3 hover:text-black hover:bg-pink-500 hover:border-2 hover:border-pink-500" />
                      </a>

                      <a href="#" className="w-3 mx-8">
                        <FaYoutube className="h-11 w-11 transform rounded-full border-2 border-gray-700 bg-transparent text-2xl text-gray-300 duration-500 hover:-translate-y-3 hover:text-black hover:bg-pink-500 hover:border-2 hover:border-pink-500" />
                      </a>
                      <a href="#" className="w-3 mx-8">
                        <FaInstagram className="min-w-wull h-11 w-11 transform rounded-full border-2 border-gray-700 bg-gradient-to-b text-2xl duration-500 hover:-translate-y-3 hover:text-pink-500 hover:bg-black hover:border-2 hover:border-pink-500" />
                      </a>
                      <a href="#" className="w-3 mx-8">
                        <FaLinkedin className="h-11 w-11 transform rounded-full border-2 border-gray-700 bg-transparent text-2xl text-gray-300 duration-500 hover:-translate-y-3 hover:text-black hover:bg-pink-500 hover:border-2 hover:border-pink-500" />
                      </a>
                      <a
                        href="https://github.com/E05-A/StarHub"
                        className="w-3 mx-8"
                      >
                        <FaGithub className="h-11 w-11 transform rounded-full border-2 border-gray-700 bg-transparent text-2xl text-gray-300 duration-500 hover:-translate-y-3 hover:text-black hover:bg-pink-500 hover:border-2 hover:border-pink-500" />
                      </a>
                    </div>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-2xl font-semibold text-cyan-500 leading-6">
                    In Progress
                  </h3>
                  <ul role="list" className="mt-6 space-y-4 pb-12">
                    <li>
                      <a
                        href="/gallery"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Space Gallery
                      </a>
                    </li>

                    <li>
                      <a
                        href="/ai-chatbot"
                        className="text-lg leading-6 text-gray-300 hover:text-cyan-500 hover:font-bold"
                      >
                        Ai Space Chat Bot
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-cyan-500/30 pt-8 sm:mt-20 lg:mt-24">
            <div className="text-md text-center text-white">
              <h3 className="text-xl">
                © Copyright SpaceHub 2024. All Rights Reserved.
              </h3>
              <p>
                Built by
                <a rel="noopener" href="/team">
                  <span className="text-pink-500"> space enthusiasts</span>
                </a>{" "}
                for{" "}
                <a rel="noopener" href="/team">
                  <span className="text-cyan-500"> space enthusiasts</span>
                </a>{" "}
                {/* <span className="">
                    <img
                      src="src/assets/logo/hippy-logo.svg"
                      alt="Starhub Logo"
                      className="w-24 rounded-full"
                    />
                  </span> */}
                🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
