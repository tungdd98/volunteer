import React, { FC, memo } from "react";

import { Box } from "@mui/material";

import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum } from "constants/common.constants";
import { BannerDef } from "features/banner/banner";

interface BannerItemProps {
  banner: BannerDef;
}

const BannerItem: FC<BannerItemProps> = ({ banner }) => {
  return (
    <Box>
      <PreviewImage
        aspectRatio={AspectRatioEnum.TEN_TO_FOUR}
        src={banner.thumbnail}
        borderRadius={0}
      />
    </Box>
  );
};

export default memo(BannerItem);
