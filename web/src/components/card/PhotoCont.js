import SanityImage from "gatsby-plugin-sanity-image";
import React from "react";

// const ImageCont = styled.div`
//   margin: 0;
//   position: relative;
// `;

// const EventDateCont = styled.div`
//   bottom: 12px;
//   left: calc(50% - 150px);
//   position: absolute;
//   z-index: 100;
// `;

export const PhotoCont = (props) => {
  const { photo, featured } = props;
  console.log("featured here ", featured);
  return (
    <>
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
    </>
  );
};
