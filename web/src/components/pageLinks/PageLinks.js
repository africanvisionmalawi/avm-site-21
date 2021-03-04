import { styled } from "linaria/react";
import React from "react";
// import { CardDouble } from "../card/CardDouble";
// import { CardSingle } from "../card/CardSingle";

const Heading = styled.h2`
  text-align: center;
`;

export const PageLinks = ({ pageLinks }) => {
  //   console.log("pops ", props);

  return (
    <>
      <Heading>page links goes here</Heading>;
      {pageLinks.map((pageLink) => {
        return (
          <>
            {pageLink.featured ? (
              <div>here</div>
            ) : (
              //   <CardDouble
              //     largeImage={pageLink.largeImage}
              //     url={pageLink.url}
              //     title={pageLink.linkTitle}
              //     linkText={pageLink.linkText}
              //     showPageLink={pageLink.showPageLink}
              //   />
              <>
                <div>{pageLink.linkTitle}</div>
                <div>{pageLink.linkText.length}</div>
                <div>{pageLink.url.category.slug.current}</div>
              </>

              //   <CardSingle
              //     // smallImage={pageLink.smallImage}
              //     url={pageLink.url.category.slug.current}
              //     title={pageLink.url.category.title}
              //     // linkText={pageLink.linkText}
              //     // showPageLink={pageLink.showPageLink}
              //     // hideOtherPhotos={pageLink.hideOtherPhotos}
              //   />
            )}
          </>
        );
      })}
    </>
  );
};
