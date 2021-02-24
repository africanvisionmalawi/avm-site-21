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
        .title("Pages")
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
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings", "pages"].includes(listItem.getId())
      ),
    ]);
