/* eslint-disable import/no-unresolved */
import React, { FC, useEffect, useState } from "react";

import { ShareRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import BorderLinearProgress from "components/BorderLinearProgress/BorderLinearProgress";
import CustomSwiper from "components/CustomSwiper/CustomSwiper";
import Loader from "components/Loader/Loader";
import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum } from "constants/common.constants";
import { getArticleDetail } from "features/article/article";
import { toCurrency } from "helpers/convert/currency";

const ArticleDetailScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { articleDetail } = useAppSelector(state => state.article);

  const { articleId } = useParams<{ articleId: string }>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (articleId) {
      dispatch(getArticleDetail(articleId)).finally(() => setIsLoading(false));
    }
  }, [articleId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!articleDetail) {
    return <div>Error...</div>;
  }

  return (
    <>
      <Container sx={{ mt: 3, mb: 10 }}>
        <PreviewImage
          src={articleDetail.thumbnail}
          alt={articleDetail.title}
          aspectRatio={AspectRatioEnum.SIXTEEN_TO_NINE}
        />

        <Typography variant="h1" fontSize={24} sx={{ mt: 1, mb: 2 }}>
          {articleDetail.title}
        </Typography>

        <Stack spacing={1} direction="row" sx={{ width: "100%" }}>
          {articleDetail.tags.map(item => (
            <Chip key={item} label={item} color="info" size="small" />
          ))}

          <Box sx={{ ml: "auto !important" }}>
            <IconButton size="small">
              <ShareRounded />
            </IconButton>
          </Box>
        </Stack>

        <Box sx={{ flexGrow: 1, my: 2 }}>
          <Typography variant="body2" fontWeight={600}>
            {toCurrency(articleDetail.currentDonate, true)} /{" "}
            {toCurrency(articleDetail.maxDonate, true)} Lượt
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            value={Math.floor(
              (articleDetail.currentDonate / articleDetail.maxDonate) * 100
            )}
            sx={{ my: 0.5 }}
          />
          <Typography variant="body2">
            {toCurrency(articleDetail.currentDonate, true)} người ủng hộ
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="subtitle1" gutterBottom>
            Hoàn cảnh
          </Typography>
          <Typography variant="body2">{articleDetail.content}</Typography>
        </Box>

        <CustomSwiper
          slidesPerView="auto"
          pagination={{
            dynamicBullets: true,
          }}
          loop
          autoHeight
          breakpoints={{
            "640": {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            "1024": {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          {articleDetail.albums.map(item => (
            <SwiperSlide key={item}>
              <PreviewImage
                src={item}
                aspectRatio={AspectRatioEnum.SIXTEEN_TO_NINE}
              />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </Container>

      <Box
        sx={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          left: 0,
          p: 2,
          bgcolor: "white",
          borderTop: 1,
          borderColor: "divider",
          zIndex: 100,
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ maxWidth: 500 }}
        >
          Ủng hộ ngay
        </Button>
      </Box>
    </>
  );
};

export default ArticleDetailScreen;
