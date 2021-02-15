import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
// import PropTypes from "prop-types";
// import { v4 } from 'uuid'
import { Link } from "gatsby";
// import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Img from "gatsby-image";
// import eventsColStyles from "./eventsCol.module.css";
// import postStyles from "./posts.module.css";
import { styled } from "linaria/react";
import React from "react";
import EventDate from "./EventDate";
dayjs.extend(advancedFormat);

const CardWide = (props) => {
  const { content } = props;
  return (
    <Article>
      {content.frontmatter.photo && (
        <Link to={content.fields.slug}>
          <ImgContainer>
            <EventDateCont>
              <EventDate
                date={content.frontmatter.date}
                endDate={content.frontmatter.endDate}
                layout="card"
              />
            </EventDateCont>
            <Img fluid={content.frontmatter.photo.childImageSharp.fluid} />
          </ImgContainer>
        </Link>
      )}
      <Header>
        <Heading>
          <Link to={content.fields.slug}>{content.frontmatter.title}</Link>
        </Heading>
        <span className="subtitle">{content.frontmatter.location}</span>
      </Header>
      <p>
        {content.excerpt}
        <Link className="button" to={content.fields.slug}>
          Keep Reading →
        </Link>
      </p>
    </Article>
  );
};

const Article = styled.article`
  margin: 0 auto 30px;
  max-width: 840px;
  padding: 7.6923%;
  width: 100%;
`;

const ImgContainer = styled.div`
  border-top-left-radius: 45px;
  border-top-right-radius: 45px;
  max-height: 370px;
  overflow: hidden;
  position: relative;
`;

const EventDateCont = styled.div`
  bottom: 12px;
  left: calc(50% - 150px);
  position: absolute;
  z-index: 100;
`;

const Header = styled.div`
  margin-bottom: 1.4em;
`;

const Heading = styled.h2`
  color: #2b2d32;
  font-size: 1.8em;
  margin: 1em 0 0.4em;
  a:link,
  a:visited {
    color: #2b2d32;
  }
`;

// const ColLink = styled.span`
//   color: #3273dc;
//   display: block;
//   font-weight: bold;
// `;

export default CardWide;
