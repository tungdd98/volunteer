import React, { FC, memo } from "react";

import { Form, Formik } from "formik";

import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";

const SearchDialog: FC = () => {
  return (
    <Formik
      initialValues={{ search: "" }}
      onSubmit={() => {
        // TODO:
      }}
    >
      <Form>
        <FormikTextField
          name="search"
          size="small"
          variant="outlined"
          placeholder="Tìm kiếm"
        />
      </Form>
    </Formik>
  );
};

export default memo(SearchDialog);
