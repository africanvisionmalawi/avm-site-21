import { Link } from "gatsby";
import SanityImage from "gatsby-plugin-sanity-image";
// import Img from "gatsby-image";
import { styled } from "linaria/react";
import React from "react";
// import { EventDate } from "../events/EventDate";
import { CardContent } from "./CardContent";

const ImageCont = styled.div`
  margin: 0;
  position: relative;
`;

const EventDateCont = styled.div`
  bottom: 12px;
  left: calc(50% - 150px);
  position: absolute;
  z-index: 100;
`;

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
        <Link to={url || extUrl} className="card-image">
          {!hideOtherPhotos && (
            <ImageCont>
              {/* {props.displayDate && (
                <EventDateCont>
                  <EventDate
                    date={props.date}
                    endDate={props.endDate}
                    layout="card"
                  />
                </EventDateCont>
              )} */}
              {photo ? (
                <SanityImage
                  {...photo}
                  width={featured ? 560 : 250}
                  height={featured ? 280 : 125}
                  alt={photo.alt}
                />
              ) : null}
            </ImageCont>
          )}
        </Link>
      ) : null}

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
