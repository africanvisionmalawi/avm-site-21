// import SanityImage from "gatsby-plugin-sanity-image";
import { graphql } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { Donate } from "../components/common/Donate";
// import CTA from "../components/cta";
// import CTAColumns from "../components/cta-columns";
import { GraphQLErrorList } from "../components/graphql/graphql-error-list";
// import { BottomWave, TopWave } from "../components/wave";
import Layout from "../components/Layout";
// import Pricing from "../components/pricing";
// import SEO from "../components/seo";

export const query = graphql`
  query ShopTemplateQuery($id: String!) {
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

const Shop = (props) => {
  const { data, errors } = props;
  // console.log("props ", props);
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
            <Heading>African Vision Malawi Online Shop</Heading>
            {/* <NavTags tags={tags} tagsBase={tagsBase} /> */}
            <ul>
              shop items go here
              {/* {data.allMarkdownRemark.edges.map((document) => (
                <ShopListItem
                  id={document.node.id}
                  slug={document.node.fields.slug}
                  photos={document.node.frontmatter.galleryPhotos}
                  title={document.node.frontmatter.title}
                  tags={document.node.frontmatter.shopTags}
                  price={document.node.frontmatter.price}
                />
              ))} */}
            </ul>
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

export default Shop;
