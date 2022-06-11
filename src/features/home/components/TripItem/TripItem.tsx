import React, { FC, memo } from "react";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";

import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum } from "constants/common.constants";
import { TripDef } from "features/trip/trip";

interface TripItemProps {
  trip: TripDef;
}

const TripItem: FC<TripItemProps> = ({ trip }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <PreviewImage
              aspectRatio={AspectRatioEnum.ONE_TO_ONE}
              src={trip.thumbnail}
              alt={trip.title}
            />
          </Grid>

          <Grid item xs={7} sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">{trip.title}</Typography>
              <Typography variant="body2" color="GrayText">
                {trip.description}
              </Typography>
            </Box>
            <Button variant="contained" fullWidth>
              Tham gia ngay
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default memo(TripItem);
