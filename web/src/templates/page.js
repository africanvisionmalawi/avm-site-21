// import SanityImage from "gatsby-plugin-sanity-image";
import { styled } from "linaria/react";
import React from "react";
// import CTA from "../components/cta";
// import CTAColumns from "../components/cta-columns";
import { GraphQLErrorList } from "../components/graphql/graphql-error-list";
// import InfoRows from "../components/InfoRows";
import { Hero } from "../components/Hero";
// import { BottomWave, TopWave } from "../components/wave";
import Layout from "../components/Layout";
import { PortableText } from "../components/portableText/portableText";
// import Pricing from "../components/pricing";
// import SEO from "../components/seo";

// export const query = graphql`
//   query PageTemplateQuery($id: String!) {
//     route: sanityRoute(id: { eq: $id }) {
//       slug {
//         current
//       }
//       useSiteTitle
//       page {
//         ...PageInfo
//       }
//     }
//     site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
//       primaryColor {
//         hex
//       }
//       secondaryColor {
//         hex
//       }
//       title
//       openGraph {
//         title
//         description
//         image {
//           ...SanityImage
//         }
//       }
//     }
//   }
// `;

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    page: sanityPage(id: { eq: $id }) {
      id
      title
      slug {
        current
      }
      category {
        title
        slug {
          current
        }
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
      _rawContent(resolveReferences: { maxDepth: 10 })
      hero {
        image {
          asset {
            fluid(maxWidth: 700) {
              ...GatsbySanityImageFluid
            }
          }
          hotspot {
            _key
            _type
            height
            width
            x
            y
          }
          asset {
            _id
          }
          alt
          caption
          crop {
            _key
            _type
            bottom
            left
            right
            top
          }
        }
        heroMsg {
          _rawChildren(resolveReferences: { maxDepth: 10 })
        }
      }
    }
  }
`;

const Page = (props) => {
  const { data, errors } = props;

  if (errors) {
    console.log("errors");
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

  //   if (!site) {
  //     throw new Error(
  //       'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
  //     );
  //   }

  const page = data.page || data.route.page;

  const content = (page._rawContent || [])
    .filter((c) => !c.disabled)
    .map((c, i) => {
      let el = null;
      switch (c._type) {
        case "hero":
          el = "hero";
          //   el = <Hero key={c._key} {...c} />;
          break;
        case "ctaColumns":
          //   el = <CTAColumns key={c._key} {...c} />;
          break;
        case "ctaPlug":
          //   el = <CTA key={c._key} {...c} />;
          break;
        case "uiComponentRef":
          switch (c.name) {
            case "topWave":
              //   el = <TopWave />;
              break;
            case "bottomWave":
              //   el = <BottomWave />;
              break;
            default:
              break;
          }
          break;
        default:
          el = null;
      }
      return el;
    });

  //   const menuItems = page.navMenu && (page.navMenu.items || []);
  //   const pageTitle = data.route && !data.route.useSiteTitle && page.title;
  console.log("here");
  return (
    // <div>{page.title} </div>
    <Layout title={page.title} description="TODO: description" article={false}>
      <article>
        {page.hero ? (
          <Hero
            fluid={page.hero.image.asset.fluid}
            displayHeroMsg={true}
            heroHeading={page.title}
            heroHeadingType="h1"
          />
        ) : (
          "No hero image"
        )}
        <Main>
          <TextSection>
            {page._rawBody ? <PortableText blocks={page._rawBody} /> : null}
          </TextSection>
          {/* <div>{content}here</div> */}
        </Main>
      </article>
    </Layout>
  );
};

const TextSection = styled.section`
  background: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  min-height: 24rem;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 2em 4em;
  }
  @media (min-width: 1040px) {
    padding: 4em 8em;
  }
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

export default Page;
