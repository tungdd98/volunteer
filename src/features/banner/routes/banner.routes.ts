import React from "react";

import { RouteItem } from "types/route.types";

import { BannerPathsEnum } from "../banner";

const AdminNoSidebar = React.lazy(
  () => import("layouts/AdminNoSidebar/AdminNoSidebar")
);

const LIST_SCREEN: RouteItem = {
  id: "banner-list",
  path: BannerPathsEnum.ADMIN_LIST,
  component: React.lazy(() => import("../screens/ListScreen/ListScreen")),
};

const CREATE_SCREEN: RouteItem = {
  id: "banner-create",
  path: BannerPathsEnum.ADMIN_CREATE,
  component: React.lazy(() => import("../screens/CreateScreen/CreateScreen")),
  layout: AdminNoSidebar,
};

const EDIT_SCREEN: RouteItem = {
  id: "banner-edit",
  path: BannerPathsEnum.ADMIN_EDIT,
  component: React.lazy(() => import("../screens/EditScreen/EditScreen")),
  layout: AdminNoSidebar,
};

export const BANNER_ROUTES = [LIST_SCREEN, CREATE_SCREEN, EDIT_SCREEN];
