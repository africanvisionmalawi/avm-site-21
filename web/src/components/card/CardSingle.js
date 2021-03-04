import { Link } from "gatsby";
// import Img from "gatsby-image";
import { styled } from "linaria/react";
import React from "react";
// import { EventDate } from "../events/EventDate";
// import { CardContent } from "./CardContent";

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

export const CardSingle = ({ url, title }) => {
  let cardImage;
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
      {url && (
        <Link to={url} className="card-image">
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
              {/* {cardImage} */}
            </ImageCont>
          )}
        </Link>
      )}
      here
      {/* <CardContent
        title={props.title}
        displayLocation={props.displayLocation}
        location={props.location}
        linkText={props.linkText}
        showPageLink={props.showPageLink}
        url={props.url}
      /> */}
    </div>
  );
};
