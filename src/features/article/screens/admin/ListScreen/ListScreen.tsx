import React, { FC, useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import {
  ArticleDef,
  ArticlePathsEnum,
  getArticleList,
} from "features/article/article";
import ArticleListItem from "features/article/components/ArticleListItem/ArticleListItem";

const ListScreen: FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(state => state.article);

  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedArticle, setSelectedArticle] = useState<null | ArticleDef>(
    null
  );

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
        ArticlePathsEnum.ARTICLE_EDIT.replace(/:articleId/, selectedArticle.id)
      );
    }
  };

  useEffect(() => {
    dispatch(getArticleList()).finally(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h3" fontSize={20}>
          Danh sách sự kiện ủng hộ
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to={ArticlePathsEnum.ARTICLE_CREATE}
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
