import { graphql, Link } from "gatsby";
// import postStyles from "../components/posts.module.css";
import { styled } from "linaria/react";
import React from "react";
import { PostListItem } from "../components/common/PostListItem";
import Layout from "../components/Layout";

// const Section = styled.section`
//   margin: 0 auto;
//   max-width: 1050px;
//   width: 100%;
// `;

const TextSection = styled.section`
  background: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  min-height: 24rem;
  margin: 0 auto;
  max-width: 885px;
  padding: 3em 2em 2em;
  position: relative;
  width: 100%;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

// const ListItem = styled.li`
//   border-bottom: 1px solid #494949;
//   margin: 0;
//   padding: 2.4em 0;
// `;

const BrowseAll = styled.div`
  margin: 2.4em 0;
  text-align: center;
`;

const TagRoute = (props) => {
  const posts = props.data.allMarkdownRemark.edges;
  const postLinks = posts.map((post, index) => (
    <PostListItem
      id={index}
      slug={post.node.fields.slug}
      title={post.node.frontmatter.title}
      excerpt={post.node.excerpt}
    />
  ));
  const tag = props.pageContext.tag;
  const tagMetaTitle = tag.charAt(0).toUpperCase() + tag.slice(1);
  // const title = props.data.site.siteMetadata.title;
  const totalCount = props.data.allMarkdownRemark.totalCount;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } archive tagged with “${tag}”`;

  return (
    <Layout
      title={`${tagMetaTitle}`}
      description={`${tagMetaTitle}`}
      article={false}
    >
      <article>
        <TextSection>
          <h1 className="title is-bold-light">{tagHeader}</h1>
          <List>{postLinks}</List>
          <BrowseAll>
            <Link to="/tags/">Browse all tags</Link>
          </BrowseAll>
        </TextSection>
      </article>
    </Layout>
  );
};

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
