export default {
  type: "object",
  name: "pageLinkPhoto",
  fields: [
    {
      name: "photo",
      type: "figure",
    },
    {
      type: "string",
      name: "linkTitle",
    },
    {
      name: "linkText",
      type: "richTextSimple",
    },
    {
      title: "Page to link to",
      name: "url",
      type: "reference",
      to: [{ type: "page" }],
    },
  ],
};
