import client from '/client'

const Page = ({data}) => {
  
  return (
    <article>
      <h1>{data?.slug?.current}</h1>
    </article>
  )
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "document" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}
  
export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const data = await client.fetch(`
    *[_type == "page" && slug.current == $slug][0]    
  `, { slug });
  console.log("slug ", slug, data);
  return {
    props: {
      data
    }
  }
}

export default Page
