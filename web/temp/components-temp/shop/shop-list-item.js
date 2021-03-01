import { Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { priceFormatted } from "../../utils/helpers";
import { TagsList } from "./tagsList";

export const ShopListItem = (props) => {
  return (
    <li key={props.id}>
      <Link to={props.slug}>
        {props.photos && props.photos.length && (
          <Img fixed={props.photos[0].childImageSharp.fixed} />
        )}
        <h2>{props.title}</h2>
        {props.tags && props.length ? <TagsList tags={props.tags} /> : null}
        <span>
          &pound;
          {priceFormatted(props.price)}
        </span>
      </Link>
    </li>
  );
};
