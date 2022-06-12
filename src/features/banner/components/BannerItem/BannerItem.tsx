import React, { FC, memo } from "react";

import { Box, Paper } from "@mui/material";
import { useHistory } from "react-router-dom";

import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum } from "constants/common.constants";
import { BannerDef, BannerPathsEnum } from "features/banner/banner";

interface BannerItemProps {
  banner: BannerDef;
}

const BannerItem: FC<BannerItemProps> = ({ banner }) => {
  const history = useHistory();

  const redirectEditPage = () => {
    history.push(BannerPathsEnum.ADMIN_EDIT.replace(/:bannerId/, banner.id));
  };

  return (
    <Box
      component={Paper}
      elevation={10}
      sx={{ p: 2, mb: 2, cursor: "pointer" }}
      onClick={redirectEditPage}
    >
      <PreviewImage
        src={banner.thumbnail}
        aspectRatio={AspectRatioEnum.TEN_TO_FOUR}
      />
    </Box>
  );
};

export default memo(BannerItem);
