import React, { FC, memo } from "react";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Typography,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";
import { useFormikContext } from "formik";
import { get } from "lodash";

interface RadioOptionProps {
  label: string | React.ReactElement;
  value: string | number;
}

interface FormikRadioGroupProps extends RadioGroupProps {
  options: RadioOptionProps[];
  name: string;
  label?: string;
}

const FormikRadioGroup: FC<FormikRadioGroupProps> = ({
  options,
  name,
  label,
  ...rest
}) => {
  const { setFieldValue, errors, touched, values } =
    useFormikContext<unknown>();

  const error = get(errors, name) && get(touched, name);
  const errorText = get(errors, name);
  const value = get(values, name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, (event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset" variant="standard" error={!!error}>
      {label && (
        <FormLabel component="legend">
          <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
        </FormLabel>
      )}
      <RadioGroup name={name} value={value} onChange={handleChange} {...rest}>
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            control={<Radio />}
            label={option.label}
            value={option.value}
          />
        ))}
        {error && <FormHelperText error>{errorText}</FormHelperText>}
      </RadioGroup>
    </FormControl>
  );
};

export default memo(FormikRadioGroup);
