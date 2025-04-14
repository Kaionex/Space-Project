import React from "react";
import { FaMapMarkerAlt, FaPhone, FaClock, FaUsers } from "react-icons/fa";

const ContactForm = () => {
  return (
    <div className="bg-black bg-opacity-80 p-10 rounded-3xl text-white max-w-screen-lg mx-auto mb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 text-center md:text-left">
          <img
            src="../../src/assets/logo/pascal-logo.png"
            alt="Starhub Logo"
            className="w-32 h-32 mx-auto md:mx-0 mb-6"
          />
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
            Get In <span className="text-cyan-500">Touch</span>
          </h3>
          <p className="mt-4 uppercase text-md text-gray-300">
            Whatever your reason for getting in touch we are excited to hear
            from you. We offer around the clock support to help or answer any
            questions you may have.
          </p>
          <div className="flex items-center mt-5 justify-center md:justify-start">
            <FaMapMarkerAlt className="w-6 h-6 mr-2 text-cyan-500" />
            <span>StarHub Headquarters, Romania.</span>
          </div>
          <div className="flex items-center mt-5 justify-center md:justify-start">
            <FaPhone className="w-6 h-6 mr-2 text-cyan-500" />
            <span>+0 156 796 45 88</span>
          </div>
          <div className="flex items-center mt-5 justify-center md:justify-start">
            <FaClock className="w-6 h-6 mr-2 text-cyan-500" />
            <span>24 / 7</span>
          </div>
        </div>
        <form className="md:col-span-8 space-y-6">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-white text-sm font-bold mb-2">
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 border rounded-lg py-3 px-4 leading-tight"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-white text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 border rounded-lg py-3 px-4 leading-tight"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-white text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 border rounded-lg py-3 px-4 leading-tight"
                type="email"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-white text-sm font-bold mb-2">
                Your Message
              </label>
              <textarea
                rows="5"
                className="appearance-none block w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 border rounded-lg py-3 px-4 leading-tight"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-between items-center px-3">
            <label className="block text-white font-bold">
              <input className="mr-2 leading-tight" type="checkbox" />
              <span className="text-sm">Send me your newsletter!</span>
            </label>
            <button
              className="bg-cyan-500 text-black font-bold py-2 px-6 border:cyan-500 rounded-md hover:bg-transparent border-2 border-cyan-500 hover:text-cyan-500 hover:border-2 hover:border-cyan-500 hover:rounded-md transition duration-300 mt-4"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
