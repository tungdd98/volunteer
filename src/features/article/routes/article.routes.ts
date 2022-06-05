import React from "react";

import { RouteItem } from "types/route.types";

import { ArticlePathsEnum } from "../article";

const ARTICLE_LIST_SCREEN: RouteItem = {
  id: "article-list",
  path: ArticlePathsEnum.ARTICLE_LIST,
  component: React.lazy(
    () => import("../screens/ArticleListScreen/ArticleListScreen")
  ),
};

export const ARTICLE_ROUTES = [ARTICLE_LIST_SCREEN];
