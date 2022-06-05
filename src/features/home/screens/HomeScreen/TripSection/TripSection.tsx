/* eslint-disable import/no-unresolved */
import React, { FC, memo } from "react";

import { Container, Typography } from "@mui/material";
import { SwiperSlide } from "swiper/react";

import { useAppSelector } from "app/hooks";
import CustomSwiper from "components/CustomSwiper/CustomSwiper";

import TripItem from "../../../components/TripItem/TripItem";

const TripSection: FC = () => {
  const { trips } = useAppSelector(state => state.trip);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom textTransform="uppercase">
        Chuyến đi thiện nguyện
      </Typography>

      {trips?.length ? (
        <CustomSwiper
          slidesPerView={1}
          pagination={{
            dynamicBullets: true,
          }}
          loop
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
        >
          {trips.map(item => (
            <SwiperSlide key={item.id}>
              <TripItem trip={item} />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      ) : (
        <Typography variant="body2" textAlign="center">
          Không có dữ liệu
        </Typography>
      )}
    </Container>
  );
};

export default memo(TripSection);
