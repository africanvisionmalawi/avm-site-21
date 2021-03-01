import { graphql } from "gatsby";
// import { Link } from 'gatsby'
// import pageBasicStyles from "../components/pageBasic.module.css";
// import { styled } from "linaria/react";
import { styled } from "linaria/react";
import PropTypes from "prop-types";
import React from "react";
import { HeroImage } from "../components/common/HeroImage";
import Content, { HTMLContent } from "../components/Content";
import Donate from "../components/Donate";
import FeaturedProjectsTiles from "../components/FeaturedProjectsTiles";
import Gallery from "../components/gallery/Gallery";
import Layout from "../components/Layout";
// import FeaturedProjects from "../components/FeaturedProjects";
import NavbarLower from "../components/NavbarLower";
// import Lightbox from "../components/lightbox"
import PageLinksWithPhotos from "../components/PageLinksWithPhotos";
import Videos from "../components/videoPlayer/Videos";

const FeaturedProjectsTemplate = ({
  heroImage,
  heroImageMobile,
  hasMobileImage,
  heroMsg,
  title,
  currentProject,
  content,
  videos,
  gallery,
  links,
  contentComponent,
  path,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div
      className="section section--gradient"
      style={{
        paddingBottom: "0",
      }}
    >
      <NavbarLower path={path} />
      <Container>
        <section>
          <HeroImage
            heroImage={heroImage}
            desktopImage={heroImage}
            mobileImage={heroImageMobile}
            hasMobileImage={hasMobileImage}
            displayHeroMsg={true}
            heroHeading={title}
            heroHeadingType="h1"
          />
        </section>

        <article className="content">
          <Main>
            <TextSection>
              <PageContent className="content" content={content} />{" "}
            </TextSection>
            <Donate
              link="https://www.charitycheckout.co.uk/1113786/"
              text="Donate"
              displayImage
            />
          </Main>

          {videos.length && (
            <Section
              className="full-width-container margin-top-0"
              style={{
                background: "#fff",
                // borderBottom: "1px solid #e5e5e5",
                marginBottom: "0",
                paddingBottom: "30px",
              }}
            >
              <div className="column is-10">
                <Videos videos={videos} />
              </div>
            </Section>
          )}
          {links.length && (
            <Section
              className="full-width-container margin-top-0"
              style={{
                background: "#fff",
                // borderBottom: "1px solid #e5e5e5",
                marginBottom: "0",
                paddingBottom: "90px",
              }}
            >
              <div className="column is-10">
                <PageLinksWithPhotos pagelinks={links} />
              </div>
            </Section>
          )}
          {gallery.length && (
            <Gallery gallery={gallery} initialState={{ showDialog: false }} />
          )}
        </article>
        <FeaturedProjectsTiles currentProject="default" displayHeading={true} />
      </Container>
    </div>
  );
};

// FeaturedProjectsTemplate.propTypes = {
//   heroImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   heroMsg: PropTypes.string,
//   title: PropTypes.string,
//   currentProject: PropTypes.string,
//   content: PropTypes.string,
//   videos: PropTypes.array,
//   gallery: PropTypes.array,
//   links: PropTypes.array,
// };

const FeaturedProjectsPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout
      title={`${post.frontmatter.title}`}
      description={post.frontmatter.description}
      article={false}
    >
      <FeaturedProjectsTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        currentProject={post.frontmatter.currentProject}
        content={post.html}
        heroImage={post.frontmatter.heroImage}
        heroImageMobile={post.frontmatter.heroImageMobile}
        hasMobileImage={post.frontmatter.hasMobileImage}
        heroMsg={post.frontmatter.heroMsg}
        videos={post.frontmatter.videos}
        gallery={post.frontmatter.gallery}
        links={post.frontmatter.links}
        path={post.fields.slug}
      />
    </Layout>
  );
};

FeaturedProjectsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

const Section = styled.section`
  margin: 0 auto;
  max-width: 1180px;
  width: 100%;
`;

const TextSection = styled.section`
  background: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  min-height: 24rem;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 2em 4em;
  }
  @media (min-width: 1040px) {
    padding: 4em 8em;
  }
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const Container = styled.div``;

// const GalleryCont = styled.section`
// background: #f7f7f7;
//   border-top: 1px solid #d7dade;
//   border-bottom: 1px solid #d7dade;
//   width: 100%;
// `;

// const GalleryInner = styled.div`
//   margin: 0 auto;
//   max-width: 1050px;
//   width: 100%;
// `

export default FeaturedProjectsPage;

export const FeaturedProjectsPageQuery = graphql`
  query FeaturedProjectsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        heroImage {
          childImageSharp {
            fluid(maxWidth: 1918, maxHeight: 540, quality: 60) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        heroImageMobile {
          childImageSharp {
            fluid(maxWidth: 625, maxHeight: 540, quality: 60) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        heroMsg
        hasMobileImage
        currentProject
        videos {
          videourl
          videotext
        }
        gallery {
          photo {
            childImageSharp {
              fluid(maxWidth: 800, quality: 60) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
          alt
        }
        links {
          linkTitle
          smallImage: photo {
            childImageSharp {
              fixed(width: 250, height: 125) {
                ...GatsbyImageSharpFixed_withWebp_tracedSVG
              }
            }
          }
          linkText
          url
        }
      }
    }
  }
`;
