import React from "react";

import { RouteItem } from "types/route.types";

import { TripPathsEnum } from "../trip";

const DETAIL_SCREEN: RouteItem = {
  id: "trip-detail",
  path: TripPathsEnum.DETAIL,
  component: React.lazy(() => import("../screens/DetailScreen/DetailScreen")),
};

const AdminNoSidebar = React.lazy(
  () => import("layouts/AdminNoSidebar/AdminNoSidebar")
);

const LIST_SCREEN: RouteItem = {
  id: "trip-list",
  path: TripPathsEnum.ADMIN_LIST,
  component: React.lazy(() => import("../screens/ListScreen/ListScreen")),
};

const CREATE_SCREEN: RouteItem = {
  id: "trip-create",
  path: TripPathsEnum.ADMIN_CREATE,
  component: React.lazy(() => import("../screens/CreateScreen/CreateScreen")),
  layout: AdminNoSidebar,
};

const EDIT_SCREEN: RouteItem = {
  id: "trip-edit",
  path: TripPathsEnum.ADMIN_EDIT,
  component: React.lazy(() => import("../screens/EditScreen/EditScreen")),
  layout: AdminNoSidebar,
};

export const TRIP_ROUTES = [
  DETAIL_SCREEN,
  LIST_SCREEN,
  EDIT_SCREEN,
  CREATE_SCREEN,
];
