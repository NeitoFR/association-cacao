import { useState, useEffect } from "react";
import styles from "./CatPhotoSweeper.module.css";

const CatPhotoSweeper = (props) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  // console.log("photos", props.photos);

  const handlePreviousClick = () => {
    if (currentPhoto > 0) {
      console.log("current : " + currentPhoto);
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

  const displayNavigationButton = (direction) => {
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
        className={`${style} w-1/2 cursor-pointer absolute ${position} top-0 h-full flex ${justifyContent} bg-orange-400 text-white opacity-0`}
        onClick={handleClick}
      >
        {symbol}
      </div>
    );
  };

  useEffect(() => {
    console.log("new : " + currentPhoto);
  }, [currentPhoto]);

  return (
    <div className="flex bg-orange-200 h-[9.6rem] min-h-[9.6rem] w-full relative">
      {displayNavigationButton("previous")}
      <img
        src={props.baseUrl + "/" + props.photos[currentPhoto].url}
        alt={props.photos[currentPhoto].alt || "Photo de chat"}
        className="object-cover object-center w-full h-full"
      />
      {displayNavigationButton("next")}
    </div>
  );
};

export default CatPhotoSweeper;
