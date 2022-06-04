import { get } from "lodash";

import { displaySnackbar } from "app/snackbar.slice";
import { AppDispatch } from "app/store";
import { DefaultMessages } from "constants/message.constants";

export const handleShowSnackbar = ({
  dispatch,
  error,
  msg = "Unknown message",
}: {
  dispatch: AppDispatch;
  msg?: string;
  error?: {
    code: string;
  };
}) => {
  const message = error
    ? get(DefaultMessages, error.code) || "Unknown message"
    : msg;
  dispatch(
    displaySnackbar({
      message,
    })
  );
};
