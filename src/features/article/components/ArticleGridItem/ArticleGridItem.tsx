import React, { FC, memo } from "react";

import { Paper, Box, Typography, styled, LinearProgress } from "@mui/material";

import PreviewImage from "components/PreviewImage/PreviewImage";
import { ArticleDef } from "features/article/article";
import { toCurrency } from "helpers/convert/currency";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 5,
}));

interface ArticleGridItemProps {
  article: ArticleDef;
}

const ArticleGridItem: FC<ArticleGridItemProps> = ({ article }) => {
  return (
    <Paper
      elevation={10}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <PreviewImage src={article.thumbnail} />

      <Box
        sx={{
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Typography variant="subtitle2" lineHeight={1.2} sx={{ flexGrow: 1 }}>
          {article.title}
        </Typography>

        <Box>
          <Typography variant="caption">
            {toCurrency(article.currentDonate, true)} /{" "}
            {toCurrency(article.maxDonate, true)} Lượt
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            value={Math.floor(
              (article.currentDonate / article.maxDonate) * 100
            )}
            sx={{ my: 0.5 }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default memo(ArticleGridItem);
