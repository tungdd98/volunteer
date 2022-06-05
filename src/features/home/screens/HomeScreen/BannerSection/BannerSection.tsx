/* eslint-disable import/no-unresolved */
import React, { FC, memo } from "react";

import { SwiperSlide } from "swiper/react";

import { useAppSelector } from "app/hooks";
import CustomSwiper from "components/CustomSwiper/CustomSwiper";

import BannerItem from "../../../components/BannerItem/BannerItem";

const BannerSection: FC = () => {
  const { articles } = useAppSelector(state => state.article);

  if (!articles) {
    return null;
  }

  return (
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
  );
};

export default memo(BannerSection);
