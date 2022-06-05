/* eslint-disable import/no-unresolved */
import React, { FC, memo } from "react";

import { Container } from "@mui/material";
import { SwiperSlide } from "swiper/react";

import { useAppSelector } from "app/hooks";
import CustomLink from "components/CustomLink/CustomLink";
import CustomSwiper from "components/CustomSwiper/CustomSwiper";
import { ArticlePathsEnum } from "features/article/article";

import BannerItem from "../../../components/BannerItem/BannerItem";

const BannerSection: FC = () => {
  const { articles } = useAppSelector(state => state.article);

  if (!articles) {
    return null;
  }

  return (
    <>
      <CustomSwiper
        slidesPerView="auto"
        pagination={{
          dynamicBullets: true,
        }}
        centeredSlides
        loop
        autoHeight
      >
        {articles.map(item => (
          <SwiperSlide key={item.id}>
            <BannerItem banner={item} />
          </SwiperSlide>
        ))}
      </CustomSwiper>
      <Container>
        <CustomLink
          variant="body2"
          textAlign="right"
          color="primary"
          to={ArticlePathsEnum.ARTICLE_LIST}
        >
          Xem tất cả
        </CustomLink>
      </Container>
    </>
  );
};

export default memo(BannerSection);
