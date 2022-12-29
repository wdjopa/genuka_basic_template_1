import React, { Component, useState } from "react";

import ReactStories from "react-insta-stories";

function Stories({ company }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const medias = [...company.medias];
  console.log({ isFullscreen });
  return (
    <div className="flex overflow-x-auto justify-center pb-4 w-full">
      {medias.map((media, i) => {
        return (
          <img
            onClick={() => {
              setIsFullscreen(true);
              setCurrentIndex(i);
              console.log("index", i);
            }}
            key={media.id + i}
            src={media.link}
            alt={""}
            className="w-14 cursor-pointer h-14 mr-2 rounded-full border-2 border-primary  bg-white object-cover"
          />
        );
      })}

      {isFullscreen && (
        <div className=" fixed top-0 left-0 w-screen h-screen z-50 items-center justify-center flex">
          <div
            className="backdrop bg-black opacity-70 w-full h-full absolute"
            onClick={() => setIsFullscreen(false)}
          ></div>
          <ReactStories
            stories={medias.map((m) => ({
              url: m.link,
              type: m.mime_type.includes("video") ? "video" : "image",
            }))}
            defaultInterval={5000}
            width={432}
            height={"90%"}
            currentIndex={currentIndex}
          />
        </div>
      )}
    </div>
  );
}

export default Stories;
