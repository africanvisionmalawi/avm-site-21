import { styled } from "linaria/react";
import React from "react";

const Container = styled.div`
  // padding: 0 1rem;
`;

export const HTMLContent = ({ content, className }) => (
  <Container
    className={className}
    dangerouslySetInnerHTML={{
      __html: content
        ? content.replace("http://www.africanvision.org.uk", ``)
        : content,
    }}
  />
);

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

HTMLContent.propTypes = Content.propTypes;

export default Content;
