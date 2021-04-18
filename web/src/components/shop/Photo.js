import SanityImage from "gatsby-plugin-sanity-image";
import React from "react";

export const Photo = (props) => {
  const { photo } = props;

  return (
    <>
      {photo ? (
        <SanityImage
          {...photo}
          width={600}
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
