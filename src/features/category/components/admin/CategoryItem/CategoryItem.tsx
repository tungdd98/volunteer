import React, { FC, memo } from "react";

import { MoreVertRounded } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

import { ArticlePathsEnum } from "features/article/article";
import { CategoryDef } from "features/category/category";

interface CategoryItemProps {
  category: CategoryDef;
  handleOpenMenu: (
    event: React.MouseEvent<HTMLElement>,
    item: CategoryDef
  ) => void;
}

const CategoryItem: FC<CategoryItemProps> = ({ category, handleOpenMenu }) => {
  const history = useHistory();

  const redirectArticleListScreen = () => {
    history.push(
      ArticlePathsEnum.ARTICLE_LIST_ADMIN.replace(/:categoryId/, category.id)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        p: 1,
        cursor: "pointer",
      }}
      component={Paper}
      elevation={10}
      onClick={redirectArticleListScreen}
    >
      <Typography fontWeight={600} sx={{ flexGrow: 1 }}>
        {category.title}
      </Typography>
      <IconButton onClick={e => handleOpenMenu(e, category)}>
        <MoreVertRounded />
      </IconButton>
    </Box>
  );
};

export default memo(CategoryItem);
