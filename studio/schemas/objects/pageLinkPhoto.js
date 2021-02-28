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
