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
  color: #3273dc;
  display: block;
  font-weight: bold;
`;

const EventsRow = (props) => {
  const { event } = props;
  return (
    <article className={postStyles.list__item}>
      {event.frontmatter.photo && (
        <Img
          fixed={event.frontmatter.photo.childImageSharp.fixed}
          className={postStyles.list__aside}
        />
      )}
      <div className={postStyles.list__main}>
        <p>
          <Link
            className="title has-text-primary is-size-4"
            to={event.fields.slug}
          >
            {event.frontmatter.title}
          </Link>
          <span> &bull; </span>
          <span className="subtitle is-size-5 is-block">
            <EventDate
              date={event.frontmatter.date}
              endDate={event.frontmatter.endDate}
            />
          </span>
          <span className="subtitle">{event.frontmatter.location}</span>
        </p>
        <p>
          {event.excerpt}
          <br />
          <br />
          <Link className="button" to={event.fields.slug}>
            Keep Reading →
          </Link>
        </p>
      </div>
    </article>
  );
};

EventsRow.propTypes = {
  events: PropTypes.object,
};

export default EventsRow;
