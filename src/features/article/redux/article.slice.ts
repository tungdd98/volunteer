import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CategoryDef } from "features/category/category";

import {
  articleApi,
  ArticleDef,
  ArticleForm,
  ArticleParams,
  CategoryArticleDef,
  ProvinceDef,
} from "../article";

interface ArticleState {
  articles: ArticleDef[] | null;
  articleDetail: ArticleDef | null;
  articlesInfo: Record<string, CategoryArticleDef>;
  provinces: ProvinceDef[];
}

const initialState: ArticleState = {
  articles: null,
  articleDetail: null,
  articlesInfo: {},
  provinces: [],
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

export const createArticle = createAsyncThunk<null, ArticleForm>(
  "article/createArticle",
  async (data, { rejectWithValue }) => {
    try {
      await articleApi.createArticleApi(data);
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateArticle = createAsyncThunk<
  null,
  { articleId: string; data: ArticleForm }
>("article/updateArticle", async ({ data, articleId }, { rejectWithValue }) => {
  try {
    await articleApi.updateArticleApi(articleId, data);
    return null;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateCurrentDonate = createAsyncThunk<
  null,
  { articleId: string; currentDonateOld: number }
>(
  "article/updateCurrentDonate",
  async ({ currentDonateOld, articleId }, { rejectWithValue }) => {
    try {
      await articleApi.updateCurrentDonateArticleApi(
        articleId,
        currentDonateOld
      );
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getArticleListByCategoryId = createAsyncThunk<
  ArticleDef[],
  { category: CategoryDef; params?: ArticleParams }
>("article/getArticleListByCategoryId", async ({ category, params }) => {
  const response = await articleApi.getArticleListByCategoryIdApi(
    category.id,
    params
  );

  return response;
});

export const getProvinces = createAsyncThunk<ProvinceDef[]>(
  "article/getProvinces",
  async () => {
    const response = await articleApi.getProvincesApi();

    return response.data;
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
    builder.addCase(getArticleListByCategoryId.fulfilled, (state, action) => {
      const { category } = action.meta.arg;

      state.articlesInfo = {
        ...state.articlesInfo,
        [category.id]: {
          id: category.id,
          title: category.title,
          articles: action.payload,
        },
      };
    });
    builder.addCase(getProvinces.fulfilled, (state, action) => {
      state.provinces = action.payload;
    });
  },
});

export const articleReducer = articleSlice.reducer;
