import { Image } from "components/common/image/Image";

export default ({ value }) => {
  const { _key, alt, asset, caption } = value;

  if (!asset) return null;

  return (
    <figure>
      <Image image={value} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};
