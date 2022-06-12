import React, { FC, memo } from "react";

import { Box, Paper } from "@mui/material";

import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum } from "constants/common.constants";
import { BannerDef } from "features/banner/banner";

interface BannerItemProps {
  banner: BannerDef;
}

const BannerItem: FC<BannerItemProps> = ({ banner }) => {
  return (
    <Box component={Paper} elevation={10} sx={{ p: 2, mb: 2 }}>
      <PreviewImage
        src={banner.thumbnail}
        aspectRatio={AspectRatioEnum.TEN_TO_FOUR}
      />
    </Box>
  );
};

export default memo(BannerItem);
