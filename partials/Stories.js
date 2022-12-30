import Image from "next/image";
import React, { Component, useState } from "react";
import { rendererImage, testerImage } from "../components/Stories/Renderer";
import { rendererVideo, testerVideo } from "../components/Stories/Renderer";
import ReactStories, { WithHeader } from "react-insta-stories";

function Stories({ company }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const medias = company.medias.filter(
    (media) => media.collection_name == "stories"
  );
  const stories = medias.map((m) => ({
    url: m.link,
    type: m.mime_type.includes("video") ? "video" : "image",
    header: {
      heading: company.name,
      subheading: company.description,
      profileImage: company.logo,
    },
    duration: m.mime_type.includes("video") ? undefined : 10000,
    storyStyles: {
      width: "100%",
      maxWidth: "10%",
      maxHeight: "100%",
      margin: "auto",
      objectFit: "contain",
    },
  }));
  return (
    <div className="flex relative overflow-x-auto justify-start md:justify-center pb-2 mb-2 py-2 w-full">
      {medias.map((media, i) => {
        return (
          <Image
            onClick={() => {
              setIsFullscreen(true);
              setCurrentIndex(i);
            }}
            key={media.id + i}
            src={media.thumb}
            alt={""}
            height={56}
            width={56}
            style={{
              height: 56,
              width: 56,
              minWidth: 56,
              minHeight: 56,
              maxWidth: 56,
              maxHeight: 56,
              objectFit: "cover",
            }}
            className="cursor-pointer mr-2 rounded-full border-2 border-primary  bg-white object-cover"
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
            onStoryEnd={() => {}}
            onAllStoriesEnd={() => {
              setIsFullscreen(false);
            }}
            renderers={[
              {
                renderer: rendererImage,
                tester: testerImage,
              },
              {
                renderer: rendererVideo,
                tester: testerVideo,
              },
            ]}
            loop={true}
            stories={stories}
            defaultInterval={10000}
            width={"100%"}
            height={"100%"}
            currentIndex={currentIndex}
          />

          <div
            className="cursor-pointer z-auto text-2xl flex items-center justify-end w-12 h-12 text-white top-3 right-3 absolute"
            style={{ zIndex: 1000 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFullscreen(false);
            }}
          >
            &times;
          </div>
        </div>
      )}
    </div>
  );
}

export default Stories;
