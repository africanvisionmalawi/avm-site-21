// import SanityImage from "gatsby-plugin-sanity-image";
import { graphql } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { Donate } from "../components/common/Donate";
import { Gallery } from "../components/gallery";
// import CTA from "../components/cta";
// import CTAColumns from "../components/cta-columns";
import { GraphQLErrorList } from "../components/graphql/graphql-error-list";
// import InfoRows from "../components/InfoRows";
import { Hero } from "../components/Hero";
// import { BottomWave, TopWave } from "../components/wave";
import Layout from "../components/Layout";
import { PageLinks } from "../components/pageLinks";
import { PortableText } from "../components/portableText/portableText";
import { TeamList } from "../components/team/TeamList";
import { Videos } from "../components/videos";
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
      pageHeading
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
          _key
          _rawChildren(resolveReferences: { maxDepth: 10 })
        }
      }
      content {
        ... on SanityBlockPortableText {
          _key
          _type
          _rawBlocks(resolveReferences: { maxDepth: 10 })
        }
        ... on SanityTeam {
          _key
          _type
          heading
          team {
            _key
            name
            role
            photo {
              alt
              ...ImageWithPreview
            }
          }
        }
        ... on SanityVideoGallery {
          _key
          _type
          videos {
            text
            url
          }
        }
        ... on SanityPageLinks {
          _key
          _type
          pageLinks {
            linkTitle
            linkText {
              _rawChildren(resolveReferences: { maxDepth: 10 })
            }
            photo {
              alt
              ...ImageWithPreview
            }
            _type
            url {
              _type
              category {
                title
                slug {
                  current
                }
              }
              slug {
                current
              }
              _rawBody(resolveReferences: { maxDepth: 10 })
            }
            extUrl
            featured
          }
        }
        ... on SanityPhotoGallery {
          photos {
            _key
            alt
            ...ImageWithPreview
          }
        }
        ... on SanityHomePageSection {
          _key
          _type
          introText {
            _rawChildren(resolveReferences: { maxDepth: 10 })
          }
          promoVideo {
            text
            url
            _type
            _key
          }
        }
        ... on SanityOurWorkSelect {
          _key
          _type
          displayOurWork
        }
      }
    }
  }
`;

const Page = (props) => {
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

  const content = (page._rawContent || [])
    .filter((c) => !c.disabled)
    .map((c, i) => {
      let el = null;
      // console.log("type ", c._type);
      switch (c._type) {
        case "hero":
          el = (
            <Hero
              fluid={c.image.asset.fluid}
              displayHeroMsg={false}
              heroHeading={c.title}
              heroHeadingType="h2"
              heroMsg={c.heroMsg}
            />
          );
          break;
        case "videoGallery":
          el = <Videos key={c._key} {...c} />;
          break;
        case "pageLinks":
          // console.log("pageLinks c ", c);
          el = <PageLinks key={c._key} {...c} />;
          break;
        case "photoGallery":
          el = <Gallery key={c._key} {...c} />;
          break;
        case "blockPortableText":
          el = (
            <TextSection>
              <PortableText key={c._key} {...c} />
            </TextSection>
          );
          break;
        case "team":
          el = <TeamList key={c._key} {...c} />;
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
  const pageHeading = page.pageHeading
    ? page.pageHeading
    : page.title
    ? page.title
    : "";
  return (
    // <div>{page.title} </div>
    <Layout
      title={page.title ? page.title : ""}
      description="TODO: description"
      article={false}
    >
      <article>
        {page.hero ? (
          <Hero
            fluid={page.hero.image.asset.fluid}
            displayHeroMsg={true}
            heroHeading={page.title}
            heroHeadingType="h1"
          />
        ) : (
          <TopSection>
            <Heading>{pageHeading}</Heading>
          </TopSection>
        )}
        <Main>
          {page._rawBody ? (
            <TextSection>
              <PortableText blocks={page._rawBody} />
            </TextSection>
          ) : null}
          {/* <div>{content}here</div> */}
        </Main>
        {content}
        <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        />
      </article>
    </Layout>
  );
};

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
`;

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

export default Page;
