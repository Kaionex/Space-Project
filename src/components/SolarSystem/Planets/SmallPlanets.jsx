import { PlanetImage, Satellite } from "../SatellitesAnimation";

export function PlanetImageComponent({ name, image, day, satellites, isHovered }) {
    return (
      
      <PlanetImage
        name={name}
        $image={image}
        $day={day}
      >
      
        {Array.from({ length: satellites }).map((_, i) => (
          <Satellite
            key={i}
            orbit={name === 'Neptune' ? 3 : i + 2}
            isVisible={isHovered}
            size={Math.random() * 10 + 7}
          />
        ))}
      </PlanetImage>
     
    );
  }