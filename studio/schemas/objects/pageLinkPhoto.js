export default {
  type: "object",
  name: "pageLinkPhoto",
  fields: [
    {
      name: "photo",
      type: "figure",
    },
    {
      name: "linkTitle",
      type: "string",
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
    {
      title: "Or External URL",
      name: "extUrl",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "linkTitle",
      media: "photo",
    },
    prepare({ title, media }) {
      return {
        title: title,
        media,
      };
    },
  },
};
