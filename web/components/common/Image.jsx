import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "client.js";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export const Image = ({
  image,
  width = 3000,
  height = 300,
  sizes = "100vw",
  alt = "",
  priority,
}) => {
  const imageUrl =
    image &&
    urlFor(image)
      ?.height(height)
      .width(width)
      .fit("crop")
      .auto("format")
      .quality(40)
      .url();
  // console.log("imageUrl ", imageUrl);
  return (
    <>
      {imageUrl ? (
        <img
          src={imageUrl}
          // width={width}
          // height={height}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
        />
      ) : null}
    </>
  );
};
