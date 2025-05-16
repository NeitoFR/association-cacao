import { useState } from "react";
import styles from "./PhotoSweeper.module.css";
import type { CatPhoto } from "../../interfaces/Cat";

interface PhotoSweeperProps {
  photos: CatPhoto[];
  className: string;
  imageFit?: "cover" | "contain";
  imageHeightClass?: string;
}

const PhotoSweeper = (props: PhotoSweeperProps) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const totalPhotos = props.photos?.length || 0;
  const imageFit = props.imageFit || "cover";
  const imageHeightClass = props.imageHeightClass || "h-[220px]";

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

  // If no photos, show placeholder
  if (!totalPhotos) {
    return (
      <div className={`relative flex flex-col ${props.className}`}>
        <div
          className={`relative w-full ${imageHeightClass} flex flex-col items-center justify-center rounded-2xl overflow-hidden bg-gray-100`}
        >
          <img
            src="/icons/paw.png"
            alt="Pas de photo"
            className="w-16 h-16 opacity-50 mb-4"
          />
          <p className="text-gray-500 text-lg">Pas de photo disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col ${props.className}`}>
      {/* Main Image Container with variable height, always rounded-2xl and overflow-hidden */}
      <div
        className={`relative w-full ${imageHeightClass} flex items-center justify-center rounded-2xl overflow-hidden`}
      >
        <img
          src={
            import.meta.env.PUBLIC_STRAPI_URL + props.photos[currentPhoto]?.url
          }
          alt={props.photos[currentPhoto]?.alt || "Photo de chat"}
          className={`w-full h-full object-${imageFit} object-center transition-opacity duration-300`}
        />

        {/* Navigation Areas - always inside the rounded container */}
        {totalPhotos > 1 && (
          <>
            <button
              className="absolute left-0 top-0 w-1/2 h-full cursor-pointer bg-transparent hover:bg-gradient-to-r hover:from-black/30 hover:to-transparent transition-all duration-300"
              onClick={handlePreviousClick}
              aria-label="Photo précédente"
              style={{ borderRadius: 0 }}
            />
            <button
              className="absolute right-0 top-0 w-1/2 h-full cursor-pointer bg-transparent hover:bg-gradient-to-l hover:from-black/30 hover:to-transparent transition-all duration-300"
              onClick={handleNextClick}
              aria-label="Photo suivante"
              style={{ borderRadius: 0 }}
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
