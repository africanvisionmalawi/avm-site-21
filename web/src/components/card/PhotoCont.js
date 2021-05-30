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
  const { photo, photoType } = props;

  const photoSizes = {
    default: {
      w: 280,
      h: 125,
    },
    featured: {
      w: 560,
      h: 280,
    },
    news: {
      w: 371,
      h: 222,
    },
    event: {
      w: 371,
      h: 222,
    },
    ourWork: {
      w: 381,
      h: 240,
      cssW: "",
    },
  };
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
          width={photoSizes[photoType].w}
          height={photoSizes[photoType].h}
          alt={photo.alt}
          style={{
            width: `100%`,
            height: "auto",
            objectFit: "cover",
          }}
          sizes={`${photoSizes[photoType].w}px`}
        />
      ) : null}
    </>
  );
};
