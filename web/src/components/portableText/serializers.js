import { Video } from "components/videos";
import { Link } from "gatsby";
import React from "react";
import Figure from "./Figure";
import File from "./File";

const serializers = {
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
        return <Link to={href}>{children}</Link>;
      }
      return null;
    },
  },
};

export default serializers;
