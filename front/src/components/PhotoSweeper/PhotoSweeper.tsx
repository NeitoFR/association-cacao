import { useState, useEffect } from "react";
import styles from "./PhotoSweeper.module.css";
import type { CatPhoto } from "../../interfaces/Cat";
interface PhotoSweeperProps {
  photos: CatPhoto[];
  className: string;
}
const PhotoSweeper = (props: PhotoSweeperProps) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  console.log("photos", props.photos);

  const handlePreviousClick = () => {
    if (currentPhoto > 0) {
      // console.log("current : " + currentPhoto);
      setCurrentPhoto(currentPhoto - 1);
    } else {
      console.log("Already at first photo");
    }
  };

  const handleNextClick = () => {
    if (currentPhoto < props.photos.length - 1) {
      console.log("current : " + currentPhoto);
      setCurrentPhoto(currentPhoto + 1);
    } else {
      console.log("Already at last photo");
    }
  };

  const displayNavigationButton = (direction: string) => {
    if (props.photos.length === 1) {
      return "";
    }
    if (direction === "previous" && currentPhoto === 0) {
      return "";
    }
    if (direction === "next" && currentPhoto === props.photos.length - 1) {
      return "";
    }
    const handleClick =
      direction === "previous" ? handlePreviousClick : handleNextClick;
    const style = direction === "previous" ? styles.previous : styles.next;
    const position = direction === "previous" ? "left-0" : "right-0";
    const justifyContent =
      direction === "previous"
        ? "items-center pl-4"
        : "justify-end items-center pr-4";
    const symbol = direction === "previous" ? "<" : ">";

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
    <div className={"relative overflow-hidden " + props.className}>
      {displayNavigationButton("previous")}
      <img
        src={
          import.meta.env.PUBLIC_STRAPI_URL + props.photos[currentPhoto]?.url
        }
        alt={props.photos[currentPhoto]?.alt || "Photo de chat"}
        className="h-full w-full object-cover object-center"
      />
      {displayNavigationButton("next")}
    </div>
  );
};

export default PhotoSweeper;
