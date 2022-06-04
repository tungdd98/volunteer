import React from "react";

import { RouteItem } from "types/route.types";

import { HomePathsEnum } from "../home";

const HOME_SCREEN: RouteItem = {
  id: "home",
  path: HomePathsEnum.HOME,
  component: React.lazy(() => import("../screens/HomeScreen/HomeScreen")),
};

const ABOUT_SCREEN: RouteItem = {
  id: "about",
  path: HomePathsEnum.ABOUT,
  component: React.lazy(() => import("../screens/AboutScreen/AboutScreen")),
};

export const HOME_ROUTES = [HOME_SCREEN, ABOUT_SCREEN];
