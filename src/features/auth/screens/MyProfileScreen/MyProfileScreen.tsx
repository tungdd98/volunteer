import React, { FC, useEffect, useState } from "react";

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
import { Link, Redirect } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import PreviewImage from "components/PreviewImage/PreviewImage";
import RowData from "components/RowData/RowData";
import { AuthPathsEnum } from "features/auth/auth";
import { getTransactionListByUid } from "features/transaction/transaction";
import { ROOT_ROUTE } from "routes/routes.config";

import TransactionDetailDialog from "../../components/TransactionDetailDialog/TransactionDetailDialog";

const MyProfileScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);
  const { transactions } = useAppSelector(state => state.transaction);

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const totalVolunteers = new Set(
    transactions?.map(item => item.toAddress) || []
  ).size;
  const totalOrai = transactions?.reduce((total, item) => {
    const t = total + Number(item.orai);
    return t;
  }, 0);

  useEffect(() => {
    if (userInfo?.uid) {
      dispatch(getTransactionListByUid(userInfo.uid)).finally(() =>
        setIsLoading(false)
      );
    }
  }, [dispatch, userInfo?.uid]);

  if (isLoading) {
    return <Loader />;
  }

  if (!userInfo) {
    return <Redirect to={ROOT_ROUTE} />;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={3}>
          <PreviewImage src={userInfo.photoURL || ""} borderRadius="50%" />
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
            <RowData content={userInfo.displayName} variant="h6" />
            <RowData
              content={userInfo.email}
              variant="body2"
              sx={{ wordBreak: "break-all" }}
            />
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
              {totalVolunteers}
            </Typography>
            <Typography variant="body2">Hoàn cảnh ủng hộ</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={10} sx={{ p: 1, bgcolor: "info.light" }}>
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              {totalOrai} ORAI
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
            onClick={() => setIsOpen(true)}
          >
            <StarsRounded />
            <Typography sx={{ pl: 1 }} variant="body2">
              Danh sách chi tiết
            </Typography>
            <KeyboardArrowRightRounded sx={{ ml: "auto" }} />
          </Paper>
        </Grid>
      </Grid>

      <TransactionDetailDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </Container>
  );
};

export default MyProfileScreen;
