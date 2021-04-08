import { Link } from "gatsby";
// import Img from "gatsby-image";
// import { styled } from "linaria/react";
import React from "react";
// import { EventDate } from "../events/EventDate";
import { CardContent } from "./CardContent";
import { PhotoCont } from "./PhotoCont";

export const CardPost = (props) => {
  const { slug, title, _rawExcerpt, photo } = props.post;
  console.log("cardpost ", props);
  return (
    <div>
      {slug ? (
        <>
          <Link to={slug.current} className="card-image">
            <PhotoCont photo={photo} photoType="news" />
          </Link>
        </>
      ) : (
        <PhotoCont photo={photo} photoType="news" />
      )}

      <CardContent title={title} linkText={_rawExcerpt} url={slug.current} />
    </div>
  );
};
