import { Link } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { PortableText } from "..//portableText/portableText";
import styles from "../pageLinks/pagelinks.module.css";

const Content = styled.div`
  padding: 1rem;
  @media (min-width: 576px) {
    padding: 1rem 3px;
  }
`;

const Heading = styled.h3`
  margin-bottom: 0;
`;

export const CardContent = ({ title, url, linkText }) => {
  return (
    <Content>
      {title ? <Heading>{title}</Heading> : null}
      {/* {props.displayLocation && <span>{props.location}</span>} */}
      {linkText ? <PortableText blocks={linkText} /> : null}
      {/* TODO: add hideLink here */}
      {url ? (
        <Link to={url} className={styles.btn}>
          Find out more
        </Link>
      ) : null}
    </Content>
  );
};
