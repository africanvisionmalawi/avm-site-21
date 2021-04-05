// import SanityImage from "gatsby-plugin-sanity-image";
import { styled } from "linaria/react";
import React from "react";
import ReactPlayer from "react-player";
import { Donate } from "../components/common/Donate";
import { Hero } from "../components/Hero";
// import InfoRows from "../components/InfoRows";
// import { Hero } from "../components/Hero";
// import { BottomWave, TopWave } from "../components/wave";
import Layout from "../components/Layout";
import { PortableText } from "../components/portableText/portableText";
import videoStyles from "../components/videos/videos.module.css";
// export const query = graphql`
//   query HomePageTemplateQuery {
//     sanityHomePage {
//       id
//       title
//       indexPage
//       latestNews {
//         _rawChildren(resolveReferences: { maxDepth: 10 })
//       }
//       introText {
//         _rawChildren(resolveReferences: { maxDepth: 10 })
//       }
//       promoVideo {
//         _key
//         text
//         url
//       }
//       hero {
//         image {
//           asset {
//             fluid(maxWidth: 700) {
//               ...GatsbySanityImageFluid
//             }
//           }
//           hotspot {
//             _key
//             _type
//             height
//             width
//             x
//             y
//           }
//           asset {
//             _id
//           }
//           alt
//           caption
//           crop {
//             _key
//             _type
//             bottom
//             left
//             right
//             top
//           }
//         }
//         heroMsg {
//           _rawChildren(resolveReferences: { maxDepth: 10 })
//         }
//       }
//     }
//   }
// `;

const HomePage = ({ data }) => {
  // const { data, errors } = props;
  // console.log("props ", props);

  //   const site = (data || {}).site;

  //   if (!site) {
  //     throw new Error(
  //       'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
  //     );
  //   }

  const page = data.sanityHomePage;
  console.log("page ", page);

  //   const menuItems = page.navMenu && (page.navMenu.items || []);
  //   const pageTitle = data.route && !data.route.useSiteTitle && page.title;

  return (
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
            heroMsg={page.hero.heroMsg}
          />
        ) : (
          <TopSection>
            <Heading>{page.title}</Heading>
          </TopSection>
        )}
        <Main>
          <TopVideoSection>
            <TopVideoSectionInner>
              <VideoSection>
                {page.introText ? (
                  <TextSection>
                    <PortableText
                      key={page.introText._key}
                      blocks={page._rawIntroText}
                    />
                  </TextSection>
                ) : null}
              </VideoSection>
              <VideoSection>
                {page.promoVideo ? (
                  <div className={videoStyles.playerWrapper}>
                    <ReactPlayer
                      url={page.promoVideo.url}
                      width="100%"
                      height="100%"
                      className={videoStyles.reactPlayer}
                      controls={true}
                    />
                  </div>
                ) : null}
              </VideoSection>
            </TopVideoSectionInner>
          </TopVideoSection>

          {page.latestNews ? (
            <TextSection>
              <PortableText
                key={page.latestNews._key}
                blocks={page._rawLatestNews}
              />
            </TextSection>
          ) : null}
        </Main>

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

const VideoSection = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const TopVideoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto 120px;
  text-align: center;
  @media (min-width: 778px) {
    text-align: left;
  }
`;

const TopVideoSectionInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

export default HomePage;
