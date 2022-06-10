import React, { FC, useEffect, useState } from "react";

import {
  Button,
  Container,
  TableContainer,
  Typography,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { Link, Redirect, useLocation, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import PreviewImage from "components/PreviewImage/PreviewImage";
import { getArticleDetail } from "features/article/article";
import { toCurrency } from "helpers/convert/currency";
import { ROOT_ROUTE } from "routes/routes.config";

const DonateSuccessScreen: FC = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);
  const { articleDetail } = useAppSelector(state => state.article);

  const { articleId } = useParams<{ articleId: string }>();

  const [isLoading, setIsLoading] = useState(true);

  const oraiDonate = location?.state || 0;

  useEffect(() => {
    if (articleId) {
      dispatch(getArticleDetail(articleId)).finally(() => setIsLoading(false));
    }
  }, [articleId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!articleDetail) {
    return <div>Error...</div>;
  }

  if (!oraiDonate) {
    return <Redirect to={ROOT_ROUTE} />;
  }

  return (
    <Container sx={{ mt: 5, textAlign: "center" }} maxWidth="sm">
      <PreviewImage
        src="https://img.icons8.com/external-filled-line-rakhmat-setiawan/64/undefined/external-autumn-thanksgiving-filled-line-filled-line-rakhmat-setiawan.png"
        width={64}
        isCenter
      />

      <Typography sx={{ mt: 3, px: 2 }} variant="h4" fontSize={24}>
        Cám ơn bạn đã ủng hộ những hoàn cảnh khó khăn!!
      </Typography>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ mt: 5, border: 1, borderColor: "divider" }}
      >
        <Table size="small">
          <TableBody>
            <TableRow hover>
              <TableCell
                sx={{ borderRight: 1, borderColor: "divider", width: 150 }}
              >
                Địa chỉ gửi
              </TableCell>
              <TableCell sx={{ wordBreak: "break-all" }}>
                {userInfo?.email}
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                }}
              >
                Địa chỉ nhận
              </TableCell>
              <TableCell sx={{ wordBreak: "break-all" }}>
                {articleDetail.senderAddress}
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell
                sx={{ borderRight: 1, borderColor: "divider", borderBottom: 0 }}
              >
                Số Orai ủng hộ
              </TableCell>
              <TableCell sx={{ borderBottom: 0 }}>
                {toCurrency(Number(oraiDonate), true)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 5 }}
        component={Link}
        to={ROOT_ROUTE}
      >
        Trang chủ
      </Button>
    </Container>
  );
};

export default DonateSuccessScreen;
