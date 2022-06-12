import React from "react";

import { RouteItem } from "types/route.types";

import { TripPathsEnum } from "../trip";

const DETAIL_SCREEN: RouteItem = {
  id: "trip-detail",
  path: TripPathsEnum.DETAIL,
  component: React.lazy(() => import("../screens/DetailScreen/DetailScreen")),
};

export const TRIP_ROUTES = [DETAIL_SCREEN];
