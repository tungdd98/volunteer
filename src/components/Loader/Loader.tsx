import React, { FC } from "react";

import { Box, CircularProgress } from "@mui/material";

const Loader: FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "white",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
