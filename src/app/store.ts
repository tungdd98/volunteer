import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { articleReducer } from "features/article/article";
import { authReducer } from "features/auth/auth";
import { bannerReducer } from "features/banner/banner";
import { categoryReducer } from "features/category/category";
import { transactionReducer } from "features/transaction/transaction";
import { tripReducer } from "features/trip/trip";

import { snackbarReducer } from "./snackbar.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    article: articleReducer,
    trip: tripReducer,
    banner: bannerReducer,
    category: categoryReducer,
    transaction: transactionReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
