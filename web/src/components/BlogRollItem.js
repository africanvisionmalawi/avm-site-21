import React from "react";
import { PostListItem } from "./common/PostListItem";
// import Img from "gatsby-image";

const BlogItem = ({ post }) => (
  <>
    {post.frontmatter.published && (
      <PostListItem
        id={post.id}
        slug={post.fields.slug}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        excerpt={post.excerpt}
      />
    )}
  </>
);

export default BlogItem;
