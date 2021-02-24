// in post.js

export default {
  title: "Shop",
  name: "shop",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Body",
      name: "body",
      type: "richText",
    },
    {
      title: "templateKey",
      name: "templateKey",
      type: "string",
    },
    {
      title: "Published",
      name: "publish",
      type: "boolean",
    },
    {
      title: "In Stock amount",
      name: "inStock",
      type: "number",
    },
    {
      title: "Featured Image",
      name: "featured_image",
      type: "image",
    },

    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      title: "Product Id",
      name: "productId",
      type: "string",
    },
    {
      title: "Meta Description",
      name: "description",
      type: "string",
    },
    {
      title: "Tags",
      name: "shopTags",
      type: "tags",
    },

    {
      title: "Related Products",
      name: "relatedProducts",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    },
    {
      name: "Photos",
      title: "galleryPhotos",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      title: "Product Image",
      name: "productImage",
      type: "number",
    },
    {
      title: "Price",
      name: "price",
      type: "number",
    },
    {
      title: "Sale Price",
      name: "salePrice",
      type: "number",
    },
    {
      title: "Total Sales",
      name: "total_sales",
      type: "number",
    },
    {
      title: "Weight (g)",
      name: "weight",
      type: "number",
    },
    {
      title: "Width (mm)",
      name: "width",
      type: "number",
    },
    {
      title: "Length (mm)",
      name: "length",
      type: "number",
    },
    {
      title: "Height (mm)",
      name: "height",
      type: "number",
    },
    {
      title: "Size",
      name: "size",
      type: "string",
    },
    {
      title: "Shipping Class",
      name: "shipClass",
      type: "string",
    },
  ],
};
