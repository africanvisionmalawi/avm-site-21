export default {
  title: "Our Work",
  name: "ourWorkShared",
  type: "document",
  fields: [
    {
      type: "array",
      name: "ourWork",
      of: [{ type: "ourWorkItem" }],
    },
    // {
    //   type: "array",
    //   name: "team",
    //   title: "Team members",
    //   of: [{ type: "teamMember" }],
    // },
  ],
  preview: {
    select: {
      title: "Our Work (click to view)",
    },
    prepare({}) {
      return {
        title: "Our Work (click to view/edit)",
      };
    },
  },
};
