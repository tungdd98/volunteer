import { ARTICLE_ROUTES } from "features/article/article";
import { AUTH_ROUTES } from "features/auth/auth";
import { CATEGORY_ROUTES } from "features/category/category";
import { HOME_ROUTES } from "features/home/home";

export const ROOT_ROUTE = "/";
export const AUTH_ROUTE = "/login";

export const ROUTE_LIST = [
  ...HOME_ROUTES,
  ...AUTH_ROUTES,
  ...ARTICLE_ROUTES,
  ...CATEGORY_ROUTES,
];
