/* eslint-disable import/no-extraneous-dependencies */
import React, { FC, memo, useState, useRef, useEffect } from "react";

import { Box, FormHelperText, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useFormikContext } from "formik";
import { get } from "lodash";

interface TextEditorProps {
  name: string;
  initValue?: string | null;
  label?: string;
}

interface EditorProps {
  getContent: () => string;
  setContent: (value: string) => void;
}

const TextEditor: FC<TextEditorProps> = ({ name, initValue, label }) => {
  const { setFieldTouched, setFieldValue, initialValues, errors, touched } =
    useFormikContext<unknown>();

  const editorRef = useRef<EditorProps | null>(null);

  const error = get(errors, name) && get(touched, name);
  const errorText = get(errors, name);

  const [editorInitialValue, setEditorInitialValue] = useState(
    name ? get(initialValues, name) : initValue
  );

  const handleBlurEditor = (e: unknown, editor: EditorProps) => {
    editor.setContent(editor.getContent());

    if (name) {
      setFieldTouched(name);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeEditor = (e: any) => {
    if (name) {
      try {
        setFieldValue(name, e.target.getContent());
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    if (name) {
      setEditorInitialValue(!initValue ? get(initialValues, name) : initValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, name]);

  return (
    <Box sx={{ mb: 2 }}>
      {label && (
        <Typography sx={{ mb: 0.5 }}>
          <label htmlFor={name}>{label}</label>
        </Typography>
      )}
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_KEY}
        initialValue={editorInitialValue}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          setup(editor) {
            editorRef.current = editor;

            editor.on("blur", e => handleBlurEditor(e, editor));

            editor.on("change", handleChangeEditor);
          },
        }}
      />
      {error && <FormHelperText error>{errorText}</FormHelperText>}
    </Box>
  );
};

export default memo(TextEditor);
