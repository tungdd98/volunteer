import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { bannerApi } from "../api/banner.api";
import { BannerDef } from "../banner";

interface BannerState {
  banners: BannerDef[] | null;
}

const initialState: BannerState = {
  banners: null,
};

export const getBannerList = createAsyncThunk<BannerDef[]>(
  "banner/getBannerList",
  async () => {
    const response = await bannerApi.getBannerListApi();

    return response;
  }
);

export const createBanner = createAsyncThunk<null, string>(
  "banner/createBanner",
  async (data, { rejectWithValue }) => {
    try {
      await bannerApi.createBannerApi(data);
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBannerList.fulfilled, (state, action) => {
      state.banners = action.payload;
    });
  },
});

export const bannerReducer = bannerSlice.reducer;
