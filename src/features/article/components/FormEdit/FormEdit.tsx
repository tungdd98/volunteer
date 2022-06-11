import React, { FC, memo, useEffect, useMemo } from "react";

import { Form, Formik, FormikHelpers } from "formik";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import FormEditWrapper from "components/FormEditWrapper/FormEditWrapper";
import FormikSelect from "components/FormElements/FormikSelect/FormikSelect";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import StickyHeader from "components/StickyHeader/StickyHeader";
import TextEditor from "components/TextEditor/TextEditor";
import UploadImage from "components/UploadImage/UploadImage";
import {
  ArticleForm,
  ArticlePathsEnum,
  articleSchema,
} from "features/article/article";
import { getCategoryList } from "features/category/category";

interface FormEditProps {
  initialValues: ArticleForm;
  handleSubmit: (
    values: ArticleForm,
    { setSubmitting }: FormikHelpers<ArticleForm>
  ) => void;
}

const FormEdit: FC<FormEditProps> = ({ initialValues, handleSubmit }) => {
  const dispatch = useAppDispatch();
  const { provinces } = useAppSelector(state => state.article);
  const { categories } = useAppSelector(state => state.category);

  const { categoryId } = useParams<{ categoryId: string }>();

  const provincesOption = useMemo(() => {
    return provinces.map(item => ({
      label: item.name,
      value: item.code,
    }));
  }, [provinces]);

  const categoriesOption = useMemo(() => {
    return (
      categories?.map(item => ({
        label: item.title,
        value: item.id,
      })) || []
    );
  }, [categories]);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={articleSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <StickyHeader
            linkBack={ArticlePathsEnum.ARTICLE_LIST_ADMIN.replace(
              /:categoryId/,
              categoryId
            )}
            isSubmitting={isSubmitting}
          />
          <FormEditWrapper>
            <FormikTextField
              name="title"
              fullWidth
              label="Tiêu đề"
              placeholder="example"
            />

            <FormikSelect
              name="provinceCode"
              options={[
                ...provincesOption,
                { value: "", label: "Chọn tỉnh thành" },
              ]}
              label="Tỉnh/ thành"
              fullWidth
            />

            <FormikSelect
              name="categoryId"
              options={[
                ...categoriesOption,
                { value: "", label: "Chọn danh mục sự kiện" },
              ]}
              label="Danh mục sự kiện"
              fullWidth
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
