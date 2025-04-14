import React, { useState } from "react";
import img1 from "../../assets/livevidsthumbnail/image1.jpg";
import img2 from "../../assets/livevidsthumbnail/image2.jpg";
import img3 from "../../assets/livevidsthumbnail/image3.jpg";
import img4 from "../../assets/livevidsthumbnail/image4.jpg";

const LiveVidsPaths = ({ onVideoClick }) => {
  const images = [
    { src: img1, text: 'ISS Live Footage', url: '#video1' },
    { src: img2, text: 'Mount Washington', url: '#video2' },
    { src: img3, text: 'Mauna Kea', url: '#video3' },
    { src: img4, text: 'Boca Chica', url: '#video4' },
  ];

  const [visibleVideo, setVisibleVideo] = useState(null);

  const handleClick = (videoId) => {
    setVisibleVideo(videoId);
    onVideoClick(videoId);
  };

  return (
    <div className="grid grid-cols-4 gap-4 py-8 p-4 bg-black">
      {images.map((img, index) => (
        <div onClick={() => handleClick(`video${index + 1}`)} key={index}>
          <div
            className="bg-white h-32 bg-cover bg-center relative transition-all duration-200 hover:bg-contain hover:bg-no-repeat"
            style={{ backgroundImage: `url(${img.src})`, backgroundSize: '100%', transition: 'background-size 0.5s' }}
            onMouseOver={e => e.currentTarget.style.backgroundSize = '120%'}
            onMouseOut={e => e.currentTarget.style.backgroundSize = '100%'}
          >
            <div className="opacity-0 hover:opacity-100 absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 transition-opacity duration-200 cursor-pointer">
              {img.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveVidsPaths;