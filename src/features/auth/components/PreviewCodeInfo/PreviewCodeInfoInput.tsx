import React, { FC, memo } from "react";

import { Box, Grid } from "@mui/material";

import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";

const PreviewCodeInfoInput: FC = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormikTextField
            label="Họ và tên"
            name="codeInfo.fullname"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <FormikTextField
            label="Ngày sinh"
            name="codeInfo.birthday"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <FormikTextField
            label="Giới tính"
            name="codeInfo.gender"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <FormikTextField
            label="Dân tộc"
            name="codeInfo.nation"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            label="Quê quán"
            name="codeInfo.location"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            label="Địa chỉ thường trú"
            name="codeInfo.address"
            disabled
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(PreviewCodeInfoInput);
