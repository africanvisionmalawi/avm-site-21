// import { Link } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
// import { PortableText } from "..//portableText/portableText";

const Content = styled.div`
  padding: 1rem;
  @media (min-width: 576px) {
    padding: 1rem 3px;
  }
`;

const Heading = styled.h3`
  margin-bottom: 0;
`;

export const CardContent = (props) => {
  return (
    <Content>
      <Heading>{props.title}</Heading>
      {props.displayLocation && <span>{props.location}</span>}
      {/* portable text goes here */}
      {props.showPageLink && (
        // <Link to={props.url} className={styles.btn}>
        //   Find out more
        // </Link>
        <div>find out more</div>
      )}
    </Content>
  );
};
