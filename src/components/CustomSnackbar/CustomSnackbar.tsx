import React, { FC } from "react";

import { CloseRounded } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { hideSnackbar } from "app/snackbar.slice";

const CustomSnackbar: FC = () => {
  const dispatch = useAppDispatch();
  const { open, message, autoHideDuration, type } = useAppSelector(
    state => state.snackbar
  );

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%" }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseRounded />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
