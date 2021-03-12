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
      title: "Hero Image",
      name: "hero",
      type: "hero",
    },
    {
      title: "Body",
      name: "body",
      type: "bodyPortableText",
    },
    // {
    //   title: "Videos",
    //   name: "videos",
    //   type: "videoGallery",
    // },
    {
      name: "content",
      type: "array",
      title: "Page sections",
      description: "Add, edit, and reorder sections",
      of: [
        { type: "pageLinks" },
        { type: "videoGallery" },
        { type: "photoGallery" },
        { type: "hero" },
        { type: "blockPortableText" },
        { type: "team" },
      ],
    },
    // {
    //   title: "Page Links",
    //   name: "inks",
    //   type: "pageLinks",
    // },
    // {
    //   title: "Photo gallery",
    //   name: "gallery",
    //   type: "photoGallery",
    // },
    // {
    //   title: "Tags",
    //   name: "tags",
    //   type: "tags",
    // },
    {
      title: "Meta Description",
      name: "description",
      type: "string",
    },
  ],
};
