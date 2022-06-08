import React from "react";

import { RouteItem } from "types/route.types";

import { ArticlePathsEnum } from "../article";

const AdminNoSidebar = React.lazy(
  () => import("layouts/AdminNoSidebar/AdminNoSidebar")
);

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

const DONATE_SUCCESS_SCREEN: RouteItem = {
  id: "donate-success",
  path: ArticlePathsEnum.DONATE_SUCCESS,
  component: React.lazy(
    () => import("../screens/DonateSuccessScreen/DonateSuccessScreen")
  ),
};

const CREATE_SCREEN: RouteItem = {
  id: "article-create-admin",
  path: ArticlePathsEnum.ARTICLE_CREATE,
  component: React.lazy(
    () => import("../screens/admin/CreateScreen/CreateScreen")
  ),
  layout: AdminNoSidebar,
};

const EDIT_SCREEN: RouteItem = {
  id: "article-edit-admin",
  path: ArticlePathsEnum.ARTICLE_EDIT,
  component: React.lazy(() => import("../screens/admin/EditScreen/EditScreen")),
  layout: AdminNoSidebar,
};

const LIST_SCREEN: RouteItem = {
  id: "article-list-admin",
  path: ArticlePathsEnum.ARTICLE_LIST_ADMIN,
  component: React.lazy(() => import("../screens/admin/ListScreen/ListScreen")),
};

export const ARTICLE_ROUTES = [
  ARTICLE_LIST_SCREEN,
  ARTICLE_DETAIL_SCREEN,
  DONATE_PROGRESS_SCREEN,
  CREATE_SCREEN,
  LIST_SCREEN,
  EDIT_SCREEN,
  DONATE_SUCCESS_SCREEN,
];
