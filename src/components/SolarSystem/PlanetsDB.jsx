import Mercury from '../../assets/planets/Mercury.png';
import Venus from '../../assets/planets/Venus.png';
import Earth from '../../assets/planets/Earth.png';
import Mars from '../../assets/planets/Mars.png';
import Jupiter from '../../assets/planets/Jupiter.png';
import Saturn from '../../assets/planets/Saturn.png';
import Uranus from '../../assets/planets/Uranus.png';
import Neptune from '../../assets/planets/Neptune.png';



export function Card({ children, className, onClick }) {
    return (
        <div

            className={`transform transition-transform duration-200 ease-in-out active:scale-90 p-4  ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}


export const bigPlanet = [
  {
    planet: 'mercury',
    title: 'Mercury',
    description: 'Mercury is the smallest planet in the Solar System and the closest to the Sun. It has no moons and a surface temperature that can vary from extremely hot to extremely cold. Mercury experiences the greatest temperature variations of any planet in the Solar System, ranging from about -290°F (-180°C) at night to 800°F (430°C) during the day. Despite its small size, Mercury has a relatively large iron core, which accounts for about 60% of its mass. Mercury is named after the Roman messenger god, known for his speed, because it orbits the Sun faster than any other planet.',
    tilt: "Mercury has a slight tilt of approximately 0.03 degrees.", // Updated tilt angle (in degrees)
    gravity: "The gravity on Mercury is about 0.38 times that of Earth's gravity.", // Updated gravity (in m/s^2)
    hours: "A day on Mercury lasts approximately 1407.6 hours.", // Updated length of day (in hours)
    satellites: 0, // Number of satellites (moons)
    imgSrc: Mercury, // Image source
  },
  {
    planet: 'venus',
    title: 'Venus',
    description: 'Venus is often called Earth\'s "sister planet" because of their similar size, composition, and proximity to the Sun. However, Venus has a thick, toxic atmosphere and a surface temperature hot enough to melt lead. Its atmosphere is composed mainly of carbon dioxide, with clouds of sulfuric acid droplets. Venus rotates in the opposite direction to most other planets, a phenomenon known as retrograde rotation. It is also one of the brightest objects in the night sky, often referred to as the "Evening Star" or the "Morning Star." Venus has been a subject of fascination for astronomers and scientists for centuries, with numerous missions sent to study its atmosphere and surface in detail.',
    tilt: "Venus has an extreme tilt of approximately 177.4 degrees.", // Updated tilt angle (in degrees)
    gravity: "The gravity on Venus is about 0.91 times that of Earth's gravity.", // Updated gravity (in m/s^2)
    hours: "A day on Venus lasts approximately 5832.5 hours.", // Updated length of day (in hours)
    satellites: 0, // Number of satellites (moons)
    imgSrc: Venus,
  },
  {
    planet: 'earth',
    title: 'Earth',
    description: 'Earth is the only known planet in the universe to support life. It has a diverse range of ecosystems and is home to millions of species, including humans. Earth has one natural satellite, the Moon. The planet\'s atmosphere protects life on Earth by absorbing ultraviolet solar radiation, warming the surface through heat retention (greenhouse effect), and reducing temperature extremes between day and night. Earth\'s oceans cover approximately 71% of its surface and play a crucial role in regulating the planet\'s climate and supporting marine life.',
    tilt: "Earth has a tilt of approximately 23.44 degrees.", // Updated tilt angle (in degrees)
    gravity: "The gravity on Earth is approximately 9.81 m/s².", // Updated gravity (in m/s^2)
    hours: "A day on Earth lasts approximately 24 hours.", // Updated length of day (in hours)
    satellites: 1, // Number of satellites (moons)
    imgSrc: Earth,
  },
  {
    planet: 'mars',
    title: 'Mars',
    description: 'Mars is often called the "Red Planet" because of its reddish appearance due to iron oxide prevalent on its surface. It has the highest mountain and the deepest canyon in the Solar System. Mars has two small moons, Phobos and Deimos. The exploration of Mars has been a major goal of space agencies due to its potential as a future habitat for human colonization and its similarities to Earth in terms of geological processes. Recent discoveries suggest that Mars may have had liquid water on its surface in the past, raising questions about the possibility of ancient life.',
    tilt: "Mars has a tilt of approximately 25.19 degrees.", // Updated tilt angle (in degrees)
    gravity: "The gravity on Mars is about 3.71 m/s².", // Updated gravity (in m/s^2)
    hours: "A day on Mars lasts approximately 24.6 hours.", // Updated length of day (in hours)
    satellites: 2, // Number of satellites (moons)
    imgSrc: Mars,
  },
  {
    planet: 'jupiter',
    title: 'Jupiter',
    description: 'Jupiter is the largest planet in the Solar System and is known for its massive size and distinctive bands of clouds. It has at least 79 moons, including the four largest moons known as the Galilean moons: Io, Europa, Ganymede, and Callisto. Jupiter has a strong magnetic field and is often referred to as a "failed star" because it lacks the mass required to sustain nuclear fusion in its core. Jupiter\'s Great Red Spot is a massive storm that has been raging for centuries and is larger than the entire Earth.',
    tilt: "Jupiter has a tilt of approximately 3.13 degrees.", // Updated tilt angle (in degrees)
    gravity: "The gravity on Jupiter is about 24.79 m/s².", // Updated gravity (in m/s^2)
    hours: "A day on Jupiter lasts approximately 9.9 hours.", // Updated length of day (in hours)
    satellites: 79, // Number of satellites (moons)
    imgSrc: Jupiter,
  },
  {
    planet: 'saturn',
    title: 'Saturn',
    description: 'Saturn is famous for its beautiful rings, which are made primarily of ice and dust particles. It has more than 80 moons, with the largest being Titan. Saturn\'s rings are made up of billions of individual pieces, ranging in size from tiny grains to giant boulders. The rings are continually changing due to gravitational interactions with Saturn\'s moons and other factors. Saturn is the flattest planet in the Solar System, with an equatorial bulge caused by its rapid rotation.',
    tilt: "Saturn has a tilt of approximately 26.73 degrees.", // Updated tilt angle (in degrees)
    gravity: "The gravity on Saturn is about 10.44 m/s².", // Updated gravity (in m/s^2)
    hours: "A day on Saturn lasts approximately 10.7 hours.", // Updated length of day (in hours)
    satellites: 82, // Number of satellites (moons)
    imgSrc: Saturn,
  },
  {
    planet: 'uranus',
    title: 'Uranus',
    description: 'Uranus is an ice giant with a pale blue-green color due to the presence of methane in its atmosphere. It has 27 known moons, the largest of which are Titania, Oberon, Umbriel, Ariel, and Miranda. Uranus is unique in the Solar System because it rotates on its side. Its axis of rotation is tilted at an angle of about 98 degrees, causing extreme seasonal variations. Uranus was the first planet discovered with a telescope, by William Herschel in 1781.',
    tilt: "Uranus has an extreme tilt of approximately 97.77 degrees.", // Updated tilt angle (in degrees)
    gravity: "The gravity on Uranus is about 8.69 m/s².", // Updated gravity (in m/s^2)
    hours: "A day on Uranus lasts approximately 17.2 hours.", // Updated length of day (in hours)
    satellites: 27, // Number of satellites (moons)
    imgSrc: Uranus,
  },
  {
    planet: 'neptune',
    title: 'Neptune',
    description: 'Neptune is the eighth and farthest known planet from the Sun in the Solar System. It is a gas giant similar in composition to Uranus, but it has a deeper blue color due to the presence of methane. Neptune has 14 known moons, with Triton being the largest and most interesting. Triton is unique among the large moons of the Solar System because it orbits in a retrograde direction, opposite to Neptune\'s rotation. Neptune\'s winds are the fastest in the Solar System, reaching speeds of up to 1,500 miles per hour (2,400 kilometers per hour).',
    tilt: "Neptune has a tilt of approximately 28.32 degrees.", // Updated tilt angle (in degrees)
    gravity: "The gravity on Neptune is about 11.15 m/s².", // Updated gravity (in m/s^2)
    hours: "A day on Neptune lasts approximately 16.1 hours.", // Updated length of day (in hours)
    satellites: 14, // Number of satellites (moons)
    imgSrc: Neptune,
  },
];




export const planetData = {
  mercury: {
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/mercury2.jpg",
    tilt: "rotate(0.034deg)",
    day: 1407.6,
    color: "#999999",
    satellites: 0 // Mercury has no natural satellites
  },
  venus: {
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/venus2.jpg",
    tilt: "rotate(177.3deg)",
    day: 5832.5,
    color: "#e8cda2",
    satellites: 0 // Venus has no natural satellites
  },
  earth: {
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/earth.jpg",
    tilt: "rotate(23.26deg)",
    day: 23.9,
    color: "#b3caff",
    satellites: 1 // Earth has 1 natural satellite (the Moon)
  },
  mars: {
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/mars.jpg",
    tilt: "rotate(25.2deg)",
    day: 24.6,
    color: "#c07158",
    satellites: 2 // Mars has 2 natural satellites (Phobos and Deimos)
  },
  jupiter: {
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/jupiter.jpg",
    tilt: "rotate(3.1deg)",
    day: 9.9,
    color: "#c9b5a4",
    satellites: 4 // Jupiter's larger satellites include Io, Europa, Ganymede, and Callisto
  },
  saturn: {
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/saturn.jpg",
    tilt: "rotate(26.7deg)",
    day: 10.7,
    color: "#f0e2c4",
    satellites: 7 // Saturn's larger satellites include Titan, Rhea, Iapetus, Dione, Tethys, Enceladus, and Mimas
  },
  uranus: {
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/uranus2.jpg",
    tilt: "rotate(97.8deg)",
    day: 17.2,
    color: "#b8d8e1",
    satellites: 5 // Uranus' larger satellites include Titania, Oberon, Umbriel, Ariel, and Miranda
  },
  neptune: {
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/neptune.jpg",
    tilt: "rotate(28.3deg)",
    day: 16.1,
    color: "#5e73bb",
    satellites: 1 // Neptune's larger satellite is Triton
  }
};



export const planetList = [
  {
    name: 'Mercury',
    year: 88
  },
  {
    name: 'Venus',
    year: 225
  },
  {
    name: 'Earth',
    year: 365
  },
  {
    name: 'Mars',
    year: 687
  },
  {
    name: 'Jupiter',
    year: 4333
  },
  {
    name: 'Saturn',
    year: 10759
  },
  {
    name: 'Uranus',
    year: 30687
  },
  {
    name: 'Neptune',
    year: 60190
  },
];