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
      {displayHeading ? <Heading>{heading}</Heading> : null}
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
                    url={
                      pageLink.url
                        ? getPath(
                            pageLink.url.category.slug.current,
                            pageLink.url.slug.current
                          )
                        : null
                    }
                    extUrl={pageLink.extUrl ? pageLink.extUrl : null}
                    title={pageLink.linkTitle ? pageLink.linkTitle : null}
                    linkText={pageLink.linkText ? pageLink.linkText : null}
                    fixed={pageLink.photo ? pageLink.photo.asset.fixed : null}
                    photo={pageLink.photo ? pageLink.photo : null}
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
