import { graphql } from "gatsby";
// import Donate from "../components/Donate";
import { styled } from "linaria/react";
import React from "react";
import { SectionTop } from "../components/common/SectionTop";
import Content, { HTMLContent } from "../components/Content";
import HomepageProjectsCols from "../components/HomepageProjectsCols";
import Layout from "../components/Layout";
import NavbarLower from "../components/NavbarLower";

const OurWorkPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const PageContent = HTMLContent || Content;
  const ourWorkData = data.homePage.edges[0].node.frontmatter.ourWork;
  return (
    <Layout
      title={`${post.frontmatter.title}`}
      description={post.frontmatter.description}
      article={false}
    >
      <NavbarLower />
      <Section>
        <SectionTop>
          <Heading>Our work</Heading>
          <PageContent className="content" content={post.html} />
        </SectionTop>
        <HomepageProjectsCols
          currentProject="home"
          displayHeading={false}
          ourWork={ourWorkData}
        />
      </Section>
    </Layout>
  );
};

const Heading = styled.h1`
  margin: 0 0 1rem;
`;

const Section = styled.section`
  background: #fff;
  // padding-top: 2.6rem;
  margin: 0 auto;
  max-width: 1180px;
  width: 100%;
  // @media (min-width: 768px) {
  //   padding: 2.6rem 1rem;
  // }
`;

// const Heading = styled.h1`
//   background: #246a73;
//   color: #fff;
//   display: inline-block;
//   font-size: 2em;
//   margin: 0px 0px 0.5em;
//   padding: 8px 16px;
//   text-align: center;
// `;

export default OurWorkPage;

export const OurWorkQuery = graphql`
  query OurWork($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
      }
    }
    homePage: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "homepage" } } }
    ) {
      edges {
        node {
          frontmatter {
            ourWork {
              id
              name
              url
              imageId
              excerpt
              featured
            }
          }
        }
      }
    }
  }
`;
