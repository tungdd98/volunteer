import React, { FC } from "react";

import { FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";

import { useAppDispatch } from "app/hooks";
import {
  CategoryPathsEnum,
  CategoryRequest,
  createCategory,
  initialCreateCategory,
} from "features/category/category";
import { handleShowSnackbar } from "helpers/form/display-snackbar";

import FormEdit from "../../../components/admin/FormEdit/FormEdit";

const CategoryCreateScreen: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleSubmit = (
    values: CategoryRequest,
    { setSubmitting }: FormikHelpers<CategoryRequest>
  ) => {
    dispatch(createCategory(values))
      .catch(error => handleShowSnackbar({ error, dispatch }))
      .then(() => {
        history.push(CategoryPathsEnum.ADMIN_LIST);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <FormEdit
      initialValues={initialCreateCategory}
      handleSubmit={handleSubmit}
    />
  );
};

export default CategoryCreateScreen;
