import React from "react";
import ReactPlayer from "react-player/vimeo";
import videoStyles from "./videos.module.css";

export const VimeoPlayer = (props) => {
  <ReactPlayer
    url={video.videourl}
    width="100%"
    height="100%"
    className={videoStyles.reactPlayer}
    controls={true}
  />;
};
