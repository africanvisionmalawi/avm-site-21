import { styled } from "linaria/react";
import React, { useState } from "react";
import { ImYoutube } from "react-icons/im";

const VidCont = styled.div`
  cursor: pointer;
  height: 0;
  max-width: 640px;
  padding-bottom: 56.25%;
  position: relative;
  overflow: hidden;
  & img,
  & iframe {
    border: 0;
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
  & svg {
    background: #fff;
    border-radius: 40px;
    fill: #00adef;
    height: 60px;
    width: 60px;
    z-index: 1;
  }
`;

const checkVideoType = (url) => {
  const youtubeUrls = ["youtube", "youtu.be"];
  const vimeoUrls = ["vimeo"];

  const isYoutube = youtubeUrls.some((e) => url.includes(e));
  const isVimeo = url.includes("vimeo");

  console.log("isYoutube ", isYoutube);
  console.log("isVimeo ", isVimeo);

  if (isYoutube) return "isYoutube";
  if (isVimeo) return "isVimeo";
  return false;
};

const getVideoData = (videoType, url) => {
  const video = {};
  if (videoType === "isYoutube") {
    video.type = "isYoutube";
    video.id = url.split("v=")[1].substring(0, 11);
    video.thumbnail_url = `//img.youtube.com/vi/${video.id}/0.jpg`;
  }
  if (videoType === "isVimeo") {
    video.type = "isVimeo";

    fetch("https://vimeo.com/api/oembed.json?url=" + url, { method: "GET" })
      .then((response) => response.json())
      .then((vid) => {
        // console.log(vid);
        if (vid.video_id && vid.thumbnail_url) {
          video.id = vid.video_id;
          video.thumbnail_url = vid.thumbnail_url;
        }
      })
      .catch((error) => console.error("error:", error));
  }
  return video;
};

export const Player = ({ url }) => {
  const [displayVideo, setDisplayVideo] = useState(false);
  // console.log("url here is ", url);
  const videoType = checkVideoType(url);
  const videoData = getVideoData(videoType, url);

  // console.log("video data is ", videoData);

  const handleThumbnailOnClick = () => {
    setDisplayVideo(true);
  };

  const videoBaseUrl =
    videoType === "isYoutube"
      ? "//www.youtube.com/embed/"
      : "https://player.vimeo.com/video/";

  return (
    <VidCont onClick={handleThumbnailOnClick}>
      {displayVideo ? (
        <iframe
          src={`${videoBaseUrl}${videoData.id}?autoplay=1`}
          width="560"
          height="315"
          frameborder="0"
          allowfullscreen
          title="Video "
        ></iframe>
      ) : (
        <>
          <IconWrapper>
            <ImYoutube />
          </IconWrapper>
          <img src={videoData.thumbnail_url} alt="YouTube video" />
        </>
      )}
    </VidCont>
  );
};
