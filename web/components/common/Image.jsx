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
  size = "100vw",
  alt = "",
}) => {
  const imageUrl =
    image &&
    urlFor(image)
      ?.height(height)
      .width(width)
      .fit("crop")
      .url();
  return (
    <>
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={width}
          height={height}
          sizes={size}
          alt={alt}
        />
      ) : null}
    </>
  );
};
