import React, { FC } from "react";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Form, Formik, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";

import { useAppDispatch } from "app/hooks";
import FormEditWrapper from "components/FormEditWrapper/FormEditWrapper";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import StickyHeader from "components/StickyHeader/StickyHeader";
import TextEditor from "components/TextEditor/TextEditor";
import UploadImage from "components/UploadImage/UploadImage";
import {
  ArticleForm,
  articleSchema,
  initialCreateArticle,
  postArticle,
} from "features/article/article";
import { handleShowSnackbar } from "helpers/form/display-snackbar";
import { ROOT_ROUTE } from "routes/routes.config";

const EditScreen: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const createArticle = async (
    data: ArticleForm,
    thumbnail: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    return dispatch(
      postArticle({
        ...data,
        thumbnail,
      })
    )
      .catch(error => handleShowSnackbar({ error, dispatch }))
      .then(() => {
        history.push(ROOT_ROUTE);
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
          createArticle(values, url, setSubmitting);
        });
      });
    } else {
      createArticle(values, "", setSubmitting);
    }
  };

  return (
    <Formik
      initialValues={initialCreateArticle}
      validationSchema={articleSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <StickyHeader linkBack={ROOT_ROUTE} isSubmitting={isSubmitting} />
          <FormEditWrapper>
            <FormikTextField
              name="title"
              fullWidth
              label="Tiêu đề"
              placeholder="example"
            />

            <UploadImage name="thumbnail" label="Ảnh thumbnail" width={240} />

            <TextEditor name="content" label="Nội dung bài viết" />

            <FormikTextField
              name="senderAddress"
              fullWidth
              label="Địa chỉ ví người nhận"
              placeholder="0xx"
            />
          </FormEditWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default EditScreen;
