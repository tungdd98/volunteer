import React from "react";

import { RouteItem } from "types/route.types";

import { CategoryPathsEnum } from "../category";

const AdminNoSidebar = React.lazy(
  () => import("layouts/AdminNoSidebar/AdminNoSidebar")
);

const ADMIN_LIST_SCREEN: RouteItem = {
  id: "category-list",
  path: CategoryPathsEnum.ADMIN_LIST,
  component: React.lazy(
    () => import("../screens/admin/CategoryListScreen/CategoryListScreen")
  ),
};

const ADMIN_CREATE_SCREEN: RouteItem = {
  id: "category-create-admin",
  path: CategoryPathsEnum.ADMIN_CREATE,
  component: React.lazy(
    () => import("../screens/admin/CategoryCreateScreen/CategoryCreateScreen")
  ),
  layout: AdminNoSidebar,
};

const ADMIN_EDIT_SCREEN: RouteItem = {
  id: "category-edit-admin",
  path: CategoryPathsEnum.ADMIN_EDIT,
  component: React.lazy(
    () => import("../screens/admin/CategoryEditScreen/CategoryEditScreen")
  ),
  layout: AdminNoSidebar,
};

export const CATEGORY_ROUTES = [
  ADMIN_LIST_SCREEN,
  ADMIN_CREATE_SCREEN,
  ADMIN_EDIT_SCREEN,
];
