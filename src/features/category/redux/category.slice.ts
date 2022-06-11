import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CategoryDef, categoryApi, CategoryRequest } from "../category";

interface CategoryState {
  categories: CategoryDef[] | null;
  categoryDetail: CategoryDef | null;
}

const initialState: CategoryState = {
  categories: null,
  categoryDetail: null,
};

export const getCategoryList = createAsyncThunk<CategoryDef[]>(
  "category/getCategoryList",
  async () => {
    const response = await categoryApi.getCategoryListApi();

    return response;
  }
);

export const getCategoryDetail = createAsyncThunk<CategoryDef | null, string>(
  "category/getCategoryDetail",
  async categoryId => {
    const response = await categoryApi.getCategoryDetailApi(categoryId);

    return response;
  }
);

export const createCategory = createAsyncThunk<null, CategoryRequest>(
  "category/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      await categoryApi.createCategoryApi(data);
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
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
    builder.addCase(getCategoryDetail.fulfilled, (state, action) => {
      state.categoryDetail = action.payload;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
