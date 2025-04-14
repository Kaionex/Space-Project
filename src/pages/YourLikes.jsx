import { useState } from 'react';
import Hero from '../components/YourLikes/HeroPage';

import Footer from '@/components/Nav/Footer';
import Navigation from '@/components/Nav/Navigation';
import LikedItems from '@/components/YourLikes/Likes';

const YourLikes = () => {
  const [showModal, setShowModal] = useState(false);
 
  return (
    <>
    
    <Navigation />
      <div>
        <Hero />
      </div>
      <div style={{  backgroundColor: 'black', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%' }}>
        <LikedItems setShowModal={setShowModal} showModal={showModal} />
     
        <Footer />
      </div>
    </>
  );
};

export default YourLikes;
