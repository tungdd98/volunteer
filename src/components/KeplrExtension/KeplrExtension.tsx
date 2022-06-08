import React, { FC, memo, useState, useEffect, useCallback } from "react";

import { SigningCosmosClient } from "@cosmjs/launchpad";
import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { AuthPathsEnum, setSenderAddress } from "features/auth/auth";
import { handleShowSnackbar } from "helpers/form/display-snackbar";

const KeplrExtension: FC = () => {
  const auth = getAuth();
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { senderAddress, userInfo } = useAppSelector(state => state.auth);

  const [isOpenInstallExtension, setIsOpenInstallExtension] = useState(false);

  const redirectExtension = () => {
    window.open(
      "https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap",
      "_blank"
    );
  };

  const closeDialog = () => {
    window.location.reload();
  };

  const handleLogin = useCallback(
    (password: string, email: string) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          if (!userCredential.user.displayName) {
            history.push(AuthPathsEnum.SIGN_UP_PERSONAL_INFO);
          }
        })
        .catch(error => {
          handleShowSnackbar({ dispatch, error });
        });
    },
    [auth, dispatch, history]
  );

  useEffect(() => {
    const loadKeplr = async () => {
      if (!window.getOfflineSigner || !window.keplr) {
        setIsOpenInstallExtension(true);
      } else if (window.keplr.experimentalSuggestChain) {
        try {
          // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
          // cosmoshub-3 is integrated to Keplr so the code should return without errors.
          // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
          // If the user approves, the chain will be added to the user's Keplr extension.
          // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
          // If the same chain id is already registered, it will resolve and not require the user interactions.
          await window.keplr.experimentalSuggestChain({
            // Chain-id of the Osmosis chain.
            chainId: "Oraichain-testnet",
            // The name of the chain to be displayed to the user.
            chainName: "Oraichain-testnet",
            // RPC endpoint of the chain. In this case we are using blockapsis, as it's accepts connections from any host currently. No Cors limitations.
            rpc: "https://testnet-rpc.orai.io",
            // REST endpoint of the chain.
            rest: "https://testnet-lcd.orai.io",
            // Staking coin information
            stakeCurrency: {
              // Coin denomination to be displayed to the user.
              coinDenom: "ORAI",
              // Actual denom (i.e. uatom, uscrt) used by the blockchain.
              coinMinimalDenom: "orai",
              // # of decimal points to convert minimal denomination to user-facing denomination.
              coinDecimals: 6,
              // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
              // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
              // coinGeckoId: ""
            },
            // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
            // The 'stake' button in Keplr extension will link to the webpage.
            // walletUrlForStaking: "",
            // The BIP44 path.
            bip44: {
              // You can only set the coin type of BIP44.
              // 'Purpose' is fixed to 44.
              coinType: 118,
            },
            // Bech32 configuration to show the address to user.
            // This field is the interface of
            // {
            //   bech32PrefixAccAddr: string;
            //   bech32PrefixAccPub: string;
            //   bech32PrefixValAddr: string;
            //   bech32PrefixValPub: string;
            //   bech32PrefixConsAddr: string;
            //   bech32PrefixConsPub: string;
            // }
            bech32Config: {
              bech32PrefixAccAddr: "orai",
              bech32PrefixAccPub: "oraipub",
              bech32PrefixValAddr: "oraivaloper",
              bech32PrefixValPub: "oraivaloperpub",
              bech32PrefixConsAddr: "oraivalcons",
              bech32PrefixConsPub: "oraivalconspub",
            },
            // List of all coin/tokens used in this chain.
            currencies: [
              {
                // Coin denomination to be displayed to the user.
                coinDenom: "ORAI",
                // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                coinMinimalDenom: "orai",
                // # of decimal points to convert minimal denomination to user-facing denomination.
                coinDecimals: 6,
                // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                // coinGeckoId: ""
              },
            ],
            // List of coin/tokens used as a fee token in this chain.
            feeCurrencies: [
              {
                // Coin denomination to be displayed to the user.
                coinDenom: "ORAI",
                // Actual denom (i.e. uosmo, uscrt) used by the blockchain.
                coinMinimalDenom: "orai",
                // # of decimal points to convert minimal denomination to user-facing denomination.
                coinDecimals: 6,
                // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                // coinGeckoId: ""
              },
            ],
            // (Optional) The number of the coin type.
            // This field is only used to fetch the address from ENS.
            // Ideally, it is recommended to be the same with BIP44 path's coin type.
            // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
            // So, this is separated to support such chains.
            coinType: 118,
            // (Optional) This is used to set the fee of the transaction.
            // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
            // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
            // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
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
        const chainId = "Oraichain-testnet";

        await window.keplr.enable(chainId);

        if (window.getOfflineSigner) {
          const offlineSigner = window.getOfflineSigner(chainId);

          const accounts = await offlineSigner.getAccounts();
          const currentUser = accounts[0];

          if (currentUser) {
            dispatch(setSenderAddress(currentUser.address));

            const cosmJS = new SigningCosmosClient(
              "https://testnet-rpc.orai.io",
              currentUser.address,
              offlineSigner as any
            );

            // eslint-disable-next-line no-console
            console.log(cosmJS);
          }
        }
      }
    };

    loadKeplr();
  }, [dispatch]);

  useEffect(() => {
    if (
      senderAddress &&
      userInfo?.email?.replace(/@gmail.com/, "") !== senderAddress
    ) {
      const email = `${senderAddress}@gmail.com`;

      createUserWithEmailAndPassword(auth, email, senderAddress)
        .then(() => {
          handleLogin(senderAddress, email);
        })
        .catch(() => {
          handleLogin(senderAddress, email);
        });
    }
  }, [auth, handleLogin, senderAddress, userInfo?.email]);

  if (senderAddress) {
    return null;
  }

  return (
    <Dialog
      open={isOpenInstallExtension}
      maxWidth="sm"
      fullWidth
      disableAutoFocus
    >
      <DialogContent>
        <Typography sx={{ mb: 3 }}>
          Xin vui lòng cài đặt{" "}
          <Typography color="primary" display="inline" component="span">
            Keplr extension
          </Typography>{" "}
          để có thể sử dụng các chức năng của hệ thống
        </Typography>

        <Stack spacing={1}>
          <Button fullWidth variant="contained" onClick={redirectExtension}>
            Cài đặt
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={closeDialog}
          >
            Đóng lại
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default memo(KeplrExtension);
