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
              label="Ti??u ?????"
              placeholder="example"
            />

            <FormikSelect
              name="provinceCode"
              options={[
                ...provincesOption,
                { value: "", label: "Ch???n t???nh th??nh" },
              ]}
              label="T???nh/ th??nh"
              fullWidth
            />

            <FormikSelect
              name="categoryId"
              options={[
                ...categoriesOption,
                { value: "", label: "Ch???n danh m???c s??? ki???n" },
              ]}
              label="Danh m???c s??? ki???n"
              fullWidth
            />

            <UploadImage name="thumbnail" label="???nh thumbnail" width={240} />

            <TextEditor name="content" label="N???i dung b??i vi???t" />

            <FormikTextField
              name="maxDonate"
              fullWidth
              label="L?????t ???ng h??? t???i ??a"
              placeholder="100"
              type="number"
            />

            <FormikTextField
              name="senderAddress"
              fullWidth
              label="?????a ch??? v?? ng?????i nh???n"
              placeholder="0xx"
            />
          </FormEditWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default memo(FormEdit);
