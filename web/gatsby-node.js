// const { getPath } = require("./src/utils/helpers");
const { isFuture } = require("date-fns");
// const getPath = (cat, slug) => {
//   const pathPrefix = cat == "other" ? "/" : cat + "/";
//   const newSlug = cat == slug ? "/" : slug;
//   const path = pathPrefix + newSlug;
//   return path;
// };

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

// async function createLandingPages(
//   pathPrefix = "/",
//   graphql,
//   actions,
//   reporter
// ) {
//   const { createPage } = actions;
//   const result = await graphql(`
//     {
//       allSanityRoute(
//         filter: { slug: { current: { ne: null } }, page: { id: { ne: null } } }
//       ) {
//         edges {
//           node {
//             id
//             slug {
//               current
//             }
//           }
//         }
//       }
//     }
//   `);

//   if (result.errors) throw result.errors;

//   const routeEdges = (result.data.allSanityRoute || {}).edges || [];
//   routeEdges.forEach((edge) => {
//     const { id, slug = {} } = edge.node;
//     const path = [pathPrefix, slug.current, "/"].join("");
//     reporter.info(`Creating landing page: ${path}`);
//     createPage({
//       path,
//       component: require.resolve("./src/templates/page.js"),
//       context: { id },
//     });
//   });
// }

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
    // const path = getPath(category.slug.current, slug);
    reporter.info(
      `Creating page: ${path} with slug ${slug.current} and id: ${id}`
    );
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
      allSanityNews(filter: { slug: { current: { ne: null } } }) {
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

  const pageEdges = (result.data.allSanityNews || {}).edges || [];
  pageEdges.forEach((edge) => {
    const { id, slug = {} } = edge.node;
    const pathPrefix = "/news/";
    const path = `${pathPrefix}${slug.current + "/"}`;
    reporter.info(
      `Creating news page: ${path} with slug ${slug.current} and id: ${id}`
    );
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
  postEdges.forEach((edge) => {
    const { id } = edge.node;
    const path = edge.node.frontmatter.path.replace("/posts", "/news");
    reporter.info(`Creating markdown news page: ${path} with id: ${id}`);
    createPage({
      path,
      tags: edge.node.frontmatter.tags,
      component: require.resolve("./src/templates/markdownNews.js"),
      context: { id, currentDate: getCurrentDate() },
    });
  });
}

// async function createHomePage(graphql, actions, reporter) {
//   const { createPage } = actions;
//   const result = await graphql(`
//     {
//       allSanityHomePage {
//         edges {
//           node {
//             title
//             id
//           }
//         }
//       }
//     }
//   `);

//   // enw vode here
//   const pageEdges = (result.data.allSanityHomePage || {}).edges || [];
//   pageEdges.forEach((edge) => {
//     const { id } = edge.node;

//     const path = "/";
//     reporter.info(`Creating home page: ${path}`);
//     createPage({
//       path,
//       component: require.resolve("./src/templates/homePage.js"),
//       context: { id },
//     });
//   });
// }

// async function createBlogPostPages(
//   pathPrefix = "/blog",
//   graphql,
//   actions,
//   reporter
// ) {
//   const { createPage } = actions;
//   const result = await graphql(`
//     {
//       allSanityPost(
//         filter: { slug: { current: { ne: null } }, isPublished: { eq: true } }
//       ) {
//         edges {
//           node {
//             id
//             publishedAt
//             slug {
//               current
//             }
//           }
//         }
//       }
//     }
//   `);

//   if (result.errors) throw result.errors;

//   const postEdges = (result.data.allSanityPost || {}).edges || [];
//   postEdges
//     .filter((edge) => !isFuture(edge.node.publishedAt))
//     .forEach((edge) => {
//       const { id, slug = {} } = edge.node;
//       const path = `${pathPrefix}/${slug.current}/`;
//       reporter.info(`Creating blog post page: ${path}`);
//       createPage({
//         path,
//         component: require.resolve("./src/templates/blog-post.js"),
//         context: { id },
//       });
//     });
// }

exports.createPages = async ({ graphql, actions, reporter }) => {
  // await createHomePage(graphql, actions, reporter);
  await createPages("/", graphql, actions, reporter);
  await createNews("/", graphql, actions, reporter);
  await createMarkdownNews("/", graphql, actions, reporter);

  //   await createBlogPostPages("/blog", graphql, actions, reporter);
};
