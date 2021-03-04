import { styled } from "linaria/react";
import React from "react";
import ReactPlayer from "react-player";
import videoStyles from "./videos.module.css";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(380px, 1fr));
  grid-gap: 1rem;
  grid-auto-flow: dense;
  padding: 15px;
`;

const Heading = styled.h2`
  text-align: center;
`;

const checkUrl = (url) => {
  if (url.includes("youtube")) {
    return "youtube";
  } else if (url.includes("vimeo")) {
    return "youtube";
  } else {
    return "all";
  }
};

export const Videos = ({ videos }) => (
  <div>
    <Heading>Videos</Heading>
    <Container>
      {videos.map((video) => (
        <div key={video.videourl}>
          <div className={videoStyles.playerWrapper}>
            <ReactPlayer
              url={video.url}
              width="100%"
              height="100%"
              className={videoStyles.reactPlayer}
              controls={true}
            />
          </div>
          <p className={videoStyles.vidText}>{video.text}</p>
        </div>
      ))}
    </Container>
  </div>
);
