import { Card } from '../PlanetsDB';
import { planetData } from '../PlanetsDB';
import { PlanetImageComponent } from './SmallPlanets';

export function PlanetCard({ planet, handlePlanetClick, toggleHover, isHovered }) {
  const { name } = planet;
  const planetDataLowerCase = planetData[name.toLowerCase()];
  if (!planetDataLowerCase) {
    console.warn(`Missing data for planet: ${name}`);
    return null;
  }
  return (

    <Card
      key={name}
      className={`card card--${name.toLowerCase()}`}
      onClick={() => handlePlanetClick(name)}
      onMouseEnter={() => toggleHover(name, true)}
      onMouseLeave={() => toggleHover(name, false)}
    >

      <PlanetImageComponent
        name={name}
        image={planetDataLowerCase.image}
        day={planetDataLowerCase.day}
        satellites={planetDataLowerCase.satellites}
        isHovered={isHovered[name]}
      />
      <div className="card__info text-center">
        <h2 className="info__title text-2xl font-bold">{name}</h2>
        <div className="info__form text-sm"></div>
      </div>
    </Card>


  );
}