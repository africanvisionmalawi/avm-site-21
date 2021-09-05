import React from "react";
// import ReactPlayer from "react-player";
import { Player } from ".";
import videoStyles from "./videos.module.css";

export const Video = ({ url, text }) => (
  <>
    <div className={videoStyles.playerWrapper}>
      {url ? (
        <Player url={url} />
      ) : // <ReactPlayer
      //   url={url}
      //   width="100%"
      //   height="100%"
      //   className={videoStyles.reactPlayer}
      //   controls={true}
      // />
      null}
    </div>
    <p>{text ? text : ""}</p>
  </>
);
