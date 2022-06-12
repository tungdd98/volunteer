import React, { FC, memo } from "react";

import { Form, Formik, FormikHelpers } from "formik";

import StickyHeader from "components/StickyHeader/StickyHeader";
import { BannerPathsEnum } from "features/banner/banner";

interface FormEditProps {
  initialValues: { thumbnail: string | File };
  handleSubmit: (
    values: { thumbnail: string | File },
    { setSubmitting }: FormikHelpers<{ thumbnail: string | File }>
  ) => void;
}

const FormEdit: FC<FormEditProps> = ({ initialValues, handleSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, values }) => {
        return (
          <Form>
            <StickyHeader
              linkBack={BannerPathsEnum.ADMIN_LIST}
              isSubmitting={isSubmitting || !values.thumbnail}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default memo(FormEdit);
