import { Video } from "components/videos";
import React from "react";
import Figure from "./Figure";
import File from "./File";

const serializers = {
  types: {
    mainImage: Figure,
    video: ({ node }) => <Video url={node.url} text={node.text} />,
    pdf: File,
  },
};

export default serializers;
