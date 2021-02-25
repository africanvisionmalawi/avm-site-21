// in post.js

export default {
  title: "Site Settings",
  name: "siteSettings",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Date",
      name: "date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Meta Description",
      name: "meta_description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Tags",
      name: "tags",
      type: "tags",
    },
    {
      title: "Content",
      name: "content",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
        },
      ],
    },
  ],
};
