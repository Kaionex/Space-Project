import React, { useState , useEffect} from "react"
import { UserAuth } from '../context/AuthContext';

import Hero from "@/components/SolarSystem/HeroSolarSystem";
import PlanetPicker from "@/components/SolarSystem/PlanetPicker";
import DisplayCards from "@/components/SolarSystem/DisplayCards";
import Footer from "@/components/Nav/Footer";
import Navigation from "@/components/Nav/Navigation";
import Exam from "./exam.jsx"
import bronze from "../assets/bronze.png"
import silver from "../assets/silver.png"
import gold from "../assets/gold.png"
import AuthModal from '../components/Modals/AuthModal';




const SolarSystem = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPlanetSearch, setCurrentPlanetSearch] = useState('Mercury');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);


  const {user,setUser} = UserAuth();

  //exam module
  const [isLoaded, setIsLoaded] = useState(false);



  const handleUnmount = (badge) => {
    setIsLoaded(false);
    console.log("unmount called");
    console.log(badge);
    setUser({...user, userBadge:badge});

  };

  const handleClick = async item => {
    if (user) {
      setIsLoaded(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogin = () => {
    setShowModal(false);
  };


  useEffect(() => {
    if (isLoaded) {
      document.body.classList.add('disable-scroll');
     
  } else {
      document.body.classList.remove('disable-scroll');
  }
    
  }, [isLoaded]); // The empty array






  return (
    <>
    {/* Auth modal */}
    <AuthModal showModal={showAuthModal} setShowModal={setShowAuthModal} isLoginFormVisible={isLoginFormVisible} setIsLoginFormVisible={setIsLoginFormVisible} onLogin={handleLogin} />
      <Navigation />
      <Hero />

      <div style={{ height: '100%', backgroundColor: 'black', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: "1390px", paddingBottom: '30px' }}>
  <PlanetPicker setCurrentPlanetSearch={setCurrentPlanetSearch}  />
  <DisplayCards setShowModal={setShowModal} showModal={showModal} searchQuery={currentPlanetSearch} />
</div>

{isLoaded && <Exam unmountCallback={handleUnmount} />}
    

    <div className="wrapper">
    <div className={isLoaded ? "inner p-5 rounded-lg" : 'inner p-5 rounded-lg backdrop-blur'} >
      <div className="left">
        <div className="content" onClick={handleClick}>
            <div className="book"></div>
            <div className="text"><h1>Take our quiz to test your knowledge!</h1></div>
        </div>
        <div className="clear"><p>You can receive one of following Badges.</p></div>
        <div className="badges">
            <ol>
                <li><img src={bronze} alt="" /></li>
                <li><img src={silver} alt="" /></li>
                <li><img src={gold} alt="" /></li>
            </ol>
        </div>
        

      </div>
      <div className="right"></div>

    </div>

</div>  

      <Footer />
    </>
  );
};

export default SolarSystem;
