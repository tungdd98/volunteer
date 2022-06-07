import React, { FC, useEffect, useState } from "react";

import { SigningCosmosClient } from "@cosmjs/launchpad";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
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
import { handleShowSnackbar } from "helpers/form/display-snackbar";

import KeplrExtensionDialog from "../../components/KeplrExtensionDialog/KeplrExtensionDialog";

const DonateProgressScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { articleDetail } = useAppSelector(state => state.article);

  const { articleId } = useParams<{ articleId: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenInstallExtension, setIsOpenInstallExtension] = useState(false);

  useEffect(() => {
    if (articleId) {
      dispatch(getArticleDetail(articleId)).finally(() => setIsLoading(false));
    }
  }, [articleId, dispatch]);

  useEffect(() => {
    const loadKeplr = async () => {
      if (!window.getOfflineSigner || !window.keplr) {
        setIsOpenInstallExtension(true);
      } else if (window.keplr.experimentalSuggestChain) {
        try {
          await window.keplr.experimentalSuggestChain({
            chainId: "osmosis-1",
            chainName: "Osmosis mainnet",
            rpc: "https://rpc-osmosis.blockapsis.com",
            rest: "https://lcd-osmosis.blockapsis.com",
            stakeCurrency: {
              coinDenom: "OSMO",
              coinMinimalDenom: "uosmo",
              coinDecimals: 6,
            },
            bip44: {
              coinType: 118,
            },
            bech32Config: {
              bech32PrefixAccAddr: "osmo",
              bech32PrefixAccPub: "osmopub",
              bech32PrefixValAddr: "osmovaloper",
              bech32PrefixValPub: "osmovaloperpub",
              bech32PrefixConsAddr: "osmovalcons",
              bech32PrefixConsPub: "osmovalconspub",
            },
            currencies: [
              {
                coinDenom: "OSMO",
                coinMinimalDenom: "uosmo",
                coinDecimals: 6,
              },
            ],
            feeCurrencies: [
              {
                coinDenom: "OSMO",
                coinMinimalDenom: "uosmo",
                coinDecimals: 6,
              },
            ],
            coinType: 118,
            gasPriceStep: {
              low: 0.01,
              average: 0.025,
              high: 0.04,
            },
          });
        } catch {
          handleShowSnackbar({ dispatch, msg: "Failed to suggest the chain" });
        }
      } else {
        handleShowSnackbar({
          dispatch,
          msg: "Please use the recent version of keplr extension",
        });
      }

      if (window.keplr) {
        const chainId = "osmosis-1";

        await window.keplr.enable(chainId);

        if (window.getOfflineSigner) {
          const offlineSigner = window.getOfflineSigner(chainId);

          const accounts = await offlineSigner.getAccounts();

          const cosmJS = new SigningCosmosClient(
            "https://rpc-osmosis.blockapsis.com",
            accounts[0].address,
            offlineSigner
          );

          console.log(cosmJS);
        }
      }
    };

    loadKeplr();
  }, [dispatch]);

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
      onSubmit={() => {
        // TODO:
      }}
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
                  >
                    Ủng hộ ngay {donate} ORAI
                  </Button>
                </Form>
              </Box>
            </Box>

            <KeplrExtensionDialog open={isOpenInstallExtension} />
          </Container>
        );
      }}
    </Formik>
  );
};

export default DonateProgressScreen;
