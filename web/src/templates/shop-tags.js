import { graphql } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { NavTags } from "../components/common/NavTags";
import { SectionTop } from "../components/common/SectionTop";
import Errors from "../components/errors";
import Layout from "../components/Layout";
import { ShopListItem } from "../components/shop/ShopListItem";
import { tagsBase } from "../constants/shop";

export const query = graphql`
  query ShopTagsTemplateQuery($value: String!) {
    shopByTagAll: allSanityShop(
      filter: {
        slug: { current: { ne: null } }
        shopTags: { elemMatch: { value: { eq: $value } } }
      }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          inStock
          price
          salePrice
          shopTags {
            label
            value
          }
          photoGallery {
            photos {
              _key
              alt
              ...ImageWithPreview
            }
          }
        }
      }
    }
    tags: allSanitySiteSettings {
      edges {
        node {
          shopTags {
            title
            value {
              current
            }
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

const Container = styled.div`
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 0 3rem;
`;

const ShopTagPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <Errors errors={errors} />;
  }

  if (!data) {
    return "Error! data not found";
  }

  const allShopProducts = data.shopByTagAll.edges;
  const tagTitle = props.pageContext.title;
  const tag = props.pageContext.value;
  const title = `${tagTitle}`;
  const description = "Welcome to our online shop.";

  const tags = data.tags.edges[0].node.shopTags;

  return allShopProducts.length ? (
    <>
      <Layout title={title} description={description} article={false}>
        <article>
          <SectionTop>
            <Heading>{title}</Heading>
            <NavTags tags={tags} tagsBase={tagsBase} active={tag} />
          </SectionTop>
          <Container>
            <ShopIndexList>
              {allShopProducts.map((item, i) => (
                <React.Fragment key={item.node.id}>
                  {i < 3 ? (
                    <ShopListItem
                      id={item.node.id}
                      slug={item.node.slug.current}
                      photo={item.node.photoGallery.photos[0]}
                      photoType="default"
                      title={item.node.title}
                      price={item.node.price}
                    />
                  ) : null}
                </React.Fragment>
              ))}
            </ShopIndexList>
          </Container>
        </article>
      </Layout>
    </>
  ) : null;
};

export default ShopTagPage;
