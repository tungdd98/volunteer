import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CategoryDef, categoryApi } from "../category";

interface CategoryState {
  categories: CategoryDef[] | null;
}

const initialState: CategoryState = {
  categories: null,
};

export const getCategoryList = createAsyncThunk<CategoryDef[]>(
  "category/getCategoryList",
  async () => {
    const response = await categoryApi.getCategoryListApi();

    return response;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
