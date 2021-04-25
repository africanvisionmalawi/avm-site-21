import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { graphql, Link } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { EventDate } from "../components/events/EventDate";
import { GraphQLErrorList } from "../components/graphql/graphql-error-list";
import { Hero } from "../components/Hero";
import Layout from "../components/Layout";
import { PortableText } from "../components/portableText/portableText";
dayjs.extend(advancedFormat);

export const query = graphql`
  query EventTemplateQuery($id: String!) {
    event: sanityEvent(id: { eq: $id }) {
      id
      title
      slug {
        current
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
      telephone
      location
      url
      cost
      date
      endDate
      allDay
      hideTime
      contact
      meta_description
      featured_image {
        _key
        ...ImageWithPreview
      }
    }
  }
`;

const TopHeading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
`;

const TextSection = styled.section`
  background: #fff;
  min-height: 24rem;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 1em 4em;
  }
  @media (min-width: 1040px) {
    padding: 1em 8em;
  }
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const EventDetails = styled.ul`
  background: #f7f7f7;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 16px;
  &,
  & li {
    list-style-type: none;
  }
`;

const BrowseAll = styled.div`
  margin: 2.4em 0;
  text-align: center;
`;

const EventPage = (props) => {
  const { data, errors } = props;
  if (errors) {
    console.log("errors");
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  if (!data) {
    return "Error! data not found";
  }

  const event = data.event;

  // console.log("pastEvents ", pastEvents);

  return (
    <>
      <Layout
        title={event.title}
        description={event.description}
        article={false}
      >
        <article>
          <section>
            {event.featured_image && (
              <Hero
                sanityImage={event.featured_image}
                displayHeroMsg={false}
                heroHeading={event.title}
                heroHeadingType="h1"
              />
            )}
          </section>

          <Main>
            <TextSection>
              <TopHeading>{event.title}</TopHeading>
              <EventDetails>
                <li>
                  <EventDate
                    date={event.date}
                    endDate={event.endDate}
                    hideTime={event.hideTime}
                    allDay={event.allDay}
                  />
                </li>
                {event.location ? <li>Location: {event.location}</li> : null}
                {event.contact ? <li>Contact: {event.contact}</li> : null}
                {event.telephone ? <li>Telephone: {event.telephone}</li> : null}
                {event.cost ? <li>&pound;{event.cost}</li> : null}
              </EventDetails>
              {event._rawBody ? (
                <TextSection>
                  <PortableText blocks={event._rawBody} />
                </TextSection>
              ) : null}

              {/* {tags && tags.length ? <TagsList tags={tags} /> : null} */}
              <BrowseAll>
                <Link to="/events/">View all events</Link>
              </BrowseAll>
            </TextSection>
          </Main>
        </article>
      </Layout>
    </>
  );
};

export default EventPage;