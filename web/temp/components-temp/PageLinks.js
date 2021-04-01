import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import pageLinksStyles from "./pagelinks.module.css";
// import { styled } from "linaria/react";

// const Heading = styled.h2`
//   text-align: center;
//   @media (min-width: 768px) {
//     padding-left: 15px;
//     text-align: left;
//   }
// `;

const PageLinks = ({ pagelinks }) => (
  <div>
    {pagelinks.map((pagelink) => (
      <article key={pageLink.id} className={pageLinksStyles.linkRow}>
        <h3 className={pageLinksStyles.linkHeading}>
          <Link to={pagelink.url}>{pagelink.linkTitle}</Link>
        </h3>
        <p>
          {pagelink.linkText}&hellip;
          <Link to={pagelink.url} className={pageLinksStyles.btn}>
            Find out more
          </Link>
        </p>
      </article>
    ))}
  </div>
);

PageLinks.propTypes = {
  pagelinks: PropTypes.arrayOf(
    PropTypes.shape({
      linkTitle: PropTypes.string,
      linkText: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default PageLinks;
