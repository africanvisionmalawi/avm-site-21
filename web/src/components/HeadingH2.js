import React from "react";
import { styled } from "linaria/react";

const HeadingH2 = (props) => <Heading>{props.text}</Heading>;

const Heading = styled.h2`
  background: #58b5d7;
  color: #fff;
  display: inline-block;
  padding: 8px;
`;

export default HeadingH2;
