// in post.js

export default {
  title: "Photo Gallery",
  name: "photoGallery",
  type: "object",
  fields: [
    {
      type: "array",
      name: "photos",
      of: [{ type: "figure" }],
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
  preview: {
    prepare({}) {
      return {
        title: "Photo gallery (click to view/edit)",
      };
    },
  },
};
