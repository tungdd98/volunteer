import React, { FC, memo } from "react";

import { Form, Formik, FormikHelpers } from "formik";

import FormEditWrapper from "components/FormEditWrapper/FormEditWrapper";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import StickyHeader from "components/StickyHeader/StickyHeader";
import {
  CategoryPathsEnum,
  CategoryRequest,
  categorySchema,
} from "features/category/category";

interface FormEditProps {
  initialValues: CategoryRequest;
  handleSubmit: (
    values: CategoryRequest,
    { setSubmitting }: FormikHelpers<CategoryRequest>
  ) => void;
}

const FormEdit: FC<FormEditProps> = ({ initialValues, handleSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={categorySchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <StickyHeader
            linkBack={CategoryPathsEnum.ADMIN_LIST}
            isSubmitting={isSubmitting}
          />
          <FormEditWrapper>
            <FormikTextField
              name="title"
              fullWidth
              label="Tên danh mục sự kiện"
              placeholder="example"
            />
          </FormEditWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default memo(FormEdit);
