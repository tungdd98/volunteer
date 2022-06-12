import * as yup from "yup";

import { DefaultMessages } from "constants/message.constants";

import { ArticleDef, ArticleForm } from "../article";

export const initialDonate = {
  donate: "",
};

export const donateSchema = yup.object().shape({
  donate: yup
    .string()
    .matches(/^[0-9]*$/)
    .required(DefaultMessages.REQUIRED),
});

export const initialCreateArticle: ArticleForm = {
  title: "",
  content: "",
  thumbnail: "",
  maxDonate: "",
  status: 1,
  albums: [],
  tags: [],
  senderAddress: "",
  provinceCode: "",
  categoryId: "",
};

export const articleSchema = yup.object().shape({
  title: yup.string().required(DefaultMessages.REQUIRED),
  content: yup.string().required(DefaultMessages.REQUIRED),
  maxDonate: yup.string().required(DefaultMessages.REQUIRED),
  senderAddress: yup.string().required(DefaultMessages.REQUIRED),
  provinceCode: yup.string().required(DefaultMessages.REQUIRED),
  categoryId: yup.string().required(DefaultMessages.REQUIRED),
});

export const setEditArticleForm = (data: ArticleDef): ArticleForm => {
  return {
    title: data.title,
    content: data.content,
    thumbnail: data.thumbnail,
    maxDonate: data.maxDonate.toString(),
    status: data.status,
    albums: data.albums,
    tags: data.tags,
    senderAddress: data.senderAddress,
    provinceCode: data.provinceCode,
    categoryId: data.categoryId,
  };
};
