/* eslint-disable import/no-unresolved */
import React, { FC, memo } from "react";

import { Box, styled } from "@mui/material";
import { Swiper, SwiperProps } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const CustomSwiperStyled = styled(Box)({
  "& .swiper-wrapper": {
    margin: 8,
  },
});

interface CustomSwiperProps extends SwiperProps {
  hasMargin?: boolean;
}

const CustomSwiper: FC<CustomSwiperProps> = ({ hasMargin, ...props }) => {
  const Element = hasMargin ? CustomSwiperStyled : Box;

  return (
    <Element overflow="hidden">
      <Swiper {...props} />
    </Element>
  );
};

export default memo(CustomSwiper);
