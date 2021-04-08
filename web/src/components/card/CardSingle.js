import { Link } from "gatsby";
// import Img from "gatsby-image";
// import { styled } from "linaria/react";
import React from "react";
// import { EventDate } from "../events/EventDate";
import { CardContent } from "./CardContent";
import { PhotoCont } from "./PhotoCont";

// const ImageCont = styled.div`
//   margin: 0;
//   position: relative;
// `;

// const Btn = styled.div`
//   border: 1px solid #f99d1c;
//   border-radius: 4px;
//   color: #f99d1c;
//   display: block;
//   padding: 8px;
//   text-align: center;
// `;

export const CardSingle = ({
  url,
  extUrl,
  title,
  linkText,
  fixed,
  photo,
  featured,
}) => {
  let cardImage;
  // console.log("linkText ", linkText);
  const hideOtherPhotos = false;
  const photoType = featured ? "featured" : "default";

  // if (props.smallImage) {
  //   // console.log("smallImage", props.smallImage);
  //   cardImage = <Img fixed={props.smallImage.childImageSharp.fixed} alt="" />;
  // } else {
  //   cardImage = <img src="/img/default/default-landscape.jpg" alt="" />;
  // }
  // const pageUrl = url.category.slug.current;
  // const pageTitle = url.category.title;
  return (
    <div>
      {url || extUrl ? (
        <>
          {url ? (
            <Link to={url} className="card-image">
              <PhotoCont photo={photo} photoType={photoType} />
            </Link>
          ) : (
            <a href={extUrl} className="card-image">
              <PhotoCont photo={photo} photoType={photoType} />
            </a>
          )}
        </>
      ) : (
        <PhotoCont photo={photo} photoType={photoType} />
      )}

      <CardContent
        title={title}
        // displayLocation={props.displayLocation}
        // location={props.location}
        linkText={linkText}
        // showPageLink={props.showPageLink}
        url={url}
      />
    </div>
  );
};
