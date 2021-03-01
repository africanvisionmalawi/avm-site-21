import { graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { styled } from "linaria/react";
import PropTypes from "prop-types";
import React from "react";
import Content, { HTMLContent } from "../components/Content";
import Donate from "../components/Donate";
// import FeaturedProjects from "../components/FeaturedProjects";
import FeaturedProjectsTiles from "../components/FeaturedProjectsTiles";
import HeadingH1 from "../components/HeadingH1";
import Layout from "../components/Layout";
import NavbarLower from "../components/NavbarLower";
// const Section = styled.section`
//   margin: 0 auto;
//   max-width: 1050px;
//   width: 100%;
// `;

// const TextSection = styled.section`
//   background: #fff;
//   border-top-left-radius: 6px;
//   border-top-right-radius: 6px;
//   min-height: 24rem;
//   margin: 0 auto;
//   max-width: 885px;
//   padding: 3em 2em 2em;
//   position: relative;
//   width: 100%;
// `;

const BackgroundCont = styled.div`
  margin: 0 auto;
  max-width: 885px;
  padding: 3rem 1rem 2rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding-top: 1rem;
    &.hasBackgroundImage {
      width: 75%;
    }
  }
  @media (min-width: 1024px) {
    &.hasBackgroundImage {
      width: 50%;
    }
  }
`;

// const BackgroundContainer = styled.div`
//   // &,
//   // &:before {
//   //   background-position: 50% 102px;
//   //   background-size: auto;
//   // }
// `;

const PageBasicTemplate = ({
  title,
  content,
  contentComponent,
  path,
  backgroundImage,
  published,
}) => {
  const PageContent = contentComponent || Content;
  // if (backgroundImage) {
  //   console.log("backgroundImage ", backgroundImage.childImageSharp.fluid.src);
  // }
  return (
    <div>
      {/* {helmet || ""} */}
      <NavbarLower path={path} />
      <div className="container">
        <article className="content">
          <main
            className={
              backgroundImage ? "hasBackgroundImage" : "noBackgroundImage"
            }
          >
            <BackgroundCont
              className={
                backgroundImage ? "hasBackgroundImage" : "noBackgroundImage"
              }
            >
              <HeadingH1 text={title} />
              <PageContent className="content" content={content} />
            </BackgroundCont>
          </main>
        </article>
        <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        />
        <FeaturedProjectsTiles currentProject="default" displayHeading={true} />
      </div>
    </div>
  );
};

PageBasicTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  pageContext: PropTypes.object,
};

const PageBasic = ({ data }) => {
  const { markdownRemark: post } = data;

  if (post.frontmatter.backgroundImage) {
    return (
      <Layout
        title={`${post.frontmatter.title}`}
        description={post.frontmatter.description}
        article={false}
      >
        <div>
          <BackgroundImage
            fluid={post.frontmatter.backgroundImage.childImageSharp.fluid}
            style={{
              // Defaults are overwrite-able by setting one or each of the following:
              backgroundSize: "auto",
              backgroundPosition: "50% 30px",
              backgroundRepeat: "no-repeat",
            }}
          >
            <PageBasicTemplate
              contentComponent={HTMLContent}
              title={post.frontmatter.title}
              content={post.html}
              description={post.frontmatter.description}
              path={post.fields.slug}
              backgroundImage={post.frontmatter.backgroundImage}
              published={post.frontmatter.published}
            />
          </BackgroundImage>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <PageBasicTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        description={post.frontmatter.description}
        path={post.fields.slug}
        backgroundImage={post.frontmatter.backgroundImage}
        published={post.frontmatter.published}
      />
    </Layout>
  );
};

PageBasic.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PageBasic;

export const pageBasicQuery = graphql`
  query PageBasic($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        backgroundImage {
          childImageSharp {
            fluid(maxWidth: 1140, quality: 50) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        published
      }
    }
  }
`;
