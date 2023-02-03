import styled from "@emotion/styled";
import imageUrlBuilder from "@sanity/image-url";
import { CardPost } from "components/card/CardPost";
import { Hero } from "components/Hero";
import { PortableText } from "components/portable-text/BasePortableText";
import { Player } from "components/videos/Player";
import groq from "groq";
import React from "react";
import client from "/client";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 1180px;
  padding: 3em 0;
`;

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
`;

const LatestNews = styled.div`
  background: #f7f7f7;
  padding: 2.5em 0;
  min-height: 24rem;
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 2rem 4em 2rem;
  }
  @media (min-width: 1040px) {
    padding: 2rem 8em 2rem;
  }
  h2 {
    text-align: center;
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
  @media (min-width: 414px) {
    grid-template-columns: repeat(auto-fill, 373px);
  }
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
  margin: 0 auto 1rem;
  text-align: center;
  @media (min-width: 778px) {
    text-align: left;
  }
`;

const TopVideoSectionInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1280px;
  padding: 3em 1em 1em;
  width: 100%;
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const PostsFooter = styled.div`
  height: 50px;
  margin: 0 auto 3rem;
  max-width: 1180px;
  position: relative;
  &::before {
    bottom: 50%;
    content: "";
    border-bottom: 1px solid #b75906;
    position: absolute;
    width: 100%;
    z-index: 10;
  }

  & a {
    background: #fff;
    border: 2px solid #b75906;
    border-radius: 12px;
    display: inline-block;
    font-size: 0.8em;
    left: 50%;
    margin-left: -80px;
    padding: 4px 24px;
    position: absolute;
    text-align: center;
    top: 10%;
    width: 160px;
    z-index: 20;
  }
`;

const HomePage = ({ data }) => {
  // console.log("data here ", data);
  return (
    <article>
      <Hero
        image={data.hero.image}
        mobileImage={data.hero.mobileImage}
        displayHeroMsg={false}
        // heroHeading={c.title}
        // heroHeadingType="h2"
      />
      <TopSection>
        <Heading>{data.title}</Heading>
        {data.subTitle ? data.subTitle : null}
      </TopSection>
      <Main>
        <TopVideoSection>
          <TopVideoSectionInner>
            <VideoSection>
              {data.introText ? (
                <TextSection>
                  <PortableText
                    key={data.introText._key}
                    blocks={data.introText}
                  />
                </TextSection>
              ) : null}
            </VideoSection>
            <VideoSection>
              {data.promoVideo ? <Player url={data.promoVideo.url} /> : null}
            </VideoSection>
          </TopVideoSectionInner>
        </TopVideoSection>
        {data.latestNews ? (
          <LatestNews>
            <h2>Latest news</h2>
            <PortableText key={data.latestNews._key} blocks={data.latestNews} />
          </LatestNews>
        ) : null}
        {data.newsLinks ? (
          <>
            <section>
              <PostList>
                <CardCont>
                  {data.newsLinks.newsLinks.map((post) => (
                    <React.Fragment key={post._id}>
                      <CardPost post={post} />
                    </React.Fragment>
                  ))}
                </CardCont>
              </PostList>
            </section>
            <PostsFooter>
              <a href="/news/">View all news</a>
            </PostsFooter>
          </>
        ) : null}
      </Main>
    </article>
  );
};

const query = groq`*[_type == "homePage"][0]{     
  title,
  subTitle,
  description,
  hero,
  introText,
  promoVideo,
  latestNews,
  newsLinks {    
    _type,
    newsLinks[] {
      ...
      url->
    }
  }
}`;

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"

  const data = await client.fetch(query, {});
  // console.log("newslinks *********", data.newsLinks);
  // console.log("hero ", data.content);

  return {
    props: {
      data,
      preview,
    },
    revalidate: 10,
  };
}

export default HomePage;
