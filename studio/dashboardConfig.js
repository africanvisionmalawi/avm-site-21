export default {
  widgets: [
    {
      name: "gatsby",
      options: { sites: [{ siteUrl: "https://preview-avmsite21.gtsb.io/" }] },
    },
    {
      name: "snipcart-orders",
      options: {
        apiKey: process.env.SNIPCART_SECRET,
      },
    },
  ],
};
