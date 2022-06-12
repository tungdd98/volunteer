import React, { FC, useEffect, useState } from "react";

import { MailRounded } from "@mui/icons-material";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
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

      <Container maxWidth="xs">
        <Paper sx={{ p: 2 }} elevation={10}>
          <Formik
            initialValues={{ name: "", email: "", phone: "", content: "" }}
            onSubmit={() => {
              // TODO:
            }}
          >
            <Form>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <MailRounded color="primary" sx={{ mr: 1, fontSize: 60 }} />
                <Typography variant="subtitle1">
                  Hãy để lại liên hệ cho chúng tôi
                </Typography>
              </Box>

              <FormikTextField name="name" fullWidth placeholder="Họ và tên" />

              <FormikTextField
                name="email"
                type="email"
                fullWidth
                placeholder="Email"
              />

              <FormikTextField
                name="phone"
                type="tel"
                fullWidth
                placeholder="Số điện thoại"
              />

              <FormikTextField
                name="content"
                fullWidth
                placeholder="Nội dung hỏi đáp"
                multiline
                rows={3}
              />

              <Button fullWidth variant="contained" size="large" type="submit">
                Gửi liên hệ
              </Button>
            </Form>
          </Formik>
        </Paper>
      </Container>
    </>
  );
};

export default DetailScreen;
