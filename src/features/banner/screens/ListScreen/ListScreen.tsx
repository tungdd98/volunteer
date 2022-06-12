import React, { FC, useEffect, useState } from "react";

import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import { BannerPathsEnum, getBannerList } from "features/banner/banner";

import BannerItem from "../../components/BannerItem/BannerItem";

const ListScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { banners } = useAppSelector(state => state.banner);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getBannerList()).finally(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h3" fontSize={20}>
          Banner
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to={BannerPathsEnum.ADMIN_CREATE}
        >
          Thêm mới
        </Button>
      </Box>

      {banners && banners.length ? (
        banners.map(item => <BannerItem key={item.id} banner={item} />)
      ) : (
        <Typography>Không có dữ liệu</Typography>
      )}
    </Container>
  );
};

export default ListScreen;
