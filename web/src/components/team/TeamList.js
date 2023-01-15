// import PreviewCompatibleImage from "../PreviewCompatibleImage";
// import Img from "gatsby-image";
import styled from "@emotion/styled";
import SanityImage from "gatsby-plugin-sanity-image";

export const TeamList = (props) => {
  // console.log("props", props);
  return (
    <>
      <Heading>{props.heading}</Heading>
      <List>
        {props.team.map((t) => (
          <li key={t.name}>
            {t.photo && typeof t.photo === "object" && (
              <TeamPhoto>
                <SanityImage
                  {...t.photo}
                  width={150}
                  height={150}
                  alt={t.photo.alt}
                  sizes="130px"
                  style={{
                    width: "130px",
                    height: "130px",
                  }}
                />
                {/* <Img fixed={t.photo.childImageSharp.fixed} alt={t.name} /> */}
              </TeamPhoto>
            )}
            {t.name ? <SubHeading>{t.name}</SubHeading> : null}
            {t.role ? <About>{t.role}</About> : null}
          </li>
        ))}
      </List>
    </>
  );
};

const List = styled.ul`
  align-items: flex-start;
  background: #fff;
  border-radius: 2px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(220px, 1fr));
  grid-gap: 1rem;
  justify-items: center;
  margin-bottom: 2rem !important;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  &,
  & li {
    list-style-type: none;
    margin: 0 !important;
    padding: 0;
  }
  & li {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Heading = styled.h2`
  text-align: center;
`;

const SubHeading = styled.h4`
  margin-bottom: 0;
`;

const TeamPhoto = styled.div`
  border: 10px solid #fff;
  border-radius: 50%;
  max-height: 150px;
  max-width: 150px;
  overflow: hidden;
  & img {
    border: 1px solid #e5e5e5;
  }
`;

const About = styled.p`
  font-size: 0.8em;
  padding-bottom: 1.2em;
`;
