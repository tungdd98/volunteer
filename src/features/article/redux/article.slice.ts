import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { articleApi, ArticleDef } from "../article";

interface ArticleState {
  articles: ArticleDef[] | null;
}

const initialState: ArticleState = {
  articles: null,
};

export const getArticleList = createAsyncThunk<ArticleDef[]>(
  "article/getArticleList",
  async () => {
    const response = await articleApi.getArticleListApi();

    return response;
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getArticleList.fulfilled, (state, action) => {
      state.articles = action.payload;
    });
  },
});

export const articleReducer = articleSlice.reducer;
