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
}): void => {
  const message = error
    ? get(DefaultMessages, error.code) || "Unknown message"
    : msg;
  // eslint-disable-next-line no-console
  console.log("error", error);
  dispatch(
    displaySnackbar({
      message,
    })
  );
};
