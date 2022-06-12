/* eslint-disable import/no-unresolved */
import React, { FC } from "react";

import { Box, Container, Typography } from "@mui/material";
import { SwiperSlide } from "swiper/react/swiper-react";

import { useAppSelector } from "app/hooks";
import CustomLink from "components/CustomLink/CustomLink";
import CustomSwiper from "components/CustomSwiper/CustomSwiper";
import { ArticlePathsEnum } from "features/article/article";

import ArticleItem from "../../../components/ArticleItem/ArticleItem";

const VolunteerSection: FC = () => {
  const { articlesInfo } = useAppSelector(state => state.article);

  return (
    <Container>
      {Object.values(articlesInfo).map(category => {
        return (
          <Box key={category.id} sx={{ mt: 5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ pb: 2 }} textTransform="uppercase">
                {category.title}
              </Typography>

              <CustomLink
                variant="body2"
                textAlign="right"
                color="primary"
                to={ArticlePathsEnum.ARTICLE_LIST.replace(
                  /:categoryId/,
                  category.id
                )}
              >
                Xem tất cả
              </CustomLink>
            </Box>

            {category.articles.length ? (
              <CustomSwiper
                slidesPerView={1}
                pagination={{
                  dynamicBullets: true,
                }}
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
                hasMargin
                autoHeight
              >
                {category.articles.map(article => (
                  <SwiperSlide key={article.id}>
                    <ArticleItem article={article} />
                  </SwiperSlide>
                ))}
              </CustomSwiper>
            ) : (
              <Typography variant="body2" textAlign="center">
                Không có dữ liệu
              </Typography>
            )}
          </Box>
        );
      })}
    </Container>
  );
};

export default VolunteerSection;
