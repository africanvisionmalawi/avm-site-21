import { Image } from "components/common/image/Image";

export default ({ node }) => {
  if (!node || !node.asset || !node.asset._id) {
    return null;
  }

  return (
    <figure>
      <Image image={image} alt={node.alt} />
      <figcaption>{node.caption}</figcaption>
    </figure>
  );
};
