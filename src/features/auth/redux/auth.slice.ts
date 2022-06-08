import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { UserDef } from "../auth";

interface AuthState {
  userInfo: UserDef | null;
  senderAddress: string | null;
}

const initialState: AuthState = {
  userInfo: null,
  senderAddress: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserDef | null>) => {
      state.userInfo = action.payload;
    },
    setSenderAddress: (state, action: PayloadAction<string | null>) => {
      state.senderAddress = action.payload;
    },
    logout: state => {
      state.userInfo = null;
      state.senderAddress = null;
    },
  },
});

export const LOCAL_STORAGE_AUTH_KEY = "auth";

const authConfig = {
  key: LOCAL_STORAGE_AUTH_KEY,
  storage,
  whitelist: ["userInfo", "senderAddress"],
};

export const { setUserInfo, setSenderAddress, logout } = authSlice.actions;

export const authReducer = persistReducer(authConfig, authSlice.reducer);
