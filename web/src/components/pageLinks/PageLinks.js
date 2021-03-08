import { styled } from "linaria/react";
import React from "react";
import { getPath } from "../../utils/helpers";
// import { CardDouble } from "../card/CardDouble";
import { CardSingle } from "../card/CardSingle";

const Heading = styled.h2`
  text-align: center;
`;

export const PageLinks = ({ pageLinks }) => {
  // console.log("pageLink photo ", pageLinks[0].photo.asset);

  return (
    <>
      <Heading>page links goes here</Heading>;
      {pageLinks.map((pageLink) => {
        return (
          <>
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
                <div>{pageLink.linkTitle}</div>
                <div>{pageLink.photo.alt}</div>
                <div>{pageLink.url.category.slug.current}</div>
                <div>{pageLink.url.slug.current}</div>
                <div>
                  {getPath(
                    pageLink.url.category.slug.current,
                    pageLink.url.slug.current
                  )}
                </div>
                <CardSingle
                  // smallImage={pageLink.smallImage}
                  url={getPath(
                    pageLink.url.category.slug.current,
                    pageLink.url.slug.current
                  )}
                  title={pageLink.linkTitle}
                  linkText={pageLink.linkText}
                  fixed={pageLink.photo.asset.fixed}
                  // showPageLink={pageLink.showPageLink}
                  // hideOtherPhotos={pageLink.hideOtherPhotos}
                />
              </>

              //
            )}
          </>
        );
      })}
    </>
  );
};
