// const { getPath } = require("./src/utils/helpers");
const { isFuture } = require("date-fns");
const createPaginatedPages = require("gatsby-paginate");
// const { lte } = require("lodash-es");
// const getPath = (cat, slug) => {
//   const pathPrefix = cat == "other" ? "/" : cat + "/";
//   const newSlug = cat == slug ? "/" : slug;
//   const path = pathPrefix + newSlug;
//   return path;
// };

const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/**
 * Returns the current date in YYYY-MM-DD format
 */
function getCurrentDate() {
  const d = new Date();
  let month = (d.getMonth() + 1).toString();
  if (month.length < 2) {
    month = `0${month}`;
  }
  let day = d.getDate().toString();
  if (day.length < 2) {
    day = `0${day}`;
  }
  return `${d.getFullYear()}-${month}-${day}`;
}

let allNews = [];

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: "SanityPost",
      interfaces: ["Node"],
      fields: {
        isPublished: {
          type: "Boolean!",
          resolve: (source) => new Date(source.publishedAt) <= new Date(),
        },
      },
    }),
  ]);
};

async function createPages(pathPrefix = "", graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPage(
        filter: {
          slug: { current: { ne: null } }
          category: { slug: { current: { ne: null } } }
        }
      ) {
        edges {
          node {
            id
            indexPage
            category {
              slug {
                current
              }
            }
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const pageEdges = (result.data.allSanityPage || {}).edges || [];
  pageEdges.forEach((edge) => {
    const { id, slug = {}, indexPage, category = {} } = edge.node;
    const pathPrefix =
      category.slug.current === "other" ? "/" : category.slug.current + "/";
    const path = `${pathPrefix}${indexPage ? "" : slug.current + "/"}`;

    createPage({
      path,
      component: require.resolve("./src/templates/page.js"),
      context: { id },
    });
  });
}

async function createNews(pathPrefix = "", graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityNews(
        filter: { slug: { current: { ne: null } } }
        sort: { order: DESC, fields: [publishDate] }
      ) {
        edges {
          node {
            id
            title
            slug {
              current
            }
            photo {
              asset {
                fluid {
                  src
                  srcSet
                  sizes
                  aspectRatio
                }
              }
            }
            _rawExcerpt(resolveReferences: { maxDepth: 10 })
            _type
            publishDate(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const pageEdges = (result.data.allSanityNews || {}).edges || [];
  allNews = allNews.concat(pageEdges);

  pageEdges.forEach((edge) => {
    const { id, slug = {} } = edge.node;
    const pathPrefix = "/news/";
    const path = `${pathPrefix}${slug.current + "/"}`;
    // reporter.info(
    //   `Creating news page: ${path} with slug ${slug.current} and id: ${id}`
    // );
    createPage({
      path,
      component: require.resolve("./src/templates/news.js"),
      context: { id },
    });
  });
}

async function createMarkdownNews(pathPrefix = "", graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            frontmatter {
              title
              path
              published
              tags
              templateKey
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allMarkdownRemark || {}).edges || [];
  allNews = allNews.concat(postEdges);
  postEdges.forEach((edge) => {
    const { id } = edge.node;
    const path = edge.node.frontmatter.path.replace("/posts", "/news");
    // reporter.info(`Creating markdown news page: ${path} with id: ${id}`);
    createPage({
      path,
      tags: edge.node.frontmatter.tags,
      component: require.resolve("./src/templates/markdownNews.js"),
      context: { id, currentDate: getCurrentDate() },
    });
  });
}

async function createArticleIndex(actions) {
  const { createPage } = actions;
  createPaginatedPages({
    edges: allNews,
    createPage: createPage,
    pageTemplate: "src/templates/articleList.js",
    pageLength: 10, // This is optional and defaults to 10 if not used
    pathPrefix: "news", // This is optional and defaults to an empty string if not used
    context: {}, // This is optional and defaults to an empty object if not used
  });
}

async function createShopPages(pathPrefix = "", graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityShop(
        filter: { slug: { current: { ne: null } }, hide: { ne: true } }
      ) {
        edges {
          node {
            id
            title
            slug {
              current
            }
            tags {
              label
              value
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const pageEdges = (result.data.allSanityShop || {}).edges || [];
  pageEdges.forEach((edge) => {
    const { id, slug = {}, tags = {} } = edge.node;
    const pathPrefix = "/shop/";
    const path = `${pathPrefix}${slug.current + "/"}`;
    const tag = tags.length ? tags[0].value : null;
    // reporter.info(
    //   `Creating shop page: ${path} with slug ${slug.current} and id: ${id}`
    // );
    createPage({
      path,
      component: require.resolve("./src/templates/shop-product.js"),
      context: { id, tag },
    });
  });
}

async function createShopCategories(
  pathPrefix = "",
  graphql,
  actions,
  reporter
) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanitySiteSettings {
        edges {
          node {
            shopTags {
              title
              value {
                current
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  let tagPages = result.data.allSanitySiteSettings || {};
  tagPages.edges[0].node.shopTags.forEach((tag) => {
    const title = tag.title;
    const value = tag.value.current;
    const path = `/shop/category/${value + "/"}`;
    // reporter.info(`Creating shop tag page: ${path}`);
    createPage({
      path,
      component: require.resolve("./src/templates/shop-tags.js"),
      context: { title, value },
    });
  });
}

async function createEventPages(pathPrefix = "", graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityEvent(
        filter: { slug: { current: { ne: null } } }
        sort: { order: DESC, fields: date }
      ) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const pageEdges = (result.data.allSanityEvent || {}).edges || [];
  pageEdges.forEach((edge) => {
    const { id, slug = {} } = edge.node;
    const pathPrefix = "/events/";
    const path = `${pathPrefix}${slug.current + "/"}`;
    // reporter.info(
    //   `Creating event page: ${path} with slug ${slug.current} and id: ${id}`
    // );
    createPage({
      path,
      component: require.resolve("./src/templates/event.js"),
      context: { id },
    });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // await createHomePage(graphql, actions, reporter);
  await createPages("/", graphql, actions, reporter);
  await createNews("/", graphql, actions, reporter);
  await createMarkdownNews("/", graphql, actions, reporter);
  await createArticleIndex(actions);
  await createShopPages("/", graphql, actions, reporter);
  await createShopCategories("/", graphql, actions, reporter);
  await createEventPages("/", graphql, actions, reporter);
  //   await createBlogPostPages("/blog", graphql, actions, reporter);
};
