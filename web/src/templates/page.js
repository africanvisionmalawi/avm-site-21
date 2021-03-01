import React from "react";
// import CTA from "../components/cta";
// import CTAColumns from "../components/cta-columns";
import { GraphQLErrorList } from "../components/graphql/graphql-error-list";
// import { BottomWave, TopWave } from "../components/wave";
import Layout from "../components/Layout";
// import InfoRows from "../components/InfoRows";
// import Pricing from "../components/pricing";
import SEO from "../components/seo";

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
export const Page = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

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
  const pageTitle = data.route && !data.route.useSiteTitle && page.title;
  console.log("here");
  return (
    <Layout title={pageTitle} description="TODO: description" article={false}>
      <SEO
        title={pageTitle}
        description={site.description}
        keywords={site.keywords}
        bodyAttr={{
          class: "leading-normal tracking-normal text-white gradient",
        }}
      />
      <div>{content}here</div>
    </Layout>
  );
};
