// import SanityImage from "gatsby-plugin-sanity-image";
import { graphql } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
// import Pricing from "../components/pricing";
// import SEO from "../components/seo";
import { BuyButton } from "../components/common/BuyButton";
import { Carousel } from "../components/common/Carousel";
import { Donate } from "../components/common/Donate";
import { SectionInner } from "../components/common/SectionInner";
import { SectionTop } from "../components/common/SectionTop";
// import CTA from "../components/cta";
// import CTAColumns from "../components/cta-columns";
import { GraphQLErrorList } from "../components/graphql/graphql-error-list";
// import { BottomWave, TopWave } from "../components/wave";
import Layout from "../components/Layout";
import { PortableText } from "../components/portableText/portableText";
import { Photo } from "../components/shop/Photo";
import { TagsList } from "../components/shop/TagsList";
import useSiteMetadata from "../hooks/use-site-metadata";
import { priceFormatted } from "../utils/helpers";

export const query = graphql`
  query ShopProductTemplateQuery($id: String!) {
    page: sanityShop(id: { eq: $id }) {
      id
      title
      slug {
        current
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
      photoGallery {
        photos {
          _key
          alt
          ...ImageWithPreview
        }
      }
    }
  }
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

const Section = styled.section`
  margin: 0 auto;
  max-width: 980px;
  width: 100%;
`;

const ShopSection = styled.section`
  margin: 0 auto;
  max-width: 1180px;
  padding: 4rem 1rem;
  width: 100%;
`;

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
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

const Price = styled.span`
  display: block;
  font-size: 2rem;
  margin-bottom: 1.6rem;
`;

const ShopProduct = (props) => {
  const { siteUrl } = useSiteMetadata();
  const { data, errors } = props;
  // console.log("data ", data);
  if (errors) {
    console.log("errors");
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  // const site = (data || {}).site;

  //   if (!site) {
  //     throw new Error(
  //       'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
  //     );
  //   }
  // console.log("data ", data);

  if (!data) {
    return "Error! data not found";
  }

  const displayButtonCheck = (stock) => {
    if (stock > 0) {
      return true;
    }
  };

  const page = data.page;
  //   const menuItems = page.navMenu && (page.navMenu.items || []);
  //   const pageTitle = data.route && !data.route.useSiteTitle && page.title;
  const pageHeading = page.title ? page.title : "";
  return (
    // <div>{page.title} </div>
    <Layout
      title={page.title ? page.title : ""}
      description="TODO: description"
      article={false}
    >
      <article>
        <ShopSection>
          <article className="content">
            <SectionTop>
              <Heading>{page.title ? page.title : null}</Heading>
            </SectionTop>
            <Columns>
              <ColumnMain>
                {page.photoGallery && page.photoGallery.photos.length > 1 && (
                  <CarouselCont>
                    <Carousel allSizesImages={page.photoGallery} />
                  </CarouselCont>
                )}
                {page.photoGallery && page.photoGallery.photos.length === 1 && (
                  <PhotoCont>
                    <Photo photo={page.photoGallery.photos[0]} />
                  </PhotoCont>
                )}
              </ColumnMain>
              <ColumnAside>
                <div>
                  <SectionInner>
                    <Price>&pound;{priceFormatted(page.price)}</Price>
                    {displayButtonCheck(page.inStock) ? (
                      <BuyButton
                        productId={page.id}
                        name={page.title}
                        description={page.title}
                        price={page.price}
                        image={
                          page.photoGallery && page.photoGallery.length
                            ? page.photoGallery[0].childImageSharp.fluid.src
                            : null
                        }
                        url={`${siteUrl}${page.slug.current}`}
                        weight={page.weight}
                        length={page.length}
                        width={page.width}
                        height={page.height}
                      />
                    ) : (
                      <p>
                        <strong>Out of stock</strong>
                      </p>
                    )}

                    {page.tags && page.tags.length ? (
                      <TagsList tags={page.tags} />
                    ) : null}
                  </SectionInner>
                  <SectionInner>
                    {page._rawBody ? (
                      <PortableText blocks={page._rawBody} />
                    ) : null}
                  </SectionInner>
                </div>
              </ColumnAside>
            </Columns>
          </article>
        </ShopSection>
        <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        />
      </article>
    </Layout>
  );
};

const TopSection = styled.div`
  margin: 0 auto;
  max-width: 885px;
  padding: 3rem 1rem 0;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding-top: 1rem;
  }
`;

const TextSection = styled.section`
  background: #fff;
  min-height: 24rem;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 0 4em 2rem;
  }
  @media (min-width: 1040px) {
    padding: 0 8em 2rem;
  }
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const ViewAll = styled.div`
  margin: 2.4em 0;
  text-align: center;
`;

export default ShopProduct;
