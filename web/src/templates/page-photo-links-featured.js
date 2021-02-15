// import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { SectionTop } from "../components/common/SectionTop";
import Content, { HTMLContent } from "../components/Content";
import Donate from "../components/Donate";
import FeaturedProjectsTiles from "../components/FeaturedProjectsTiles";
import HeadingH1 from "../components/HeadingH1";
import Layout from "../components/Layout";
import NavbarLower from "../components/NavbarLower";
// import EventsCardLayout from "../components/EventsCardLayout";
// import { Link } from 'gatsby'
import pageBasicStyles from "../components/pageBasic.module.css";
import PageLinksWithPhotos from "../components/PageLinksWithPhotos";
import { getFeaturedLinks } from "../utils/helpers";

const Section = styled.section`
  margin: 0 auto;
  max-width: 1180px;
  padding-bottom: 30px;
  width: 100%;
`;

const TextSection = styled.section`
  background: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1em 2em;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 2em 4em;
  }
  @media (min-width: 1040px) {
    padding: 4em 8em;
  }
`;

const PagePhotoLinksFeaturedTemplate = (props) => {
  const {
    title,
    content,
    links,
    contentComponent,
    path,
    displayOptions,
  } = props;
  const PageContent = contentComponent || Content;

  const featuredLinks = getFeaturedLinks(links, true);
  const otherLinks = getFeaturedLinks(links, false);

  return (
    <div
      className="section section--gradient"
      style={{
        paddingBottom: "0",
      }}
    >
      <NavbarLower path={path} />
      <div className="container">
        <article className="content">
          <div className="columns">
            <main className={`column is-9 ${pageBasicStyles.main}`}>
              <SectionTop>
                <HeadingH1 text={title} />
                <PageContent className="content" content={content} />{" "}
              </SectionTop>
            </main>
          </div>
          {featuredLinks.length && (
            <Section>
              <PageLinksWithPhotos
                pagelinks={featuredLinks}
                displayHeading={displayOptions.displayHeadings}
                showPageLink={displayOptions.showPageLink}
                heading={displayOptions.heading1}
                featured={true}
                boxBackground={displayOptions.boxBackground}
              />
            </Section>
          )}
          {otherLinks.length && (
            <Section className="full-width-container margin-top-0">
              <PageLinksWithPhotos
                pagelinks={otherLinks}
                displayHeading={displayOptions.displayHeadings}
                showPageLink={displayOptions.showPageLink}
                heading={displayOptions.heading2}
                featured={false}
                boxBackground={displayOptions.boxBackground}
                hideOtherPhotos={displayOptions.hideOtherPhotos}
              />
            </Section>
          )}
        </article>
        <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        />

        <FeaturedProjectsTiles displayHeading={true} />
      </div>
    </div>
  );
};

const PagePhotoLinksFeatured = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout
      title={`${post.frontmatter.title}`}
      description={post.frontmatter.description}
      article={false}
    >
      <PagePhotoLinksFeaturedTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        displayOptions={post.frontmatter.displayOptions}
        content={post.html}
        links={post.frontmatter.links}
        path={post.fields.slug}
      />
    </Layout>
  );
};

export default PagePhotoLinksFeatured;

export const PagePhotoLinksFeaturedQuery = graphql`
  query PagePhotoLinksFeatured($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        displayOptions {
          showPageLink
          displayHeadings
          heading1
          heading2
          boxBackground
        }
        description
        links {
          linkTitle
          largeImage: photo {
            childImageSharp {
              fluid(maxWidth: 560, maxHeight: 280) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
          smallImage: photo {
            childImageSharp {
              fixed(width: 250, height: 125) {
                ...GatsbyImageSharpFixed_withWebp_tracedSVG
              }
            }
          }
          linkText
          url
          featured
        }
      }
    }
  }
`;
