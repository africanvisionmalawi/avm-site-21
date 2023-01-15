import { PortableText } from "@portabletext/react";
import { Image } from "components/common/Image";
import groq from "groq";
import client from "/client";

const Page = ({ data }) => {
  return (
    <article>
      <h1>{data?.title}</h1>
      {data?.hero && (
        <div>
          <Image image={data.image} />
        </div>
      )}
      {data?.body ? <PortableText article value={data.body} /> : null}
    </article>
  );
};

const query = groq`*[_type == "page" && slug.current == $slug][0]{ 
  slug, 
  id,
  title,
  description,
  indexPage,
  pageHeading, 
  "categoryTitle": category->title, 
  "categorySlug": category->slug.current,
  hero, 
  bannerMsg,
  content,
  body
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
  const data = await client.fetch(query, { slug });
  console.log("hero ", data.content);
  console.log("slug ", slug, data);
  return {
    props: {
      data,
      preview,
    },
    revalidate: 10,
  };
}

export default Page;
