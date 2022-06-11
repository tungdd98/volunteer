/* eslint-disable no-console */
import React, { FC, useCallback, useEffect, useState } from "react";

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
import axios from "axios";
import { Form, Formik } from "formik";
import { get } from "lodash";
import { Link, useHistory, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import Loader from "components/Loader/Loader";
import PreviewImage from "components/PreviewImage/PreviewImage";
import {
  ArticlePathsEnum,
  donateSchema,
  getArticleDetail,
  initialDonate,
  SCORE_ORAI,
  updateCurrentDonate,
} from "features/article/article";
import { AuthPathsEnum } from "features/auth/auth";
import { handleShowSnackbar } from "helpers/form/display-snackbar";

import ReceivedDialog from "../../components/ReceivedDialog/ReceivedDialog";

const DonateProgressScreen: FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { articleDetail } = useAppSelector(state => state.article);
  const { userInfo } = useAppSelector(state => state.auth);

  const { articleId } = useParams<{ articleId: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [totalOrai, setTotalOrai] = useState(0);
  const [isOpenReceivedDialog, setIsOpenReceivedDialog] = useState(false);

  const recipient = articleDetail?.senderAddress;

  const redirectExtension = () => {
    window.open(
      "https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap",
      "_target"
    );
  };

  const submitForm = async (values: { donate: string }) => {
    if (!recipient) {
      return;
    }

    let amount = Number(values.donate);

    if (!amount || !window.keplr || !window.getOfflineSigner) {
      return;
    }

    amount *= SCORE_ORAI;
    amount = Math.floor(amount);

    const chainId = "Oraichain-testnet";
    await window.keplr.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();

    try {
      const client = await SigningStargateClient.connectWithSigner(
        "https://testnet-rpc.orai.io",
        offlineSigner
      );

      const amountFinal = {
        denom: "orai",
        amount: amount.toString(),
      };
      const fee = {
        amount: [
          {
            denom: "orai",
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
        dispatch(
          updateCurrentDonate({
            articleId,
            currentDonateOld: articleDetail?.currentDonate,
          })
        );
        history.push(
          ArticlePathsEnum.DONATE_SUCCESS.replace(/:articleId/, articleId),
          values.donate
        );
      }
    } catch {
      handleShowSnackbar({ dispatch, msg: "Not found key" });
    }
  };

  const getTotalOrai = useCallback(async () => {
    if (!recipient) {
      return;
    }
    const response = await axios.get(
      `https://testnet-lcd.orai.io/cosmos/tx/v1beta1/txs?events=transfer.recipient%3D%27${recipient}%27`
    );

    const data = get(response.data, "txs") as unknown[];
    const orai = data.reduce((total: number, item) => {
      const message = get(item, "body.messages[0]");
      const type = get(message, "@type");
      const amount = get(message, "amount[0].amount");

      if (type === "/cosmos.bank.v1beta1.MsgSend") {
        return total + Number(amount);
      }

      return total;
    }, 0);

    setTotalOrai(orai / SCORE_ORAI);
  }, [recipient]);

  useEffect(() => {
    if (articleId) {
      dispatch(getArticleDetail(articleId)).finally(() => setIsLoading(false));
    }
  }, [articleId, dispatch]);

  useEffect(() => {
    getTotalOrai();
  }, [getTotalOrai]);

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
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values }) => {
        const donate = values.donate || 0;

        return (
          <Container sx={{ pt: 3 }} maxWidth="sm">
            <Box
              sx={{
                borderRadius: "50%",
                height: 500,
                bgcolor: "primary.dark",
                position: "absolute",
                width: 500,
                top: "-10%",
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
              <Typography
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setIsOpenReceivedDialog(true)}
              >
                Thống kê đã nhận: {totalOrai} ORAI
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
                    disabled={
                      !recipient || !userInfo?.codeInfo || !window.keplr
                    }
                  >
                    Ủng hộ ngay {donate} ORAI
                  </Button>

                  {!userInfo?.codeInfo && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="caption" color="GrayText">
                        *Vui lòng xác thực danh tính để ủng hộ.
                      </Typography>
                      <Typography
                        variant="caption"
                        color="primary"
                        component={Link}
                        to={AuthPathsEnum.UPDATE_PROFILE}
                      >
                        Xác thực ngay
                      </Typography>
                    </Box>
                  )}
                  {!window.keplr && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="caption" color="GrayText">
                        *Xin vui lòng cài đặt{" "}
                        <Typography color="primary" variant="caption">
                          Keplr extension
                        </Typography>{" "}
                        để có thể sử dụng các chức năng của hệ thống
                      </Typography>
                      <Typography
                        variant="caption"
                        color="primary"
                        onClick={redirectExtension}
                        sx={{ cursor: "pointer" }}
                      >
                        Cài đặt
                      </Typography>
                    </Box>
                  )}
                </Form>
              </Box>
            </Box>

            <ReceivedDialog
              open={isOpenReceivedDialog}
              onClose={() => setIsOpenReceivedDialog(false)}
              recipient={recipient}
            />
          </Container>
        );
      }}
    </Formik>
  );
};

export default DonateProgressScreen;
