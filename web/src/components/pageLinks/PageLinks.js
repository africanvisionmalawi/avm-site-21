import { styled } from "linaria/react";
import React from "react";
import { getFeaturedLinks, getPath } from "../../utils/helpers";
// import { CardDouble } from "../card/CardDouble";
import { CardSingle } from "../card/CardSingle";
import styles from "./pageLinks.module.css";

const Heading = styled.h2`
  text-align: center;
`;

const PageLinksWithPhotos = ({ pageLinks }) => {
  return (
    <>
      {pageLinks.length
        ? pageLinks.map((pageLink) => {
            return (
              <React.Fragment key={pageLink.id}>
                {!pageLink.hideLink &&
                (pageLink.extUrl || url) &&
                url !== "/" ? (
                  <>
                    <CardSingle
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
                      fixed={pageLink?.photo?.asset?.fixed || null}
                      photo={pageLink.photo ? pageLink.photo : null}
                      featured={pageLink.featured ? pageLink.featured : false}
                      // showPageLink={pageLink.showPageLink}
                      // hideOtherPhotos={pageLink.hideOtherPhotos}
                    />
                  </>
                ) : null}
              </React.Fragment>
            );
          })
        : null}
    </>
  );
};

export const PageLinks = ({
  pageLinks,
  displayHeading,
  heading,
  showPageLink,
  hideOtherPhotos,
}) => {
  // console.log("pageLink photo ", pageLinks[0].photo.asset);
  // console.log("pageLinks ", pageLinks);
  const featuredLinks = getFeaturedLinks(pageLinks, true);
  const otherLinks = getFeaturedLinks(pageLinks, false);
  // console.log("featuredLinks ", featuredLinks);
  // console.log("otherLinks", otherLinks);

  return (
    <div>
      {displayHeading ? <Heading>{heading}</Heading> : null}
      {featuredLinks.length ? (
        <div className={styles.cardContWide}>
          <PageLinksWithPhotos pageLinks={featuredLinks} />
        </div>
      ) : null}
      {otherLinks.length ? (
        <div className={styles.cardCont}>
          <PageLinksWithPhotos pageLinks={otherLinks} />
        </div>
      ) : null}
    </div>
  );
};
