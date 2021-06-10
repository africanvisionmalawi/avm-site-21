import { graphql, useStaticQuery } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { Hero } from "../Hero";
import { CtaButton } from "./CtaButton";

const Container = styled.div`
  background: #58b5d7;
  margin-bottom: 3em;
  padding: 30px 0;
  text-align: center;
`;

export const Donate = (props) => {
  const donateImage = useStaticQuery(
    graphql`{
  donateImageDesktop: file(relativePath: {eq: "hero/donate-desktop.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 60, placeholder: TRACED_SVG, layout: FULL_WIDTH)
    }
  }
  donateImageMobile: file(relativePath: {eq: "hero/donate-mobile.jpg"}) {
    childImageSharp {
      gatsbyImageData(
        width: 480
        height: 300
        quality: 60
        placeholder: TRACED_SVG
        layout: CONSTRAINED
      )
    }
  }
}
`
  );

  return <>
    {props.displayImage ? (
      <Hero
        fluid={donateImage.donateImageDesktop.childImageSharp.gatsbyImageData}
        fluidMobile={donateImage.donateImageMobile.childImageSharp.gatsbyImageData}
      >
        <p>
          Donate now to help us help children &amp; vulnerable people in
          Malawi.
        </p>
        <CtaButton link={props.link} text={props.text} placement="alt" />
      </Hero>
    ) : (
      <Container>
        <CtaButton link={props.link} text={props.text} placement="alt" />
      </Container>
    )}
  </>;
};
