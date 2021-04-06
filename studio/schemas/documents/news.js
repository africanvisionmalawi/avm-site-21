// in post.js

export default {
  title: "News",
  name: "news",
  type: "document",
  fields: [
    {
      title: "Page Title",
      name: "title",
      type: "string",
    },
    {
      title: "Publish date",
      name: "publishDate",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
        calendarTodayLabel: "Today",
      },
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
    {
      name: "content",
      type: "array",
      title: "Page sections",
      description: "Add, edit, and reorder sections",
      of: [{ type: "photoGallery" }, { type: "blockPortableText" }],
    },
    {
      title: "Tags",
      name: "tags",
      type: "tags",
    },
    {
      title: "Meta Description",
      name: "description",
      type: "string",
    },
  ],
};
