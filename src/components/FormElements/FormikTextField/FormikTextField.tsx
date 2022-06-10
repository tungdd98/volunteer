import React, { FC, memo } from "react";

import {
  Box,
  TextField,
  TextFieldProps,
  Typography,
  BoxProps,
} from "@mui/material";
import { Field, useFormikContext } from "formik";
import { get } from "lodash";

export interface FormikTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  boxProps?: BoxProps;
}

const FormikTextField: FC<FormikTextFieldProps> = ({
  label,
  id,
  name,
  variant = "filled",
  placeholder,
  boxProps,
  ...props
}) => {
  const { errors, touched, values, handleBlur, handleChange } =
    useFormikContext<unknown>();

  const error = get(errors, name) && get(touched, name);
  const errorText = get(errors, name);

  return (
    <Box sx={{ mb: 2 }} {...boxProps}>
      {label && (
        <Typography sx={{ mb: 0.5 }}>
          <label htmlFor={id || name}>{label}</label>
        </Typography>
      )}
      <Field
        {...props}
        component={TextField}
        onChange={handleChange}
        onBlur={handleBlur}
        id={id || name}
        name={name}
        variant={variant}
        error={!!error}
        helperText={error && errorText}
        value={get(values, name)}
        autoComplete="off"
        hiddenLabel
        label=""
        placeholder={placeholder || ""}
      />
    </Box>
  );
};

export default memo(FormikTextField);
