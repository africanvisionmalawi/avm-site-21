import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
// import { v4 } from 'uuid'
import { Link } from "gatsby";
// import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Img from "gatsby-image";
import { styled } from "linaria/react";
import PropTypes from "prop-types";
import React from "react";
import EventDate from "./EventDate";
// import eventsColStyles from "./eventsCol.module.css";
import postStyles from "./posts.module.css";
dayjs.extend(advancedFormat);

const ColLink = styled.span`
  // color: #3273dc;
  display: block;
  // font-weight: bold;
`;

const ImgCont = styled.div`
  border: 1px solid #cacaca;
  & .gatsby-image-wrapper {
    display: block !important;
  }
  margin-bottom: 0.8em;
`;

const Heading = styled.h3`
  margin-bottom: 0;
`;

const EventsCol = ({ event }) => {
  let sources;
  if (
    event.frontmatter.eventMobileImage &&
    event.frontmatter.eventDesktopImage
  ) {
    sources = [
      event.frontmatter.eventMobileImage.childImageSharp.fixed,
      {
        ...event.frontmatter.eventDesktopImage.childImageSharp.fixed,
        media: `(min-width: 414px)`,
      },
    ];
  }
  return (
    <div className={postStyles.card} key={event.fields.slug}>
      <article className={postStyles.cardContent}>
        <Link to={event.fields.slug}>
          {sources && (
            <ImgCont>
              <Img fixed={sources} />
            </ImgCont>
          )}

          <Heading>{event.frontmatter.title}</Heading>
          <span className={postStyles.cardDate}>
            <EventDate
              date={event.frontmatter.date}
              endDate={event.frontmatter.endDate}
            />
          </span>
          <p className={postStyles.cardExcerpt}>{event.excerpt}</p>
          <ColLink>Find out more</ColLink>
        </Link>
      </article>
    </div>
  );
};

EventsCol.propTypes = {
  events: PropTypes.object,
};

export default EventsCol;
