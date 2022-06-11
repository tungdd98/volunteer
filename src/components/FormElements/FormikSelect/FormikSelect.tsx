import React, { FC, memo } from "react";

import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import { Field, useFormikContext } from "formik";
import { get } from "lodash";

export interface OptionProps {
  value: string | number;
  label: string;
}

interface FormikSelectProps extends Omit<SelectProps, "name"> {
  name: string;
  options: OptionProps[];
}

const FormikSelect: FC<FormikSelectProps> = ({
  fullWidth,
  label,
  id,
  name,
  displayEmpty = true,
  variant = "filled",
  options,
  ...props
}) => {
  const { errors, touched, values, handleChange } = useFormikContext<unknown>();

  const error = get(errors, name) && get(touched, name);
  const errorText = get(errors, name);

  return (
    <FormControl sx={{ minWidth: 120, mb: 2 }} fullWidth={fullWidth}>
      {label && (
        <Typography sx={{ mb: 1, fontWeight: "fontWeightMedium" }}>
          <label htmlFor={`label-${id || name}`}>{label}</label>
        </Typography>
      )}
      <Field
        {...props}
        label=""
        hiddenLabel
        displayEmpty={displayEmpty}
        labelId={`label-${id || name}`}
        component={Select}
        onChange={handleChange}
        id={id || name}
        name={name}
        variant={variant}
        error={!!error}
        value={get(values, name)}
        inputProps={{
          name,
        }}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Field>
      {errorText && <FormHelperText error>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default memo(FormikSelect);
