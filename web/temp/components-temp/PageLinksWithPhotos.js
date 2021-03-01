// import ImageFixed from "../components/ImageFixed";
// import Img from "gatsby-image";
import { styled } from "linaria/react";
import React from "react";
// import PropTypes from "prop-types";
// import { v4 } from 'uuid'
// import { Link } from "gatsby";
import CardDouble from "./card/CardDouble";
import CardSingle from "./card/CardSingle";
import pageLinksStyles from "./pagelinks.module.css";

const Heading = styled.h2`
  text-align: center;
`;

const PageLinks = (props) => {
  const {
    pagelinks,
    displayHeading,
    heading,
    featured,
    showPageLink,
    hideOtherPhotos,
  } = props;
  // let headingText = "Find out more";
  // if (heading) {
  //   headingText = heading;
  // }

  return (
    <div>
      {displayHeading && <Heading>{heading}</Heading>}
      <div
        className={`        
          ${
            featured === true
              ? pageLinksStyles.cardContWide
              : pageLinksStyles.cardCont
          }
        `}
      >
        {pagelinks.map((pagelink) => {
          // let sources = [
          //   pagelink.smallImage.childImageSharp.fluid,
          //   {
          //     ...pagelink.largeImage.childImageSharp.fluid,
          //     media: `(min-width: 576px)`,
          //   },
          // ];
          // console.log("sources", sources);
          // console.log("here", pagelink.smallImage.childImageSharp.fluid);

          return (
            <>
              {featured ? (
                <CardDouble
                  largeImage={pagelink.largeImage}
                  url={pagelink.url}
                  title={pagelink.linkTitle}
                  linkText={pagelink.linkText}
                  showPageLink={showPageLink}
                />
              ) : (
                <CardSingle
                  smallImage={pagelink.smallImage}
                  url={pagelink.url}
                  title={pagelink.linkTitle}
                  linkText={pagelink.linkText}
                  showPageLink={showPageLink}
                  hideOtherPhotos={hideOtherPhotos}
                />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

// PageLinks.propTypes = {
//   pagelinks: PropTypes.arrayOf(
//     PropTypes.shape({
//       linkTitle: PropTypes.string,
//       photo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//       linkText: PropTypes.string,
//       url: PropTypes.string,
//     })
//   ),
// };

PageLinks.defaultProps = {
  displayHeading: true,
  showPageLink: true,
};

export default PageLinks;
