import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Homepage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Pages by Category")
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
        .title("Our Work")
        .child(
          S.document().schemaType("ourWorkShared").documentId("ourWorkShared")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["siteSettings", "pages", "ourWorkShared"].includes(listItem.getId())
      ),
    ]);
