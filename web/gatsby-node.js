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
    reporter.info(`Creating page: ${path}`);
    createPage({
      path,
      component: require.resolve("./src/templates/page.js"),
      context: { id },
    });
  });
}

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
  await createPages("/", graphql, actions, reporter);
  //   await createBlogPostPages("/blog", graphql, actions, reporter);
};
