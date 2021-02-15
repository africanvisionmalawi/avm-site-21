import { graphql, Link } from "gatsby";
import { styled } from "linaria/react";
import { kebabCase } from "lodash";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../../components/Layout";

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
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  width: 100%;
`;
const ListItem = styled.li`
  border: 1px solid #efefef;
  border-radius: 4px;
  list-style-type: none;
  margin: 0;
  padding: 1em;
`;

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Tags | ${title}`} />
      <article>
        <TextSection>
          <h1>Tags</h1>
          <List>
            {group.map((tag) => (
              <>
                {tag.fieldValue ? (
                  <ListItem key={tag.fieldValue}>
                    <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                      {tag.fieldValue} ({tag.totalCount})
                    </Link>
                  </ListItem>
                ) : null}
              </>
            ))}
          </List>
        </TextSection>
      </article>
    </section>
  </Layout>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
