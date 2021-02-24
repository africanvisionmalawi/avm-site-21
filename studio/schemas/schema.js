// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import createSchema from "part:@sanity/base/schema-creator";
import pageCategory from "./category";
import pageLink from "./components/pageLinksPhoto.js";
import figure from "./objects/figure";
import page from "./page";
import post from "./post";
import richText from "./richText";
import richTextSimple from "./richTextSimple";
import shop from "./shop";
import siteSettings from "./siteSettings";

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
    pageLink,
    figure,
  ]),
});
