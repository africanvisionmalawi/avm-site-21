import { styled } from "linaria/react";
import React from "react";
import { getFeaturedLinks, getPath } from "../../utils/helpers";
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
  showPageLink,
  hideOtherPhotos,
}) => {
  // console.log("pageLink photo ", pageLinks[0].photo.asset);
  const featuredLinks = getFeaturedLinks(pageLinks, true);
  const otherLinks = getFeaturedLinks(pageLinks, false);
  console.log("featuredLinks ", featuredLinks);
  console.log("otherLinks", otherLinks);

  return (
    <div>
      {displayHeading ? <Heading>{heading}</Heading> : null}
      <div className={styles.cardContWide}>
        {pageLinks.length
          ? pageLinks.map((pageLink) => {
              return (
                <React.Fragment key={pageLink.id}>
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
                    featured={pageLink.featured ? pageLink.featured : false}
                    // showPageLink={pageLink.showPageLink}
                    // hideOtherPhotos={pageLink.hideOtherPhotos}
                  />
                </React.Fragment>
              );
            })
          : null}
      </div>
    </div>
  );
};
