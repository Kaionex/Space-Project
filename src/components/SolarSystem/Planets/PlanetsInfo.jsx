import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';

export function PlanetAccordion({ currentPlanet, showDescription, toggleDescription }) {
  return (
    <Accordion type="single" collapsible className="-mt-10 w-3/5 sm:w-3/5 md:w-2/5 content-center pt-1 text-white bg-white bg-opacity-10 backdrop-blur-md p-5 rounded-lg">
      <AccordionItem value="item-1" className="animate-accordion-down pt-3">
        <AccordionTrigger className="font-bold text-2xl" onClick={toggleDescription}>
          {currentPlanet.title}
          {showDescription ? <ChevronDownIcon className="h-6 w-6 inline-block" /> : <ChevronRightIcon className="h-6 w-6 inline-block" />}
        </AccordionTrigger>
        <AccordionContent style={{ maxHeight: showDescription ? '1000px' : '0', overflow: 'hidden', transition: 'max-height, 0.5s ease' }}>
        <hr className="border-white my-2" />
          <AccordionContent>{currentPlanet.description}</AccordionContent>
          <hr className="border-gray-500 my-2" />
          <Accordion>
          <AccordionItem value="tilt">
  <AccordionTrigger className="text-base flex items-center justify-between font-bold">
    <span>Tilt</span>
    <ChevronRightIcon className="h-4 w-4" />
  </AccordionTrigger>
  <AccordionContent>{currentPlanet.tilt}</AccordionContent>
</AccordionItem>
<hr className="border-gray-500 my-2" />
<AccordionItem value="gravity">
  <AccordionTrigger className="text-base flex items-center justify-between font-bold">
    <span>Gravity</span>
    <ChevronRightIcon className="h-4 w-4" />
  </AccordionTrigger>
  <AccordionContent>{currentPlanet.gravity}</AccordionContent>
</AccordionItem>
<hr className="border-gray-500 my-2" />
<AccordionItem value="hours">
  <AccordionTrigger className="text-base flex items-center justify-between font-bold">
    <span>Time</span>
    <ChevronRightIcon className="h-4 w-4" />
  </AccordionTrigger>
  <AccordionContent>{currentPlanet.hours}</AccordionContent>
</AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}