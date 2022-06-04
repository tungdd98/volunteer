import React from "react";

import AuthLayout from "layouts/AuthLayout/AuthLayout";
import { RouteItem } from "types/route.types";

import { AuthPathsEnum } from "../auth";

const LOGIN_SCREEN: RouteItem = {
  id: "login",
  path: AuthPathsEnum.LOGIN,
  component: React.lazy(() => import("../screens/LoginScreen/LoginScreen")),
  layout: AuthLayout,
  isAuthRoute: true,
};

const REGISTER_SCREEN: RouteItem = {
  id: "register",
  path: AuthPathsEnum.REGISTER,
  component: React.lazy(
    () => import("../screens/RegisterScreen/RegisterScreen")
  ),
  layout: AuthLayout,
  isAuthRoute: true,
};

export const AUTH_ROUTES = [LOGIN_SCREEN, REGISTER_SCREEN];
