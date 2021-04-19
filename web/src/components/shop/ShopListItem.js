import { Link } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { priceFormatted } from "../../utils/helpers";
import { Photo } from "./Photo";

const PhotoCont = styled.div`
  max-width: 600px;
  margin-left: 0;
  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

export const ShopListItem = (props) => {
  return (
    <li key={props.id}>
      <Link to={props.slug}>
        {props.photo && (
          <PhotoCont>
            <Photo photo={props.photo} />
          </PhotoCont>
        )}
        <h2>{props.title}</h2>
        <span>
          &pound;
          {priceFormatted(props.price)}
        </span>
      </Link>
    </li>
  );
};
