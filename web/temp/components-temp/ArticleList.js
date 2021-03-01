import React from "react";
import BlogItem from "./BlogRollItem";
// import { Link } from "gatsby";

const PostCard = ({ posts }) => {
  return (
    <>
      {posts &&
        posts
          .filter((post) => post.node.frontmatter.templateKey === "blog-post")
          .map(({ node: post }) => <BlogItem post={post} />)}
    </>
  );
};

export default PostCard;
