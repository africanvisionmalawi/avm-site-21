// youtube.js
export default {
  name: "video",
  type: "object",
  title: "Video",
  fields: [
    {
      title: "YouTube/Vimeo video URL",
      name: "url",
      type: "url",
    },
    {
      title: "Text",
      name: "text",
      type: "string",
    },
  ],
};
