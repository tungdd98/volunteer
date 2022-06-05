import React, { FC, memo } from "react";

import { Paper, Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

import BorderLinearProgress from "components/BorderLinearProgress/BorderLinearProgress";
import PreviewImage from "components/PreviewImage/PreviewImage";
import { ArticleDef, ArticlePathsEnum } from "features/article/article";
import { toCurrency } from "helpers/convert/currency";

interface ArticleGridItemProps {
  article: ArticleDef;
}

const ArticleGridItem: FC<ArticleGridItemProps> = ({ article }) => {
  const history = useHistory();

  const redirectDetail = () => {
    history.push(
      ArticlePathsEnum.ARTICLE_DETAIL.replace(/:articleId/, article.id)
    );
  };

  return (
    <Paper
      elevation={10}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={redirectDetail}
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
