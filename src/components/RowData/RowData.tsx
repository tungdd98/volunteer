import React, { FC, memo } from "react";

import { Typography } from "@mui/material";

interface RowDataProps {
  content?: string | null;
}

const RowData: FC<RowDataProps> = ({ content }) => {
  return content ? (
    <Typography>{content}</Typography>
  ) : (
    <Typography variant="body2" color="text.disabled">
      Không có thông tin
    </Typography>
  );
};

export default memo(RowData);
