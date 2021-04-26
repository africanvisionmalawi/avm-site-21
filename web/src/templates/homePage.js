// import SanityImage from "gatsby-plugin-sanity-image";
// import { Link } from "gatsby";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { styled } from "linaria/react";
import React from "react";
import ReactPlayer from "react-player";
import { CardPost } from "../components/card/CardPost";
import { CardPostAlt } from "../components/card/CardPostAlt";
import { Donate } from "../components/common/Donate";
import { Hero } from "../components/Hero";
// import InfoRows from "../components/InfoRows";
// import { Hero } from "../components/Hero";
// import { BottomWave, TopWave } from "../components/wave";
import Layout from "../components/Layout";
import { PortableText } from "../components/portableText/portableText";
import videoStyles from "../components/videos/videos.module.css";
dayjs.extend(advancedFormat);
// export const query = graphql`

const HomePage = ({ data }) => {
  const page = data.homeQuery;
  // console.log("newsLinks ", page.newsLinks);

  const allEvents = data.shopAll.edges;

  let futureEvents = [];
  if (allEvents.length) {
    allEvents.forEach(({ node: event }) => {
      if (event.endDate) {
        if (
          dayjs(event.endDate, "MMMM DD, YYYY").isAfter(
            dayjs().format("MMMM DD, YYYY")
          )
        ) {
          futureEvents.push(event);
        }
      } else {
        if (
          dayjs(event.date, "MMMM DD, YYYY").isAfter(
            dayjs().format("MMMM DD, YYYY")
          )
        ) {
          futureEvents.push(event);
        }
      }
    });
  }

  return (
    <Layout
      title={page.title ? page.title : ""}
      description="TODO: description"
      article={false}
    >
      <article>
        {page.hero ? (
          <Hero
            fluid={page.hero.image.asset.fluid}
            displayHeroMsg={true}
            heroHeading={page.title}
            heroHeadingType="h1"
            heroMsg={page.hero.heroMsg}
          />
        ) : (
          <TopSection>
            <Heading>{page.title}</Heading>
          </TopSection>
        )}
        <Main>
          <TopVideoSection>
            <TopVideoSectionInner>
              <VideoSection>
                {page.introText ? (
                  <TextSection>
                    <PortableText
                      key={page.introText._key}
                      blocks={page._rawIntroText}
                    />
                  </TextSection>
                ) : null}
              </VideoSection>
              <VideoSection>
                {page.promoVideo ? (
                  <div className={videoStyles.playerWrapper}>
                    <ReactPlayer
                      url={page.promoVideo.url}
                      width="100%"
                      height="100%"
                      className={videoStyles.reactPlayer}
                      controls={true}
                    />
                  </div>
                ) : null}
              </VideoSection>
            </TopVideoSectionInner>
          </TopVideoSection>

          {page.latestNews ? (
            <TextSection>
              <PortableText
                key={page.latestNews._key}
                blocks={page._rawLatestNews}
              />
            </TextSection>
          ) : null}

          {page.newsLinks ? (
            <>
              <section>
                <PostList>
                  <CardCont>
                    {page.newsLinks.newsLinks.map((post) => (
                      <React.Fragment key={post.url.id}>
                        <CardPost post={post.url} />
                      </React.Fragment>
                    ))}
                  </CardCont>
                </PostList>
              </section>
              {/* <PostsFooter>
                <Link to="/news/">View all news</Link>
              </PostsFooter> */}
            </>
          ) : null}

          {futureEvents ? (
            <>
              <section>
                <PostList>
                  <CardCont>
                    {futureEvents.map((post) => (
                      <React.Fragment key={post.id}>
                        <CardPostAlt
                          type="event"
                          title={post.title}
                          excerpt={post._rawExcerpt}
                          slug={post.slug.current}
                          date={post.date}
                          endDate={post.endDate}
                          hideTime={post.hideTime}
                          allDay={post.allDay}
                          photo={post.featured_image}
                        />
                      </React.Fragment>
                    ))}
                  </CardCont>
                </PostList>
              </section>
              {/* <PostsFooter>
                <Link to="/news/">View all news</Link>
              </PostsFooter> */}
            </>
          ) : null}
        </Main>

        <Donate
          link="https://www.charitycheckout.co.uk/1113786/"
          text="Donate"
          displayImage
        />
      </article>
    </Layout>
  );
};

const Heading = styled.h1`
  font-family: Raleway, "Helvetica Neue", "Segoe UI", "Helvetica", "Arial",
    "sans-serif";
  text-align: center;
`;

const TopSection = styled.div`
  margin: 0 auto;
  max-width: 885px;
  padding: 3rem 1rem 0;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding-top: 1rem;
  }
`;

const TextSection = styled.section`
  background: #fff;
  min-height: 24rem;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 0 4em 2rem;
  }
  @media (min-width: 1040px) {
    padding: 0 8em 2rem;
  }
`;

const PostList = styled.div`
  display: flex;
  margin: 2rem auto;
  max-width: 1180px;
`;

const CardCont = styled.div`
  align-items: grid-start;
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 30px;
  flex-shrink: 2;
  justify-content: center;
  max-width: 1525px;
  width: 100%;
`;

const VideoSection = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const TopVideoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto 120px;
  text-align: center;
  @media (min-width: 778px) {
    text-align: left;
  }
`;

const TopVideoSectionInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

// const PostsFooter = styled.div`
//   height: 50px;
//   margin: 0 auto 3rem;
//   max-width: 1180px;
//   position: relative;
//   &::before {
//     bottom: 50%;
//     content: "";
//     border-bottom: 1px solid #b75906;
//     position: absolute;
//     width: 100%;
//     z-index: 10;
//   }

//   & a {
//     background: #fff;
//     border: 2px solid #b75906;
//     border-radius: 12px;
//     display: inline-block;
//     font-size: 0.8em;
//     left: 50%;
//     margin-left: -80px;
//     padding: 4px 24px;
//     position: absolute;
//     text-align: center;
//     top: 10%;
//     width: 160px;
//     z-index: 20;
//   }
// `;

export default HomePage;
