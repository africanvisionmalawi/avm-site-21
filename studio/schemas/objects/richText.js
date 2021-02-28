// in post.js

export default {
  title: "Rich Text",
  name: "richText",
  type: "array",
  of: [
    {
      type: "block",
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "External link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
              },
              {
                title: "Open in new tab",
                name: "blank",
                description: "Read https://css-tricks.com/use-target_blank/",
                type: "boolean",
              },
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Internal link",
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [
                  { type: "page" },
                  { type: "post" },
                  { type: "shop" },
                  // other types you may want to link to
                ],
              },
            ],
          },
        ],
      },
    },
    {
      type: "image",
    },
  ],
};
