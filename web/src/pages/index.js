import { graphql } from "gatsby";
import React from "react";
import Errors from "../components/errors";
import HomePage from "../templates/homePage";

export const query = graphql`
  query HomePageTemplateQuery {
    sanityHomePage {
      id
      title
      indexPage
      _rawIntroText(resolveReferences: { maxDepth: 10 })
      introText {
        _key
      }
      latestNews {
        _key
      }
      _rawLatestNews(resolveReferences: { maxDepth: 10 })
      promoVideo {
        _key
        text
        url
      }
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
      newsLinks {
        newsLinks {
          url {
            id
            title
            slug {
              current
            }
            photo {
              alt
              ...ImageWithPreview
            }
            _rawExcerpt(resolveReferences: { maxDepth: 10 })
          }
        }
      }
    }
  }
`;

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <Errors errors={errors} />;
  }

  return <HomePage data={data} />;
};

export default IndexPage;
