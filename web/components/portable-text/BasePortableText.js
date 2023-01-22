import BasePortableText from "@sanity/block-content-to-react";
import components from "components/portable-text/Components";
import clientConfig from "/client-config";

export const PortableText = ({ blocks }) => {
  return (
    <BasePortableText
      blocks={blocks}
      components={components}
      {...clientConfig.sanity}
    />
  );
};
