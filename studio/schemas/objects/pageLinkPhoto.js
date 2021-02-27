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
      name: "linkTitle",
      media: "photo",
    },
    prepare({ linkTitle, media }) {
      return {
        title: linkTitle,
        media,
      };
    },
  },
};
