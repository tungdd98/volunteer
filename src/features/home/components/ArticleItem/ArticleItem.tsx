import React, { FC, memo } from "react";

import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import BorderLinearProgress from "components/BorderLinearProgress/BorderLinearProgress";
import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum } from "constants/common.constants";
import { ArticleDef, ArticlePathsEnum } from "features/article/article";
import { toCurrency } from "helpers/convert/currency";
import { truncateString } from "helpers/convert/truncate-string";

interface ArticleItemProps {
  article: ArticleDef;
}

const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Paper elevation={5} sx={{ p: 2 }}>
        <PreviewImage
          aspectRatio={AspectRatioEnum.ONE_TO_ONE}
          src={article.thumbnail}
          alt={article.title}
        />

        <Typography
          sx={{
            my: 1,
            height: 56,
            overflow: "hidden",
            textDecoration: "none",
            display: "block",
          }}
          variant="subtitle1"
          component={Link}
          color="#000"
          to={ArticlePathsEnum.ARTICLE_DETAIL.replace(/:articleId/, article.id)}
        >
          {truncateString(article.title)}
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ flexGrow: 1, pr: 2 }}>
            <Typography variant="body2" fontWeight={600}>
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
            <Typography variant="body2">
              {toCurrency(article.currentDonate, true)} người ủng hộ
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            component={Link}
            to={ArticlePathsEnum.DONATE_PROGRESS.replace(
              /:articleId/,
              article.id
            )}
          >
            Ủng hộ ngay
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default memo(ArticleItem);
