import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { UserDef } from "../auth";

interface AuthState {
  userInfo: UserDef | null;
}

const initialState: AuthState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserDef | null>) => {
      state.userInfo = action.payload;
    },
  },
});

export const LOCAL_STORAGE_AUTH_KEY = "auth";

const authConfig = {
  key: LOCAL_STORAGE_AUTH_KEY,
  storage,
  whitelist: ["userInfo"],
};

export const { setUserInfo } = authSlice.actions;

export const authReducer = persistReducer(authConfig, authSlice.reducer);
