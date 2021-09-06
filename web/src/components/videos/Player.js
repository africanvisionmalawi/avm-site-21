import { styled } from "linaria/react";
import React, { useState } from "react";

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

const getId = (videoType, url) => {
  if (videoType === "isYoutube") {
    return url.split("v=")[1].substring(0, 11);
    // const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    // var match = url.match(regExp);
    // console.log("url ", url);
    // console.log("match ", match);
    // if (match && match[1].length === 11) {
    //   const id = match[1];
    //   return id;
    // }
  }
  if (videoType === "isVimeo") {
    let id = false;
    let request = new XMLHttpRequest();
    request.open("GET", "https://vimeo.com/api/oembed.json?url=" + url, false);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.responseText);
        if (response.video_id) {
          id = response.video_id;
        }
      }
    };
    request.send();
    return id;
  }
};

const getImageUrl = (videoType, id, url) => {
  if (videoType === "isYoutube") {
    return `//img.youtube.com/vi/${id}/0.jpg`;
  }
  if (videoType === "isVimeo") {
    let thumnailUrl = false;
    let request = new XMLHttpRequest();
    request.open("GET", "https://vimeo.com/api/oembed.json?url=" + url, false);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.responseText);
        if (response.video_id) {
          thumnailUrl = response.thumbnail_url;
        }
      }
    };
    request.send();
    return thumnailUrl;
  }
};

const getVideo = (videoType, id) => {
  console.log("get video");
  if (videoType === "isYouTube") {
    return (
      <iframe
        src={`//www.youtube.com/embed/${id}?autoplay=1`}
        width="560"
        height="315"
        frameborder="0"
        allowfullscreen
        title="Video "
      ></iframe>
    );
  }
  if (videoType === "vimeo") {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${id}`}
        width="640"
        height="360"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        title="video"
      ></iframe>
    );
  }
};

export const Player = ({ url }) => {
  const [displayVideo, setDisplayVideo] = useState(false);
  console.log("url here is ", url);
  const videoType = checkVideoType(url);
  const id = getId(videoType, url);
  const imageUrl = getImageUrl(videoType, id, url);
  console.log("id is ", id);
  console.log("imageUrl is ", imageUrl);

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
          src={`${videoBaseUrl}${id}?autoplay=1`}
          width="560"
          height="315"
          frameborder="0"
          allowfullscreen
          title="Video "
        ></iframe>
      ) : (
        <img src={imageUrl} alt="YouTube video" />
      )}
      {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            className="video-player__btn homeVideoPlayButton"
            width="96"
            height="96"
            viewBox="0 0 48 48"
            style="fill:#000000;"
          >
            <g>
              <path
                style="fill:#FF3D00;"
                d="M 43.199219 33.898438 C 42.800781 36 41.101563 37.601563 39 37.898438 C 35.699219 38.398438 30.199219 39 24 39 C 17.898438 39 12.398438 38.398438 9 37.898438 C 6.898438 37.601563 5.199219 36 4.800781 33.898438 C 4.398438 31.601563 4 28.199219 4 24 C 4 19.800781 4.398438 16.398438 4.800781 14.101563 C 5.199219 12 6.898438 10.398438 9 10.101563 C 12.300781 9.601563 17.800781 9 24 9 C 30.199219 9 35.601563 9.601563 39 10.101563 C 41.101563 10.398438 42.800781 12 43.199219 14.101563 C 43.601563 16.398438 44.101563 19.800781 44.101563 24 C 44 28.199219 43.601563 31.601563 43.199219 33.898438 Z "
              ></path>
              <path
                style=" fill:#FFFFFF;"
                d="M 20 31 L 20 17 L 32 24 Z "
              ></path>
            </g>
          </svg> */}
    </VidCont>
  );
};
