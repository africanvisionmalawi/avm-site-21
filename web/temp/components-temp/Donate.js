import { graphql, useStaticQuery } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { HeroImage } from "./common/HeroImage";
import CtaButton from "./CtaButton";

const Container = styled.div`
  background: #58b5d7;
  margin-bottom: 3em;
  padding: 30px 0;
  text-align: center;
`;

const Donate = (props) => {
  const donateImage = useStaticQuery(
    graphql`
      query {
        donateImageDesktop: file(
          relativePath: { eq: "hero/donate-desktop.jpg" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1918, maxHeight: 540, quality: 60) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        donateImageMobile: file(
          relativePath: { eq: "hero/donate-mobile.jpg" }
        ) {
          childImageSharp {
            fluid(maxWidth: 480, maxHeight: 300, quality: 60) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `
  );

  return (
    <>
      {props.displayImage ? (
        <HeroImage
          desktopImage={donateImage.donateImageDesktop}
          mobileImage={donateImage.donateImageMobile}
          hasMobileImage={true}
        >
          <p>
            Donate now to help us help children &amp; vulnerable people in
            Malawi.
          </p>
          <CtaButton link={props.link} text={props.text} placement="alt" />
        </HeroImage>
      ) : (
        <Container>
          <CtaButton link={props.link} text={props.text} placement="alt" />
        </Container>
      )}
    </>
  );
};

export default Donate;
