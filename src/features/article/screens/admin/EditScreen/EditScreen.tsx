import React, { FC, useEffect, useState } from "react";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FormikHelpers } from "formik";
import { useHistory, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import {
  ArticleForm,
  ArticlePathsEnum,
  getArticleDetail,
  setEditArticleForm,
  updateArticle,
} from "features/article/article";
import { handleShowSnackbar } from "helpers/form/display-snackbar";

import FormEdit from "../../../components/FormEdit/FormEdit";

const EditScreen: FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { articleDetail } = useAppSelector(state => state.article);

  const { articleId } = useParams<{ articleId: string }>();

  const [isLoading, setIsLoading] = useState(true);

  const handleUpdateArticle = async (
    data: ArticleForm,
    thumbnail: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    return dispatch(
      updateArticle({
        articleId,
        data: {
          ...data,
          thumbnail,
        },
      })
    )
      .catch(error => handleShowSnackbar({ error, dispatch }))
      .then(() => {
        history.push(ArticlePathsEnum.ARTICLE_LIST_ADMIN);
      })
      .finally(() => setSubmitting(false));
  };

  const handleSubmit = (
    values: ArticleForm,
    { setSubmitting }: FormikHelpers<ArticleForm>
  ) => {
    const file = values.thumbnail;

    if (file instanceof File) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `/files/${file.name}-${new Date().getTime()}`
      );
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(url => {
          handleUpdateArticle(values, url, setSubmitting);
        });
      });
    } else {
      handleUpdateArticle(values, values.thumbnail.toString(), setSubmitting);
    }
  };

  useEffect(() => {
    if (articleId) {
      dispatch(getArticleDetail(articleId)).finally(() => setIsLoading(false));
    }
  }, [articleId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!articleDetail) {
    return <div>Error...</div>;
  }

  const initialValues = setEditArticleForm(articleDetail);

  return <FormEdit initialValues={initialValues} handleSubmit={handleSubmit} />;
};

export default EditScreen;
