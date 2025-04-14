import { useState, useEffect, useRef } from "react";
import { UserAuth } from '../../context/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import ReactPlayer from "react-player";

const HeroVids = () => {
  const [userName, setUserName] = useState('');
  const scrollRef = useRef(null);
  const { user } = UserAuth();
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid)); 

          if (userDoc.exists()) { // Check if the document exists
            setUserName(userDoc.data().username);
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Failed to fetch user name', error);
      }
    };
    fetchUserName();
  }, [user]);

  const handleScroll = () => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (<div className="">
    <div style={{ position: 'relative', zIndex: -1 }}>
      <ReactPlayer
        url='https://youtu.be/7KXGZAEWzn0?t=1383'
        playing
        loop
        muted
        width='1920px'
        height='1080px'
        style={{ position: 'absolute', top: 0, left: 0 }}
        config={{
          youtube: {
            playerVars: {
              controls: 0,
              showinfo: 0,

              autoplay: 1,
              loop: 1,

            }
          }
        }}
      />

    </div>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,1) 90%)',
      zIndex: 1,
    }} />
    <div className="min-h-screen text-white" style={{ position: 'relative', zIndex: 1 }}>
      <div className="min-h-screen text-white" style={{ position: 'relative', zIndex: 1 }}>



        <div className="min-h-screen pt-60 p-20">
          <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
            <span className="w-20 h-2 bg-gray-100 dark:bg-white mb-12"></span>
            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none  dark:text-white text-gray-100">
              Live
              <span className="text-5xl sm:text-7xl">Videos</span>
            </h1>
            <p className="text-3xl pt-12 text-gray-100 mb-10">
            Explore space's wonders live, from the ISS to Earth's observatories, igniting your imagination and connecting you to the cosmos.
            </p>
          </div>

          <button className="uppercase py-2 mt-8 px-4 rounded-lg bg-cyan-500 border-2 border-transparent text-white text-2xl mr-4 hover:bg-cyan-400 hover:text-black" onClick={handleScroll}>Explore!</button>
        </div>
        <div ref={scrollRef} className="">
        </div>
      </div>
    </div>
  </div>
  );
};

export default HeroVids;