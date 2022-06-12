import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { bannerApi } from "../api/banner.api";
import { BannerDef } from "../banner";

interface BannerState {
  banners: BannerDef[] | null;
  bannerDetail: BannerDef | null;
}

const initialState: BannerState = {
  banners: null,
  bannerDetail: null,
};

export const getBannerList = createAsyncThunk<BannerDef[]>(
  "banner/getBannerList",
  async () => {
    const response = await bannerApi.getBannerListApi();

    return response;
  }
);

export const getBannerDetail = createAsyncThunk<BannerDef | null, string>(
  "banner/getBannerDetail",
  async bannerId => {
    const response = await bannerApi.getBannerDetailApi(bannerId);

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

export const updateBanner = createAsyncThunk<
  null,
  { bannerId: string; thumbnail: string }
>(
  "banner/updateBanner",
  async ({ bannerId, thumbnail }, { rejectWithValue }) => {
    try {
      await bannerApi.updateBannerApi(bannerId, thumbnail);
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
    builder.addCase(getBannerDetail.fulfilled, (state, action) => {
      state.bannerDetail = action.payload;
    });
  },
});

export const bannerReducer = bannerSlice.reducer;
