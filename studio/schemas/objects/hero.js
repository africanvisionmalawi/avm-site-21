export default {
  title: "Hero",
  type: "object",
  name: "hero",
  fields: [
    {
      name: "heroMsg",
      type: "richTextSimple",
    },
    {
      name: "image",
      type: "mainImage",
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
};
