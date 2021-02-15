// import Img from "gatsby-image";
// import EventDate from "./EventDate";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { graphql, StaticQuery } from "gatsby";
// import getEvents from "../utils/helpers";
import { styled } from "linaria/react";
import PropTypes from "prop-types";
import React from "react";
// import { SectionTop } from "../components/common/SectionTop";
import CardDouble from "./card/CardDouble";
import pageLinksStyles from "./pagelinks.module.css";
import postStyles from "./posts.module.css";
dayjs.extend(advancedFormat);

const NoEventsNotice = (props) => {
  return <p>{props.msg}</p>;
};

const EventsRoll = (props) => {
  const { data } = props;
  const { edges: events } = data.allMarkdownRemark;

  let futureEvents = [];
  let pastEvents = [];
  events.forEach(({ node: event }) => {
    if (event.frontmatter.published === true) {
      if (event.frontmatter.endDate) {
        if (
          dayjs(event.frontmatter.endDate, "MMMM DD, YYYY").isAfter(
            dayjs().format("MMMM DD, YYYY")
          )
        ) {
          futureEvents.push(event);
        } else {
          pastEvents.push(event);
        }
      } else {
        if (
          dayjs(event.frontmatter.date, "MMMM DD, YYYY").isAfter(
            dayjs().format("MMMM DD, YYYY")
          )
        ) {
          futureEvents.push(event);
        } else {
          pastEvents.push(event);
        }
      }
    }
  });

  // console.log("future ", futureEvents);

  // console.log("past", pastEvents);
  // console.log(futureEvents);

  return (
    <div>
      <TopSection>
        <Heading>Future events</Heading>
      </TopSection>
      <div className={pageLinksStyles.cardContWide}>
        {futureEvents.length ? (
          futureEvents.map((event) => (
            <div className={postStyles.events} key={event.id}>
              {/* <CardWide content={event} /> */}
              <CardDouble
                largeImage={event.frontmatter.photo}
                url={event.fields.slug}
                title={event.frontmatter.title}
                linkText={event.excerpt}
                showPageLink={true}
                date={event.frontmatter.date}
                endDate={event.frontmatter.endDate}
                displayDate={true}
                location={event.frontmatter.location}
                displayLocation={true}
                multidate_event={event.frontmatter.multidate_event}
                contact={event.frontmatter.contact}
                telephone={event.frontmatter.telephone}
                allDay={event.frontmatter.allDay}
              />
            </div>
          ))
        ) : (
          <NoEventsNotice msg="Sorry, no events available at present." />
        )}
      </div>
      <Heading>Past events</Heading>
      <div className={pageLinksStyles.cardContWide}>
        {pastEvents.length ? (
          pastEvents.map((event) => (
            <div className={postStyles.events} key={event.id}>
              <CardDouble
                largeImage={event.frontmatter.photo}
                url={event.fields.slug}
                title={event.frontmatter.title}
                linkText={event.excerpt}
                showPageLink={true}
                date={event.frontmatter.date}
                endDate={event.frontmatter.endDate}
                displayDate={true}
                location={event.frontmatter.location}
                displayLocation={true}
                multidate_event={event.frontmatter.multidate_event}
                contact={event.frontmatter.contact}
                telephone={event.frontmatter.telephone}
                allDay={event.frontmatter.allDay}
              />
            </div>
          ))
        ) : (
          <NoEventsNotice msg="Sorry, no events available at present." />
        )}
      </div>
    </div>
  );
};

EventsRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const Heading = styled.h2`
  font-size: 2.4em;
  margin: 0;
  text-align: center;
`;

const TopSection = styled.div`
  margin: 4rem 1rem 1rem;
`;

export default () => (
  <StaticQuery
    query={graphql`
      query EventsRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "events-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                templateKey
                layout
                contact
                telephone
                published
                title
                date
                endDate
                multidate_event
                allDay
                location
                cost
                url
                description
                tags
                photo {
                  childImageSharp {
                    fluid(maxWidth: 700) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <EventsRoll data={data} count={count} />}
  />
);
