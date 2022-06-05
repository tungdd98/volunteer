import React, { FC, memo } from "react";

import { LinearProgress, LinearProgressProps, styled } from "@mui/material";

const BorderLinearProgressStyle = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 5,
}));

type BorderLinearProgressProps = LinearProgressProps;

const BorderLinearProgress: FC<BorderLinearProgressProps> = ({ ...props }) => {
  return <BorderLinearProgressStyle {...props} />;
};

export default memo(BorderLinearProgress);
