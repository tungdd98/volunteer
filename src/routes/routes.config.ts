import { AUTH_ROUTES } from "features/auth/auth";
import { HOME_ROUTES } from "features/home/home";

export const ROOT_ROUTE = "/";
export const AUTH_ROUTE = "/login";

export const ROUTE_LIST = [...HOME_ROUTES, ...AUTH_ROUTES];
