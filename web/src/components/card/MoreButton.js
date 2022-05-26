import { styled } from "linaria/react";
import { Link } from "gatsby";
import React from "react";

const BtnLink = styled.Link`
  border: 1px solid #f99d1c;
  border-radius: 4px;
  color: #f99d1c;
  display: block;  
  padding: 8px;
  text-align: center;
`;

export const MoreButton = ({ url }) => {
  return (
    <>
      {url ? (
        <BtnLink to={url}>
          Find out more
        </BtnLink>
      ) : null}
    </>
  );
};
