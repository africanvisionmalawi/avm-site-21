import { graphql } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import BuyButton from "../components/BuyButton";
import { Carousel } from "../components/Carousel";
import { SectionInner } from "../components/common/SectionInner";
import { SectionTop } from "../components/common/SectionTop";
import Content, { HTMLContent } from "../components/Content";
import Donate from "../components/Donate";
// import FeaturedProjects from "../components/FeaturedProjects";
import FeaturedProjectsTiles from "../components/FeaturedProjectsTiles";
import HeadingH1 from "../components/HeadingH1";
import Layout from "../components/Layout";
import NavbarLower from "../components/NavbarLower";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import shopStyles from "../components/shop.module.css";
// import PropTypes from "prop-types";
import { ShopListItem } from "../components/shop/shop-list-item";
// import { Location } from "@reach/router";
import { TagsList } from "../components/shop/tagsList";
import useSiteMetadata from "../hooks/use-site-metadata";
import { priceFormatted } from "../utils/helpers";

const Section = styled.section`
  margin: 0 auto;
  max-width: 1180px;
  width: 100%;
`;

const ShopSection = styled.section`
  margin: 0 auto;
  max-width: 1180px;
  padding-bottom: 2rem;
  @media (min-width: 1024px) {
    padding-bottom: 4rem;
  }
  width: 100%;
`;

const CarouselCont = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  width: 85%;
  @media (min-width: 768px) {
    margin-left: 1rem;
  }
  @media (min-width: 1024px) {
    margin-left: auto;
  }
`;

const PhotoCont = styled.div`
  max-width: 600px;
  margin-left: 0;
  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ColumnMain = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 66.66666%;
  }
`;
const ColumnAside = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 33.333333%;
  }
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

const Heading = styled.h2`
  margin-top: 3rem;
  text-align: center;
`;

const displayButtonCheck = (stock, publish) => {
  if (stock > 0 || publish !== false) {
    return true;
  }
};

const ShopProductTemplate = ({
  slug,
  id,
  productId,
  title,
  content,
  contentComponent,
  price,
  salePrice,
  inStock,
  size,
  weight,
  length,
  width,
  height,
  shippingClass,
  tags,
  relatedProducts,
  galleryPhotos,
  publish,
  path,
  allProducts,
}) => {
  const PageContent = contentComponent || Content;
  const { siteUrl } = useSiteMetadata();
  const relatedProductsList = [];

  allProducts.forEach((product) => {
    if (
      product.node.frontmatter.shoptags &&
      product.node.frontmatter.shoptags.indexOf(tags[0]) !== -1 &&
      product.node.id !== id
    ) {
      relatedProductsList.push({
        id: product.node.id,
        slug: product.node.fields.slug,
        galleryPhotos: product.node.frontmatter.galleryPhotos,
        price: product.node.frontmatter.price,
        salePrice: product.node.frontmatter.salePrice,
        title: product.node.frontmatter.title,
      });
    }
  });

  return (
    <div>
      <NavbarLower path={path} />
      <ShopSection>
        <article className={shopStyles.product}>
          <SectionTop>
            <HeadingH1 text={title} />
          </SectionTop>
          <Columns>
            <ColumnMain>
              {galleryPhotos && galleryPhotos.length > 1 && (
                <CarouselCont>
                  <Carousel allSizesImages={galleryPhotos} />
                </CarouselCont>
              )}
              {galleryPhotos && galleryPhotos.length === 1 && (
                <PhotoCont>
                  <PreviewCompatibleImage imageInfo={galleryPhotos[0]} />
                </PhotoCont>
              )}
            </ColumnMain>
            <ColumnAside>
              <div className={shopStyles.productAside}>
                <SectionInner>
                  <span className={shopStyles.price}>
                    &pound;{priceFormatted(price)}
                  </span>
                  {displayButtonCheck(inStock, publish) ? (
                    <BuyButton
                      productId={productId ? productId : null}
                      name={title ? title : null}
                      description={title ? title : null}
                      price={price ? price :}
                      image={
                        galleryPhotos && galleryPhotos.length
                          ? galleryPhotos[0].childImageSharp.fluid.src
                          : null
                      }
                      url={slug ? `${siteUrl}${slug}` : null}
                      weight={weight ? weight : null}
                      length={length ? length : null}
                      width={width ? width : null}
                      height={height ? height : null}
                    />
                  ) : (
                    <p>
                      <strong>Out of stock</strong>
                    </p>
                  )}

                  {tags && tags.length ? <TagsList tags={tags} /> : null}
                </SectionInner>
                <SectionInner>
                  <PageContent className="content" content={content} />
                </SectionInner>
              </div>
            </ColumnAside>
          </Columns>
          {relatedProductsList.length ? (
            <>
              <Heading>Related products</Heading>
              <ShopIndexList>
                {relatedProductsList.map((item, i) => (
                  <React.Fragment key={item.id}>
                    {i < 3 ? (
                      <ShopListItem
                        id={item.id}
                        slug={item.slug}
                        photos={item.galleryPhotos}
                        title={item.title}
                        price={item.price}
                      />
                    ) : null}
                  </React.Fragment>
                ))}
              </ShopIndexList>
            </>
          ) : null}
        </article>
      </ShopSection>
      <Donate
        link="https://www.charitycheckout.co.uk/1113786/"
        text="Donate"
        displayImage
      />
      <Section>
        <FeaturedProjectsTiles currentProject="default" displayHeading={true} />
      </Section>
    </div>
  );
};

const ShopProductPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout
      title={`${post.frontmatter.title}`}
      description={post.frontmatter.description}
      article={false}
    >
      <ShopProductTemplate
        id={post.id}
        slug={post.fields.slug}
        productId={post.frontmatter.productId}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        price={post.frontmatter.price}
        salePrice={post.frontmatter.salePrice}
        inStock={post.frontmatter.inStock}
        size={post.frontmatter.size}
        weight={post.frontmatter.weight}
        length={post.frontmatter.length}
        width={post.frontmatter.width}
        height={post.frontmatter.height}
        shippingClass={post.frontmatter.shippingClass}
        tags={post.frontmatter.shoptags}
        relatedProducts={post.frontmatter.relatedProducts}
        galleryPhotos={post.frontmatter.galleryPhotos}
        publish={post.frontmatter.publish}
        path={post.fields.slug}
        allProducts={data.shopIndex.edges}
      />
    </Layout>
  );
};

// ShopProductPage.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.shape({
//       frontmatter: PropTypes.object,
//     }),
//   }),
// };

export default ShopProductPage;

export const pageBasicQuery = graphql`
  query ShopProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      id
      fields {
        slug
      }
      frontmatter {
        productId
        title
        price
        salePrice
        inStock
        size
        shippingClass
        weight
        length
        width
        height
        shoptags
        publish
        relatedProducts
        galleryPhotos {
          childImageSharp {
            fluid(maxWidth: 450, quality: 50) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }

    shopIndex: allMarkdownRemark(
      sort: { order: DESC, fields: [id] }
      filter: {
        frontmatter: {
          templateKey: { eq: "shop-product-page" }
          publish: { eq: true }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            price
            salePrice
            inStock
            shoptags
            galleryPhotos {
              childImageSharp {
                fixed(width: 280, height: 280) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
