import { Video } from "components/videos";
import React from "react";
import Figure from "./Figure";

const serializers = {
  types: {
    mainImage: Figure,
    video: ({ node }) => <Video url={node.url} text={node.text} />,
  },
};

export default serializers;
