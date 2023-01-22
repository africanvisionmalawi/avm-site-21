import { Video } from "components/videos";
import Figure from "./Figure";
import File from "./File";

const components = {
  types: {
    mainImage: Figure,
    video: ({ node }) => <Video url={node.url} text={node.text} />,
    pdf: File,
  },
  marks: {
    internalLink: ({ mark, children }) => {
      if (mark?.reference) {
        const { slug = {}, category = {} } = mark.reference;
        const href = `/${
          category?.slug.current ? category?.slug.current + "/" : ""
        }${slug.current || ""}/`;
        return <a href={href}>{children}</a>;
      }
      return null;
    },
  },
};

export default components;
