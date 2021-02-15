var proxy = require("http-proxy-middleware");
require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "African Vision Malawi",
    description:
      "Since 2005 African Vision Malawi has been helping children and vulnerable people in Malawi, one of the poorest countries in the world. Our vision is to see a healthy, educated and self-sufficient community in Malawi..",
    siteUrl: "https://www.africanvision.org.uk",
    baseUrl: "https://www.africanvision.org.uk",
  },
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // {
          //   resolve: "gatsby-remark-normalize-paths",
          //   options: {
          //     pathFields: [
          //       "photo",
          //       "pdf_upload",
          //       "featuredImage",
          //       "heroImage",
          //       "productImage",
          //     ],
          //   },
          // },
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              staticFolderName: "/static",
            },
          },
          // "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 885,
              tracedSVG: true,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 554,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 311, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            },
          },
        ],
      },
    },
    // `gatsby-plugin-image`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    // {
    //   resolve: `gatsby-plugin-react-helmet-canonical-urls`,
    //   options: {
    //     siteUrl: `https://www.africanvision.org.uk`,
    //   },
    // },
    "gatsby-plugin-sass",
    "gatsby-plugin-linaria",
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // {
    //   resolve: "@bundle-analyzer/gatsby-plugin",
    //   options: { token: process.env.BUNDLE_ANALYZER_TOKEN },
    // },
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Roboto`,
    //         variants: [`300`, `400`, `700`],
    //       },
    //       // {
    //       //   family: `Raleway`,
    //       //   variants: [`300`],
    //       // },
    //       // {
    //       //   family: `Dosis`,
    //       //   variants: [`400`, `700`],
    //       // },
    //     ],
    //   },
    // },
    // "gatsby-remark-embed-video",
    "gatsby-remark-responsive-iframe",
    // {
    //   resolve: `gatsby-plugin-algolia`,
    //   options: {
    //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     queries: require("./src/utils/algolia-queries"),
    //   },
    // },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.africanvision.org.uk`,
        stripQueryString: true,
      },
    },
    // },
    // {
    //   resolve: "gatsby-plugin-google-fonts",
    //   options: {
    //     fonts: ["noto sans:400,700,400italic,700italic", "londrina solid"]
    //   }
    // },
    // {
    //   resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
    //   options: {
    //     develop: true, // Activates purging in npm run develop
    //     purgeOnly: ["/all.sass"] // applies purging only on the bulma css file
    //   }
    // }, // must be after other CSS plugins
    {
      resolve: `gatsby-plugin-snipcart-advanced`,
      options: {
        version: "3.0.15",
        publicApiKey:
          "NDY4OTVmYjMtMDg1My00YzUxLWEyMWMtNmIwYzI2NzUwYWQ3NjM3NDA3NzI3ODk0NjgyMDc2",
        defaultLang: "en",
        currency: "gbp",
        openCartOnAdd: true,
        // locales: {
        //   fr: {
        //     actions: {
        //       checkout: "Valider le panier",
        //     },
        //   },
        // },
        innerHTML: `
            <billing section="bottom">
                <!-- Customization goes here -->
            </billing>`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        exclude: [`/mailing-list-sucess/*`],
      },
    },
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        // devMode: true,
        // disable: true,
      },
    },
    // {
    //   resolve: `gatsby-plugin-netlify-cms`,
    //   options: {
    //     modulePath: `${__dirname}/src/cms/cms.js`,
    //     // stylesPath: `${__dirname}/src/components/css/all.css`,
    //   },
    // },
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
