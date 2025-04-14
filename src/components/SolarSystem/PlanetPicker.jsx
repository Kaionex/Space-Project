import { useState, useEffect, useRef} from "react";

import { planetList, bigPlanet } from "./PlanetsDB";

import { PlanetAccordion } from "./Planets/PlanetsInfo";
import { PlanetCard } from "./Planets/BigPlanet";

let img;

function PlanetPicker({ setCurrentPlanetSearch }) {
  const [currentPlanet, setCurrentPlanet] = useState(bigPlanet[0]);
  const [nextPlanet, setNextPlanet] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const [isHovered, setIsHovered] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handlePlanetClick = (planetName) => {
    const planet = bigPlanet.find(
      (planet) => planet.planet.toLowerCase() === planetName.toLowerCase()
    );
    if (planet) {
      setLoading(true);
      if (img) {
        img.onload = null; // Cancel the previous image loading
      }
      img = new Image();
      img.src = planet.imgSrc;
      img.onload = () => {
        setCurrentPlanet(planet);
       setLoading(false);
      };
      setCurrentPlanetSearch(planet.planet); // Pass only the planet name
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [currentPlanet]);

  const toggleHover = (planetName, isHover) => {
    setIsHovered((prev) => ({ ...prev, [planetName]: isHover }));
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="flex z-20 flex-col items-center">
      {/* <h2 className="text-4xl font-bold pt-10  text-center text-white">More info</h2> */}
      <p className="text-white text-center pt-5 pb-14 mx-auto px-20 max-w-[600px] overflow-hidden text-sm -mb-20 font-semibold">
        Check out the planets in our solar system. Click on a planet to learn
        more about it.
      </p>
      <div className="text-white z-20 flex -mt-10  justify-center pt-16 transform scale-100 lg:scale-75 sm:scale-50">
        {planetList.map((planet, i) => (
          <PlanetCard
            key={i}
            planet={planet}
            handlePlanetClick={handlePlanetClick}
            toggleHover={toggleHover}
            isHovered={isHovered}
          />
        ))}
      </div>

      {/* big planet */}
      <div className="w-full flex-auto pt-10 relative">
        <div className="col-span-3 " style={{ minHeight: "150px" }}>
          <img
            ref={imageRef}
            src={currentPlanet.imgSrc}
            alt={currentPlanet.title}
            className={`absolute top-0 transition-opacity duration-500 ease-in-out ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          />
          {nextPlanet && (
            <img
              src={nextPlanet.imgSrc}
              alt={nextPlanet.title}
              className={`absolute top-0 transition-opacity duration-500 ease-in-out ${
                loading ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
        <div className="flex justify-center align-top ">
          <PlanetAccordion
            currentPlanet={currentPlanet}
            showDescription={showDescription}
            toggleDescription={toggleDescription}
          />
        </div>
      </div>
    </div>
  );
}

export default PlanetPicker;
