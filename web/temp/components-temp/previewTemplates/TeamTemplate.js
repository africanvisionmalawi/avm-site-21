import { styled } from "linaria/react";
import React from "react";
import { SectionTop } from "../common/SectionTop";
import Content from "../Content";
// import Donate from "../Donate";
// import FeaturedProjectsTiles from "../FeaturedProjectsTiles";
import HeadingH1 from "../HeadingH1";
import NavbarLower from "../NavbarLower";
import teamStyles from "../team.module.css";
import TeamList from "../team/TeamList";

const PictureSection = styled.div`
  margin: 0 auto;
  max-width: 1080px;
  position: relative;
  width: 100%;
`;

const SubHeading = styled.h2`
  text-align: center;
`;

export const TeamTemplate = ({
  content,
  malawiTeam,
  ukTeam,
  malawiTitle,
  malawiText,
  ukTitle,
  ukText,
  contentComponent,
  path,
}) => {
  const PageContent = contentComponent || Content;
  console.log("malawiteam ", malawiTeam);
  return (
    <>
      <NavbarLower path={path} />
      <article>
        <main>
          <PictureSection>
            <SectionTop>
              <HeadingH1 text="Meet the team" />
              <TeamList heading="Team in Malawi" teamData={malawiTeam} />
              <div className={teamStyles.contentBox}>
                <SubHeading>{malawiTitle}</SubHeading>
                <p>{malawiText}</p>
                <PageContent className="content" content={content} />
              </div>
              <div className={teamStyles.contentBox}>
                <SubHeading>{ukTitle}</SubHeading>
                <p>{ukText}</p>
              </div>
              <TeamList heading="Team in the UK" teamData={ukTeam} />
            </SectionTop>
          </PictureSection>
        </main>
        {/* <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        /> */}
      </article>
      {/* <FeaturedProjectsTiles currentProject="default" displayHeading={true} /> */}
    </>
  );
};
