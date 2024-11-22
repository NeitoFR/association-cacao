import { useState, useEffect } from "react";
import styles from "./CatPhotoSweeper.module.css";

const CatPhotoSweeper = ({ photos }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const loadImage = (index = 0) => {
    setIsLoaded(false);
    const img = new Image();
    img.src = `${import.meta.env.PUBLIC_STRAPI_URL}${photos[index].url}`;
    img.onload = () => {
      setImageUrl(img.src);
      setIsLoaded(true);
    };
  };

  useEffect(() => {
    loadImage();
  }, []);

  const handlePhotoChange = (step) => {
    setCurrentPhoto((prev) => {
      const newIndex = prev + step;
      if (newIndex >= 0 && newIndex < photos.length) {
        loadImage(newIndex);
        return newIndex;
      }
      console.log(
        step > 0 ? "Already at last photo" : "Already at first photo",
      );
      return prev;
    });
  };

  const displayNavigationButton = (direction) => {
    if (photos.length <= 1) return null;
    const isDisabled =
      (direction === "previous" && currentPhoto === 0) ||
      (direction === "next" && currentPhoto === photos.length - 1);
    if (isDisabled) return null;

    const isPrevious = direction === "previous";
    const handleClick = () => handlePhotoChange(isPrevious ? -1 : 1);
    const style = isPrevious ? styles.previous : styles.next;
    const position = isPrevious ? "left-0" : "right-0";
    const justifyContent = isPrevious
      ? "items-center pl-4"
      : "justify-end items-center pr-4";
    const symbol = isPrevious ? "<" : ">";

    return (
      <div
        className={`${style} absolute w-1/2 cursor-pointer ${position} top-0 flex h-full ${justifyContent} bg-orange-400 text-white opacity-0`}
        onClick={handleClick}
      >
        {symbol}
      </div>
    );
  };

  return (
    <div
      className="image-container mx-auto rounded-2xl"
      style={{
        backgroundImage: `url(${isLoaded ? imageUrl : import.meta.env.PUBLIC_STRAPI_URL + "/uploads/logo_d.png"})`,
        minHeight: "200px",
        maxHeight: "200px",
      }}
    >
      {displayNavigationButton("previous")}
      {displayNavigationButton("next")}
    </div>
  );
};

export default CatPhotoSweeper;
