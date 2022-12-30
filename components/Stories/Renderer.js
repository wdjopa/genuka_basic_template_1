/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { WithHeader, WithSeeMore } from "react-insta-stories";

export const rendererVideo = ({
  story,
  action,
  isPaused,
  config,
  messageHandler,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const { width, height, loader, storyStyles } = config;

  let computedStyles = {
    ...stylesVideo.storyContent,
    ...(storyStyles || {}),
    objectFit: "contain",
    justifyContent: "center",
  };

  let vid = React.useRef();

  React.useEffect(() => {
    if (vid.current) {
      if (isPaused) {
        vid.current.pause();
      } else {
        vid.current.play().catch(() => {});
      }
    }
  }, [isPaused]);

  const onWaiting = () => {
    action("pause", true);
  };

  const onPlaying = () => {
    action("play", true);
  };

  const videoLoaded = () => {
    const duration = Math.ceil(vid.current.duration) + 5;
    console.log({ video: JSON.stringify(duration), vid: vid.current });
    messageHandler("UPDATE_VIDEO_DURATION", {
      duration,
    });
    setLoaded(true);
    vid.current
      .play()
      .then(() => {
        action("play");
      })
      .catch(() => {
        setMuted(true);
        vid.current.play().finally(() => {
          action("play");
        });
      });
  };

  return (
    <WithHeader story={story} globalHeader={config.header}>
      <WithSeeMore story={story} action={action}>
        <div
          style={{
            ...stylesVideo.videoContainer,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <video
            ref={vid}
            style={computedStyles}
            src={story.url}
            controls={false}
            onLoadedData={videoLoaded}
            playsInline
            onWaiting={onWaiting}
            onPlaying={onPlaying}
            muted={muted}
            autoPlay
            webkit-playsinline="true"
          />
          {!loaded && (
            <div
              style={{
                width: width,
                height: height,
                position: "absolute",
                left: 0,
                top: 0,
                background: "rgba(0, 0, 0, 0.9)",
                zIndex: 9,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ccc",
              }}
            >
              {loader}
            </div>
          )}
        </div>
      </WithSeeMore>
    </WithHeader>
  );
};

const stylesVideo = {
  storyContent: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
  videoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
export const rendererImage = ({ story, action, isPaused, config }) => {
  const [loaded, setLoaded] = React.useState(false);
  const { width, height, loader, storyStyles } = config;
  let computedStyles = {
    ...styles.storyContent,
    ...(storyStyles || {}),
    objectFit: "contain",
    justifyContent: "center",
  };

  const imageLoaded = () => {
    setLoaded(true);
    action("play");
  };

  return (
    <WithHeader
      story={{
        ...story,
        styles: {
          story: {
            width: "100px",
            display: "flex",
            position: "relative",
            overflow: "hidden",
          },
          storyContent: {
            width: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
            margin: "auto",
          },
        },
      }}
      globalHeader={config.header}
    >
      <WithSeeMore story={story} action={action}>
        <div
          className="h-full "
          style={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          <img style={computedStyles} src={story.url} onLoad={imageLoaded} />
          {!loaded && (
            <div
              style={{
                width: width,
                height: height,
                position: "absolute",
                left: 0,
                top: 0,
                background: "rgba(0, 0, 0, 0.9)",
                zIndex: 9,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ccc",
              }}
            >
              {loader}
            </div>
          )}
        </div>
      </WithSeeMore>
    </WithHeader>
  );
};

const styles = {
  story: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    objectFit: "cover",
  },
  storyContent: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
};

export const testerImage = (story) => {
  return {
    condition: !story.content && (!story.type || story.type === "image"),
    priority: 3,
  };
};
export const testerVideo = (story) => {
  return {
    condition: !story.content && (!story.type || story.type === "video"),
    priority: 2,
  };
};
