import styled from "@emotion/styled";
import { PortableText } from "@portabletext/react";
import { Image } from "components/common/image/Image";
import { Gallery } from "components/gallery";
import { Hero } from "components/Hero";
import { PageLinks } from "components/page-links";
import { Videos } from "components/videos";
import groq from "groq";
import client from "/client";

const Container = styled.section`
  margin: 0 auto;
  padding: 0 0 3rem;
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
  margin: 0 auto;
  max-width: 1180px;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    padding: 2rem 4em;
  }
  @media (min-width: 1040px) {
    padding: 2rem 8em;
  }
`;

const ContentSection = styled.section`
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 0 3rem;
`;

const Main = styled.main`
  background: #fff;
  border-radius: 2px;
`;

const Page = ({ data }) => {
  console.log("data here is ***** ", data);
  const content = (data?.content || [])
    .filter((c) => !c.disabled)
    .map((c, i) => {
      let el = null;
      console.log("type ", c._type);
      switch (c._type) {
        case "hero":
          el = (
            <Hero
              image={c.image}
              displayHeroMsg={false}
              heroHeading={c.title}
              heroHeadingType="h2"
            />
          );
          console.log("c.image.asset **********", c.image.asset);
          break;
        case "videoGallery":
          el = <Videos key={c._key} {...c} />;
          break;
        case "pageLinks":
          console.log("pageLinks c ", c);
          el = (
            <ContentSection>
              <PageLinks key={c._key} {...c} />
            </ContentSection>
          );
          break;
        case "photoGallery":
          el = <Gallery key={c._key} {...c} />;
          break;
        case "blockPortableText":
          el = (
            <TextSection>
              <PortableText key={c._key} {...c} />
            </TextSection>
          );
          break;
        case "team":
          el = (
            <TextSection>
              <TeamList key={c._key} {...c} />
            </TextSection>
          );
          break;
        case "googlemap":
          console.log("has map");
          el = <GoogleMap key={c._key} {...c} />;
          break;
        case "uiComponentRef":
          switch (c.name) {
            case "topWave":
              //   el = <TopWave />;
              break;
            case "bottomWave":
              //   el = <BottomWave />;
              break;
            default:
              break;
          }
          break;
        default:
          el = null;
      }
      return el;
    });
  return (
    <article>
      <h1>{data?.title}</h1>
      {data?.photo && (
        <div>
          <Hero
            image={data.photo}
            displayHeroMsg={false}
            // heroHeading={c.title}
            // heroHeadingType="h2"
          />
          {/* <Image image={data.hero.image.asset} /> */}
        </div>
      )}
      {data?.body ? <PortableText article value={data.body} /> : null}
      <Container>{content}</Container>
      {data?.photo ? (
        <Image
          image={data.photo}
          maxWidth={800}
          height={540}
          alt={data.photo.alt}
        />
      ) : null}
    </article>
  );
};

const query = groq`*[_type == "news" && slug.current == $slug[0]][0]{ 
  slug, 
  id,
  title,
  description,
  photo,
  excerpt,
  body,
  content,
  tags,
  pageHeading, 
  publishDate,  
  // content[] {        
  //   ...
  //   pageLinks {
  //     ...
  //     pageLinks[] {
  //       ...
  //       url->
  //     }
  //   },     
  // },  
}`;

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "document" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  //   console.log("slug length ", slug.length, slug);
  const hasCategory = !!slug.length > 1;
  const slugLength = slug.length;
  const currentSlug = hasCategory ? slug[slug.length - 1] : slug;
  console.log("currentSlug ", currentSlug);
  const data = await client.fetch(query, { slug, hasCategory });
  //   console.log("slug ", slug);
  // console.log("hero ", data.content);
  // console.log("slug ", slug, data);
  return {
    props: {
      data,
      preview,
    },
    revalidate: 10,
  };
}

export default Page;
