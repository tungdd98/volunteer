import React, { FC } from "react";

import {
  EditRounded,
  KeyboardArrowRightRounded,
  StarsRounded,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useAppSelector } from "app/hooks";
import PreviewImage from "components/PreviewImage/PreviewImage";
import RowData from "components/RowData/RowData";
import { AuthPathsEnum } from "features/auth/auth";

const MyProfileScreen: FC = () => {
  const { userInfo } = useAppSelector(state => state.auth);

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={3}>
          <PreviewImage src={userInfo?.photoURL || ""} borderRadius="50%" />
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <RowData content={userInfo?.displayName} variant="h6" />
            <RowData content={userInfo?.email} variant="body2" />
          </Box>
          <IconButton component={Link} to={AuthPathsEnum.UPDATE_PROFILE}>
            <EditRounded color="primary" />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={10} sx={{ p: 1, bgcolor: "info.light" }}>
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              100
            </Typography>
            <Typography variant="body2">Hoàn cảnh ủng hộ</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={10} sx={{ p: 1, bgcolor: "info.light" }}>
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              120 ORAI
            </Typography>
            <Typography variant="body2">Số ORAI ủng hộ</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={10}
            sx={{
              px: 1,
              py: 2,
              bgcolor: "info.light",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <StarsRounded />
            <Typography sx={{ pl: 1 }} variant="body2">
              Thành tựu đạt được
            </Typography>
            <KeyboardArrowRightRounded sx={{ ml: "auto" }} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyProfileScreen;
