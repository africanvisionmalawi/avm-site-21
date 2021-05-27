import { Link } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { priceFormatted } from "../../utils/helpers";
import { Photo } from "./Photo";

const PhotoCont = styled.div`
  max-height: 280px;
  max-width: 280px;
  overflow: hidden;
  margin-left: 0;
  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

export const ShopListItem = (props) => {
  const productPrice = props.salePrice
    ? props.salePrice
    : props.price
    ? props.price
    : null;
  return (
    <li key={props.id}>
      <Link to={`/shop/${props.slug}/`}>
        {props.photo && (
          <PhotoCont>
            <Photo photo={props.photo} photoType={props.photoType} />
          </PhotoCont>
        )}
        <h2>{props.title}</h2>
        <span>
          &pound;
          {priceFormatted(productPrice)}
        </span>
      </Link>
    </li>
  );
};
