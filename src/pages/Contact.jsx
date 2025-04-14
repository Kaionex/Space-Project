import React from "react";
import Footer from "@/components/Nav/Footer";
import Navigation from "@/components/Nav/Navigation";
import {
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import BackgroundBeams from "@/components/ui/BackgroundBeams";
import FooterContent from "@/components/Nav/FooterContent";
import ContactForm from "@/components/ui/ContactForm"; // Adjust the path as needed

const Contact = () => {
  return (
    <>
      <Navigation />
      <div className="px-10 bg-black">
        <BackgroundBeams />
        <div className="text-white min-h-screen flex flex-col items-center py-32 px-12 sm:px-6 lg:px-8">
          <header className="max-w-2xl w-full text-center">
            <div className="">
              <h1 className="pt-36 bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-5xl font-bold tracking-tight text-transparent">
                Contact Us
              </h1>
              <p className="mt-4 text-lg font-semi-bold pb-0 max-w-4xl leading-6 text-gray-400 bg-transparent">
                Have questions, suggestions, or just want to say hello? Feel
                free to reach out to us. We'd love to hear from you and explore
                the cosmos together!
              </p>
            </div>
            <div className="pt-0"></div>
          </header>
          <section className="mt-12 pt-20 max-w-4xl w-full">
            <h2 className="text-3xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500  font-bold tracking-tight text-transparent">
              Email
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Email us at{" "}
              <a
                href="mailto:starhubcentral@example.com"
                className="text-blue-400"
              >
                starhubcentral@example.com
              </a>
            </p>
          </section>
          <section className="mt-12 max-w-4xl w-full">
            <h2 className="bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-5xl font-bold tracking-tight text-transparent">
              Meet the Team{" "}
            </h2>
            <ul className="mt-4 space-y-4 text-lg text-gray-400">
              <li>
                <strong>Andrei:</strong> Fullstack Developer
              </li>
              <li>
                <strong>David:</strong> Fullstack Developer
              </li>
              <li>
                <strong>Rami:</strong> Fullstack Developer
              </li>
              <li>
                <strong>Shafi:</strong> Fullstack Developer
              </li>
              <li>
                <strong>Micah:</strong> Fullstack Developer
              </li>
            </ul>
          </section>
          <section className="mt-12 max-w-4xl w-full">
            <h2 className="text-3xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 font-bold tracking-tight text-transparent">
              License
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              This project is licensed under the MIT License - see the LICENSE
              file for details.
            </p>
          </section>
          <section className="mt-12 max-w-4xl w-full mb-12">
            <h2 className="bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-5xl font-bold tracking-tight text-transparent">
              Contributing
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              We welcome contributions from developers of all skill levels!
              Whether you're interested in adding new features, fixing bugs, or
              improving documentation, your input is invaluable. Please refer to
              our Contribution Guidelines for details on how to get involved.
            </p>
            <a href="https://github.com/E05-A/StarHub" className="w-3 mx-8">
              <FaGithub className="h-20 w-20 transform rounded-full border-2 border-gray-700 bg-transparent text-2xl text-gray-300 duration-500 hover:-translate-y-3 hover:text-black hover:bg-cyan-500" />
            </a>
            <div className="pl-0 mt-40">
              <ContactForm />
            </div>
          </section>
        </div>
        <FooterContent className="bg-black" />
      </div>
    </>
  );
};

export default Contact;
