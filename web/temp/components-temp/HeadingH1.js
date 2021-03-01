import React from "react";
import { styled } from "linaria/react";

const HeadingH1 = (props) => <Heading>{props.text}</Heading>;

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
`;

export default HeadingH1;
