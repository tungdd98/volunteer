import * as yup from "yup";

import { DefaultMessages } from "constants/message.constants";

import { ArticleForm } from "../article";

export const initialDonate = {
  donate: "",
};

export const donateSchema = yup.object().shape({
  donate: yup.number().required(DefaultMessages.REQUIRED),
});

export const initialCreateArticle: ArticleForm = {
  title: "",
  content: "",
  thumbnail: "",
  maxDonate: 0,
  status: 1,
  albums: [],
  tags: [],
  senderAddress: "",
};

export const articleSchema = yup.object().shape({
  title: yup.string().required(DefaultMessages.REQUIRED),
  content: yup.string().required(DefaultMessages.REQUIRED),
  maxDonate: yup.number().required(DefaultMessages.REQUIRED),
  senderAddress: yup.string().required(DefaultMessages.REQUIRED),
});
