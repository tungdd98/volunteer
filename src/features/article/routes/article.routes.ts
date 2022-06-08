import React from "react";

import { RouteItem } from "types/route.types";

import { ArticlePathsEnum } from "../article";

const AdminLayout = React.lazy(() => import("layouts/AdminLayout/AdminLayout"));

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

const DONATE_PROGRESS_SCREEN: RouteItem = {
  id: "donate-progress",
  path: ArticlePathsEnum.DONATE_PROGRESS,
  component: React.lazy(
    () => import("../screens/DonateProgressScreen/DonateProgressScreen")
  ),
};

const EDIT_SCREEN: RouteItem = {
  id: "article-edit",
  path: ArticlePathsEnum.ARTICLE_CREATE,
  component: React.lazy(() => import("../screens/admin/EditScreen/EditScreen")),
  layout: AdminLayout,
};

export const ARTICLE_ROUTES = [
  ARTICLE_LIST_SCREEN,
  ARTICLE_DETAIL_SCREEN,
  DONATE_PROGRESS_SCREEN,
  EDIT_SCREEN,
];
