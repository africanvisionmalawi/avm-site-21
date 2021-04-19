import { graphql } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { SectionTop } from "../../components/common/SectionTop";
import Errors from "../../components/errors";
import Layout from "../../components/Layout";
import { ShopListItem } from "../../components/shop/ShopListItem";

export const query = graphql`
  query ShopTemplateQuery {
    shopAll: allSanityShop(filter: { slug: { current: { ne: null } } }) {
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

const ShopIndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <Errors errors={errors} />;
  }

  if (!data) {
    return "Error! data not found";
  }

  const allShopProducts = data.shopAll.edges;

  const title = "Shop - African Vision Malawi";
  const description = "Welcome to our online shop.";

  return allShopProducts.length ? (
    <>
      <Layout title={title} description={description} article={false}>
        <article>
          <SectionTop>
            <Heading>{title}</Heading>
          </SectionTop>
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
        </article>
      </Layout>
    </>
  ) : null;
};

export default ShopIndexPage;
