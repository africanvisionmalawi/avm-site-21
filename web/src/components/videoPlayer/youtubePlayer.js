import React from "react";
import ReactPlayer from "react-player/youtube";
import videoStyles from "./videos.module.css";

export const YoutubePlayer = (props) => {
  <ReactPlayer
    url={video.videourl}
    width="100%"
    height="100%"
    className={videoStyles.reactPlayer}
    controls={true}
  />;
};
