module.exports = {
  sanity: {
    projectId:
      process.env.GATSBY_SANITY_PROJECT_ID || "<#< sanity.projectId >#>",
    dataset: process.env.GATSBY_SANITY_DATASET || "<#< sanity.dataset >#>",
    apiVersion: "2021-08-31",
  },
};
