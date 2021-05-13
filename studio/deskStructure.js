import S from "@sanity/desk-tool/structure-builder";
import {
  ImCogs,
  ImFilesEmpty,
  ImHome,
  ImNewspaper,
  ImOffice,
  ImTicket,
} from "react-icons/im";
import { MdShoppingCart } from "react-icons/md";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .icon(ImHome)
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Pages by Category")
        .icon(ImFilesEmpty)
        .child(
          // List out the categories
          S.documentTypeList("pageCategory")
            .title("Pages by category")
            // When a category is selected, pass its id down to the next pane
            .child((pagecategoryId) =>
              // load a new document list
              S.documentList()
                .title("Pages")
                // Use a GROQ filter to get documents.
                // This filter checks for sampleProjects that has the
                // categoryId in its array of references
                .filter('_type == "page" && category._ref == $pagecategoryId')
                .params({ pagecategoryId })
            )
        ),
      S.listItem()
        .title("News")
        .icon(ImNewspaper)
        .child(S.document().schemaType("news").documentId("news")),
      S.listItem()
        .title("Events")
        .icon(ImTicket)
        .child(S.document().schemaType("events").documentId("events")),
      S.listItem()
        .title("Shop")
        .icon(MdShoppingCart)
        .child(S.document().schemaType("shop").documentId("shop")),
      S.listItem()
        .title("Our Work")
        .icon(ImOffice)
        .child(
          S.document().schemaType("ourWorkShared").documentId("ourWorkShared")
        ),
      S.divider(),
      S.listItem()
        .title("Settings")
        .icon(ImCogs)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Page Categories")
        .child(
          S.document().schemaType("pageCategory").documentId("pageCategory")
        ),
      S.listItem()
        .title("All Pages")
        .child(S.document().schemaType("page").documentId("page")),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "siteSettings",
            "pages",
            "ourWorkShared",
            "homePage",
            "shop",
            "news",
            "event",
            "pageCategory",
            "page",
          ].includes(listItem.getId())
      ),
    ]);
