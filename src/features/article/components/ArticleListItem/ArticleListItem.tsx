import React, { FC, memo } from "react";

import { MoreVertRounded } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";

import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum } from "constants/common.constants";
import { ArticleDef } from "features/article/article";

interface ArticleListItemProps {
  article: ArticleDef;
  handleOpenMenu: (
    event: React.MouseEvent<HTMLElement>,
    item: ArticleDef
  ) => void;
}

const ArticleListItem: FC<ArticleListItemProps> = ({
  article,
  handleOpenMenu,
}) => {
  return (
    <Paper elevation={10} sx={{ mb: 2, p: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <PreviewImage
            src={article.thumbnail}
            aspectRatio={AspectRatioEnum.ONE_TO_ONE}
          />
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Typography fontWeight={600} sx={{ flexGrow: 1 }}>
              {article.title}
            </Typography>
            <Typography variant="caption" color="GrayText">
              {article.currentDonate} Lượt ủng hộ
            </Typography>
          </Box>
          <IconButton onClick={e => handleOpenMenu(e, article)}>
            <MoreVertRounded />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default memo(ArticleListItem);
