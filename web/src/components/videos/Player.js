import { styled } from "linaria/react";
import React, { useState } from "react";
import { ImPlay } from "react-icons/im";

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
    let request = new XMLHttpRequest();
    request.open("GET", "https://vimeo.com/api/oembed.json?url=" + url, false);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.responseText);
        if (response.video_id) {
          video.id = response.video_id;
          video.thumbnail_url = response.thumbnail_url;
        }
      }
    };
    request.send();
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
            <ImPlay />
          </IconWrapper>
          <img src={videoData.thumbnail_url} alt="YouTube video" />
        </>
      )}
    </VidCont>
  );
};
