import React, { FC, useCallback, useEffect, useState } from "react";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { pick, get } from "lodash";
import { BrowserRouter } from "react-router-dom";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper";

import { useAppDispatch } from "app/hooks";
import { store } from "app/store";
import CustomSnackbar from "components/CustomSnackbar/CustomSnackbar";
import KeplrExtension from "components/KeplrExtension/KeplrExtension";
import Loader from "components/Loader/Loader";
import ScrollToTop from "components/ScrollToTop/ScrollToTop";
import { getProvinces } from "features/article/article";
import {
  getAccountDetail,
  LOCAL_STORAGE_AUTH_KEY,
  setUserInfo,
} from "features/auth/auth";
import { getCategoryList } from "features/category/category";
import { deepParseJson } from "helpers/convert/deep-parse-json";
import RouterWrapper from "routes/RouterWrapper";

import { themeOptions } from "./themes/theme-one";

const theme = createTheme(themeOptions);

SwiperCore.use([Pagination, Autoplay, Navigation]);

const App: FC = () => {
  const auth = getAuth();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const checkAuthenticated = useCallback(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        user.getIdTokenResult().then(res => {
          const userData = pick(user, [
            "phoneNumber",
            "photoURL",
            "displayName",
            "email",
            "uid",
          ]);

          dispatch(getAccountDetail(userData.uid))
            .then(unwrapResult)
            .then(account => {
              dispatch(
                setUserInfo({
                  ...userData,
                  accessToken: res.token,
                  email: userData.email?.replace(/@gmail.com/, "") || "",
                  codeInfo: account,
                })
              );
            });
        });
      }

      setIsLoading(false);
    });
  }, [auth, dispatch]);

  useEffect(() => {
    checkAuthenticated();
  }, [checkAuthenticated]);

  useEffect(() => {
    const listenStorage = (storageEvent: StorageEvent) => {
      if (storageEvent.key === LOCAL_STORAGE_AUTH_KEY) {
        const loggedInStateOnRedux = !!store.getState().auth.userInfo;
        const loggedInStateOnLocalStorage = !!get(
          deepParseJson(storageEvent.newValue),
          "userInfo"
        );

        if (!loggedInStateOnLocalStorage && loggedInStateOnRedux) {
          window.location.reload();
        }
      }
    };

    window.addEventListener("storage", listenStorage);

    return () => {
      window.removeEventListener("storage", listenStorage);
    };
  }, []);

  useEffect(() => {
    dispatch(getProvinces());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <RouterWrapper />
        <CustomSnackbar />
        <ScrollToTop />
        <KeplrExtension />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
