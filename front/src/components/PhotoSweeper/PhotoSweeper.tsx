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

  return (
    <div className={`relative flex flex-col ${props.className}`}>
      {/* Main Image Container with fixed height, no background or border */}
      <div className="relative w-full h-[220px] flex items-center justify-center rounded-xl overflow-hidden">
        <img
          src={
            import.meta.env.PUBLIC_STRAPI_URL + props.photos[currentPhoto]?.url
          }
          alt={props.photos[currentPhoto]?.alt || "Photo de chat"}
          className="w-full h-full object-cover object-center transition-opacity duration-300"
        />

        {/* Navigation Areas */}
        {totalPhotos > 1 && (
          <>
            {/* Left Navigation Area */}
            <button
              className="absolute left-0 top-0 w-1/2 h-full cursor-pointer bg-transparent hover:bg-gradient-to-r hover:from-black/30 hover:to-transparent transition-all duration-300"
              onClick={handlePreviousClick}
              aria-label="Photo précédente"
            />
            {/* Right Navigation Area */}
            <button
              className="absolute right-0 top-0 w-1/2 h-full cursor-pointer bg-transparent hover:bg-gradient-to-l hover:from-black/30 hover:to-transparent transition-all duration-300"
              onClick={handleNextClick}
              aria-label="Photo suivante"
            />
          </>
        )}

        {/* Photo Counter */}
        {totalPhotos > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentPhoto + 1} / {totalPhotos}
          </div>
        )}
      </div>

      {/* Thumbnails Container with fixed size, no background or border */}
      {totalPhotos > 1 && (
        <div className="flex justify-center mt-3 gap-2 pb-2 h-16 w-full flex-wrap overflow-y-hidden">
          {props.photos.map((photo, index) => (
            <div
              key={index}
              className={`h-16 w-16 rounded-md overflow-hidden cursor-pointer transition-all duration-200 flex-shrink-0 flex items-center justify-center
                        ${
                          currentPhoto === index
                            ? "border-2 border-catCardBorder scale-105"
                            : "border border-gray-300 opacity-70 hover:opacity-100"
                        }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={import.meta.env.PUBLIC_STRAPI_URL + photo.url}
                alt={`Miniature ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoSweeper;
