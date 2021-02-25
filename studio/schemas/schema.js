// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import createSchema from "part:@sanity/base/schema-creator";
import pageCategory from "./category";
import page from "./documents/page";
import post from "./documents/post";
import shop from "./documents/shop";
import siteSettings from "./documents/siteSettings";
import figure from "./objects/figure";
import hero from "./objects/hero";
import mainImage from "./objects/mainImage";
import pageLinkPhoto from "./objects/pageLinkPhoto.js";
import pageLinks from "./objects/pageLinks.js";
import richText from "./objects/richText";
import richTextSimple from "./objects/richTextSimple";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    pageCategory,
    post,
    shop,
    page,
    siteSettings,
    richText,
    richTextSimple,
    pageLinks,
    pageLinkPhoto,
    figure,
    hero,
    mainImage,
  ]),
});
