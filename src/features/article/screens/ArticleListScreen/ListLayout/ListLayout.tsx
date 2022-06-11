import React, { FC, memo } from "react";

import { Box, Button, Grid, Typography } from "@mui/material";

import { ArticleDef } from "features/article/article";

import ArticleGridItem from "../../../components/ArticleGridItem/ArticleGridItem";

interface ListLayoutProps {
  articles: ArticleDef[] | null;
}

const ListLayout: FC<ListLayoutProps> = ({ articles }) => {
  if (!articles || !articles.length) {
    return <Typography textAlign="center">Không có dữ liệu</Typography>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {articles.map(item => (
          <Grid item xs={6} md={3} key={item.id}>
            <ArticleGridItem article={item} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button variant="contained" color="secondary">
          Xem thêm
        </Button>
      </Box>
    </>
  );
};

export default memo(ListLayout);
