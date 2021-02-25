// in post.js

export default {
  title: "Page Links",
  name: "pageLinks",
  type: "object",
  fields: [
    {
      type: "array",
      name: "pageLinks",
      of: [{ type: "pageLinkPhoto" }],
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
};
