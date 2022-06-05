import React, { FC, memo } from "react";

import { Button } from "@mui/material";
import { Form, Formik } from "formik";

import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import UploadImage from "components/UploadImage/UploadImage";
import {
  SignUpPersonalInformationForm,
  SignUpPersonalInformationMode,
} from "features/auth/auth";

interface EditPersonalProps {
  setMode: React.Dispatch<React.SetStateAction<SignUpPersonalInformationMode>>;
  userProfile: SignUpPersonalInformationForm;
  setUserProfile: React.Dispatch<
    React.SetStateAction<SignUpPersonalInformationForm>
  >;
}

const EditPersonal: FC<EditPersonalProps> = ({
  setMode,
  userProfile,
  setUserProfile,
}) => {
  return (
    <Formik
      initialValues={userProfile}
      onSubmit={values => {
        setMode(SignUpPersonalInformationMode.PREVIEW);
        setUserProfile(values);
      }}
    >
      <Form>
        <FormikTextField
          name="displayName"
          fullWidth
          label="Họ và tên"
          placeholder="Nguyen Van A"
        />

        <UploadImage name="photoURL" label="Ảnh đại diện" width={240} />

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          type="submit"
        >
          Xác nhận
        </Button>
      </Form>
    </Formik>
  );
};

export default memo(EditPersonal);
