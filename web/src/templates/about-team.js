import { graphql } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { SectionTop } from "../components/common/SectionTop";
import Content, { HTMLContent } from "../components/Content";
import Donate from "../components/Donate";
import FeaturedProjectsTiles from "../components/FeaturedProjectsTiles";
import HeadingH1 from "../components/HeadingH1";
import Layout from "../components/Layout";
import NavbarLower from "../components/NavbarLower";
import teamStyles from "../components/team.module.css";
import TeamList from "../components/team/TeamList";

const TeamTemplate = ({
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
        <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        />
      </article>
      <FeaturedProjectsTiles currentProject="default" displayHeading={true} />
    </>
  );
};

const TeamPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout
      title={`${post.frontmatter.title}`}
      description={post.frontmatter.description}
      article={false}
    >
      <TeamTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        malawiTeam={post.frontmatter.malawiTeam}
        ukTeam={post.frontmatter.ukTeam}
        malawiTitle={post.frontmatter.malawiTitle}
        malawiText={post.frontmatter.malawiText}
        ukTitle={post.frontmatter.ukTitle}
        ukText={post.frontmatter.ukText}
        path={post.fields.slug}
      />
    </Layout>
  );
};

// TeamPage.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.shape({
//       frontmatter: PropTypes.object,
//     }),
//   }),
// };

const PictureSection = styled.div`
  margin: 0 auto;
  max-width: 1080px;
  position: relative;
  width: 100%;
`;

const SubHeading = styled.h2`
  text-align: center;
`;

export default TeamPage;

export const TeamPageQuery = graphql`
  query TeamPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        malawiTitle
        malawiText
        ukTitle
        ukText
        malawiTeam {
          photo {
            childImageSharp {
              fixed(width: 150, height: 150, quality: 50) {
                ...GatsbyImageSharpFixed_withWebp_tracedSVG
              }
            }
          }
          name
          role
        }
        ukTeam {
          photo {
            childImageSharp {
              fixed(width: 150, height: 150, quality: 50) {
                ...GatsbyImageSharpFixed_withWebp_tracedSVG
              }
            }
          }
          name
          role
        }
      }
    }
  }
`;
