import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

import { DEFAULT_HIDE_SNACKBAR } from "constants/common.constants";

interface SnackbarState {
  open: boolean;
  message: string;
  autoHideDuration?: number | null;
  type?: AlertColor;
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  autoHideDuration: DEFAULT_HIDE_SNACKBAR,
  type: "error",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    displaySnackbar: (state, action) => {
      const { message, autoHideDuration } = action.payload;
      state.open = true;
      state.message = message;
      state.autoHideDuration = autoHideDuration || DEFAULT_HIDE_SNACKBAR;
    },
    hideSnackbar: state => {
      state.open = false;
      state.message = "";
      state.autoHideDuration = null;
    },
  },
});

export const { displaySnackbar, hideSnackbar } = snackbarSlice.actions;

export const snackbarReducer = snackbarSlice.reducer;
