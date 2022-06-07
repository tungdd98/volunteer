import * as yup from "yup";

import { DefaultMessages } from "constants/message.constants";

export const initialDonate = {
  donate: "",
};

export const donateSchema = yup.object().shape({
  donate: yup.number().required(DefaultMessages.REQUIRED),
});
