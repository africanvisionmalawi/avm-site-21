import { styled } from "linaria/react";
import React from "react";
import { getPath } from "../../utils/helpers";
// import { CardDouble } from "../card/CardDouble";
import { CardSingle } from "../card/CardSingle";
import styles from "./pagelinks.module.css";

const Heading = styled.h2`
  text-align: center;
`;

export const PageLinks = ({
  pageLinks,
  displayHeading,
  heading,
  featured,
  showPageLink,
  hideOtherPhotos,
}) => {
  // console.log("pageLink photo ", pageLinks[0].photo.asset);
  console.log("pagelinks", pageLinks);
  return (
    <div>
      {displayHeading && <Heading>{heading}</Heading>}
      <div
        className={`        
          ${featured === true ? styles.cardContWide : styles.cardCont}
        `}
      >
        {pageLinks.map((pageLink) => {
          return (
            <React.Fragment>
              {pageLink.featured ? (
                <div>here</div>
              ) : (
                // <CardDouble
                //   largeImage={pageLink.largeImage}
                //   url={etPath(
                //     pageLink.url.category.slug.current,
                //     pageLink.url.slug.current
                //   )}
                //   title={pageLink.linkTitle}
                //   linkText={pageLink.linkText}
                //   showPageLink={pageLink.showPageLink}
                // />
                <>
                  <CardSingle
                    // smallImage={pageLink.smallImage}
                    url={getPath(
                      pageLink.url.category.slug.current,
                      pageLink.url.slug.current
                    )}
                    title={pageLink.linkTitle}
                    linkText={pageLink.linkText}
                    fixed={pageLink.photo.asset.fixed}
                    photo={pageLink.photo}
                    // showPageLink={pageLink.showPageLink}
                    // hideOtherPhotos={pageLink.hideOtherPhotos}
                  />
                </>

                //
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
