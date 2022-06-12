/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, memo, useRef, useState } from "react";

import { PhotoCameraFrontRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Formik, FormikProps } from "formik";

import { useAppDispatch, useAppSelector } from "app/hooks";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import PreviewImage from "components/PreviewImage/PreviewImage";
import UploadImage from "components/UploadImage/UploadImage";
import {
  SignUpPersonalInformationForm,
  SignUpPersonalInformationMode,
  uploadPersonalCode,
} from "features/auth/auth";
import { handleShowSnackbar } from "helpers/form/display-snackbar";

import PreviewCodeInfoInput from "../PreviewCodeInfo/PreviewCodeInfoInput";

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
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);

  const inputRef = useRef<HTMLInputElement>(null);
  const formikRef: React.Ref<FormikProps<SignUpPersonalInformationForm>> =
    useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadFile = (files: FileList | null) => {
    const file = files ? files[0] : null;

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (!file) {
      return;
    }

    if (formikRef.current) {
      formikRef.current.setFieldValue("personalCode", file);
    }

    setIsSubmitting(true);

    dispatch(uploadPersonalCode(file))
      .then(unwrapResult)
      .then(res => {
        if (formikRef.current && userInfo) {
          formikRef.current.setFieldValue("codeInfo", {
            ...res,
            uid: userInfo.uid,
          });
        }
      })
      .catch(() => {
        handleShowSnackbar({ dispatch, msg: "Upload fail" });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Formik
      initialValues={userProfile}
      onSubmit={values => {
        setMode(SignUpPersonalInformationMode.PREVIEW);
        setUserProfile(values);
      }}
      innerRef={formikRef}
    >
      {({ values }) => {
        return (
          <Form>
            <FormikTextField
              name="displayName"
              fullWidth
              label="Nickname"
              placeholder="oraichain"
            />

            <UploadImage name="photoURL" label="Ảnh đại diện" width={180} />

            {!userInfo?.codeInfo ? (
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: 500 }}>
                  Xác thực danh tính
                </Typography>
                <Typography
                  variant="caption"
                  color="GrayText"
                  sx={{ display: "block", mb: 1 }}
                >
                  * Vui lòng tải lên mặt trước ảnh CMND/Căn cước công dân
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <PreviewImage file={values.personalCode} width={240} />
                </Box>
                <label
                  htmlFor="file"
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    const {
                      dataTransfer: { files },
                    } = e;
                    handleUploadFile(files);
                  }}
                >
                  <Button
                    component="span"
                    variant="contained"
                    startIcon={<PhotoCameraFrontRounded />}
                  >
                    Upload
                  </Button>
                  <input
                    accept="image/*"
                    type="file"
                    id="file"
                    name="personalCode"
                    hidden
                    onChange={e => handleUploadFile(e.currentTarget.files)}
                  />
                </label>
              </Box>
            ) : (
              <Typography
                variant="caption"
                color="GrayText"
                sx={{ mb: 3, display: "block" }}
              >
                * Đã xác thực danh tính
              </Typography>
            )}

            {values.codeInfo && <PreviewCodeInfoInput />}

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              Xác nhận
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default memo(EditPersonal);
