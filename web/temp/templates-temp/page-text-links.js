import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { SectionTop } from "../components/common/SectionTop";
import Content, { HTMLContent } from "../components/Content";
import Donate from "../components/Donate";
import Layout from "../components/Layout";
import NavbarLower from "../components/NavbarLower";
import PageLinks from "../components/PageLinks";

const PageTextLinksTemplate = ({
  title,
  content,
  contentComponent,
  links,
  path,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
      {/* {helmet || ""} */}
      <NavbarLower path={path} />
      <div className="container">
        <article className="content">
          <SectionTop>
            <h1>{title}</h1>
            <PageContent className="content" content={content} />
            <PageLinks pagelinks={links} />
          </SectionTop>
        </article>

        <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        />
      </div>
    </div>
  );
};

PageTextLinksTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  links: PropTypes.array,
};

const PageTextLinks = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout
      title={`${post.frontmatter.title}`}
      description={post.frontmatter.description}
      article={false}
    >
      <PageTextLinksTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        links={post.frontmatter.links}
        path={post.fields.slug}
      />
    </Layout>
  );
};

PageTextLinks.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PageTextLinks;

export const pageBasicQuery = graphql`
  query PageTextLinks($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        links {
          linkTitle
          linkText
          url
        }
      }
    }
  }
`;
