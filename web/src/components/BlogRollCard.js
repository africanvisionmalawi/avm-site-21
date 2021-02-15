import { Link } from "gatsby";
import Img from "gatsby-image";
import { styled } from "linaria/react";
import PropTypes from "prop-types";
import React from "react";
import DefaultImage from "./defaultImage";
import postStyles from "./posts.module.css";

const ColLink = styled.span`
  // color: #3273dc;
  display: block;
  // font-weight: bold;
`;

const ImgCont = styled.div`
  border: 1px solid #cacaca;
  & .gatsby-image-wrapper {
    display: block !important;
  }
  margin-bottom: 0.8em;
`;

const Heading = styled.h3`
  margin-bottom: 0;
`;

const BlogCard = ({ post }) => {
  let postImage;
  if (post.frontmatter.postMobileImage) {
    const sources = [
      post.frontmatter.postMobileImage.childImageSharp.fixed,
      {
        ...post.frontmatter.postDesktopImage.childImageSharp.fixed,
        media: `(min-width: 414px)`,
      },
    ];
    postImage = (
      <ImgCont>
        <Img fixed={sources} />
      </ImgCont>
    );
  } else {
    postImage = (
      <ImgCont>
        <DefaultImage />
      </ImgCont>
    );
  }
  return (
    <div className={postStyles.card} key={post.id}>
      {post.frontmatter.published && (
        <article className={postStyles.cardContent}>
          <Link to={post.fields.slug}>
            {postImage}
            <Heading>{post.frontmatter.title}</Heading>
            <span className={postStyles.cardDate}>{post.frontmatter.date}</span>
            <p className={postStyles.cardExcerpt}>{post.excerpt}</p>
            <ColLink>Find out more</ColLink>
          </Link>
        </article>
      )}
    </div>
  );
};

BlogCard.propTypes = {
  post: PropTypes.object,
};

export default BlogCard;
