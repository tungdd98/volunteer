import React, { FC, useEffect, useState } from "react";

import { ArrowBackRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link, useHistory, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import {
  ArticleDef,
  ArticlePathsEnum,
  getArticleListByCategoryId,
} from "features/article/article";
import ArticleListItem from "features/article/components/ArticleListItem/ArticleListItem";
import {
  CategoryPathsEnum,
  getCategoryDetail,
} from "features/category/category";

const ListScreen: FC = () => {
  const history = useHistory();
  const { categoryId } = useParams<{ categoryId: string }>();

  const dispatch = useAppDispatch();
  const { categoryDetail } = useAppSelector(state => state.category);

  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedArticle, setSelectedArticle] = useState<null | ArticleDef>(
    null
  );
  const [articles, setArticles] = useState<null | ArticleDef[]>(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    item: ArticleDef
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedArticle(item);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedArticle(null);
  };

  const redirectEditScreen = () => {
    if (selectedArticle) {
      history.push(
        ArticlePathsEnum.ARTICLE_EDIT.replace(
          /:articleId/,
          selectedArticle.id
        ).replace(/:categoryId/, categoryId)
      );
    }
  };

  useEffect(() => {
    dispatch(getCategoryDetail(categoryId));
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (categoryDetail) {
      dispatch(
        getArticleListByCategoryId({
          category: categoryDetail,
        })
      )
        .then(unwrapResult)
        .then(res => {
          setArticles(res);
        })
        .finally(() => setIsLoading(false));
    }
  }, [categoryDetail, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <Button
        startIcon={<ArrowBackRounded />}
        component={Link}
        to={CategoryPathsEnum.ADMIN_LIST}
      >
        Quay lại
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h3" fontSize={20}>
          {categoryDetail?.title}
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to={ArticlePathsEnum.ARTICLE_CREATE.replace(
            /:categoryId/,
            categoryId
          )}
        >
          Thêm mới
        </Button>
      </Box>

      {articles && articles?.length > 0 ? (
        articles.map(item => (
          <ArticleListItem
            key={item.id}
            article={item}
            handleOpenMenu={handleOpenMenu}
          />
        ))
      ) : (
        <Typography>Không có dữ liệu</Typography>
      )}

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          style: {
            minWidth: 160,
          },
        }}
      >
        <MenuItem onClick={redirectEditScreen}>Cập nhật</MenuItem>
      </Menu>
    </Container>
  );
};

export default ListScreen;
