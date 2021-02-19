// in post.js

export default {
  title: "Page",
  name: "page",
  type: "document",
  fields: [
    {
      title: "Template Key",
      name: "templateKey",
      type: "string",
    },
    {
      title: "Folder",
      name: "folder",
      type: "reference",
      description: "Which top level folder is the page located",
      to: [{ type: "pageCategory" }],
    },
    {
      title: "Columns",
      name: "columns",
      type: "string",
    },
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Meta Description",
      name: "description",
      type: "string",
    },

    {
      title: "Published",
      name: "published",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Featured Image",
      name: "featured_image",
      type: "image",
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
    {
      title: "PDF Upload",
      name: "pdf",
      type: "file",
    },
  ],
};
