import React, { FC, memo } from "react";

import { Typography, TypographyProps } from "@mui/material";

interface RowDataProps extends TypographyProps {
  content?: string | null;
}

const RowData: FC<RowDataProps> = ({ content, ...props }) => {
  return content ? (
    <Typography {...props}>{content}</Typography>
  ) : (
    <Typography variant="body2" color="text.disabled">
      Không có thông tin
    </Typography>
  );
};

export default memo(RowData);
