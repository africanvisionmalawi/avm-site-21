import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import postStyles from "./posts.module.css";
import Img from "gatsby-image";

const BlogLandscape = ({ post }) => (
  <div className={postStyles.landscape} key={post.id}>
    {post.frontmatter.published && (
      <article className={postStyles.landscapeContent}>
        <Link to={post.fields.slug}>
          {post.frontmatter.featuredImage && (
            <Img fixed={post.frontmatter.featuredImage.childImageSharp.fixed} />
          )}
          <div className={postStyles.postText}>
            <span className={postStyles.postHeading}>
              {post.frontmatter.title}
            </span>
            <span className={postStyles.cardDate}>{post.frontmatter.date}</span>
            <p className={postStyles.postExcerpt}>{post.excerpt}</p>
          </div>
        </Link>
      </article>
    )}
  </div>
);

BlogLandscape.propTypes = {
  post: PropTypes.object
};

export default BlogLandscape;
