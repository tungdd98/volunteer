import React, { FC, memo } from "react";

import { Grid, Typography } from "@mui/material";

import RowData from "components/RowData/RowData";
import { Account } from "features/auth/auth";

interface PreviewCodeInfoTextProps {
  codeInfo: Account;
}

const PreviewCodeInfoText: FC<PreviewCodeInfoTextProps> = ({ codeInfo }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={6}>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Họ và tên
        </Typography>
        <RowData content={codeInfo.fullname} />
      </Grid>
      <Grid item xs={6}>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Ngày sinh
        </Typography>
        <RowData content={codeInfo.birthday} />
      </Grid>
      <Grid item xs={6}>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Giới tính
        </Typography>
        <RowData content={codeInfo.gender} />
      </Grid>
      <Grid item xs={6}>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Dân tộc
        </Typography>
        <RowData content={codeInfo.nation} />
      </Grid>
      <Grid item xs={12}>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Quê quán
        </Typography>
        <RowData content={codeInfo.location} />
      </Grid>
      <Grid item xs={12}>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Địa chỉ thường trú
        </Typography>
        <RowData content={codeInfo.address} />
      </Grid>
    </Grid>
  );
};

export default memo(PreviewCodeInfoText);
