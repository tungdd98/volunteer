import React, { FC, memo } from "react";

import { Form, Formik, FormikHelpers } from "formik";

import FormEditWrapper from "components/FormEditWrapper/FormEditWrapper";
import StickyHeader from "components/StickyHeader/StickyHeader";
import UploadImage from "components/UploadImage/UploadImage";
import { AspectRatioEnum } from "constants/common.constants";
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

            <FormEditWrapper>
              <UploadImage
                name="thumbnail"
                label="Ảnh thumbnail"
                width={240}
                cropAspectRatio={AspectRatioEnum.TEN_TO_FOUR}
              />
            </FormEditWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default memo(FormEdit);
