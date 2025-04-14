import React, { useState, useEffect } from 'react';
import axios from 'axios';
import placeholderImage1 from '@/assets/bkg/background1.png';
import placeholderImage2 from '@/assets/bkg/background1.png';
import placeholderImage3 from '@/assets/bkg/background1.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



const DisplayMarsCarousel = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const placeholderPhotos = [
    { id: 1, img_src: placeholderImage1, camera: { full_name: 'Placeholder Title 1' } },
    { id: 2, img_src: placeholderImage2, camera: { full_name: 'Placeholder Title 2' } },
    { id: 3, img_src: placeholderImage3, camera: { full_name: 'Placeholder Title 3' } },
  ];

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`
        );
        setPhotos(response.data.photos.slice(0, 20));
      } catch (error) {
        setError(error);
      }
    };

    fetchPhotos();
  }, []);

  const photosToDisplay = error ? placeholderPhotos : photos;

  const handleCardClick = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    const currentIndex = photosToDisplay.findIndex(photo => photo.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photosToDisplay.length;
    setSelectedPhoto(photosToDisplay[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = photosToDisplay.findIndex(photo => photo.id === selectedPhoto.id);
    const previousIndex = (currentIndex - 1 + photosToDisplay.length) % photosToDisplay.length;
    setSelectedPhoto(photosToDisplay[previousIndex]);
  };
  return (
    <div>
      <h2 className="mt-0 px-10 pb-2 pt-20 bg-clip-text bg-gradient-to-r from-primary-skyMagenta via-red-500 to-red-900 text-center text-5xl font-bold tracking-tight text-transparent md:text-5xl">
        Mars Rover Update
      </h2>
      <p className="text-center text-white text-base md:text-2xl max-w-2xl font-normal pb-2 mx-auto">
        Explore Mars through the lens of the Mars Rover: stunning photos and
        invaluable insights into Mars' geology and atmosphere. From vast deserts
        to towering mountains, discover the diverse and captivating features of
        the{" "}
        <span className="bg-clip-text bg-gradient-to-r from-red-500 via-red-500 to-red-900 text-transparent">
          Red Planet
        </span>
        .
      </p>
      <div className="flex justify-center">
        <Carousel className="w-full max-w-3xl">
          <CarouselContent>
            {photosToDisplay.map((photo) => (
              <CarouselItem key={photo.id} className="basis-1/3">
                <div className="p-2">
                  <Card className="bg-opacity-50 bg-black">
                    <CardHeader>
                      <CardTitle>{photo.camera.full_name}</CardTitle>
                    </CardHeader>
                    <CardContent
                      className="rounded-lg flex-grow flex items-center justify-center hover:opacity-75 transition-opacity duration-200"
                      style={{
                        backgroundImage: `url(${photo.img_src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                      }}
                      onClick={() => handleCardClick(photo)}
                    ></CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-80"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="max-w-3xl mx-auto relative">
            <button
              className="absolute left-0 top-1/2 mx-4 transform -translate-y-1/2 text-white"
              onClick={handlePrevious}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <img
              src={selectedPhoto?.img_src}
              alt={selectedPhoto?.camera?.full_name}
              className="object-contain max-h-screen max-w-full mx-auto"
            />
            <div className="absolute bottom-0 bg-black bg-opacity-60 text-white w-full text-center py-2">
              {selectedPhoto?.camera?.full_name}
            </div>
            <button
              className="absolute right-0 top-1/2 mx-4 transform -translate-y-1/2 text-white "
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayMarsCarousel;