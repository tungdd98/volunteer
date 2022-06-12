import React, { FC, useEffect, useState } from "react";

import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum } from "constants/common.constants";
import { getTripDetail } from "features/trip/trip";

const DetailScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { tripDetail } = useAppSelector(state => state.trip);

  const { tripId } = useParams<{ tripId: string }>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getTripDetail(tripId)).finally(() => setIsLoading(false));
  }, [dispatch, tripId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!tripDetail) {
    return <div>Error</div>;
  }

  return (
    <>
      <PreviewImage
        src={tripDetail.thumbnail}
        aspectRatio={AspectRatioEnum.TEN_TO_FOUR}
      />
      <Container>
        <Typography variant="h1" sx={{ my: 2 }}>
          {tripDetail.title}
        </Typography>
        <Typography variant="body2" color="GrayText" sx={{ mb: 2 }}>
          {tripDetail.description}
        </Typography>
        <Box sx={{ mb: 5 }}>
          <Typography variant="subtitle1" gutterBottom>
            Hoàn cảnh
          </Typography>
          <Box
            dangerouslySetInnerHTML={{
              __html: tripDetail.content,
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default DetailScreen;
