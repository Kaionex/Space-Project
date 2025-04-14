import React from "react";

const DownloadTheApp = () => {
  return (
    <div className="pb-48">
      <div className="flex flex-col items-center justify-center pt-80">
        <p className="text-white text-2xl mb-9 font-extrabold">
          The Webs #1 Place For All Things Space
        </p>
        <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] uppercase mb-16">
          Get The App Today!
        </p>
        <div className="flex gap-9 mb-4">
          <a href="#" className="w-full">
            <button
              className="h-28 w-64 bg-transparent text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 hover:shadow-lg"
              style={{
                backgroundImage: `url('https:mcqmate.com/public/images/icons/playstore.svg')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></button>
          </a>
          <a href="#" className="w-full">
            <button
              type="button"
              className="flex items-center justify-center w-64 h-20 mt-4 bg-white border border-black rounded-lg transition transform hover:scale-105 active:scale-95 hover:shadow-lg"
            >
              <div className="mr-3">
                <svg viewBox="0 0 384 512" width="30">
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-xs">Download on the</div>
                <div className="mt-1 font-sans text-2xl font-semibold">
                  App Store
                </div>
              </div>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadTheApp;
