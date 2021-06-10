import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

export const Image = ({ fluid, fixed, alt, src }) => {
  const imageStyle = { borderRadius: "0" };
  //   const { childImageSharp, image } = imageInfo;
  //   const alt = imageInfo ? imageInfo.alt : "";
  if (fluid) {
    return <GatsbyImage image={fluid} style={imageStyle} alt={alt} />;
  }

  if (fixed) {
    return <GatsbyImage image={fixed} style={imageStyle} alt={alt} />;
  }

  if (src) return <img style={imageStyle} src={src} alt={alt} />;

  return null;
};
