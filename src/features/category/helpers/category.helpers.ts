import * as yup from "yup";

import { DefaultMessages } from "constants/message.constants";

import { CategoryRequest, CategoryDef } from "../category";

export const initialCreateCategory: CategoryRequest = {
  title: "",
};

export const categorySchema = yup.object().shape({
  title: yup.string().required(DefaultMessages.REQUIRED),
});

export const setEditCategoryForm = (data: CategoryDef): CategoryRequest => {
  return {
    title: data.title,
  };
};
