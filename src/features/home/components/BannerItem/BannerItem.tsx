import React, { FC, memo } from "react";

import {
  Box,
  Button,
  Container,
  LinearProgress,
  styled,
  Typography,
} from "@mui/material";

import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum } from "constants/common.constants";
import { ArticleDef } from "features/article/article";
import { toCurrency } from "helpers/convert/currency";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 5,
}));

interface BannerItemProps {
  banner: ArticleDef;
}

const BannerItem: FC<BannerItemProps> = ({ banner }) => {
  return (
    <Box>
      <PreviewImage
        aspectRatio={AspectRatioEnum.SIXTEEN_TO_NINE}
        src={banner.thumbnail}
        alt={banner.title}
        borderRadius={0}
      />

      <Container sx={{ px: 2, py: 1 }}>
        <Typography variant="subtitle1">{banner.title}</Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: 500,
          }}
        >
          <Box sx={{ flexGrow: 1, pr: 2 }}>
            <Typography variant="body2" fontWeight={600}>
              {toCurrency(banner.currentDonate, true)} /{" "}
              {toCurrency(banner.maxDonate, true)} Lượt
            </Typography>
            <BorderLinearProgress
              variant="determinate"
              value={Math.floor(
                (banner.currentDonate / banner.maxDonate) * 100
              )}
              sx={{ my: 0.5 }}
            />
            <Typography variant="body2">
              {toCurrency(banner.currentDonate, true)} người ủng hộ
            </Typography>
          </Box>
          <Button variant="contained" size="small">
            Ủng hộ ngay
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(BannerItem);
