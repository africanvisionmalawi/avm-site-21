const _ = require("lodash");
// import isMatch from "lodash/isEqual";
// import kebabCase from "lodash/kebabCase";
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
// const { fmImagesToRelative } = require("gatsby-remark-relative-images");
const createPaginatedPages = require("gatsby-paginate");

// TODO: move into common functions
const get = (obj, path, defValue) => {
  // If path is not defined or it has false value
  if (!path) return undefined;
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  // Find value if exist return otherwise return undefined value;
  return (
    pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj) || defValue
  );
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
      type BlogPostByID implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      pdf_upload: String
    }    
  `;
  createTypes(typeDefs);
};

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

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions;
//   const typeDefs = `
//     type MarkdownRemark implements Node @dontInfer {
//       slug: String
//       frontmatter: Frontmatter
//     }
//     type Frontmatter {
//       date: [Date]
//       endDate: [Date]
//       title: String
//       published: Boolean
//       tags: String
//       templateKey: String
//     }
//   `;
//   createTypes(typeDefs);
// };

// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes } = actions;
//   const typeDefs = [
//     "type MarkdownRemark implements Node { frontmatter: Frontmatter }",
//     `type Frontmatter {
//       date: Date @dateformat(formatString: "MMMM DD, YYYY")
//       endDate: Date @dateformat(formatString: "MMMM DD, YYYY")
//       title: String
//       published: Boolean
//       tags: String
//       templateKey: String
//     }`,
//     schema.postsAndPages({
//       name: "AuthorJson",
//       fields: {
//         slug: {
//           type: String,
//         },
//       },
//     }),
//   ];
//   createTypes(typeDefs);
// };

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              published
              tags
              shoptags
              templateKey
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const postsAndPages = result.data.allMarkdownRemark.edges;

    // Post pages:
    let posts = [];
    // Iterate through each post/page, putting all found posts (where templateKey = article-page) into `posts`
    postsAndPages.forEach((edge) => {
      if (
        _.isMatch(edge.node.frontmatter, {
          templateKey: "blog-post",
        })
      ) {
        posts = posts.concat(edge);
      }
    });

    postsAndPages.forEach((edge) => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        shopTags: edge.node.frontmatter.shopTags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          currentDate: getCurrentDate(),
        },
      });
    });

    createPaginatedPages({
      edges: posts,
      createPage: createPage,
      pageTemplate: "src/templates/news-list.js",
      pageLength: 10, // This is optional and defaults to 10 if not used
      pathPrefix: "news", // This is optional and defaults to an empty string if not used
      context: {}, // This is optional and defaults to an empty object if not used
    });

    // Tag pages:
    let tags = [];
    let shopTags = [];
    // Iterate through each post, putting all found tags into `tags`
    postsAndPages.forEach((edge) => {
      if (get(edge, `node.frontmatter.tags`)) {
        // console.log("adding other tag ");
        tags = tags.concat(edge.node.frontmatter.tags);
      }
      if (get(edge, `node.frontmatter.shoptags`)) {
        // console.log("adding shop tags ");
        shopTags = shopTags.concat(edge.node.frontmatter.shoptags);
      }
    });
    // Eliminate duplicate tags
    tags = [...new Set(tags)];
    shopTags = [...new Set(shopTags)];

    // Make tag pages
    tags.forEach((tag) => {
      const slug = _.kebabCase(tag);
      const tagPath = `/tags/${_.kebabCase(tag)}/`;
      // console.log("other tags ", tag);
      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
          slug,
        },
      });
    });

    // Make shop tag pages
    shopTags.forEach((tag) => {
      const tagPath = `/shop/category/${_.kebabCase(tag)}/`;
      // console.log("shop tags ", tag);
      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/shop-tags.js`),
        context: {
          tag,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  // fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
