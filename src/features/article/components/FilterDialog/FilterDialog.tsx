import React, { FC, memo, useMemo } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Form, Formik } from "formik";

import { useAppSelector } from "app/hooks";
import FormikSelect from "components/FormElements/FormikSelect/FormikSelect";
import { ArticleParams } from "features/article/article";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  params: ArticleParams;
  setParams: React.Dispatch<React.SetStateAction<ArticleParams>>;
}

const FilterDialog: FC<FilterDialogProps> = ({
  open,
  onClose,
  params,
  setParams,
}) => {
  const { provinces } = useAppSelector(state => state.article);

  const provincesOption = useMemo(() => {
    return provinces.map(item => ({
      label: item.name,
      value: item.code,
    }));
  }, [provinces]);

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <Formik
        initialValues={params}
        onSubmit={(values, { setSubmitting }) => {
          setParams(values);
          setSubmitting(false);
          onClose();
        }}
      >
        <Form>
          <DialogTitle gutterBottom>Lọc theo</DialogTitle>
          <DialogContent>
            <FormikSelect
              name="provinceCode"
              options={[
                ...provincesOption,
                { value: "", label: "Chọn tỉnh thành" },
              ]}
              label="Tỉnh/ thành"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              Tìm kiếm
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Đóng lại
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default memo(FilterDialog);
