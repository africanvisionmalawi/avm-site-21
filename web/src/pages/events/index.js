import { graphql } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { CardPostAlt } from "../../components/card/CardPostAlt";
import { SectionTop } from "../../components/common/SectionTop";
import Errors from "../../components/errors";
import Layout from "../../components/Layout";

export const query = graphql`
  query EventsTemplateQuery {
    shopAll: allSanityEvent(
      filter: { slug: { current: { ne: null } } }
      sort: { order: DESC, fields: date }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          _rawExcerpt(resolveReferences: { maxDepth: 10 })
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
    }
  }
`;

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
`;

const ShopIndexList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 40px;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  & li {
    list-style-type: none;
    margin: 8px 0;
    opacity: 0.9;
    padding: 0;
    position: relative;
  }
  & li:hover {
    opacity: 1;
  }
`;

const PostList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(1fr, 1fr));
  grid-gap: 3rem;
  grid-auto-flow: dense;
  margin: 2rem auto;
  max-width: 1180px;
`;

const EventsIndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <Errors errors={errors} />;
  }

  if (!data) {
    return "Error! data not found";
  }

  const allEvents = data.shopAll.edges;

  const title = "Latest events - African Vision Malawi";
  const description = "Latest events from African Vision Malawi.";

  return allEvents.length ? (
    <>
      <Layout title={title} description={description} article={false}>
        <article>
          <SectionTop>
            <Heading>{title}</Heading>
          </SectionTop>
          <PostList>
            {allEvents.map((post) => {
              // console.log("post ", post);

              // const type = post.node._type ? "sanity" : "markdown";
              // const title = post.node.title
              //   ? post.node.title
              //   : post.node.frontmatter.title;
              // const excerpt = post.node._rawExcerpt
              //   ? post.node._rawExcerpt
              //   : post.node.excerpt;
              // const slug = post.node.slug
              //   ? post.node.slug.current
              //   : post.node.frontmatter.path.replace("/posts/", "/");
              // const publishDate = post.node.publishDate
              //   ? post.node.publishDate
              //   : post.node.frontmatter.date;
              return (
                <>
                  <React.Fragment key={post.node.id}>
                    <CardPostAlt
                      type="event"
                      title={post.node.title}
                      excerpt={post.node._rawExcerpt}
                      slug={post.node.slug}
                      date={post.node.date}
                      endDate={post.node.endDate}
                      hideTime={post.node.hideTime}
                      allDay={post.node.allDay}
                    />
                  </React.Fragment>
                </>
              );
            })}
          </PostList>
        </article>
      </Layout>
    </>
  ) : null;
};

export default EventsIndexPage;
