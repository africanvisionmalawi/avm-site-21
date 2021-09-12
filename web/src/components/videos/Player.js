import { styled } from "linaria/react";
import React, { useEffect, useState } from "react";
import { ImYoutube } from "react-icons/im";

const VIDEO_TYPE_YOUTUBE = "isYouTube";
const VIDEO_TYPE_VIMEO = "isVimeo";

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

const Loading = styled.div`
  background: #cacaca;
`;

const checkVideoType = (url) => {
  const youtubeUrls = ["youtube", "youtu.be"];
  const vimeoUrls = ["vimeo"];

  const isYoutube = youtubeUrls.some((e) => url.includes(e));
  const isVimeo = url.includes("vimeo");
  return isYoutube ? VIDEO_TYPE_YOUTUBE : VIDEO_TYPE_VIMEO;
};

export const Player = ({ url }) => {
  const [displayVideo, setDisplayVideo] = useState(false);
  const [displayImage, setDisplayImage] = useState(false);
  const videoType = checkVideoType(url);
  const [video, setVideo] = useState({
    id: "",
    thumbnail_url: "",
    baseUrl: "",
  });

  const handleThumbnailOnClick = () => {
    setDisplayVideo(true);
  };

  const getVideoData = (videoType, url) => {
    if (videoType === VIDEO_TYPE_YOUTUBE) {
      setVideo({
        id: url.split("v=")[1].substring(0, 11),
        baseUrl: "//www.youtube.com/embed/",
        thumbnail_url: `//img.youtube.com/vi/${video.id}/0.jpg`,
      });
    }
    if (videoType === VIDEO_TYPE_VIMEO) {
      fetch("https://vimeo.com/api/oembed.json?url=" + url, { method: "GET" })
        .then((response) => response.json())
        .then((vid) => {
          setVideo({
            id: vid.video_id,
            baseUrl: "https://player.vimeo.com/video/",
            thumbnail_url: vid.thumbnail_url,
          });
          console.log("video.thumbnail_url ", video.thumbnail_url);
        })
        .catch((error) => console.error("error:", error));
    }
  };

  useEffect(() => {
    getVideoData(videoType, url);
    setDisplayImage(true);
  }, []);

  return (
    <VidCont onClick={handleThumbnailOnClick}>
      {displayVideo ? (
        <iframe
          src={`${video.baseUrl}${video.id}?autoplay=1`}
          width="560"
          height="315"
          frameborder="0"
          allowfullscreen
          title="Video "
        ></iframe>
      ) : displayImage ? (
        <>
          <IconWrapper>
            <ImYoutube />
          </IconWrapper>
          <img
            src={video.thumbnail_url}
            alt={
              videoType === VIDEO_TYPE_YOUTUBE ? "Youtube video" : "Vimeo video"
            }
          />
        </>
      ) : (
        <Loading />
      )}
    </VidCont>
  );
};
