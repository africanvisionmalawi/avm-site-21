import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { graphql, Link } from "gatsby";
import { styled } from "linaria/react";
import PropTypes from "prop-types";
import React from "react";
import ReactPlayer from "react-player";
import BlogRollCard from "../components/BlogRollCard";
import { HeroImage } from "../components/common/HeroImage";
import Divider from "../components/Divider";
import Donate from "../components/Donate";
import EventsRollCard from "../components/EventsRollCard";
import homepageStyles from "../components/homepage.module.css";
// import HomepageProjects from "../components/HomepageProjects";
import HomepageProjectsCols from "../components/HomepageProjectsCols";
import Layout from "../components/Layout";
import NavbarLower from "../components/NavbarLower";
import videoStyles from "../components/videoPlayer/videos.module.css";
dayjs.extend(advancedFormat);

const IndexPage = (props) => {
  const { data } = props;
  const { edges: posts } = data.allMarkdownRemark;
  const { edges: events } = data.eventsPosts;
  const { edges: homeContent } = data.homePage;
  const { edges: homeMeta } = data.homePage;
  const heroImage = data.heroImage;
  const heroImageMobile = data.heroImageMobile;
  const promoVideo = homeContent[0].node.frontmatter.promoVideo;
  const ourWork = homeContent[0].node.frontmatter.ourWork;
  const newsItemsLimit = homeContent[0].node.frontmatter.newsItemsLimit;
  const displayNewsItems = homeContent[0].node.frontmatter.displayNewsItems;

  let futureEvents = [];
  let pastEvents = [];

  events.forEach(({ node: event }) => {
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
  });

  const checkNewsLimit = (i) => {
    if (i + 1 <= newsItemsLimit) {
      return true;
    }
    return false;
  };

  return (
    <Layout
      title={homeMeta[0].node.frontmatter.title}
      description={homeMeta[0].node.frontmatter.description}
      article={false}
    >
      <NavbarLower />
      <HomepageMain>
        <div className="container">
          <HeroImage
            desktopImage={heroImage}
            mobileImage={heroImageMobile}
            displayHeroMsg={true}
            heroHeading="Welcome to African Vision Malawi"
            heroHeadingType="h1"
            heroMsg="(known as The Landirani Trust in Malawi)."
            hasMobileImage={true}
          />
          {/* <TopHero></TopHero> */}

          <TopSection>
            <TopVideoSection>
              <TopVideoSectionInner>
                <VideoSection>
                  <SectionHeading>Our vision...</SectionHeading>
                  <p>
                    to see a "healthy, educated and self-sufficient community in
                    Malawi".
                  </p>
                  <SectionHeading>
                    The people of Malawi want to help themselves.
                  </SectionHeading>
                  <p>
                    Since 2005 African Vision Malawi has been helping children
                    &amp; vulnerable people in Malawi, one of the poorest
                    countries in the world.
                  </p>
                  <p>
                    We can empower them to become self-sufficient and
                    independent.
                  </p>
                </VideoSection>
                <VideoSection>
                  <div className={videoStyles.playerWrapper}>
                    <ReactPlayer
                      url={promoVideo}
                      width="100%"
                      height="100%"
                      className={videoStyles.reactPlayer}
                      controls={true}
                    />
                  </div>
                </VideoSection>
              </TopVideoSectionInner>
            </TopVideoSection>
          </TopSection>
          <Donate
            link="https://www.charitycheckout.co.uk/1113786/"
            text="Donate"
            displayImage
          />
          <LowerSection>
            <LowerSectionInner>
              <HomepageProjectsCols
                currentProject="home"
                displayHeading={true}
                ourWork={ourWork}
              />
            </LowerSectionInner>
            <Divider />
          </LowerSection>
          <AltTopSection>
            <div className={`${homepageStyles.latestNewsBox}`}>
              <H2Heading>Latest news</H2Heading>
              <div
                className={homepageStyles.latestNews}
                dangerouslySetInnerHTML={{
                  __html: homeContent[0].node.html,
                }}
              />
            </div>
          </AltTopSection>
          {displayNewsItems && (
            <>
              <section>
                <div className={homepageStyles.newsCont}>
                  <div className={homepageStyles.cardCont}>
                    {posts &&
                      posts.map(({ node: post }, index) => (
                        <>
                          {checkNewsLimit(index) && (
                            <div key={post.fields.slug}>
                              <BlogRollCard post={post} />
                            </div>
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </section>
              <PostsFooter>
                <Link to="/news">View all news</Link>
              </PostsFooter>
            </>
          )}
          {futureEvents && futureEvents.length ? (
            <section>
              <H2Heading>Upcoming events</H2Heading>
              <NewsCont>
                <CardCont>
                  {futureEvents.map((event) => (
                    <EventsRollCard event={event} />
                  ))}
                </CardCont>
              </NewsCont>
              <PostsFooter>
                <Link to="/events">View all events</Link>
              </PostsFooter>
            </section>
          ) : null}
        </div>
      </HomepageMain>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const TopVideoSectionInner = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const VideoSection = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const NewsCont = styled.div`
  @media (min-width: 1200px) {
    display: flex;
    margin: 2rem auto;
    max-width: 1180px;
  }
`;

const CardCont = styled.div`
  align-items: grid-start;
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 30px;
  flex-shrink: 2;
  justify-content: center;
  max-width: 1525px;
  width: 100%;
  @media (min-width: 414px) {
    & {
      grid-template-columns: repeat(auto-fill, 373px);
    }
  }
`;

const HomepageMain = styled.section`
  background: #fff;
`;

const TopSection = styled.section`
  background: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin: 0 auto;
  max-width: 1280px;
  padding: 3em 2em 1em;
  position: relative;
  width: 100%;
`;

const AltTopSection = styled.section`
  background: #f7f7f7;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin: 0 auto 2rem;
  max-width: 1180px;
  padding: 2.5em 2em 1em;
  position: relative;
  width: 100%;
`;

// const LowerSection = styled.section`
//   background: #fff;
//   border-top-left-radius: 6px;
//   border-top-right-radius: 6px;
//   margin: 0 auto;
//   max-width: 1180px;
//   padding: 3em 0;
//   position: relative;
//   width: 100%;
// `;

const LowerSection = styled.section`
  border-bottom: 8px solid #fff;
  position: relative;
  width: 100%;
`;

const LowerSectionInner = styled.div`
  margin: 0 auto;
  max-width: 1180px;
  padding: 3em 0;
  position: relative;
  width: 100%;
`;

const H2Heading = styled.h2`
  margin: 0 0 0.5em;
  text-align: center;
`;

const SectionHeading = styled.h2`
  display: block;
  padding-right: 12px;
`;

const TopVideoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto 120px;
  text-align: center;
  @media (min-width: 778px) {
    text-align: left;
  }
`;

const PostsFooter = styled.div`
  height: 50px;
  margin: 0 auto 3rem;
  max-width: 1180px;
  position: relative;
  &::before {
    bottom: 50%;
    content: "";
    border-bottom: 1px solid #b75906;
    position: absolute;
    width: 100%;
    z-index: 10;
  }

  & a {
    background: #fff;
    border: 2px solid #b75906;
    border-radius: 12px;
    display: inline-block;
    font-size: 0.8em;
    left: 50%;
    margin-left: -80px;
    padding: 4px 24px;
    position: absolute;
    text-align: center;
    top: 10%;
    width: 160px;
    z-index: 20;
  }
`;

export default IndexPage;

export const heroDesktop = graphql`
  fragment heroFluidDesktop on File {
    childImageSharp {
      fluid(maxWidth: 1918, maxHeight: 540, quality: 60) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`;

export const heroMobile = graphql`
  fragment heroFluidMobile on File {
    childImageSharp {
      fluid(maxWidth: 480, maxHeight: 300, quality: 60) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`;

export const lgRectImage = graphql`
  fragment photoTileFixedLgRect on File {
    childImageSharp {
      fluid(maxWidth: 980, maxHeight: 300) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`;

export const mdRectImage = graphql`
  fragment photoTileFixedMdRect on File {
    childImageSharp {
      fluid(maxWidth: 480, maxHeight: 300) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`;

export const pageQuery = graphql`
  query IndexQuery {
    heroImage: file(relativePath: { eq: "hero/homepage-hero-2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1918, quality: 50) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    heroImageMobile: file(
      relativePath: { eq: "hero/homepage-hero-mobile.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 625, quality: 50) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___homepage_sort_order] }
      limit: 6
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          display_on_homepage: { eq: true }
        }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 110)
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            published
            templateKey
            display_on_homepage
            homepage_sort_order
            date(formatString: "MMMM DD, YYYY")
            postMobileImage: featuredImage {
              childImageSharp {
                fixed(width: 280, height: 168) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
            postDesktopImage: featuredImage {
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
    homePage: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "homepage" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            promoVideo
            displayNewsItems
            newsItemsLimit
            ourWork {
              id
              name
              url
              imageId
              excerpt
              featured
            }
          }
          html
        }
      }
    }
    eventsPosts: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "events-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 110)
          id
          fields {
            slug
          }
          frontmatter {
            title
            published
            templateKey
            date
            endDate
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
`;
