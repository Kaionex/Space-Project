import { useState } from 'react';

import DisplayNasaDark from "../components/Home/DisplayNasaStatic";
import Hero from '../components/Home/HeroPage';
import SearchNasaDark from '../components/Home/SearchNasa';
import backgroundImage from "../assets/bkg/background6.png"
import DailyPic from '@/components/Home/DailyPicNasa';
import DisplayMars from '@/components/Home/DisplayMarsCarousel';
import Footer from '@/components/Nav/Footer';
import Navigation from '@/components/Nav/Navigation';
import FutureEvents from '@/components/Home/FutureEvents';
import DisplaySpaceXStatic from '@/components/Home/DisplaySpaceXStatic';
import DownloadTheApp from '@/components/DownloadTheApp';
import SpaceSeperator from '@/components/SpaceSeperator';
import SpaceSeperatorBlank from '@/components/SpaceSeperatorBlank';





const SpaceDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showModalX, setShowModalX] = useState(false);
  const [showModalF, setShowModalF] = useState(false);
  return (
    <>
    <Navigation />
      <div>
        <Hero />
      </div>
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundColor: 'black', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%' }}>
        <DisplayNasaDark setShowModal={setShowModal} showModal={showModal} />
        <DisplaySpaceXStatic setShowModal={setShowModalX} showModal={showModalX}/>
        <FutureEvents setShowModal={setShowModalF} showModal={showModalF} />
        <DailyPic />
        <DisplayMars />
        <SearchNasaDark setShowModal={setShowSearchModal} showModal={showSearchModal} />
        <DownloadTheApp />
        <Footer />
      </div>
    </>
  );
};

export default SpaceDashboard;
