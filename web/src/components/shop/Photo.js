import SanityImage from "gatsby-plugin-sanity-image";
import React from "react";

export const Photo = (props) => {
  const { photo, photoType } = props;

  const photoSizes = {
    default: {
      w: 280,
      h: 280,
    },
    featured: {
      w: 600,
      h: 600,
    },
  };

  return (
    <>
      {photo ? (
        <SanityImage
          {...photo}
          width={photoSizes[photoType].w}
          height={photoSizes[photoType].h}
          alt={photo.alt}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      ) : null}
    </>
  );
};
