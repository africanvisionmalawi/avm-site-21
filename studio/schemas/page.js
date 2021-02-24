// in post.js

export default {
  title: "Page",
  name: "page",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Category",
      name: "category",
      type: "reference",
      description: "Which top level folder is the page located",
      to: [{ type: "pageCategory" }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "This will have whatever category you select above prefixed to it",
      options: {
        source: (doc) => `${doc.title}`,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Featured Image",
      name: "featured_image",
      type: "image",
    },
    {
      title: "Body",
      name: "body",
      type: "richText",
    },
    {
      title: "Page Links",
      name: "pageLinks",
      type: "pageLink",
    },
    {
      title: "Tags",
      name: "tags",
      type: "tags",
    },
    {
      title: "PDF Upload",
      name: "pdf",
      type: "file",
    },
    {
      title: "Meta Description",
      name: "description",
      type: "string",
    },
  ],
};
