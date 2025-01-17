import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";
//documents
import frontPage from "./documents/frontPage";
import site from "./documents/site";
import category from "./documents/category";
import footer from "./documents/footer";
import navigation from "./documents/navigation";
import sitePage from "./documents/sitePage";
//fields
import title from "./fields/title";
import webSiteUrl from "./fields/webSiteUrl";
import blockContent from "./fields/blockContent";
import link from "./fields/link";
import siteImage from "./fields/siteImage";

export default createSchema({
  name: "default",

  types: schemaTypes.concat([
    frontPage,
    site,
    category,
    title,
    webSiteUrl,
    blockContent,
    link,
    footer,
    navigation,
    siteImage,
    sitePage,
  ]),
});
