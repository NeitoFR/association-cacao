import { useState } from "react";
import styles from "./PhotoSweeper.module.css";
import type { CatPhoto } from "../../interfaces/Cat";

interface PhotoSweeperProps {
  photos: CatPhoto[];
  className: string;
}

const PhotoSweeper = (props: PhotoSweeperProps) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const totalPhotos = props.photos.length;

  const handlePreviousClick = () => {
    if (currentPhoto > 0) {
      setCurrentPhoto(currentPhoto - 1);
    } else {
      // Loop to the last photo when at the beginning
      setCurrentPhoto(totalPhotos - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPhoto < totalPhotos - 1) {
      setCurrentPhoto(currentPhoto + 1);
    } else {
      // Loop to the first photo when at the end
      setCurrentPhoto(0);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentPhoto(index);
  };

  const renderNavigationButton = (direction: "previous" | "next") => {
    if (totalPhotos <= 1) return null;

    const isLeft = direction === "previous";
    const handleClick = isLeft ? handlePreviousClick : handleNextClick;
    const buttonStyle = isLeft ? styles.previous : styles.next;
    const position = isLeft ? "left-4" : "right-4";
    
    return (
      <button
        className={`${buttonStyle} absolute top-1/2 -translate-y-1/2 ${position} z-10 
                   flex items-center justify-center w-10 h-10 rounded-full bg-black/50 
                   text-white text-xl font-bold transition-all duration-300 hover:bg-black/70`}
        onClick={handleClick}
        aria-label={isLeft ? "Photo précédente" : "Photo suivante"}
      >
        {isLeft ? "←" : "→"}
      </button>
    );
  };

  return (
    <div className={`relative ${props.className}`}>
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl h-full">
        <img
          src={import.meta.env.PUBLIC_STRAPI_URL + props.photos[currentPhoto]?.url}
          alt={props.photos[currentPhoto]?.alt || "Photo de chat"}
          className="h-full w-full object-cover object-center transition-opacity duration-300"
        />
        
        {/* Navigation Buttons */}
        {renderNavigationButton("previous")}
        {renderNavigationButton("next")}
        
        {/* Photo Counter */}
        {totalPhotos > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentPhoto + 1} / {totalPhotos}
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {totalPhotos > 1 && (
        <div className="flex justify-center mt-3 gap-2 overflow-x-auto pb-2">
          {props.photos.map((photo, index) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer transition-all duration-200 
                        ${currentPhoto === index 
                          ? "border-2 border-catCardBorder scale-105" 
                          : "border border-gray-300 opacity-70 hover:opacity-100"}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={import.meta.env.PUBLIC_STRAPI_URL + photo.url}
                alt={`Miniature ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoSweeper;
