import { useState, useEffect, useRef } from "react";

import { UserAuth } from '../../context/AuthContext';
import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import ReactPlayer from 'react-player';

const Hero = () => {
  const [userName, setUserName] = useState('');
  const scrollRef = useRef(null);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
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

  return (
    <div className="">
      <div style={{ position: 'relative', zIndex: -1 }}>
        <ReactPlayer
          url='https://www.youtube.com/watch?v=B5unCXpegAw&t=12000'
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
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,1) 100%)',
      }} />
      <div className=" min-h-screen text-white" style={{ position: 'relative', zIndex: 1 }}>
      


          <div className="min-h-screen pt-40 p-20">
          <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
          <span className="w-20 h-2 bg-gray-100 dark:bg-white mb-12"></span>
          <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-100">
            Your
            <span className="text-5xl sm:text-7xl">Likes</span>
          </h1>
          <p className="text-3xl pt-12 text-gray-100 mb-10">
            This it the place where you can see all the article you ever liked!
          </p>
          </div>
            {/* <h1 className="text-5xl font-black border-spacing-3 pt-20 mb-5">Welcome {userName.split(' ')[0]}</h1> <span className="font-bold"></span> */}

            <button className="px-4 py-2 buttonMain" onClick={handleScroll}>See Them!</button>
          </div>
          <div ref={scrollRef} className="">
            <div>
              {/* <DailyPic /> */}
            </div>
          </div>
          {/* <div className="absolute bottom-0 pb-20 mb-20 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text- font-light">Cosmology is a beautiful and exciting field. It allows us to understand the universe and our place in it. From the mysteries of dark matter and dark energy to the awe-inspiring scale of the cosmos, every discovery brings new questions and new perspectives.</p>
          </div> */}
        </div>
      </div>
      );
};

      export default Hero;