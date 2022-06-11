import React, { FC } from "react";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FormikHelpers } from "formik";
import { useHistory, useParams } from "react-router-dom";

import { useAppDispatch } from "app/hooks";
import {
  ArticleForm,
  initialCreateArticle,
  createArticle,
  ArticlePathsEnum,
} from "features/article/article";
import { handleShowSnackbar } from "helpers/form/display-snackbar";

import FormEdit from "../../../components/FormEdit/FormEdit";

const CreateScreen: FC = () => {
  const history = useHistory();
  const { categoryId } = useParams<{
    categoryId: string;
  }>();

  const dispatch = useAppDispatch();

  const handleCreateArticle = async (
    data: ArticleForm,
    thumbnail: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    return dispatch(
      createArticle({
        ...data,
        thumbnail,
      })
    )
      .catch(error => handleShowSnackbar({ error, dispatch }))
      .then(() => {
        history.push(
          ArticlePathsEnum.ARTICLE_LIST_ADMIN.replace(/:categoryId/, categoryId)
        );
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
          handleCreateArticle(values, url, setSubmitting);
        });
      });
    } else {
      handleCreateArticle(values, "", setSubmitting);
    }
  };

  return (
    <FormEdit
      initialValues={initialCreateArticle}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateScreen;
