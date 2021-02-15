import { Link } from "gatsby";
import { styled } from "linaria/react";
import React from "react";

const Article = styled.article`
  border-bottom: 1px solid #eaeaea;
  margin: 0;
  padding: 2.4em 0;
`;

const PostDate = styled.div`
  color: #ababad;
  font-size: 0.9rem;
  margin-top: 0.5em;
  padding: 0 2px 8px;
`;

export const PostListItem = (props) => {
  return (
    <Article key={props.id}>
      <h3>
        <Link to={props.slug}>{props.title}</Link>
        {props.date ? <PostDate>{props.date}</PostDate> : null}
      </h3>
      <p>
        {props.excerpt}{" "}
        <Link className="button" to={props.slug}>
          Read more
        </Link>
      </p>
    </Article>
  );
};
