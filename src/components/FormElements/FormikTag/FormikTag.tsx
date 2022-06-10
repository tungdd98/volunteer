import React, { FC, useState, memo, useMemo } from "react";

import {
  Box,
  Chip,
  FilledInput,
  FilledInputProps,
  FormHelperText,
  Typography,
} from "@mui/material";
import { Field, useFormikContext } from "formik";
import { get } from "lodash";

import { DefaultMessages } from "constants/message.constants";

import { FormikTextFieldProps } from "../FormikTextField/FormikTextField";

type FormikTagProps = FormikTextFieldProps &
  FilledInputProps & {
    label?: string;
    name: string;
    limitTextValue?: number;
    isTag?: boolean;
  };

const FormikTag: FC<FormikTagProps> = ({
  limitTextValue,
  isTag,
  id,
  name,
  label,
  ...rest
}) => {
  const { setFieldValue, setFieldTouched, values, errors } =
    useFormikContext<unknown>();

  const [value, setValue] = useState("");
  const [preventChipCreation, setPreventChipCreation] = useState(true);
  const [chipsData, setChipsData] = useState<string[]>(
    () => get(values, name) || []
  );
  const isDuplicate = useMemo(
    () => chipsData.includes(value),
    [chipsData, value]
  );
  const displayError = useMemo(() => {
    if (isDuplicate && preventChipCreation) {
      return DefaultMessages.DUPLICATE_TAG;
    }
    const error = get(errors, name);
    if (!error) {
      return undefined;
    }
    if (Array.isArray(error) && limitTextValue && error) {
      return error.length > 0
        ? DefaultMessages.MAX_LENGTH_TAG.replace(
            ":number",
            limitTextValue.toString()
          )
        : undefined;
    }

    return error;
  }, [errors, limitTextValue, name, isDuplicate, preventChipCreation]);

  const handleDelete = (chip: string) => () => {
    const newChips = chipsData.filter(c => c !== chip);
    setChipsData(newChips);
    setFieldValue(name, newChips);
  };

  const renderChips = (chips: string[]) => {
    return chips.map((chip: string) => (
      <Box key={chip} mr={0.5} mb={0.5}>
        <Chip
          label={isTag ? chip.replace(/\s+/g, "") : chip}
          variant="outlined"
          onDelete={handleDelete(chip)}
        />
      </Box>
    ));
  };

  return (
    <>
      {label && (
        <Box mb={1}>
          <Typography variant="subtitle2" color="textSecondary">
            <label htmlFor={id || name}>{label}</label>
          </Typography>
        </Box>
      )}
      <Field>
        {() => (
          <>
            <FilledInput
              multiline
              startAdornment={<>{renderChips(chipsData)}</>}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (!preventChipCreation && e.keyCode === 13) {
                  setPreventChipCreation(true);
                }
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                const val = isTag
                  ? (e.target as HTMLInputElement).value.replace(/\s+/g, "")
                  : (e.target as HTMLInputElement).value.trim();
                if (e.keyCode === 13) {
                  e.preventDefault();
                  if (val && !chipsData.includes(val)) {
                    setPreventChipCreation(false);
                    const newChipData = [...chipsData, val];
                    setChipsData(newChipData);
                    setFieldValue(name, newChipData);
                    setValue("");
                  }
                }
              }}
              onChange={e => {
                setValue(e.currentTarget.value);
              }}
              onBlur={() => {
                setValue("");
                setFieldTouched(name, true);
              }}
              value={value}
              id={id || name}
              name={name}
              {...rest}
              error={!!displayError}
            />
            <FormHelperText error>{displayError}</FormHelperText>
          </>
        )}
      </Field>
    </>
  );
};

export default memo(FormikTag);
