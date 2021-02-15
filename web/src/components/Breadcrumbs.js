import { Link } from "gatsby";
import { styled } from "linaria/react";
import React from "react";

let crumbLink = "";
let crumbLinkArray = [];
const getLinks = (currentLink, index) => {
  crumbLink = crumbLink + "/" + currentLink;
  crumbLinkArray.push(crumbLink);

  return crumbLinkArray[index];
};

const Breadcrumbs = (props) => {
  //   console.log("path is " + props.path);
  const crumb = props.path.split("/");
  const crumbFiltered = crumb.filter(
    (value) => Object.keys(value).length !== 0
  );

  //   console.log("crumb is " + crumbFiltered);
  return (
    <Links>
      <Link to="/">Home</Link>
      {crumbFiltered.map((c, i) => (
        <React.Fragment key={i}>
          {i < crumbFiltered.length - 1 ? (
            <Link to={`${getLinks(c, i)}/`}>{c.replace(/-/g, " ")}</Link>
          ) : (
            <CrumbCurrent>{c.replace(/-/g, " ")}</CrumbCurrent>
          )}
        </React.Fragment>
      ))}
    </Links>
  );
};

const Links = styled.div`
  max-width: 750px;
  text-transform: capitalize;
  @media (max-width: 767px) {
    overflow-x: auto;
    white-space: nowrap;
  }
  & > a {
    color: #ababad;
    display: inline-block;
    font-size: 0.8em;
    text-transform: capitalize;
  }
  & > a:not(:first-child):before {
    color: #cacaca;
    content: ">";
    display: inline-block;
    margin: 0 8px;
  }
`;

// const CrumbLinkBase = css`
//   color: #ababad;
//   display: inline-block;
//   font-size: 0.8em;
//   text-transform: capitalize;
// `;

// const CrumbDividerBase = css`
//   &:before {
//     color: #cacaca;
//     content: ">";
//     display: inline-block;
//     margin: 0 8px;
//   }
// `;

// const HomeLink = styled(Link)`
//   ${CrumbLinkBase}
//   &:link,
//   &:visited {
//     color: #ababad;
//   }
// `;

const CrumbCurrent = styled.span`
  color: #ababad;
  display: inline-block;
  font-size: 0.8em;
  text-transform: capitalize;
  &:before {
    color: #cacaca;
    content: ">";
    display: inline-block;
    margin: 0 8px;
  }
`;

// const CrumbLink = styled(Link)`
//   ${CrumbLinkBase}
//   ${CrumbDividerBase}
//   &:link,
//   &:visited {
//     color: #ababad;
//   }
// `;

export default Breadcrumbs;
