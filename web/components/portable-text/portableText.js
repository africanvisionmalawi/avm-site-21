import BasePortableText from "@sanity/block-content-to-react";
import serializers from "./serializers";
import clientConfig from "/client-config";

export const PortableText = ({ blocks }) => {
  return (
    <BasePortableText
      blocks={blocks}
      serializers={serializers}
      {...clientConfig.sanity}
    />
  );
};
