import { styled } from "linaria/react";
import React from "react";
import Breadcrumbs from "./Breadcrumbs";
// import Search from "./search";
// const searchIndices = [{ name: `Pages`, title: `Pages` }];

const Section = styled.div`
  background: #fff;
  // border-top: 1px solid #d7dade;
  // border-bottom: 1px solid #d7dade;
  margin: 0 auto;
  max-width: 1080px;
  padding: 0.5rem 12px;
  position: relative;
  width: 100%;
  & div {
    display: none;
  }
  @media (min-width: 480px) {
    & div {
      display: block;
    }
    padding: 0.5rem 100px;
  }
  @media (min-width: 768px) {
    padding-left: 120px;
  }
  @media (min-width: 1140px) {
    padding: 0.5rem 0 0.5rem 90px;
  }
`;

// const SearchCont = styled.div`
//   position: absolute;
//   right: 12px;
//   top: 0;
//   z-index: 100;
//   @media (min-width: 992px) {
//     right: 4px;
//   }
// `;

const NavbarLower = (props) => {
  if (props && props.path) {
    return <Section>{props.path && <Breadcrumbs path={props.path} />}</Section>;
  }
  return <Section>...</Section>;
};

export default NavbarLower;
