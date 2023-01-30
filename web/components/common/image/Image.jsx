import { getImageProps } from "components/common/image/getImageProps";
// const builder = imageUrlBuilder(sanityClient);

// function urlFor(source) {
//   return builder.image(source);
// }

export const Image = ({
  image,
  maxWidth,
  maxHeight,
  // sizes = "100vw",
  alt = "",
  priority,
}) => {
  // const imageUrl =
  //   image &&
  //   urlFor(image)
  //     ?.height(height)
  //     .width(width)
  //     .fit("crop")
  //     .auto("format")
  //     .quality(40)
  //     .url();

  const { src, srcset, sizes, width, height } = getImageProps({
    image,
    maxWidth,
  });
  // console.log("imageUrl ", imageUrl);
  return (
    <>
      {image ? (
        <img
          style={{ height: "auto" }} // could be a global style
          loading="lazy"
          alt={image.alt || " "}
          {
            // Pass src, srcset, width, height and sizes to the image element
            ...getImageProps({
              image,
              maxWidth,
            })
          }
        />
      ) : null}
    </>
  );
};
