import React, { FC, useEffect, useState } from "react";

import {
  FilterListRounded,
  GridViewRounded,
  SearchRounded,
  ViewCarouselRounded,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Hidden,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import {
  ArticleDef,
  ArticleListLayoutEnum,
  ArticleParams,
  getArticleListByCategoryId,
} from "features/article/article";
import { getCategoryDetail } from "features/category/category";

import FilterDialog from "../../components/FilterDialog/FilterDialog";
import ListLayout from "./ListLayout/ListLayout";
import SlideLayout from "./SlideLayout/SlideLayout";

const ArticleListScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { categoryDetail } = useAppSelector(state => state.category);

  const { categoryId } = useParams<{ categoryId: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState(ArticleListLayoutEnum.GRID);
  const [articles, setArticles] = useState<null | ArticleDef[]>(null);
  const [isOpenFilterDialog, setIsOpenFilterDialog] = useState(false);
  const [params, setParams] = useState<ArticleParams>({ provinceCode: "" });

  const isGridLayout = layout === ArticleListLayoutEnum.GRID;

  const toggleLayout = () => {
    setLayout(
      isGridLayout ? ArticleListLayoutEnum.SLIDE : ArticleListLayoutEnum.GRID
    );
  };

  useEffect(() => {
    dispatch(getCategoryDetail(categoryId));
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (categoryDetail) {
      dispatch(
        getArticleListByCategoryId({
          category: categoryDetail,
          params,
        })
      )
        .then(unwrapResult)
        .then(res => {
          setArticles(res);
        })
        .finally(() => setIsLoading(false));
    }
  }, [categoryDetail, dispatch, params]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4">{categoryDetail?.title}</Typography>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Hidden smUp>
            <Stack direction="row" spacing={0.5}>
              <IconButton sx={{ pl: 0 }} onClick={toggleLayout}>
                <GridViewRounded color={isGridLayout ? "primary" : "inherit"} />
              </IconButton>
              <IconButton sx={{ pl: 0 }} onClick={toggleLayout}>
                <ViewCarouselRounded
                  color={!isGridLayout ? "primary" : "inherit"}
                />
              </IconButton>
            </Stack>
          </Hidden>
        </Box>
        <Stack direction="row" spacing={0.5}>
          <IconButton>
            <SearchRounded />
          </IconButton>
          <IconButton onClick={() => setIsOpenFilterDialog(true)}>
            <FilterListRounded />
          </IconButton>
        </Stack>
      </Box>

      {isGridLayout ? <ListLayout articles={articles} /> : <SlideLayout />}

      <FilterDialog
        open={isOpenFilterDialog}
        onClose={() => setIsOpenFilterDialog(false)}
        params={params}
        setParams={setParams}
      />
    </Container>
  );
};

export default ArticleListScreen;
