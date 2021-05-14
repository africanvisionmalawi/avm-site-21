// in post.js
import { MdShoppingCart } from "react-icons/md";

export default {
  title: "Shop",
  name: "shop",
  icon: MdShoppingCart,
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      title: "Body",
      name: "body",
      type: "richText",
    },
    {
      name: "photoGallery",
      title: "Photo Gallery",
      type: "photoGallery",
    },
    {
      title: "In Stock amount",
      name: "inStock",
      type: "number",
    },
    {
      title: "Tags",
      name: "shopTags",
      type: "tags",
    },
    // {
    //   title: "Related Products",
    //   name: "relatedProducts",
    //   type: "array",
    //   of: [
    //     {
    //       type: "string",
    //     },
    //   ],
    //   options: {
    //     layout: "tags",
    //   },
    // },
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
    // {
    //   title: "Size",
    //   name: "size",
    //   type: "string",
    // },
    // {
    //   title: "Shipping Class",
    //   name: "shipClass",
    //   type: "string",
    // },
    {
      title: "Total Sales",
      name: "total_sales",
      type: "number",
    },
    {
      title: "Meta Description",
      name: "description",
      type: "string",
    },
  ],
};
