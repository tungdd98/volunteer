/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";

import { assertIsBroadcastTxSuccess } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import Loader from "components/Loader/Loader";
import PreviewImage from "components/PreviewImage/PreviewImage";
import {
  donateSchema,
  getArticleDetail,
  initialDonate,
} from "features/article/article";

const DonateProgressScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { articleDetail } = useAppSelector(state => state.article);

  const { articleId } = useParams<{ articleId: string }>();

  const [isLoading, setIsLoading] = useState(true);

  const recipient = articleDetail?.senderAddress;

  const submitForm = async (values: { donate: string }) => {
    if (!recipient) {
      return;
    }

    let amount = Number(values.donate);
    console.log(values);

    if (!amount || !window.keplr || !window.getOfflineSigner) {
      return;
    }

    amount *= 1000000;
    amount = Math.floor(amount);

    const chainId = "osmosis-1";
    await window.keplr.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();

    const client = await SigningStargateClient.connectWithSigner(
      "https://rpc-osmosis.blockapsis.com",
      offlineSigner
    );

    const amountFinal = {
      denom: "uosmo",
      amount: amount.toString(),
    };
    const fee = {
      amount: [
        {
          denom: "uosmo",
          amount: "5000",
        },
      ],
      gas: "200000",
    };
    const result = await client.sendTokens(
      accounts[0].address,
      recipient,
      [amountFinal],
      fee,
      ""
    );
    assertIsBroadcastTxSuccess(result as any);

    if (result.code !== undefined && result.code !== 0) {
      console.log("Failed to send tx:", result);
    } else {
      console.log(`Succeed to send tx`, result);
    }
  };

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

  return (
    <Formik
      initialValues={initialDonate}
      validationSchema={donateSchema}
      onSubmit={submitForm}
    >
      {({ values }) => {
        const donate = values.donate || 0;

        return (
          <Container sx={{ pt: 3 }} maxWidth="sm">
            <Box
              sx={{
                borderRadius: "50% 50% 47% 53% / 30% 30% 70% 70%",
                height: "60vh",
                bgcolor: "primary.dark",
                position: "fixed",
                width: "100%",
                top: "-10%",
                maxWidth: 500,
                margin: "auto",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
              }}
            />

            <Box
              sx={{
                position: "relative",
                zIndex: 99,
                textAlign: "center",
                color: "white",
              }}
            >
              <Typography variant="h1" fontSize={20} sx={{ mb: 3 }}>
                {articleDetail.title}
              </Typography>
              <Typography variant="h2" sx={{ mb: 3 }}>
                {donate} ORAI
              </Typography>
              <Typography variant="caption" sx={{ display: "block", mb: 2 }}>
                {articleDetail.currentDonate} Lượt
              </Typography>
              <Typography sx={{ textDecoration: "underline" }}>
                Thống kê đã nhận: 20 ORAI
              </Typography>
              <Paper
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  mx: "auto",
                  mt: 4,
                }}
                elevation={15}
              >
                <PreviewImage
                  src={articleDetail.thumbnail}
                  width={200}
                  height={200}
                  borderRadius="50%"
                />
              </Paper>

              <Box sx={{ mt: 3 }}>
                <Form>
                  <FormikTextField
                    name="donate"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">ORAI</InputAdornment>
                      ),
                    }}
                    type="number"
                    placeholder="100"
                  />

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!recipient}
                  >
                    Ủng hộ ngay {donate} ORAI
                  </Button>
                </Form>
              </Box>
            </Box>
          </Container>
        );
      }}
    </Formik>
  );
};

export default DonateProgressScreen;
