/* eslint-disable import/no-unresolved */
import React, { FC, memo } from "react";

import { Box } from "@mui/material";
import { Swiper, SwiperProps } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";

interface CustomSwiperProps extends SwiperProps {
  hasMargin?: boolean;
}

const CustomSwiper: FC<CustomSwiperProps> = ({ hasMargin, ...props }) => {
  return (
    <Box sx={{ m: hasMargin ? -2 : 0 }}>
      <Swiper {...props} />
    </Box>
  );
};

export default memo(CustomSwiper);
