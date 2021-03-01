import { Link } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import pageLinksStyles from "../pagelinks.module.css";

const Content = styled.div`
  padding: 1rem;
  @media (min-width: 576px) {
    padding: 1rem 3px;
  }
`;

const Heading = styled.h3`
  margin-bottom: 0;
`;

const CardContent = (props) => {
  return (
    <Content>
      <Heading>{props.title}</Heading>
      {props.displayLocation && <span>{props.location}</span>}
      <p>{props.linkText}</p>
      {props.showPageLink && (
        <Link to={props.url} className={pageLinksStyles.btn}>
          Find out more
        </Link>
      )}
    </Content>
  );
};

export default CardContent;
