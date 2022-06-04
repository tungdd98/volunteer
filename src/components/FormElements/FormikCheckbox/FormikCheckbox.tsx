import React, { FC, memo } from "react";

import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { get } from "lodash";

interface CheckboxOptionProp extends CheckboxProps {
  label: string;
  value: string | number;
}

interface FormikCheckboxProps {
  options?: CheckboxOptionProp[];
  name: string;
  label?: string;
  singleOption?: boolean;
}

const FormikCheckbox: FC<FormikCheckboxProps> = ({
  options,
  name,
  label,
  singleOption,
  ...rest
}) => {
  const { handleChange, errors, touched, values } = useFormikContext<unknown>();

  const error = get(errors, name) && get(touched, name);
  const errorText = get(errors, name);
  const value = get(values, name);

  return singleOption ? (
    <FormControlLabel
      label={label || ""}
      control={
        <Checkbox
          {...rest}
          name={name}
          onChange={handleChange}
          value={value}
          checked={!!value}
        />
      }
    />
  ) : (
    <FormControl component="fieldset" variant="standard" error={!!error}>
      {label && (
        <FormLabel component="legend">
          <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
        </FormLabel>
      )}
      <FormGroup>
        {options?.map(option => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                {...rest}
                name={name}
                onChange={handleChange}
                value={option.value}
                checked={value?.includes(option.value)}
              />
            }
            label={option.label}
          />
        ))}
        {error && <FormHelperText error>{errorText}</FormHelperText>}
      </FormGroup>
    </FormControl>
  );
};

export default memo(FormikCheckbox);
