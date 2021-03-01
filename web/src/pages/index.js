import React from "react";
import Errors from "../components/errors";
import Page from "../templates/page";

// export const query = graphql`
//   fragment SanityImage on SanityMainImage {
//     alt
//     crop {
//       _key
//       _type
//       top
//       bottom
//       left
//       right
//     }
//     hotspot {
//       _key
//       _type
//       x
//       y
//       height
//       width
//     }
//     asset {
//       _id
//       metadata {
//         lqip
//         dimensions {
//           aspectRatio
//           width
//           height
//         }
//       }
//     }
//   }
//   query FrontpageQuery {
//     page: sanityPage(_id: { regex: "/(drafts.|)frontpage/" }) {
//       ...PageInfo
//     }
//   }
// `;

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <Errors errors={errors} />;
  }

  return <Page data={data} />;
};

export default IndexPage;