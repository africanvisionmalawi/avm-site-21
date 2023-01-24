import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "client.js";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export const Image = ({
  image,
  width = 3500,
  height = 2000,
  sizes = "100vw",
  alt = "",
}) => {
  const imageUrl =
    image &&
    urlFor(image)
      ?.height(height)
      .width(width)
      .fit("crop")
      .url();
  console.log("imageUrl ", imageUrl);
  return (
    <>
      {imageUrl ? (
        <img
          src={imageUrl}
          // width={width}
          // height={height}
          sizes={sizes}
          alt={alt}
        />
      ) : null}
    </>
  );
};
