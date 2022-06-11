import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { Account, authApi, UserDef } from "../auth";

interface AuthState {
  userInfo: UserDef | null;
  senderAddress: string | null;
}

const initialState: AuthState = {
  userInfo: null,
  senderAddress: null,
};

export const uploadPersonalCode = createAsyncThunk<Account, File>(
  "auth/uploadPersonalCode",
  async (file, { rejectWithValue }) => {
    try {
      const response = await authApi.uploadPersonalCodeApi(file);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createAccount = createAsyncThunk<null, Account>(
  "auth/createAccount",
  async (data, { rejectWithValue }) => {
    try {
      await authApi.createAccountApi(data);
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAccountDetail = createAsyncThunk<Account | null, string>(
  "auth/getAccountDetail",
  async uid => {
    const response = await authApi.getAccountDetailApi(uid);

    return response;
  }
);

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
