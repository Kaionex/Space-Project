import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, id }) => (
  <div id={id} className="flex justify-center items-center w-3/4 ml-4 md:ml-8 rounded-lg y-">
    <ReactPlayer
      url={url}
      playing
      loop
      muted
      width="1920px"
      height="720px"
      config={{
        youtube: {
          playerVars: {
            controls: 0,
            showinfo: 0,
            autoplay: 1,
            loop: 1,
            modestbranding: 1,
            allowFullscreen: true,
            quality: "hd720",
          },
        },
      }}
    />
  </div>
);

export default VideoPlayer;