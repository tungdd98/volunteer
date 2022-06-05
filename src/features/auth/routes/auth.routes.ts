import React from "react";

import { RouteItem } from "types/route.types";

import { AuthPathsEnum } from "../auth";

const AuthLayout = React.lazy(() => import("layouts/AuthLayout/AuthLayout"));

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

const SIGN_UP_PERSONAL_INFORMATION_SCREEN: RouteItem = {
  id: "sign-up-personal-information",
  path: AuthPathsEnum.SIGN_UP_PERSONAL_INFO,
  component: React.lazy(
    () =>
      import(
        "../screens/SignUpPersonalInformationScreen/SignUpPersonalInformationScreen"
      )
  ),
  isPrivateRoute: true,
};

const MY_PROFILE: RouteItem = {
  id: "my-profile",
  path: AuthPathsEnum.MY_PROFILE,
  component: React.lazy(
    () => import("../screens/MyProfileScreen/MyProfileScreen")
  ),
  isPrivateRoute: true,
};

const UPDATE_PROFILE: RouteItem = {
  id: "update-profile",
  path: AuthPathsEnum.UPDATE_PROFILE,
  component: React.lazy(
    () => import("../screens/UpdateProfileScreen/UpdateProfileScreen")
  ),
  isPrivateRoute: true,
};

export const AUTH_ROUTES = [
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  SIGN_UP_PERSONAL_INFORMATION_SCREEN,
  MY_PROFILE,
  UPDATE_PROFILE,
];
