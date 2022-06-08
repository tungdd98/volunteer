import React, { FC, memo } from "react";

import { Form, Formik, FormikHelpers } from "formik";

import FormEditWrapper from "components/FormEditWrapper/FormEditWrapper";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import StickyHeader from "components/StickyHeader/StickyHeader";
import TextEditor from "components/TextEditor/TextEditor";
import UploadImage from "components/UploadImage/UploadImage";
import {
  ArticleForm,
  ArticlePathsEnum,
  articleSchema,
} from "features/article/article";

interface FormEditProps {
  initialValues: ArticleForm;
  handleSubmit: (
    values: ArticleForm,
    { setSubmitting }: FormikHelpers<ArticleForm>
  ) => void;
}

const FormEdit: FC<FormEditProps> = ({ initialValues, handleSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={articleSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <StickyHeader
            linkBack={ArticlePathsEnum.ARTICLE_LIST_ADMIN}
            isSubmitting={isSubmitting}
          />
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
              name="maxDonate"
              fullWidth
              label="Lượt ủng hộ tối đa"
              placeholder="100"
              type="number"
            />

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

export default memo(FormEdit);
