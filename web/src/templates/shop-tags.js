import { graphql } from "gatsby";
// import postStyles from "../components/posts.module.css";
import { styled } from "linaria/react";
import React from "react";
import { NavTags } from "../components/common/nav-tags";
import Donate from "../components/Donate";
import FeaturedProjectsTiles from "../components/FeaturedProjectsTiles";
import HeadingH1 from "../components/HeadingH1";
import Layout from "../components/Layout";
import NavbarLower from "../components/NavbarLower";
import shopStyles from "../components/shop.module.css";
import { ShopListItem } from "../components/shop/shop-list-item";
import { tags, tagsBase } from "../constants/shop";
// const Section = styled.section`
//   margin: 0 auto;
//   max-width: 1050px;
//   width: 100%;
// `;

const Section = styled.section`
  margin: 0 auto;
  max-width: 980px;
  width: 100%;
`;

// const TextSection = styled.section`
//   background: #fff;
//   border-top-left-radius: 6px;
//   border-top-right-radius: 6px;
//   min-height: 24rem;
//   margin: 0 auto;
//   max-width: 885px;
//   padding: 3em 2em 2em;
//   position: relative;
//   width: 100%;
// `;

// const List = styled.ul`
//   list-style-type: none;
//   margin: 0;
//   padding: 0;
// `;

// const ListItem = styled.li`
//   border-bottom: 1px solid #494949;
//   margin: 0;
//   padding: 2.4em 0;
// `;

// const BrowseAll = styled.div`
//   margin: 2.4em 0;
//   text-align: center;
// `;

const ShopSection = styled.section`
  margin: 0 auto;
  max-width: 1180px;
  padding: 2em 1em;
  width: 100%;
`;

const ShopTagRoute = (props) => {
  const posts = props.data.allMarkdownRemark.edges;

  const postLinks = posts.map((post) => (
    <ShopListItem
      id={post.node.id}
      slug={post.node.fields.slug}
      photos={post.node.frontmatter.galleryPhotos}
      title={post.node.frontmatter.title}
      tags={post.node.frontmatter.shopTags}
      price={post.node.frontmatter.price}
    />
  ));

  const tag = props.pageContext.tag;
  const tagTitleCleaned = tag.replace("-", " ");
  const tagMetaTitle =
    tagTitleCleaned.charAt(0).toUpperCase() + tagTitleCleaned.slice(1);
  const title = props.data.site.siteMetadata.title;
  const totalCount = props.data.allMarkdownRemark.totalCount;
  const description = `${totalCount} shop product${
    totalCount === 1 ? "" : "s"
  } archive tagged with “${tag}”`;

  return (
    <Layout
      title={`${tagMetaTitle} | ${title}`}
      description={description}
      article={false}
    >
      <NavbarLower path={`/shop/`} />
      <ShopSection>
        <article>
          <HeadingH1 text={tagMetaTitle} />
          <NavTags tags={tags} tagsBase={tagsBase} active={tag} />
          <ul className={shopStyles.shopIndexList}>{postLinks}</ul>
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
    </Layout>
  );
};

export default ShopTagRoute;

export const tagPageQuery = graphql`
  query ShopTagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { shoptags: { in: [$tag] }, publish: { eq: true } }
      }
    ) {
      totalCount
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
            size
            shippingClass
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
