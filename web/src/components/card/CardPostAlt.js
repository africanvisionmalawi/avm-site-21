import { Link } from "gatsby";
import { styled } from "linaria/react";
// import Img from "gatsby-image";
// import { styled } from "linaria/react";
import React from "react";
import styles from "../pageLinks/pageLinks.module.css";
import { PortableText } from "../portableText/portableText";
import { PhotoCont } from "./PhotoCont";

const Content = styled.div`
  padding: 1rem;
  @media (min-width: 576px) {
    padding: 1rem 3px;
  }
`;

const Heading = styled.h3`
  margin-bottom: 0;
`;

export const CardPostAlt = ({
  type,
  title,
  excerpt,
  slug,
  publishDate,
  photo,
}) => {
  const url = `/news/${slug}/`;

  const text =
    type === "sanity" ? (
      <PortableText blocks={excerpt} />
    ) : (
      <div>{excerpt}</div>
    );

  return (
    <div>
      {slug ? (
        <>
          <Link to={url} className="card-image">
            {photo && typeof photo === "object" ? (
              <PhotoCont photo={photo} photoType="news" />
            ) : null}
          </Link>
        </>
      ) : photo && typeof photo === "object" ? (
        <PhotoCont photo={photo} photoType="news" />
      ) : null}
      <Content>
        {title ? <Heading>{title}</Heading> : null}

        {excerpt ? text : null}
        {/* TODO: add hideLink here */}
        {slug ? (
          <Link to={url} className={styles.btn}>
            Find out more
          </Link>
        ) : null}
      </Content>
    </div>
  );
};
