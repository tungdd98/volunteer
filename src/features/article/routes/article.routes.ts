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

const ARTICLE_DETAIL_SCREEN: RouteItem = {
  id: "article-detail",
  path: ArticlePathsEnum.ARTICLE_DETAIL,
  component: React.lazy(
    () => import("../screens/ArticleDetailScreen/ArticleDetailScreen")
  ),
};

export const ARTICLE_ROUTES = [ARTICLE_LIST_SCREEN, ARTICLE_DETAIL_SCREEN];
