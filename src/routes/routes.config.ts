import { ARTICLE_ROUTES } from "features/article/article";
import { AUTH_ROUTES } from "features/auth/auth";
import { BANNER_ROUTES } from "features/banner/routes/banner.routes";
import { CATEGORY_ROUTES } from "features/category/category";
import { HOME_ROUTES } from "features/home/home";
import { TRIP_ROUTES } from "features/trip/trip";

export const ROOT_ROUTE = "/";
export const AUTH_ROUTE = "/login";

export const ROUTE_LIST = [
  ...HOME_ROUTES,
  ...AUTH_ROUTES,
  ...ARTICLE_ROUTES,
  ...CATEGORY_ROUTES,
  ...TRIP_ROUTES,
  ...BANNER_ROUTES,
];
