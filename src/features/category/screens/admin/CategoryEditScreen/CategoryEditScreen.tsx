import React, { FC, useEffect, useState } from "react";

import { FormikHelpers } from "formik";
import { useHistory, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import {
  CategoryPathsEnum,
  CategoryRequest,
  getCategoryDetail,
  setEditCategoryForm,
  updateCategory,
} from "features/category/category";
import { handleShowSnackbar } from "helpers/form/display-snackbar";

import FormEdit from "../../../components/admin/FormEdit/FormEdit";

const CategoryEditScreen: FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { categoryDetail } = useAppSelector(state => state.category);

  const { categoryId } = useParams<{ categoryId: string }>();

  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (
    values: CategoryRequest,
    { setSubmitting }: FormikHelpers<CategoryRequest>
  ) => {
    dispatch(
      updateCategory({
        data: values,
        categoryId,
      })
    )
      .catch(error => handleShowSnackbar({ error, dispatch }))
      .then(() => {
        history.push(CategoryPathsEnum.ADMIN_LIST);
      })
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryDetail(categoryId)).finally(() =>
        setIsLoading(false)
      );
    }
  }, [categoryId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!categoryDetail) {
    return <div>Error...</div>;
  }

  const initialValues = setEditCategoryForm(categoryDetail);

  return <FormEdit initialValues={initialValues} handleSubmit={handleSubmit} />;
};

export default CategoryEditScreen;
