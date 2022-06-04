import React, { FC, memo, Suspense } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { store } from "app/store";
import Loader from "components/Loader/Loader";
import DefaultLayout from "layouts/DefaultLayout/DefaultLayout";
import { RouteItem } from "types/route.types";

import { ROOT_ROUTE, ROUTE_LIST, AUTH_ROUTE } from "./routes.config";

const NotFoundScreen: FC = () => {
  return <div>Not found</div>;
};

const routeWrapperFunc = ({
  id,
  path,
  component: Component,
  layout,
  isPrivateRoute,
  isAuthRoute,
}: RouteItem) => {
  const RouteLayout = layout || DefaultLayout;

  return (
    <Route
      exact
      key={id}
      path={path}
      render={(props): React.ReactNode => {
        const isSignedIn = !!store.getState().auth.userInfo;

        if (isAuthRoute && isSignedIn) {
          return <Redirect key="ROOT_ROUTE" to={ROOT_ROUTE} />;
        }

        if (isPrivateRoute && !isSignedIn) {
          return <Redirect key="AUTH_ROUTE" to={AUTH_ROUTE} />;
        }

        const Content = memo((): JSX.Element => {
          return (
            <RouteLayout>
              <Component {...props} />
            </RouteLayout>
          );
        });

        return <Content />;
      }}
    />
  );
};

const RouterWrapper: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {ROUTE_LIST.map(route => routeWrapperFunc(route))}
        <Route path="*" render={() => <NotFoundScreen />} />
      </Switch>
    </Suspense>
  );
};

export default memo(RouterWrapper);
