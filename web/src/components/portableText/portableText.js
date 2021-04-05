import BasePortableText from "@sanity/block-content-to-react";
import React from "react";
import clientConfig from "../../../client-config";
import serializers from "./serializers";

export const PortableText = ({ blocks, className }) => {
  console.log("here ", blocks);
  return (
    <BasePortableText
      blocks={blocks}
      serializers={serializers}
      {...clientConfig.sanity}
    />
  );
};
