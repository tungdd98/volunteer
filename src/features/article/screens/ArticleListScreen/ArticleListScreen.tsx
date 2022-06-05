import React, { FC, useEffect, useState } from "react";

import {
  FilterListRounded,
  GridViewRounded,
  SearchRounded,
  ViewCarouselRounded,
} from "@mui/icons-material";
import { Box, Container, Hidden, IconButton, Stack } from "@mui/material";

import { useAppDispatch } from "app/hooks";
import Loader from "components/Loader/Loader";
import {
  ArticleListLayoutEnum,
  getArticleList,
} from "features/article/article";

import ListLayout from "./ListLayout/ListLayout";
import SlideLayout from "./SlideLayout/SlideLayout";

const ArticleListScreen: FC = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState(ArticleListLayoutEnum.GRID);

  const isGridLayout = layout === ArticleListLayoutEnum.GRID;

  const toggleLayout = () => {
    setLayout(
      isGridLayout ? ArticleListLayoutEnum.SLIDE : ArticleListLayoutEnum.GRID
    );
  };

  useEffect(() => {
    dispatch(getArticleList()).finally(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ mt: 3 }}>
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
          <IconButton>
            <FilterListRounded />
          </IconButton>
        </Stack>
      </Box>

      {isGridLayout ? <ListLayout /> : <SlideLayout />}
    </Container>
  );
};

export default ArticleListScreen;
