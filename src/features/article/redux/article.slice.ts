import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { articleApi, ArticleDef, ArticleForm } from "../article";

interface ArticleState {
  articles: ArticleDef[] | null;
  articleDetail: ArticleDef | null;
}

const initialState: ArticleState = {
  articles: null,
  articleDetail: null,
};

export const getArticleList = createAsyncThunk<ArticleDef[]>(
  "article/getArticleList",
  async () => {
    const response = await articleApi.getArticleListApi();

    return response;
  }
);

export const getArticleDetail = createAsyncThunk<ArticleDef | null, string>(
  "article/getArticleDetail",
  async articleId => {
    const response = await articleApi.getArticleDetailApi(articleId);

    return response;
  }
);

export const postArticle = createAsyncThunk<null, ArticleForm>(
  "article/postArticle",
  async (data, { rejectWithValue }) => {
    try {
      await articleApi.postArticleApi(data);
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
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
    builder.addCase(getArticleDetail.fulfilled, (state, action) => {
      state.articleDetail = action.payload;
    });
    builder.addCase(getArticleDetail.rejected, state => {
      state.articleDetail = null;
    });
  },
});

export const articleReducer = articleSlice.reducer;
