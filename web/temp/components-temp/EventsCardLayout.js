// import Img from "gatsby-image";
// import EventDate from "./EventDate";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { graphql, StaticQuery } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import EventsRollCard from "./EventsRollCard";
import homepageStyles from "./homepage.module.css";
import postStyles from "./posts.module.css";
dayjs.extend(advancedFormat);

const EventsCardLayout = (props) => {
  const { data } = props;
  const { edges: events } = data.allMarkdownRemark;

  let futureEvents = [];
  let pastEvents = [];
  events.forEach(({ node: event }) => {
    if (
      dayjs(event.frontmatter.date, "MMMM DD, YYYY").isAfter(
        dayjs().format("MMMM DD, YYYY")
      )
    ) {
      futureEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  });

  // console.log(pastEvents);
  // console.log(futureEvents);

  return (
    <section className={postStyles.list}>
      <Heading>Future events</Heading>
      <div className={homepageStyles.cardCont}>
        {futureEvents &&
          futureEvents.map((event) => (
            <EventsRollCard event={event} key={event.id} />
          ))}
      </div>
      <Heading>Past events</Heading>
      <div className={homepageStyles.cardCont}>
        {pastEvents &&
          pastEvents.map((event) => (
            <EventsRollCard event={event} key={event.id} />
          ))}
      </div>
    </section>
  );
};

const Heading = styled.h2`
  // font-size: 3.4em;
  // margin: 0;
  text-align: center;
`;

export default () => (
  <StaticQuery
    query={graphql`
      query EventsCardLayoutQuery {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___date] }
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
                title
                date
                endDate
                hideTime
                allDay
                location
                cost
                url
                description
                tags
                photo {
                  childImageSharp {
                    fluid(maxWidth: 700) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
                eventMobileImage: photo {
                  childImageSharp {
                    fixed(width: 280) {
                      ...GatsbyImageSharpFixed_withWebp_tracedSVG
                    }
                  }
                }
                eventDesktopImage: photo {
                  childImageSharp {
                    fixed(width: 371, height: 222) {
                      ...GatsbyImageSharpFixed_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <EventsCardLayout data={data} count={count} />}
  />
);
