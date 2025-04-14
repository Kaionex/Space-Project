import { useEffect, useState } from 'react';

const DailyPic = () => {
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchAndDisplayHeroSection = async () => {
            const date = new Date().toISOString().slice(0, 10); 
            const API_KEY = import.meta.env.VITE_NASA_API_KEY;

            try {
                const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data from NASA API.');
                }
                const data = await response.json();
                setData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while fetching data from NASA API.');
            }
        };

        fetchAndDisplayHeroSection();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-white">
        <h2 className="mt-0 pl-0 pb-2 pt-20 bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-left text-5xl font-bold tracking-tight text-transparent md:text-5xl">
          Picture of the Day
        </h2>
        <p className="text-white text-left mx-auto px-20 max-w-[800px] overflow-hidden text-m leading-normal font-light text-base md:text-2xl pb-5">
          Daily picture or video from NASA's Astronomy Picture of the Day (APOD)
          API. Click anywhere on the image to view it in full screen.
        </p>

        <div className="grid grid-cols-3 rpp gap-2 md:grid-cols-3 max-w-3xl grid-auto-flow-dense">
          <div className="col-span-2" onClick={() => setIsModalOpen(true)}>
            {data.media_type === "image" ? (
              <img
                src={data.url}
                alt={data.title}
                className="w-full h-full object-cover rounded-md cursor-pointer"
              />
            ) : (
              <div className="w-full h-full bg-black flex rounded-md items-center justify-center">
                <div className="flex flex-col items-center">
                  <span className="bg-black rounded-full mb-4">
                    <img
                      src="src/assets/logo/STARHUB-cyan-logo.png"
                      alt="Starhub Logo"
                      className="w-40 transition-transform transform hover:scale-110"
                    />
                  </span>
                  <span className="text-white text-2xl transition-colors duration-300 hover:text-cyan-500">
                    Click to open
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-1 bg-black bg-opacity-50 text-white rounded-lg p-4 rounded-bl-md">
            <h1 className="text-xl font-bold mb-2 bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-start tracking-tight text-transparent">
              {data.title}
            </h1>
            <p className="text-sm leading-relaxed">{data.explanation}</p>
          </div>
        </div>
        {isModalOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-80"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="max-w-3xl mx-auto">
              {data.media_type === "image" ? (
                <img
                  src={data.url}
                  alt={data.title}
                  className="object-contain max-h-screen max-w-full mx-auto"
                />
              ) : (
                <iframe
                  title={data.title}
                  src={`${data.url}?autoplay=1`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-screen h-screen object-contain max-h-screen max-w-full mx-auto"
                  style={{ width: "90vw", height: "90vh" }}
                ></iframe>
              )}
            </div>
          </div>
        )}
      </div>
    );
};

export default DailyPic;
